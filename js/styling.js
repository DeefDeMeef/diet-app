const tabs = document.querySelectorAll(".tab");
const nextButtons = document.querySelectorAll(".next");
const dashboard = document.querySelector(".dashboard");
let index = 0;

for (let i = 0; i < tabs.length; i++) {
  tabs[i].classList.add("hidden");
}

console.log(tabs);

document.addEventListener("DOMContentLoaded", () => {
  tabs[index].classList.remove("hidden");
  dashboard.classList.add("hidden");
})

const nextTab = () => {
  index++;
  tabs[index - 1].classList.remove("visible");
  tabs[index].classList.add("visible");
  console.log(nextButtons, index);
};

nextButtons.forEach(function (elem) {
  elem.addEventListener("click", function () {
    index++;
    tabs[index - 1].classList.remove("visible");
    tabs[index].classList.add("visible");
    console.log(nextButtons, index);
  });
});

