import items from "./items.js";
import data from "./lang.js";

// Circular cursor
const cursor = document.querySelector(".cursor");

document
  .querySelector(".heading__main")
  .addEventListener("mouseenter", function () {
    cursor.style.width = "60px";
    cursor.style.height = "60px";
    cursor.style.display = "block";
    adjustCursor();
  });

document
  .querySelector(".heading__main")
  .addEventListener("mouseleave", function () {
    cursor.style.width = "40px";
    cursor.style.height = "40px";
    cursor.style.display = "block";
    adjustCursor();
  });

document.addEventListener("mousemove", function (e) {
  cursor.style.left = e.pageX + "px";
  cursor.style.top = e.pageY + "px";
  adjustCursor();
});

function adjustCursor() {
  const cursorSize = parseInt(cursor.style.width);
  cursor.style.transform = `translate(-${cursorSize / 2}px, -${
    cursorSize / 2
  }px)`;
}

// Adding new projects
const projectsList = document.querySelector(".projects__list");

const addNewProject = function () {
  for (let i = 0; i < items.length; i++) {
    let html = `
    <div class="project">
    <a href="${items[i].link}" class="project-link">
    <p class="language">
      ${items[i].language}
    </p>
    <h3 class="project-name">${items[i].name}</h3>
    <p class="project-description">${items[i].description}</p>
    </a>
    </div>
    <br>
    `;
    projectsList.insertAdjacentHTML("afterbegin", html);
  }

  document.querySelectorAll(".project-link").forEach((link) => {
    link.addEventListener("click", function (e) {
      if (this.getAttribute("href") === "#") {
        e.preventDefault();
      }
    });
  });
};
addNewProject();

// Toggling dark/light mode
const localStorageTheme = localStorage.getItem("theme");
const systemSettingDark = window.matchMedia("(prefers-color-scheme: dark)");

function calculateSettingAsThemeString({
  localStorageTheme,
  systemSettingDark,
}) {
  if (localStorageTheme !== null) {
    return localStorageTheme;
  }

  if (systemSettingDark.matches) {
    return "dark";
  }

  return "light";
}

let currentThemeSetting = calculateSettingAsThemeString({
  localStorageTheme,
  systemSettingDark,
});

const toggleBtn = document.querySelector(".toggle__btn");
const toggle = document.querySelector(".toggle");

toggleBtn.addEventListener("click", function () {
  const newTheme = currentThemeSetting === "dark" ? "light" : "dark";

  if (toggle.classList.contains("active")) {
    toggle.classList.remove("active");
  } else {
    toggle.classList.add("active");
  }

  document.querySelector("html").setAttribute("data-theme", newTheme);

  // updating in local storage
  localStorage.setItem("theme", newTheme);

  // Recalculate currentThemeSetting
  currentThemeSetting = calculateSettingAsThemeString({
    localStorageTheme: newTheme,
    systemSettingDark,
  });
});

// Changing EN/CZ language
const headingFirst = document.querySelector(".heading-first");
const headingSecond = document.querySelector(".heading-second");
const projectHeading = document.querySelector(".projects__text");
const footerHeading = document.querySelector(".footer__heading");
const footerText = document.querySelector(".footer__text");
const flagSpan = document.querySelector(".flag__btn span");
const projectName = document.querySelectorAll(".project-name");
const projectDescription = document.querySelectorAll(".project-description");
const futureLang = document.querySelector(".language");
console.log(futureLang);

// Replacing text
const replaceText = function () {
  headingFirst.textContent = "";
  headingSecond.textContent = "";
  projectHeading.textContent = "";
  footerHeading.textContent = "";
  footerText.textContent = "";
  futureLang.textContent = "";

  const attr = flagBtn.getAttribute("language");

  const projectNames = data[attr].projectName;
  const projectDescriptions = data[attr].projectDesc;

  const projectKeys = Object.keys(projectNames);

  for (let i = 0; i < projectKeys.length; i++) {
    projectName[i].textContent = "";
    projectDescription[i].textContent = "";

    projectName[i].insertAdjacentHTML(
      "afterbegin",
      projectNames[projectKeys[i]]
    );
    projectDescription[i].insertAdjacentHTML(
      "afterbegin",
      projectDescriptions[projectKeys[i]]
    );
  }

  headingFirst.insertAdjacentHTML("afterbegin", data[attr].headingFirst);
  headingSecond.insertAdjacentHTML("afterbegin", data[attr].headingSecond);
  projectHeading.insertAdjacentHTML("afterbegin", data[attr].projectHeading);
  footerHeading.insertAdjacentHTML("afterbegin", data[attr].footerHeading);
  footerText.insertAdjacentHTML("afterbegin", data[attr].footerText);
  futureLang.insertAdjacentHTML("afterbegin", data[attr].futureText);
};

const flagBtn = document.querySelector(".flag__btn");
flagBtn.addEventListener("click", function () {
  if (flagBtn.getAttribute("language") === "en") {
    flagBtn.setAttribute("language", "cz");
    replaceText();
    flagSpan.classList.remove("fi", "fi-cz");
    flagSpan.classList.add("fi", "fi-gb");
  } else {
    flagBtn.setAttribute("language", "en");
    replaceText();
    flagSpan.classList.remove("fi", "fi-gb");
    flagSpan.classList.add("fi", "fi-cz");
  }
});
