const zonesurls = [
  "https://cdn.jsdelivr.net/gh/gn-math/assets@main/zones.json",
  "https://cdn.jsdelivr.net/gh/gn-math/assets@latest/zones.json",
  "https://cdn.jsdelivr.net/gh/gn-math/assets@master/zones.json",
  "https://cdn.jsdelivr.net/gh/gn-math/assets/zones.json"
];

const coverURL = "https://cdn.jsdelivr.net/gh/gn-math/covers@main";
const htmlURL  = "https://cdn.jsdelivr.net/gh/gn-math/html@main";

async function loadZones() {
  let data = null;
  for (let url of zonesurls) {
    try {
      const res = await fetch(url);
      if (!res.ok) continue;
      data = await res.json();
      break;
    } catch (e) {}
  }
  if (!data) {
    document.getElementById("container").textContent = "Failed to load games.";
    return;
  }
  renderZones(data);
}

function renderZones(zones) {
  const container = document.getElementById("container");
  container.innerHTML = "";
  zones.forEach(z => {
    const card = document.createElement("div");
    card.className = "zone-card";
    card.innerHTML = `
      <img src="${z.cover.replace("{COVER_URL}", coverURL)}" alt="">
      <h3>${z.name}</h3>
      <p>${z.author || ""}</p>
    `;
    card.addEventListener("click", () => {
      window.location.href = "viewer.html?url=" + encodeURIComponent(
        z.url.replace("{HTML_URL}", htmlURL)
      );
    });
    container.appendChild(card);
  });
}

function filterZones() {
  const q = document.getElementById("searchBar").value.toLowerCase();
  document.querySelectorAll(".zone-card").forEach(c => {
    c.style.display = c.innerText.toLowerCase().includes(q) ? "" : "none";
  });
}

loadZones();
