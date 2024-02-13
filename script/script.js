import items from "./items.js";

// Circular cursor
const cursor = document.querySelector(".cursor");

document.querySelectorAll(".heading span").forEach((letter) => {
  letter.addEventListener("mouseenter", function () {
    this.classList.add("hovered"); // Add a class when hovered
  });

  letter.addEventListener("mouseleave", function () {
    this.classList.remove("hovered"); // Remove the class when not hovered
  });
});

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
