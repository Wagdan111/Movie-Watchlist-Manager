/**
 * storage.js
 * ---------------------------------------------------------------
 * Small wrapper around LocalStorage so the rest of the app never
 * touches `localStorage` directly. Keeps persistence logic in one
 * place and fails gracefully if storage is unavailable (private
 * browsing modes, storagex quota, etc.).
 * ---------------------------------------------------------------
 */

const Storage = (() => {
  const STORAGE_KEY = "reelList.movies.v1";

  function isAvailable() {
    try {
      const testKey = "__reelList_test__";
      window.localStorage.setItem(testKey, "1");
      window.localStorage.removeItem(testKey);
      return true;
    } catch (err) {
      return false;
    }
  }

  function loadMovies() {
    if (!isAvailable()) return [...DEFAULT_MOVIES];

    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      // First run on this device — seed with defaults.
      saveMovies(DEFAULT_MOVIES);
      return [...DEFAULT_MOVIES];
    }

    try {
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) throw new Error("Corrupt data shape");
      return parsed;
    } catch (err) {
      console.warn("Reel List: stored data was corrupt, resetting to defaults.", err);
      saveMovies(DEFAULT_MOVIES);
      return [...DEFAULT_MOVIES];
    }
  }

  function saveMovies(movies) {
    if (!isAvailable()) return false;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(movies));
      return true;
    } catch (err) {
      console.error("Reel List: failed to save to LocalStorage.", err);
      return false;
    }
  }

  return { loadMovies, saveMovies, isAvailable };
})();
