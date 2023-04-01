console.log(`testTEST`);

function getTokensFromUrl() {
  const url = window.location.href;
  const urlObj = new URL(url);
  const searchParams = new URLSearchParams(urlObj.search);
  const accessToken = searchParams.get("accessToken");
  const refreshToken = searchParams.get("refreshToken");

  console.log(url, urlObj, searchParams, accessToken, refreshToken);

  if (accessToken && refreshToken) {
    console.log("Access Token:", accessToken);
    console.log("Refresh Token:", refreshToken);
    localStorage.setItem("witSMAccessToken", accessToken);
    localStorage.setItem("witSMRefreshToken", refreshToken);
  } else {
    console.error("Access token or refresh token is missing in the URL.");
  }
}

getTokensFromUrl();

// const url = "https://salesmachine.vercel.app/api/getCampaigns";
// fetch(url, {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   body: JSON.stringify({
//     accessToken: localStorage.getItem("witSMAccessToken"),
//   }),
// })
//   .then((response) => response.json())
//   .then((data) => console.log({ data }));
