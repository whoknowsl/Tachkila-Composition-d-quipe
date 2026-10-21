import { positions } from "./data.js";

console.log(positions);

const arr = [{nom:"youssef",number:"10",positions:"attack"}];

const newPlayerForm = document.getElementById("newPlayerForm");
const PopUpFormBtn = document.getElementById("PopUpFormBtn");
const removePopUpFormBtn = document.getElementById("removePopUpForm");
const addNewPlayerBtn = document.getElementById("submitBtn");
const playersList = document.getElementById("playersList");
//show the pop up form
PopUpFormBtn.addEventListener("click", () => {
  newPlayerForm.classList.remove("hidden");
});
//cancel the pop up form
removePopUpFormBtn.addEventListener("click", () => {
  newPlayerForm.classList.add("hidden");
});

addNewPlayerBtn.addEventListener("submit", (e) => {
  e.preventDefault;
  newPlayerForm.classList.add("hidden");
});

function creatingNewPlayerCard(arr) {
    //creating the elements
  const li = document.createElement("li");
  const span = document.createElement("span");
  const h3 = document.createElement("h3");
  const p = document.createElement("p");
  const select = document.createElement("select");
  //passing the elements data
    span.textContent = arr.number;
    h3.textContent = arr.nom;
    p.textContent = arr.positions;
  for (let i = 0; i <= positions; i++) {
    const option = document.createElement("option");
    option.value = positions[i];
    select.append(option);
  }
  li.append(span,h3,select);
  playersList.append(li);
  console.log(working);
}
for(const player of arr){
    creatingNewPlayerCard(player);
};