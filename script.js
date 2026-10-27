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
//show the pop up form
PopUpFormBtn.addEventListener("click", () => {
  newPlayerForm.classList.remove("hidden");
  state.editingId = null;
});
//cancel the pop up form
removePopUpFormBtn.addEventListener("click", () => {
  newPlayerForm.classList.add("hidden");
  formValidMsg.classList.add("hidden");
  newPlayerForm.reset();
  errors.forEach((error) => {
    error.textContent = "";
  });
  state.editingId = null;
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

  if (state.editingId !== null) {
    updateExistingPlayer(state.editingId);
  } else {
    addNewPlayer();
  }

  playersList.textContent = "";
  players.forEach((p) => playerCard(p));

  newPlayerForm.reset();
  newPlayerForm.classList.add("hidden");
  formValidMsg.classList.add("hidden");
  console.log(players);
});

//annule form
annuleFormBtn.addEventListener("click", (e) => {
  newPlayerForm.reset();
  errors.forEach((error) => {
    error.textContent = "";
  });
  newPlayerForm.classList.add("hidden");
});

renderingCard();
