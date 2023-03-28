//
//
// LINK FADE OUT EFFECT (HEADER)
//
//

const header = document.querySelector("header");
const iconLink = document.querySelector(".nav-links-mobile");

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

//
//
// LINK FADE OUT EFFECT (HEADER)
//
//

//
//
// OPENS AND CLOSES BURGER MENU (MOBILE)
//
//

const burgerMenuBtn = document.querySelector(".burger-menu-btn");
const burgerMenu = document.querySelector(".nav-links-burger-container");
const blurryOverlay = document.querySelector(".blurry-overlay");
const exitBurgerMenuBtn = document.querySelector(".fa-times");
const btnLoginBurger = document.querySelector(".btn-login-burger");
const btnStartBurger = document.querySelector(".btn-start-burger");

console.log(document.querySelector(".burger-menu-btn"));

// this opens and closes the burger menu depending on current state
const openCloseBurgerMenu = function () {
  burgerMenu.classList.toggle("show");
  blurryOverlay.classList.toggle("show");
  iconLink.classList.toggle("show");
  btnLoginBurger.classList.toggle("show");
  btnStartBurger.classList.toggle("show");
};

burgerMenuBtn.addEventListener("click", openCloseBurgerMenu);
blurryOverlay.addEventListener("click", openCloseBurgerMenu);
exitBurgerMenuBtn.addEventListener("click", openCloseBurgerMenu);

document.addEventListener("keydown", function (e) {
  e.key === "Escape" ? openCloseBurgerMenu() : "";
});

//
//
// OPENS AND CLOSES BURGER MENU (MOBILE)
//
//
