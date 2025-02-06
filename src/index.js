import "./assets/styles/style.css";
const MainController = require("./controllers/main-controller.js");

const menuButton = document.querySelector(".menuButton");
const nav = document.querySelector("nav");

let navState = "condensed";

menuButton.addEventListener("click", () => {
    if (nav.dataset.display === "expanded") {
        nav.setAttribute("data-display", "condensed");
        navState = "condensed";
    }
    else {
        nav.setAttribute("data-display", "expanded");
        navState = "expanded";
    }
});

nav.addEventListener("mouseover", () => {
    nav.setAttribute("data-display", "expanded");
});

nav.addEventListener("mouseout", () => {
    if (navState !== "expanded") {
        nav.setAttribute("data-display", "condensed");
    }
});