//
//
// CREATING AN ACCOUNT
//
//

const start = document.querySelector(".btn-start");

start.addEventListener("click", function () {
  console.log(`yes`);

  const url = "https://sales-machine.vercel.app/api/signin/google";

  fetch(url, {
    method: "GET",
  })
    .then((response) => console.log(response.headers.get("X-Redirect-Url")))
    .catch((error) => {
      console.error("Error:", error);
    });
});

//
//
// CREATING AN ACCOUNT
//
//

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
const exitBurgerMenuBtn = document.querySelector(".fa-times");
const btnLoginBurger = document.querySelector(".btn-login-burger");
const btnStartBurger = document.querySelector(".btn-start-burger");

// this opens and closes the burger menu depending on current state
const openCloseBurgerMenu = function () {
  burgerMenu.classList.toggle("show");
  iconLink.classList.toggle("show");
  btnLoginBurger.classList.toggle("show");
  btnStartBurger.classList.toggle("show");
};

burgerMenuBtn.addEventListener("click", openCloseBurgerMenu);
exitBurgerMenuBtn.addEventListener("click", openCloseBurgerMenu);

document.addEventListener("keydown", function (e) {
  e.key === "Escape" ? openCloseBurgerMenu() : "";
});

//
//
// OPENS AND CLOSES BURGER MENU (MOBILE)
//
//
