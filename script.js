import { positions } from "./data.js";

const arr = [];
const newPlayerForm = document.getElementById("newPlayerForm");
const PopUpFormBtn = document.getElementById("PopUpFormBtn");
const removePopUpFormBtn = document.getElementById("removePopUpForm");
const annuleFormBtn = document.getElementById("annuleBtn");
const playersList = document.getElementById("playersList");

const errorName = document.getElementById("errorName");
const nameOfPlayerInput = document.getElementById("nameOfPlayer");
const numberOfPlayerInput = document.getElementById("numberOfPlayer");
const errorNumber = document.getElementById("errorNumber");
const errors = document.querySelectorAll(".errors");
let editingId = null;
//show the pop up form
PopUpFormBtn.addEventListener("click", () => {
  newPlayerForm.classList.remove("hidden");
});

//cancel the pop up form
removePopUpFormBtn.addEventListener("click", () => {
  newPlayerForm.classList.add("hidden");
  newPlayerForm.reset();
  errors.forEach((error) => {
    error.textContent = "";
  });
});

//submit-btn
newPlayerForm.addEventListener("submit", (e) => {
  e.preventDefault();
  validationName();
  validateNumber();
  let hasError = true;
  errors.forEach((error) => {
    if (error.textContent.trim() !== "") {
      hasError = false;
    }
  });
  if (hasError) {
    console.log("it worked");
  } else {
    console.log("it failed");
    return;
  }
  //
  if (editingId !== null) {
    const player = arr.find((p) => p.id == editingId);
    player.nom = nameOfPlayerInput.value;
    player.number = numberOfPlayerInput.value;
    editingId = null;
  } else {
    addnewPlayer();
  }

  // re-render
  playersList.textContent = "";
  arr.forEach((p) => playerCard(p));

  newPlayerForm.reset();
  newPlayerForm.classList.add("hidden");
});

//annule form
annuleFormBtn.addEventListener("click", (e) => {
  newPlayerForm.reset();
  errors.forEach((error) => {
    error.textContent = "";
  });
  newPlayerForm.classList.add("hidden");
});

//add new player
function addnewPlayer() {
  const nameOfPlayer = document.getElementById("nameOfPlayer").value;
  const numberOfPlayer = document.getElementById("numberOfPlayer").value;
  const positionOfPlayer = document.querySelector(
    "input[name='pos']:checked",
  ).value;
  const newPlayer = {
    id: arr.length > 0 ? arr[arr.length - 1].id + 1 : 1,
  };
  newPlayer.nom = nameOfPlayer;
  newPlayer.number = numberOfPlayer;
  newPlayer.positions = positionOfPlayer;
  arr.push(newPlayer);
  renderingCard();
  newPlayerForm.reset();
  newPlayerForm.classList.toggle("hidden");
  console.log(arr);
}

//creating new card
function playerCard(r) {
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
  div.classList.add("grid", "grid-cols-[25%_60%_10%]");
  span.classList.add(
    "border-1",
    "row-span-2",
    "border-yellow-500",
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
  span.textContent = r.number;
  h3.textContent = r.nom;
  p.textContent = r.positions;

  modifierBtn.setAttribute("data-id", r.id);
  deletBtn.setAttribute("data-id", r.id);

  deletBtn.addEventListener("click", () => {
    console.log(deletBtn.dataset.id);
    deletfunc(deletBtn.dataset.id);
  });
  modifierBtn.addEventListener("click", () => {
    const player = arr.find((p) => {
      return p.id == modifierBtn.dataset.id;
    });
    editingId = player.id;
    newPlayerForm.classList.remove("hidden");

    nameOfPlayerInput.value = player.nom;
    numberOfPlayerInput.value = player.number;
  });

  for (let i = 0; i < positions.length; i++) {
    const option = document.createElement("option");
    option.innerText = positions[i];
    select.append(option);
  }
  infoPlayer.append(h3, p);
  btnDiv.append(modifierBtn, deletBtn);
  div.append(span, infoPlayer, btnDiv);
  li.append(div, select);
  playersList.append(li);
}

// displayin the cards
function renderingCard() {
  if (arr.length === 0) return;
  playersList.textContent = "";
  arr.forEach((player) => {
    playerCard(player);
  });
}
renderingCard();

// modifier card
function deletfunc(p) {
  const player = arr.findIndex((player) => {
    return player.id == p;
  });
  console.log("the index of player", player);
  arr.splice(player, 1);
  console.log("updated arr", arr);
  playersList.textContent = "";
  arr.forEach((player) => {
    playerCard(player);
  });
}

// validation the inputs
function validationName() {
  const palyerName = nameOfPlayerInput.value.trim();
  console.log(palyerName);
  console.log(nameOfPlayerInput);
  if (palyerName === "") {
    errorName.textContent = "Please add Name for the player";
  } else if (palyerName.length < 3) {
    errorName.textContent = "Enter at leaste three caracter";
  } else {
    errorName.textContent = "";
  }
  console.log(errorName.textContent);
}
function validateNumber() {
  const playerNum = numberOfPlayerInput.value.trim();
  const numbeRegex = /^[1-9][0-9]?$/;
  if (playerNum === "") {
    errorNumber.textContent = "Please add Number for the player";
  } else if (!numbeRegex.test(playerNum)) {
    errorNumber.textContent = "please enter a number from 1 to 99";
  } else {
    errorNumber.textContent = "";
  }
}
