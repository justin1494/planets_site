import { planetValuesAnimation } from "./animations.js";
import { planetImageAnimation } from "./animations.js";
import { planetStructureChangeAnimation } from "./animations.js";

const hamburgerMenu = document.querySelector(".nav__hamburger");

const planetImage = document.querySelector(".planet img");
const planetName = document.querySelector(".planet__info__text__name");
const planetDiscription = document.querySelector(
  ".planet__info__text__description"
);
const planetSource = document.querySelector(".planet__info__text__source a");
const planetData = document.querySelectorAll(".planet-data__item__value");
const navigation = document.querySelector(".nav__items");
const navItems = document.querySelectorAll(".nav__items__item");
const navItemsBefore = document.querySelector(".nav__items__item::before");
const planetInfoButtons = document.querySelectorAll(
  ".planet__info__buttons button"
);

let currentPlanetIndex = 0;

const navColors = [
  "#def4fc",
  "#f7cc7f",
  "#545bfe",
  "#ff6a45",
  "#ebad7a",
  "#fccb6b",
  "#65f0d5",
  "#487efa",
];

const planetPhisicalData = (responseData) => {
  planetData[0].textContent = responseData.rotation;
  planetData[1].textContent = responseData.revolution;
  planetData[2].textContent = responseData.radius;
  planetData[3].textContent = responseData.temperature;
};

async function getPlanetPhisicalData(index) {
  try {
    const response = await axios.get("./data.json");
    const responseData = response.data[index];
    planetPhisicalData(responseData);
    planetValuesAnimation(planetData);
  } catch (error) {
    console.error(error);
  }
}

async function getPlanetInfo(index, button, planetImageIndex) {
  try {
    const response = await axios.get("./data.json");
    const responseData = response.data[index];

    const planetInfo = [
      responseData.overview,
      responseData.structure,
      responseData.geology,
    ];

    const planetImageArray = [
      responseData.images.planet,
      responseData.images.internal,
      responseData.images.geology,
    ];

    planetImage.setAttribute("src", planetImageArray[planetImageIndex]);

    planetDiscription.textContent = planetInfo[button].content;
    planetName.textContent = responseData.name;
    planetSource.setAttribute("href", planetInfo[button].source);
  } catch (error) {
    console.error(error);
  }
}

const cleanPlanetInfoButtons = () => {
  if (window.innerWidth > 750) {
    planetInfoButtons.forEach((button) => {
      button.style.border = "0.5px solid rgb(254, 255, 251)";
    });
  } else {
    planetInfoButtons.forEach((button) => (button.style.border = "none"));
  }
};

const openHamburgerMenu = () => {
  navigation.classList.toggle("show");
  document.body.style.overflowY === "hidden"
    ? (document.body.style.overflowY = "visible")
    : (document.body.style.overflowY = "hidden");
  navItems.forEach((item) => {
    item.addEventListener("click", () => {
      navigation.classList.remove("show");
    });
  });
};

const handlePlanetChange = () => {
  for (let i = 0; i < navItems.length; i++) {
    navItems[i].addEventListener("click", () => {
      getPlanetInfo(i, 0, 0);
      planetStructureChangeAnimation(planetImage);
      currentPlanetIndex = i;
      cleanPlanetInfoButtons();
      getPlanetPhisicalData(i);
      planetImageAnimation(planetImage);
      planetInfoButtons[0].style.border = `3px solid ${navColors[currentPlanetIndex]}`;
      navItems.forEach((item) => {
        item.classList.remove("active");
      });
      navItems[i].classList.add("active");
      document.body.style.overflowY = "visible";
    });
  }
};

const handlePlanetInfoChange = () => {
  for (let i = 0; i < planetInfoButtons.length; i++) {
    planetInfoButtons[i].addEventListener("click", () => {
      cleanPlanetInfoButtons();
      getPlanetInfo(currentPlanetIndex, i, i);
      planetStructureChangeAnimation(planetImage);
      planetInfoButtons[
        i
      ].style.border = `3px solid ${navColors[currentPlanetIndex]}`;
    });
  }
};

const getStarted = () => {
  getPlanetInfo(0, 0, 0);
  planetStructureChangeAnimation(planetImage);
  currentPlanetIndex = 0;
  cleanPlanetInfoButtons();
  getPlanetPhisicalData(0);
  planetImageAnimation(planetImage);
  planetInfoButtons[0].style.border = `3px solid ${navColors[currentPlanetIndex]}`;
  navItems.forEach((item) => {
    item.classList.remove("active");
  });
  navItems[0].classList.add("active");
  document.body.style.overflowY = "visible";
};

hamburgerMenu.addEventListener("click", openHamburgerMenu);

// animatinos

getStarted();
handlePlanetChange();
handlePlanetInfoChange();

