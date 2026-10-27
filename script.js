import { positions, players, refreshLocalStorage, refresh } from "./data.js";
import {
  addNewPlayer,
  playerCard,
  renderingCard,
  validationName,
  validateNumber,
  updateExistingPlayer,
  modifierTheplayer,
  state,
  fillSlot,
  updatefieldount,
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
  numberOfPlayerInTheField,
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
    updateExistingPlayer();
  } else {
    addNewPlayer();
  }

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
refresh();
players.forEach((player) => {
  if (player.isPlaying && player.cuurentPosition !== "Surlebanc") {
    fillSlot(player); // This re-renders them onto the visual terrain
  }
});
updatefieldount();
renderingCard();
