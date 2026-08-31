/**
 * movies.js
 * ---------------------------------------------------------------
 * Default seed data for Reel List.
 * This array is only used the FIRST time the app runs on a device
 * (i.e. when LocalStorage is empty). After that, everything the
 * user sees, adds, edits or removes lives in LocalStorage.
 *
 * Each movie is a plain object — no external API, no images from
 * the internet. Posters are generated in CSS from `posterHue` +
 * the movie's initial letter, so the app works fully offline.
 * ---------------------------------------------------------------
 */

const DEFAULT_MOVIES = [
  {
    id: "m-001",
    title: "Arrival",
    genre: "Sci-Fi",
    year: 2016,
    rating: 8.0,
    duration: 116,
    description: "A linguist is recruited to communicate with alien visitors before fear sparks a global conflict.",
    watched: true,
    posterHue: 205
  },
  {
    id: "m-002",
    title: "Parasite",
    genre: "Thriller",
    year: 2019,
    rating: 8.5,
    duration: 132,
    description: "A poor family schemes to become employed by a wealthy household, with unforeseen consequences.",
    watched: true,
    posterHue: 155
  },
  {
    id: "m-003",
    title: "The Grand Budapest Hotel",
    genre: "Comedy",
    year: 2014,
    rating: 8.1,
    duration: 99,
    description: "A concierge and his lobby boy get tangled in a theft and murder at a famed European hotel.",
    watched: false,
    posterHue: 340
  },
  {
    id: "m-004",
    title: "Whiplash",
    genre: "Drama",
    year: 2014,
    rating: 8.5,
    duration: 106,
    description: "A young drummer enrolls at a cutthroat music conservatory under a ruthless instructor.",
    watched: true,
    posterHue: 15
  },
  {
    id: "m-005",
    title: "Mad Max: Fury Road",
    genre: "Action",
    year: 2015,
    rating: 8.1,
    duration: 120,
    description: "In a post-apocalyptic wasteland, a woman rebels against a tyrant with the help of a drifter.",
    watched: false,
    posterHue: 25
  },
  {
    id: "m-006",
    title: "Spirited Away",
    genre: "Animation",
    year: 2001,
    rating: 8.6,
    duration: 125,
    description: "A young girl wanders into a spirit world and must find a way to save her parents and escape.",
    watched: true,
    posterHue: 265
  },
  {
    id: "m-007",
    title: "Hereditary",
    genre: "Horror",
    year: 2018,
    rating: 7.3,
    duration: 127,
    description: "A family unravels dark secrets after the death of their secretive grandmother.",
    watched: false,
    posterHue: 0
  },
  {
    id: "m-009",
    title: "Dune",
    genre: "Sci-Fi",
    year: 2021,
    rating: 8.0,
    duration: 155,
    description: "A young heir travels to a dangerous desert planet to secure his family's fate and destiny.",
    watched: true,
    posterHue: 40
  },
  {
    id: "m-010",
    title: "Knives Out",
    genre: "Thriller",
    year: 2019,
    rating: 7.9,
    duration: 130,
    description: "A detective investigates the death of a wealthy crime novelist surrounded by his scheming family.",
    watched: false,
    posterHue: 190
  },
  {
    id: "m-011",
    title: "The Grand Seduction",
    genre: "Comedy",
    year: 2013,
    rating: 7.0,
    duration: 113,
    description: "A small fishing village must convince a big-city doctor to stay so they can land a lucrative factory.",
    watched: false,
    posterHue: 50
  },
  {
    id: "m-012",
    title: "Manchester by the Sea",
    genre: "Drama",
    year: 2016,
    rating: 7.8,
    duration: 137,
    description: "A withdrawn man is forced to return home to care for his nephew after a family tragedy.",
    watched: true,
    posterHue: 210
  },
  {
    id: "m-013",
    title: "John Wick",
    genre: "Action",
    year: 2014,
    rating: 7.4,
    duration: 101,
    description: "An ex-hitman comes out of retirement to track down the gangsters that took everything from him.",
    watched: true,
    posterHue: 5
  },
  {
    id: "m-014",
    title: "Coco",
    genre: "Animation",
    year: 2017,
    rating: 8.4,
    duration: 105,
    description: "A boy is transported to the Land of the Dead and uncovers the story of his family's history.",
    watched: false,
    posterHue: 30
  },
  {
    id: "m-015",
    title: "The Conjuring",
    genre: "Horror",
    year: 2013,
    rating: 7.5,
    duration: 112,
    description: "Paranormal investigators help a family terrorized by a dark presence in their farmhouse.",
    watched: false,
    posterHue: 355
  }
];
