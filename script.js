// Elements

const header = document.querySelector("header");
const burgerMenuBtn = document.querySelector(".burger-menu-btn");
const burgerMenu = document.querySelector(".nav-links-burger-container");
const blurryOverlay = document.querySelector(".blurry-overlay");

// Elements

// Link Fade Out Effect

const linkHover = function (e) {
  if (e.target.classList.contains("link-nav")) {
    const hoverLink = e.target;

    // For the links that are not currently hovered, the opacity is reduced / increased depending mouseover or mouseout
    header.querySelectorAll(".link-nav").forEach((link) => {
      if (link !== hoverLink) link.style.opacity = this.opacity;
    });
  }
};

header.addEventListener("mouseover", linkHover.bind({ opacity: 0.4 }));
header.addEventListener("mouseout", linkHover.bind({ opacity: 1 }));

// Link Fade Out Effect

// Burger Menu (Mobile)

const openBurgerMenu = function () {
  burgerMenu.classList.add("show");
  blurryOverlay.classList.add("show");
};

const closeBurgerMenu = function () {
  burgerMenu.classList.remove("show");
  blurryOverlay.classList.remove("show");
};

burgerMenuBtn.addEventListener("click", openBurgerMenu);
blurryOverlay.addEventListener("click", closeBurgerMenu);

document.addEventListener("keydown", function (e) {
  e.key === "Escape" ? closeBurgerMenu() : "";
});

// Burger Menu (Mobile)
