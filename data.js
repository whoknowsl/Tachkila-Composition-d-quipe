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
const players = [
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
localStorage.setItem("players", JSON.stringify(positions));
localStorage.setItem("positions", JSON.stringify(positions));
const storedPosition = localStorage.getItem("positions");
console.log(JSON.parse(storedPosition));
export { positions, players };
