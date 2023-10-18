const div = document.querySelector(".block");
const params = {
  api: "LXC0y2pqRm92XBnQk5x2HcqFMr0ahgroh5UkhhsN",
  startDate: "2022-05-01",
  endDate: "2022-05-08",
};

async function getAsteroids() {
  const url1 = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${params.startDate}&end_date=${params.endDate}&api_key=${params.api}`;

  try {
    const response = await fetch(url1);
    const data = await response.json();
    const nearEarthObjects = data.near_earth_objects;

    for (const key in nearEarthObjects) {
      const asteroids = nearEarthObjects[key];
      asteroids.forEach((asteroid) => {
        const asteroidName = asteroid.name.replace(/['(', ')']/g, " ");

        const estimatedDiameterMin =
          asteroid.estimated_diameter.kilometers.estimated_diameter_min;
        const estimatedDiameterMax =
          asteroid.estimated_diameter.kilometers.estimated_diameter_max;
        const averageEstimatedDiameterStr =
          ((estimatedDiameterMin + estimatedDiameterMax) / 2)
            .toString()
            .substring(0, 5) + " км";

        const hazardousAsteroid =
          asteroid.is_potentially_hazardous_asteroid === false
            ? "Не опасный"
            : "Опасность";
        const missDistanceStr = asteroid.close_approach_data.map(
          (item) =>
            Number(item.miss_distance.kilometers)
              .toLocaleString("ru")
              .toString()
              .split(",")[0] + " км"
        );

        const approachDates = asteroid.close_approach_data.map(
          (approach) => approach.close_approach_date_full
        );

        const asteroidElement = document.createElement("div");
        asteroidElement.innerHTML = `
        <h2 class="asteroidsName">${approachDates}</h2>
        <p class="missDistance">${missDistanceStr}</p>
        <img src="./pngegg 2.jpg" alt="">
        <p class="asteroidsData">${asteroidName}</p>
        <p class="estimatedDiameter">${averageEstimatedDiameterStr}</p>
        <button>Заказать</button> <span>${hazardousAsteroid}</span>
      `;
        div.appendChild(asteroidElement);
      });
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

getAsteroids();