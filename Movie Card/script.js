(async function() {
  const res = await fetch("./data.json");
  const { data } = await res.json();
  generateView(data[1]);
})();

function generateView(list) {
  const parent = document.getElementById("main-container");
  for (let i of Object.keys(list)) {
    parent.appendChild(generateCard(list[i]));
  }
}

function generateCard(data) {
  const main = document.createElement("div");
  main.classList.add("card");

  const sub = document.createElement("div");
  sub.classList.add("sub");
  sub.style.backgroundImage = `url('https://in.bmscdn.com/events/moviecard/${data.EventCode}.jpg')`;

  const releaseDate = document.createElement("div");
  releaseDate.classList.add("release");
  releaseDate.innerHTML = data.ShowDate.split(",")[0];

  const ratings = document.createElement("div");
  ratings.classList.add("ratings");
  const likes = document.createElement("span");
  likes.classList.add("likes");
  likes.innerHTML = `&#x1f44d; ${data.ratings.wtsPerc}%`;
  const ratedBy = document.createElement("span");
  ratedBy.classList.add("ratedby");
  ratedBy.innerHTML = `${data.ratings.totalWTSCount} votes`;
  ratings.appendChild(likes);
  ratings.appendChild(ratedBy);

  sub.appendChild(releaseDate);
  sub.appendChild(ratings);

  const title = document.createElement("span");
  title.innerHTML = data.EventTitle;
  title.classList.add("card-title");

  main.appendChild(sub);
  main.appendChild(title);

  main.addEventListener("click", e => playVideo(e, data));

  return main;
}

function playVideo(e, data) {
  console.log(e);
  console.log(data);
}
