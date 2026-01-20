import { getParkData } from "./parkService.mjs";

const parkData = getParkData();

const disclaimerLink = document.querySelector(".disclaimer > a");
disclaimerLink.href = parkData.url;
disclaimerLink.textContent = parkData.fullName;

document.title = parkData.fullName;

const parkHeader = document.getElementById("park-header");
parkHeader.style.backgroundImage = `url(${parkData.images[0].url})`;
parkHeader.style.backgroundSize = "cover";
parkHeader.style.backgroundPosition = "center";

const headerTitle = parkHeader.querySelector("h1");
headerTitle.textContent = parkData.fullName;

const headerSubtitle = parkHeader.querySelector("p");
headerSubtitle.textContent = `${parkData.designation} — ${parkData.states}`;

const footer = document.getElementById("park-footer");

footer.innerHTML = `
    <h2>${parkData.fullName}</h2>
    <p><strong>Contact Email:</strong> ${parkData.contacts.emailAddresses[0].emailAddress}</p>
    <p><strong>Phone:</strong> ${parkData.contacts.phoneNumbers
    .map(phone => phone.phoneNumber)
    .join(", ")}</p>
    <p><strong>Weather Info:</strong> ${parkData.weatherInfo}</p>
`;
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
const parkInfoLinks = [
    {
    name: "Current Conditions ›",
    link: "conditions.html",
    image: parkData.images[2].url,
    description: "See what conditions to expect in the park before leaving on your trip!"
    },
    {
    name: "Fees and Passes ›",
    link: "fees.html",
    image: parkData.images[3].url,
    description: "Learn about the fees and passes that are available."
    },
    {
    name: "Visitor Centers ›",
    link: "visitor_centers.html",
    image: parkData.images[9].url,
    description: "Learn about the visitor centers in the park."
    }
];
function setParkInfoLinks(data) {
    const infoEl = document.querySelector(".info");
    const html = data.map(mediaCardTemplate);
    infoEl.innerHTML = html.join("");
}
setParkIntro(parkData);
setParkInfoLinks(parkInfoLinks);
