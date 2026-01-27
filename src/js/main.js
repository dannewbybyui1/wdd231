import { getParkData, getInfoLinks } from "./parkService.mjs";

    function setHeaderFooter(parkData) {
    const disclaimerLink = document.querySelector(".disclaimer > a");
    disclaimerLink.href = parkData.url;
    disclaimerLink.textContent = parkData.fullName;

    document.title = parkData.fullName;

    const parkHeader = document.getElementById("park-header");

  // ✅ Header background image (safe fallback)
    const headerImg = parkData.images?.[0]?.url || "";
    parkHeader.style.backgroundImage = headerImg ? `url(${headerImg})` : "none";
    parkHeader.style.backgroundSize = "cover";
    parkHeader.style.backgroundPosition = "center";

    const headerTitle = parkHeader.querySelector("h1");
    headerTitle.textContent = parkData.fullName;

    const headerSubtitle = parkHeader.querySelector("p");
    headerSubtitle.textContent = `${parkData.designation} — ${parkData.states}`;

    const footer = document.getElementById("park-footer");

    const email = parkData.contacts?.emailAddresses?.[0]?.emailAddress || "Not available";
    const phones =
    parkData.contacts?.phoneNumbers?.map((p) => p.phoneNumber).join(", ") || "Not available";

    footer.innerHTML = `
    <h2>${parkData.fullName}</h2>
    <p><strong>Contact Email:</strong> ${email}</p>
    <p><strong>Phone:</strong> ${phones}</p>
    <p><strong>Weather Info:</strong> ${parkData.weatherInfo}</p>
    `;
}

    function setParkIntro(data) {
    const introEl = document.querySelector(".intro");
    introEl.innerHTML = `
    <h1>${data.fullName}</h1>
    <p>${data.description}</p>
    `;
}

    function mediaCardTemplate(info) {
    return `
    <div class="media-card">
    <a href="${info.link}">
        <img src="${info.image}" alt="${info.name}">
        <h3>${info.name}</h3>
    </a>
    <p>${info.description}</p>
    </div>
    `;
}

    function setParkInfoLinks(data) {
    const infoEl = document.querySelector(".info");
    const html = data.map(mediaCardTemplate);
    infoEl.innerHTML = html.join("");
}

// ✅ Step 03: init() + await
    async function init() {
  // Change parkCode here if you want (ex: "glac")
    const parkData = await getParkData("yell");

    setHeaderFooter(parkData);
    setParkIntro(parkData);

  // ✅ Step 04: middle images come from the API now
    const parkInfoLinks = getInfoLinks(parkData.images);
    setParkInfoLinks(parkInfoLinks);
}

    init().catch((err) => console.error(err));