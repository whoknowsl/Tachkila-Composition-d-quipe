import { positions, players } from "./data.js";
import {
  addNewPlayer,
  playerCard,
  renderingCard,
  validationName,
  validateNumber,
  updateExistingPlayer,
  state,
} from "./function.js";

export const newPlayerForm = document.getElementById("newPlayerForm");
const PopUpFormBtn = document.getElementById("PopUpFormBtn");
const removePopUpFormBtn = document.getElementById("removePopUpForm");
const annuleFormBtn = document.getElementById("annuleBtn");
const playersList = document.getElementById("playersList");
export const errorName = document.getElementById("errorName");
export const nameOfPlayerInput = document.getElementById("nameOfPlayer");
export const numberOfPlayerInput = document.getElementById("numberOfPlayer");
export const errorNumber = document.getElementById("errorNumber");
const formNoValidMesg = document.getElementById("formNoValidMesg");
const formValidMsg = document.getElementById("formValidMsg");
const errors = document.querySelectorAll(".errors");
export const totalNumberOfPlayers = document.querySelector(
  "#totalNumPlayers  p",
);
//show the pop up form
PopUpFormBtn.addEventListener("click", () => {
  newPlayerForm.classList.remove("hidden");
});
//cancel the pop up form
removePopUpFormBtn.addEventListener("click", () => {
  newPlayerForm.classList.add("hidden");
  formValidMsg.classList.add("hidden");
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

  let hasError = false;
  errors.forEach((error) => {
    if (error.textContent.trim() !== "") {
      hasError = true;
    }
  });
  if (!hasError) {
    formValidMsg.classList.remove("hidden");
    formNoValidMesg.textContent = "";
  } else {
    formValidMsg.classList.add("hidden");
    formNoValidMesg.textContent = "Faild";
    return;
  }
  //
  if (state.editingId !== null) {
    updateExistingPlayer(state.editingId);
  } else {
    addNewPlayer();
  }

  // re-render
  playersList.textContent = "";
  players.forEach((p) => playerCard(p));

  newPlayerForm.reset();
  newPlayerForm.classList.add("hidden");
  formValidMsg.classList.add("hidden");
});

//annule form
annuleFormBtn.addEventListener("click", (e) => {
  newPlayerForm.reset();
  errors.forEach((error) => {
    error.textContent = "";
  });
  newPlayerForm.classList.add("hidden");
});


//creating new card
// displayin the cards
renderingCard();
// modifier card
// validation the inputs
