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
