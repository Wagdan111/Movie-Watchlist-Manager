/**
 * app.js
 * ---------------------------------------------------------------
 * Core application logic for Reel List.
 * Handles: state, rendering, search, genre/status filters, sorting,
 * add/edit/remove movies, watched toggle, share, and stats.
 * ---------------------------------------------------------------
 */

(()=>{
  "use strict"

  // ------------------------------------------------------------
  // State
  // ------------------------------------------------------------

  let movies = Storage.loadMovies();

  // ------------------------------------------------------------
  // DOM references
  // ------------------------------------------------------------

  const UI ={
   grid: document.getElementById("movieGrid"),
   emptyState: document.getElementById("emptyState"),
   emptyStateText: document.getElementById("emptyStateText"),
   resultsMeta: document.getElementById("resultsMeta"),

   searchInput: document.getElementById("searchInput")  ,
   statusFilter: document.getElementById("statusFilter"),
   sortSelect: document.getElementById("sortSelect"),
   chips: Array.from(document.querySelectorAll(".chip")),

   statTotal: document.getElementById("statTotal"),
   statWatched: document.getElementById("statWatched"),
   statUnwatched: document.getElementById("statUnwatched"),
   statAvgRating: document.getElementById("statAvgRating"),

   addMovieBtn: document.getElementById("addMovieBtn"),
   modal: document.getElementById("movieModal"),
   modalTitle: document.getElementById("modalTitle"),
   closeModalBtn: document.getElementById("closeModalBtn"),
   cancelBtn: document.getElementById("cancelBtn"),
   movieForm: document.getElementById("movieForm"),
   submitBtn: document.getElementById("submitBtn"),

   fTitle: document.getElementById("movieTitle"),
   fGenre: document.getElementById("movieGenre"),
   fYear: document.getElementById("movieYear"),
   fRating: document.getElementById("movieRating"),
   fDuration: document.getElementById("movieDuration"),
   fDescription: document.getElementById("movieDescription"),
   fId: document.getElementById("movieId"),

   toast: document.getElementById("toast")
  }

  // ------------------------------------------------------------
  // Utilities
  // ------------------------------------------------------------

  const state = {
    search: "",
    genre: "All",
    status: "All",
    sort: "title-asc",
    editingId: null
  };

  function escapeHTML(str){
    const div = document.createElement("div");
    div.textContent = str ?? "";
    return div.innerHTML;
  }

  let toastTimer = null;
  function showToast(message){
    UI.toast.textContent = message;
    UI.toast.classList.add("show")
    clearTimeout(toastTimer)
    toastTimer = setTimeout(() => toast.classList.remove("show") , 2600);
  }

  function  persist() {
    Storage.saveMovies(movies);
  }

  function generateId(){
    return "m-" + Date.now().toString(36) + Math.random().toString(36).slice(2 , 7);
  }

  // ------------------------------------------------------------
  // Derived data: filter -> search -> sort
  // ------------------------------------------------------------

  function getVisibleMovies(){
   let result = movies.slice()

   if(state.genre !== "All"){
     result = result.filter((m)=> m.genre === state.genre)
   }

   if(state.status !== "All"){
     const wantWatched =  state.status === "Watched";
     result = result.filter((m)=> m.watched === wantWatched)
   }

   if(state.search.trim() !==  ""){
     const q = state.search.trim().toLowerCase();
     result = result.filter((m)=> m.title.toLowerCase().includes(q))
   }

   const [key, direction] = state.sort.split("-")
   const dir = direction === "asc"  ? 1 : -1;

   result.sort((a, b) =>{
    if(key === "title"){
       return a.title.localeCompare(b.title) *  dir ;
    }

    if(key === "rating"){
       return (a.rating - b.rating) * dir;
    }
    if(key  === "year"){
      return (a.year - b.year) * dir;
    }
     return 0;
   })
  

   return result;
  }

  // ------------------------------------------------------------
  // Rendering
  // ------------------------------------------------------------
  
  
  function  posterInitial(title){
    const trimmed = title.trim();
    return trimmed  ? trimmed[0].toUpperCase() : "?"
  } 

  function createCard(movie){
    const card = document.createElement("article");
    card.className = "movie-card" + (movie.watched ? " is-watched" : "")
    card.dataset.id = movie.id;

    const hue = Number.isFinite(movie.posterHue) ? movie.posterHue : 210;

    card.innerHTML  =   `
        <div class="poster" style="--poster-hue:${hue};">
           <span class="poster-letter">${escapeHTML(posterInitial(movie.title))}</span>
           <span class="poster-genre-tag">${escapeHTML(movie.genre)}</span>
           ${movie.watched ? `<span class="watched-stamp">WATCHED</span> ` : ""}
        </div>
        
        
        <div class="ticket-perforation" aria-hidden="true"></div>
        
        <div class="card-body">
          <h3 class="card-title" title="${escapeHTML(movie.title)}">${escapeHTML(movie.title)}</h3>
        
          <div class="card-meta">
            <span class="rating-badge">★ ${movie.rating.toFixed(1)}</span>
            <span class="meta-sep">•</span>
            <span>${movie.year}</span>
             ${movie.duration ? `<span class="meta-sep">•</span><span>${movie.duration} min</span>` : ""}
          </div>
        
          ${movie.description ? `<p class="card-desc">${escapeHTML(movie.description)}</p>` :  ""}
          <div class="card-actions">
            <button class="action-btn toggle-watch-btn" data-action="toggle-watch"  title="${movie.watched ? "Mark as unwatched" : "Mark as watched"}">
               ${movie.watched ? "↺ Unwatch" : "✓ Watched"}
            </button>
            <button class="action-btn share-btn" data-action="share" title="Share this movie">⤴ Share</button>
            <button class="action-btn edit-btn" data-action="edit" title="Edit movie">✎ Edit</button>
            <button class="action-btn remove-btn" data-action="remove" title="Remove from watchlist">🗑 Remove</button>
          </div>
        </div>
      `;
     return card;
  }

  function render(){
    const visible = getVisibleMovies();

    UI.grid.innerHTML = ""

    const fragment = document.createDocumentFragment();
    visible.forEach((movie) => fragment.appendChild(createCard(movie)));

    UI.grid.appendChild(fragment)

    const noResults = visible.length === 0;

    UI.emptyState.hidden  = !noResults;
    UI.grid.hidden = noResults;

    if(noResults){
      UI.emptyStateText.textContent = 
       movies.length === 0
        ? "Your watchlist is empty. Add your first movie to get started."
        :"Try a different search, filter, or add something new to your watchlist.";
    }

    UI.resultsMeta.textContent = `${visible.length} title ${visible.length===1 ?  "" :  "s"}shown`
    renderStats()
  }

  function renderStats(){
    const total = movies.length;
    const watchedCount = movies.filter((m)=> m.watched).length;
    const unwatchedCount = total - watchedCount;
    const avgRating = total ===  0 ?  0  : movies.reduce((sum , m) => sum + m.rating  ,0) / total; 

        
    UI.statTotal.textContent = total;
    UI.statWatched.textContent =  watchedCount;
    UI.statUnwatched.textContent  =unwatchedCount;
    statAvgRating.textContent = avgRating.toFixed(1);
    
        
  }

  // ------------------------------------------------------------
  // Grid click delegation: toggle watch / share / edit / remove
  // ------------------------------------------------------------

  UI.grid.addEventListener("click", (e)=>{
    const btn = e.target.closest("button[data-action]")
    if(!btn) return;

    const card = e.target.closest(".movie-card")
    const id = card?.dataset.id;
    const movie  = movies.find((m)=>m.id  ===  id);
    if(!movie) return;

    const action = btn.dataset.action;

    if(action === "toggle-watch"){
      movie.watched = !movie.watched;
      persist();
      render();
      showToast(movie.watched ? `Marked ${movie.title} as watched` : `Marked "${movie.title}" as unwatched`);

    }

    if(action === "remove"){
      const confirmed = window.confirm(`Remove "${movie.title}" from your watchlist?`);
      if(confirmed){
        movies =  movies.filter((m)=> m.id !== id);
        persist();
        render();
        showToast(`Removed "${movie.title}" from your watchlist`);
      }
    }

    if(action === "edit"){
       openModalForEdit(movie);
    }

    if(action === "share"){
       shareMovie(movie);
    }
  })

  async function shareMovie(movie){
    const shareText = `${movie.title} (${movie.year}) _ ${movie.genre} _ ★ ${movie.rating.toFixed(1)}`;

    if(navigator.share){
      try{
        await navigator.share({title: movie.title ,  text: shareText});
        return;
      }
      catch{
        // User cancelled or share failed — fall through to clipboard.
      }   
    }

    try{
      await  navigator.clipboard.writeText(shareText)
      showToast("Copied movie details to clipboard")
    }
    catch(err){
      showToast(shareText);
    }
  }

  // ------------------------------------------------------------
  // Filters: search, genre chips, status, sort
  // ------------------------------------------------------------

  UI.statusFilter.addEventListener("change" , (e)=>{
    state.status = e.target.value;
    render();
  })

  let searchDebounce = null;
  UI.searchInput.addEventListener("input" ,  (e) =>{
    clearTimeout(searchDebounce);
    searchDebounce = setTimeout(() => {
      state.search = e.target.value;
      render();
    }, 150);
  })

  UI.sortSelect.addEventListener("change" , (e) =>{
    state.sort = e.target.value;
    render();
  })

  UI.chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      UI.chips.forEach((c) => c.classList.remove("active"));
      chip.classList.add("active");
      state.genre = chip.dataset.genre;
      render();
    });
  });

  // ------------------------------------------------------------
  // Modal: add / edit movie
  // ------------------------------------------------------------
  function openModalForAdd(){
    state.editingId = null;
    UI.modalTitle.textContent = "Add a Movie";
    UI.submitBtn.textContent = "Add to Watchlist";
    UI.movieForm.reset();
    UI.fId.value = "";
    UI.modal.hidden = false;
    document.body.classList.add("modal-open");
    UI.fTitle.focus();
  }

  function openModalForEdit(movie){
    state.editingId  = movie.id;
    UI.modalTitle.textContent = "Edit Movie";
    UI.submitBtn.textContent  = "Save Changes";

    UI.fTitle.value = movie.title;
    UI.fGenre.value = movie.genre;
    UI.fYear.value = movie.year;
    UI.fRating.value = movie.rating;
    UI.fDuration.value = movie.duration;
    UI.fDescription.value = movie.description;
    UI.fId.value = movie.id;

    UI.modal.hidden = false;
    document.body.classList.add("modal-open")
    UI.fTitle.focus();
  }

  function closeModal(){
    UI.modal.hidden  = true;
    document.body.classList.remove("modal-open")
    movieForm.reset();
    state.editingId = null;
  }

  UI.addMovieBtn.addEventListener("click"  , openModalForAdd );
  UI.closeModalBtn.addEventListener("click" , closeModal);
  UI.cancelBtn.addEventListener("click" ,closeModal)

  UI.modal.addEventListener("click" , (e)  =>{
    if(e.target === UI.modal) closeModal();
  })

  document.addEventListener("keydown" , (e) =>{
    if(e.key === "Escape" && !UI.modal.hidden) closeModal();
  })

  UI.movieForm.addEventListener("submit" ,() =>{
    debugger;
    const title = UI.fTitle.value.trim();
    const genre = UI.fGenre.value;
    const year = parseInt(UI.fYear.value , 10);
    const rating = parseFloat(UI.fRating.value);
    const duration = UI.fDuration.value ?  parseInt(UI.fDuration.value, 10) : null;
    const description = UI.fDescription.value.trim();

    if (!title || !genre || Number.isNaN(year) || Number.isNaN(rating)) {
      showToast("Please fill in all required fields");
      return;
    }
    if(state.editingId){
       const movie = movies.find((m) =>  m.id === state.editingId);
       if(movie){
         Object.assign(movie , { title, genre, year, rating, duration, description });
         showToast(`Saved changes to "${title}"`);
       }
    } else{
      movies.unshift({
        id: generateId(),
        title,
        genre,
        year,
        rating,
        duration,
        description,
        watched: false,
        posterHue: Math.floor(Math.random() * 360)
      })
      showToast(`Added "${title}" to your watchlist`);
    }

    persist();
    render();
    closeModal();
  })

  // ------------------------------------------------------------
  // Init
  // ------------------------------------------------------------
  render()
})();

