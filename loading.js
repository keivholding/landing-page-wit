const body = document.querySelector("body");

const html = `<div class="loading">
<div class="progress">
<div class="progress-value"></div>
</div>
</div>`;

body.insertAdjacentHTML("afterbegin", html);

const loading = document.querySelector(".loading");
loading.style.zIndex = "9999";

// this makes it so that the loading / progress bar is shown when the page is loading - then hidden when the page is fully loaded
window.addEventListener("load", function () {
  setTimeout(() => {
    // adds the class show so that it fades out
    loading.classList.add("hide");

    // when the opacity transition is finished, it gets moved to the back with z-index
    setTimeout(() => {
      loading.style.zIndex = "-9999";
    }, 400);
  }, 400);
});
