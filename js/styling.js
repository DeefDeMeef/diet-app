const tabs = document.querySelectorAll(".tab");
const nextButtons = document.querySelectorAll(".next");
let index = 0;

for (let i = 0; i < tabs.length; i++) {
  tabs[i].classList.add("hidden");
}

console.log(tabs);

document.addEventListener("DOMContentLoaded", () => {
  tabs[index].classList.remove("hidden");
})

const nextTab = () => {
  index++;
  tabs[index - 1].classList.remove("visible");
  tabs[index].classList.add("visible");
};

nextButtons[index].addEventListener("click", nextTab);
