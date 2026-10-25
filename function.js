import { positions, players } from "./data.js";
import {
  newPlayerForm,
  totalNumberOfPlayers,
  nameOfPlayerInput,
  numberOfPlayerInput,
  errorName,
  errorNumber,
} from "./script.js";
export const state = { editingId: null };

//add new player
export function addNewPlayer() {
  const nameOfPlayer = document.getElementById("nameOfPlayer").value;
  const numberOfPlayer = document.getElementById("numberOfPlayer").value;
  const positionOfPlayer = document.querySelector(
    "input[name='pos']:checked",
  ).value;
  const newPlayer = {
    id: players.length > 0 ? players[players.length - 1].id + 1 : 1,
  };
  newPlayer.nom = nameOfPlayer;
  newPlayer.number = numberOfPlayer;
  newPlayer.positions = positionOfPlayer;
  newPlayer.positionColor = assignColor(positionOfPlayer);
  newPlayer.cuurentPosition = "Sur le banc";
  players.push(newPlayer);
  renderingCard();
  newPlayerForm.reset();
  newPlayerForm.classList.toggle("hidden");
}

export function playerCard(player) {
  //creating the elements
  const li = document.createElement("li");
  const div = document.createElement("div");
  const btnDiv = document.createElement("div");
  const infoPlayer = document.createElement("div");
  const modifierBtn = document.createElement("button");
  const deletBtn = document.createElement("button");
  const span = document.createElement("span");
  const h3 = document.createElement("h3");
  const p = document.createElement("p");
  const select = document.createElement("select");
  const hr = document.createElement("hr");
  //add class style by tailwind;
  btnDiv.classList.add("flex", "gap-4", "self-end");
  li.classList.add(
    "border-1",
    "flex",
    "flex-col",
    "py-3",
    "px-4",
    "rounded-2xl",
    "w-auto",
    "gap-4",
  );
  hr.classList.add("border-2", `border-red-500"`);
  div.classList.add("grid", "grid-cols-[25%_60%_10%]");
  span.classList.add(
    "border-1",
    "row-span-2",
    `border-${player.positionColor}-500`,
    "p-1",
    "flex",
    "justify-center",
    "w-15",
    "h-15",
    "items-center",
    "rounded-full",
  );
  h3.classList.add("flex");
  select.classList.add("bg-[#1a1f33]", "input:checked-border-none");
  modifierBtn.classList.add("cursor-pointer");
  deletBtn.classList.add("cursor-pointer");
  infoPlayer.classList.add("flex", "flex-col", "justify-center");
  //passing the elements data
  modifierBtn.innerHTML = "<i class='fa-solid fa-pen'></i>";
  deletBtn.innerHTML = "<i class='fa-solid fa-trash'></i>";
  span.textContent = player.number;
  h3.textContent = player.nom;
  p.textContent = player.positions;

  //set attribute
  modifierBtn.setAttribute("data-id", player.id);
  deletBtn.setAttribute("data-id", player.id);

  //add events to the deletbtn
  deletBtn.addEventListener("click", () => {
    deletfunc(deletBtn.dataset.id);
  });
  //add events to the modifiertbtn
  modifierBtn.addEventListener("click", () => {
    const player = players.find((p) => {
      return p.id == modifierBtn.dataset.id;
    });
    modifierTheplayer(player);
  });

  //add event changet to select
  select.addEventListener("change", (e) => {
    let positionOfThePlayer = e.target.value;
    let res = "";
    for (let i = 0; i < positionOfThePlayer.length; i++) {
      if (positionOfThePlayer[i] == " ") {
        continue;
      } else {
        res += positionOfThePlayer[i];
      }
    }
    let position = document.getElementById(res);
    position.innerHTML = `<div
          class="flex justify-center items-center gap-4 flex-col bg-[#1a2233]/60"
          id="${res}"
        >
          <span
            class="inline-flex items-center justify-center h-10 w-10 border-1 p-1 rounded-full border-${player.positionColor}-500 text-${player.positionColor}-500"
            >${player.number}</span
          >
          <p class="text-${player.positionColor}-500">${player.positions}</p>
          <p class="text-white">${player.nom}</p>
        </div>`;
  });

  //add option to select
  for (let i = 0; i < positions.length; i++) {
    const option = document.createElement("option");
    option.innerText = positions[i];
    select.append(option);
  }
  infoPlayer.append(h3, p);
  btnDiv.append(modifierBtn, deletBtn);
  div.append(span, infoPlayer, btnDiv);
  li.append(hr, div, select);
  playersList.append(li);
}

export function renderingCard() {
  if (players.length === 0) return;
  playersList.textContent = "";
  totalNumberOfPlayers.textContent = `${players.length} joueur(s)`;
  players.forEach((player) => {
    playerCard(player);
  });
}

export function deletfunc(p) {
  const player = players.findIndex((player) => {
    return player.id == p;
  });
  console.log("the index of player", player);
  players.splice(player, 1);
  totalNumberOfPlayers.textContent = `${players.length} joueur(s)`;
  playersList.textContent = "";
  players.forEach((player) => {
    playerCard(player);
  });
}

export function validationName() {
  const palyerName = nameOfPlayerInput.value.trim();
  console.log(palyerName);
  console.log(nameOfPlayerInput);
  if (palyerName === "") {
    errorName.textContent = "Please add Name for the player";
  } else if (palyerName.length < 3) {
    errorName.textContent = "Enter at leaste three caracter";
  } else {
    formValidMsg.classList.add("hidden");
    formNoValidMesg.textContent = "";
    errorName.textContent = "";
  }
  console.log(errorName.textContent);
}

export function validateNumber() {
  const playerNum = numberOfPlayerInput.value.trim();
  const numbeRegex = /^[1-9][0-9]?$/;
  if (playerNum === "") {
    errorNumber.textContent = "Please add Number for the player";
  } else if (!numbeRegex.test(playerNum)) {
    errorNumber.textContent = "please enter a number from 1 to 99";
  } else {
    formValidMsg.classList.add("hidden");
    formNoValidMesg.textContent = "";
    errorNumber.textContent = "";
  }
  players.forEach((player) => {
    if (player.number == playerNum) {
      errorNumber.textContent = "this number is alerdya taken";
    }
  });
}

export function assignColor(value) {
  let color = "";
  if (value == "GB") {
    color = "yellow";
  } else if (value == "Def") {
    color = "blue";
  } else if (value == "Mil") {
    color = "green";
  } else if (value == "ATT") {
    color = "red";
  }
  return color;
}

export function updateExistingPlayer(id) {
  const player = players.find((p) => p.id == id);
  const positionOfPlayer = document.querySelector("input[name='pos']:checked");
  player.nom = nameOfPlayerInput.value;
  player.number = numberOfPlayerInput.value;
  player.positions = positionOfPlayer.value;
  player.positionColor = assignColor(positionOfPlayer.value);
  state.editingId = null;
}

function modifierTheplayer(player) {
  state.editingId = player.id;
  newPlayerForm.classList.remove("hidden");
  nameOfPlayerInput.value = player.nom;
  numberOfPlayerInput.value = player.number;
  const positionOfPlayer = document.querySelector(
    `input[name='pos'][value= '${player.positions}']`,
  );
  if (positionOfPlayer) {
    positionOfPlayer.checked = true;
  }
}
const bench  = "Sur le Banc"
