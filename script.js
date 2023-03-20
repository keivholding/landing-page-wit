// Elements

const header = document.querySelector("header");

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

header.addEventListener("mouseover", linkHover.bind({ opacity: 0.5 }));
header.addEventListener("mouseout", linkHover.bind({ opacity: 1 }));

// Link Fade Out Effect
