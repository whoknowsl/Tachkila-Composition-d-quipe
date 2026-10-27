import {
  positions,
  players,
  playersKey,
  refresh,
  refreshLocalStorage,
} from "./data.js";
refreshLocalStorage();
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
  numberOfPlayerInTheField,
} from "./domElements.js";
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
  newPlayer.cuurentPosition = "Surlebanc";
  newPlayer.isPlaying = false;

  players.push(newPlayer);
  refreshLocalStorage();
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
  hr.classList.add("border-2", `border-${player.positionColor}-500`);
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
      return p.id == Number(modifierBtn.dataset.id);
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
      renderingCard(); //rebuild the select with the old value
      return;
    }
    //1. remove him from the old place (only if he was on the field)
    if (player.isPlaying) {
      clearSlot(oldPosition);
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

    refreshLocalStorage();
    updatefieldount();
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
  for (let i = 0; i < select.options.length; i++) {
    const option = select.options[i];
    const optionId = removeSpaces(option.value);
    if (optionId == player.cuurentPosition) {
      option.selected = true;
    }
    if (optionId != "Surlebanc" && isPositionTaken(optionId, player.id)) {
      option.disabled = true;
    }
  }
  infoPlayer.append(h3, p);
  btnDiv.append(modifierBtn, deletBtn);
  div.append(span, infoPlayer, btnDiv);
  li.append(hr, div, select);
  playersList.append(li);
}

export function renderingCard() {
  playersList.textContent = "";
  //the total number of the player list
  totalNumberOfPlayers.textContent = `${players.length} joueur(s)`;
  if (players.length === 0) return;
  players.forEach((player) => {
    playerCard(player);
  });
}

export function deletfunc(p) {
  p = Number(p);
  const playerIndx = players.findIndex((player) => {
    return player.id == p;
  });
  if (playerIndx == -1) return;
  if (players[playerIndx].isPlaying) {
    clearSlot(players[playerIndx].cuurentPosition);
  }
  players.splice(playerIndx, 1);
  refreshLocalStorage();
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
    if (player.number == playerNum && player.id !== state.editingId) {
      errorNumber.textContent = "this number is alerdya taken";
    }
  });
}

export function assignColor(value) {
  if (value == "GB") {
    return "yellow";
  } else if (value == "Def") {
    return "blue";
  } else if (value == "Mil") {
    return "green";
  } else if (value == "ATT") {
    return "red";
  }
  return "gray";
}

export function updateExistingPlayer() {
  const targetId = Number(state.editingId);
  const updatingIndex = players.findIndex((p) => p.id === state.editingId);

  const positionOfPlayer = document.querySelector("input[name='pos']:checked");
  players[updatingIndex].nom = nameOfPlayerInput.value;
  players[updatingIndex].number = numberOfPlayerInput.value;
  players[updatingIndex].positions = positionOfPlayer.value;
  players[updatingIndex].positionColor = assignColor(positionOfPlayer.value);
  refreshLocalStorage();
  state.editingId = null;
  newPlayerForm.reset();
  newPlayerForm.classList.add("hidden");
  formValidMsg.classList.add("hidden");
}

export function modifierTheplayer(player) {
  state.editingId = player.id;

  nameOfPlayerInput.value = player.nom;
  numberOfPlayerInput.value = player.number;
  const positionOfPlayer = document.querySelector(
    `input[name='pos'][value= '${player.positions}']`,
  );
  if (positionOfPlayer) {
    positionOfPlayer.checked = true;
  }
  newPlayerForm.classList.remove("hidden");
}

export function removeSpaces(text) {
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

export function fillSlot(player) {
  const slot = document.getElementById(player.cuurentPosition);
  if (slot == null) return;
  slot.dataset.active = "true";
  slot.innerHTML = `
           <div
          class="flex items-center p-3 gap-3 flex"
          id="${player.positions}"
          "
        >
          <img class="w-15 rounded-xl" src="imgs/playerImg.jpeg" />
          <div><p class="text-${player.positionColor}-500 text-sm font-bold">${player.number}</p>
          <p class="text-${player.positionColor}-500 font-bold">${player.positions}</p>
          <p class="text-${player.positionColor}-500 font-bold">${player.nom}</p></div>
          
        </div>`;
}
export function clearSlot(position) {
  const slot = document.getElementById(position);
  if (slot == null) return;
  slot.dataset.active = "false";
  slot.innerHTML = `    <div
          class="flex justify-center items-center"
          id=""
        >
          <span class="bg-gray-500 p-2 w-10 h-10 rounded-full flex"></span>
        </div>`;
  slot.dataset.active = "false";
}
export function updatefieldount() {
  const savedTotal = localStorage.getItem("totalActivePlayer");
  const totalActivePlayer = players.filter((player) => player.isPlaying).length;
  localStorage.setItem("totalActivePlayer", totalActivePlayer);
  localStorage.setItem("totalActivePlayer", JSON.stringify(totalActivePlayer));
  numberOfPlayerInTheField.textContent = `the totla number of the player is ${totalActivePlayer}`;
}
