const baseUrl = "https://developer.nps.gov/api/v1/";
const apiKey = import.meta.env.VITE_NPS_API_KEY;

// Reusable fetch helper (Step 05 refactor)
async function getJson(url) {
  const options = {
    method: "GET",
    headers: {
      "X-Api-Key": apiKey
    }
  };

  const response = await fetch(baseUrl + url, options);

  if (!response.ok) {
    throw new Error(`response not ok: ${response.status}`);
  }

  return await response.json();
}

// Returns ONE park object (so your old code keeps working)
export async function getParkData(parkCode = "yell") {
  const parkResponse = await getJson(`parks?parkCode=${parkCode}&limit=1`);
  return parkResponse.data[0]; // ✅ important!
}

// Builds the 3 info cards using the park's images (Step 04)
export function getInfoLinks(images) {
  const links = [
    {
      name: "Current Conditions ›",
      link: "conditions.html",
      description: "See what conditions to expect in the park before leaving on your trip!"
    },
    {
      name: "Fees and Passes ›",
      link: "fees.html",
      description: "Learn about the fees and passes that are available."
    },
    {
      name: "Visitor Centers ›",
      link: "visitor_centers.html",
      description: "Learn about the visitor centers in the park."
    }
  ];

  // Pick 3 image indexes. If a park doesn’t have those, fall back to [0]
  const picks = [2, 3, 9];

  return links.map((item, i) => ({
    ...item,
    image: images?.[picks[i]]?.url || images?.[0]?.url || ""
  }));
}
