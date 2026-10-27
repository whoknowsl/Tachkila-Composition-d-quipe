const positions = [
  "Sur le banc",
  "GB - Gardien",
  "DG - Defenseur gauche",
  "DC - Defenseur central 1",
  "DC - Defenseur central 2",
  "DD - Defenseur droit",
  "MG - Milieu gauche",
  "MC - Miliue central 1",
  "MC - Miliue central 2",
  "MD - Miliue droit",
  "BU - Buteur 1",
  "BU - Buteur 2",
];
let players = [
  {
    id: 1,
    nom: "Kylian Mbappé",
    number: "9",
    positions: "ATT",
    positionColor: "red",
    isPlaying: false,
  },
  {
    id: 2,
    nom: "Kevin De Bruyne",
    number: "17",
    positions: "Mil",
    positionColor: "green",
    isPlaying: false,
  },
  {
    id: 3,
    nom: "Virgil van Dijk",
    number: "4",
    positions: "Def",
    positionColor: "blue",
    isPlaying: false,
  },
  {
    id: 4,
    nom: "Alisson Becker",
    number: "1",
    positions: "GB",
    positionColor: "yellow",
    isPlaying: false,
  },
  {
    id: 5,
    nom: "Achraf Hakimi",
    number: "2",
    positions: "Def",
    positionColor: "blue",
    isPlaying: false,
  },
];
const playersKey = "players";

function refreshLocalStorage() {
  localStorage.setItem(playersKey, JSON.stringify(players));
}

function refresh() {
  const savedplayers = localStorage.getItem(playersKey);
  if (savedplayers) {
    const prased = JSON.parse(savedplayers);
    players.length = 0;
    players.push(...prased);
  } else {
    refreshLocalStorage();
  }
  players = savedplayers ? JSON.parse(localStorage.getItem(playersKey)) : [];
  console.log(savedplayers);
}
refresh();

export { positions, players, playersKey, refreshLocalStorage, refresh };
