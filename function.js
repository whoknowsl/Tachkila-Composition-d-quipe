import { positions, players } from "./data.js";
import {
  newPlayerForm,
  PopUpFormBtn,
  removePopUpFormBtn,
  annuleFormBtn,
  playersList,
  errorName,
  nameOfPlayerInput,
  numberOfPlayerInput,
  errorNumber,
  formNoValidMesg,
  formValidMsg,
  errors,
  totalNumberOfPlayers,
  positionFealde,
} from "./domElements.js";
export const state = { editingId: null };
console.log(positionFealde);
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
  newPlayer.cuurentPosition = "";
  newPlayer.isPlaying = false;
  players.push(newPlayer);
  renderingCard();
  newPlayerForm.reset();
  newPlayerForm.classList.toggle("hidden");
}

//creating new card
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
    //remove the spaces from the position of target
    let res = removeSpaces(positionOfThePlayer);
    let oldPosition = player.cuurentPosition;

    //the new place already has another player: refuse
    if (res != "Surlebanc" && isPositionTaken(res, player.id)) {
      alert("This position is already taken by another player.");
      renderingCard(); //rebuild the select with the old value
      return;
    }
    //1. remove him from the old place
    if (oldPosition != "") {
      clearSlot(oldPosition);
    }
    //2. save the new place and put him there
    player.cuurentPosition = res;
    if (res == "Surlebanc") {
      player.isPlaying = false;
    } else {
      player.isPlaying = true;
      fillSlot(player);
    }

    //3. rebuild the cards so the other selects disable the taken places
    renderingCard();
  });

  //add option to select
  if (player.positions == "ATT") {
    for (let i = 0; i < positions.length; i++) {
      if (
        positions[i] == "Sur le banc" ||
        positions[i] == "BU - Buteur 1" ||
        positions[i] == "BU - Buteur 2"
      ) {
        const option = document.createElement("option");
        option.innerText = positions[i];
        select.append(option);
      }
    }
  } else if (player.positions == "Mil") {
    for (let i = 0; i < positions.length; i++) {
      if (
        positions[i] == "Sur le banc" ||
        positions[i] == "MD - Miliue droit" ||
        positions[i] == "MC - Miliue central 2" ||
        positions[i] == "MC - Miliue central 1" ||
        positions[i] == "MG - Milieu gauche"
      ) {
        const option = document.createElement("option");
        option.innerText = positions[i];
        select.append(option);
      }
    }
  } else if (player.positions == "Def") {
    for (let i = 0; i < positions.length; i++) {
      if (
        positions[i] == "Sur le banc" ||
        positions[i] == "DD - Defenseur droit" ||
        positions[i] == "DC - Defenseur central 2" ||
        positions[i] == "DC - Defenseur central 1" ||
        positions[i] == "DG - Defenseur gauche"
      ) {
        const option = document.createElement("option");
        option.innerText = positions[i];
        select.append(option);
      }
    }
  } else if (player.positions == "GB") {
    for (let i = 0; i < positions.length; i++) {
      if (positions[i] == "Sur le banc" || positions[i] == "GB - Gardien") {
        const option = document.createElement("option");
        option.innerText = positions[i];
        select.append(option);
      }
    }
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
  if (player == -1) return;
  if (players[player].isPlaying) {
    clearSlot(players[player].cuurentPosition);
  }
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
function removeSpaces(text) {
  let res = "";
  for (let i = 0; i < text.length; i++) {
    if (text[i] == " ") {
      continue;
    } else {
      res += text[i];
    }
  }
  return res;
}
function isPositionTaken(position, playerId) {
  let taken = false;
  for (let i = 0; i < players.length; i++) {
    if (players[i].cuurentPosition == position && players[i].id != playerId) {
      taken = true;
    }
  }
  return taken;
}
function fillSlot(player) {
  const slot = document.getElementById(player.cuurentPosition);
  if (slot == null) return;
  slot.dataset.active = "true";
  slot.innerHTML = `
    <span class="inline-flex items-center justify-center h-10 w-10 border-1 p-1 rounded-full border-${player.positionColor}-500 text-${player.positionColor}-500">${player.number}</span>
    <p class="text-${player.positionColor}-500">${player.positions}</p>
    <p class="text-white">${player.nom}</p>`;
}
function clearSlot(position) {
  const slot = document.getElementById(position);
  if (slot == null) return;
  slot.innerHTML = "";
  slot.dataset.active = "false";
}
