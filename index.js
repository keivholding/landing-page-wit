//
//
// INPUT FIELD CHANGES COLOR ON HOME PAGE (AS USER TYPES)
//
//

const emailInputHomepage = document.querySelector(".input-homepage");

emailInputHomepage.addEventListener("input", function (e) {
  // if there's an empty value, then the color is gray, if not (user types --> get gradient)
  e.target.value === ""
    ? emailInputHomepage.classList.remove("gradient-darker")
    : emailInputHomepage.classList.add("gradient-darker");
});

//
//
// INPUT FIELD CHANGES COLOR ON HOME PAGE (AS USER TYPES)
//
//
