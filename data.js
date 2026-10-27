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
let players = [];
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
