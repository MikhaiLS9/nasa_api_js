const div = document.querySelector(".block");
let count = 0
const params = {
  api: "LXC0y2pqRm92XBnQk5x2HcqFMr0ahgroh5UkhhsN",
  startDate: "2023-10-10",
  endDate: "2023-10-17",
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
            : `<img src="/img/⚠ Опасен.png" alt="Опасен" />`;
        const missDistanceStr = asteroid.close_approach_data.map(
          (item) =>
            Number(item.miss_distance.kilometers)
              .toLocaleString("ru")
              .toString()
              .split(",")[0] + " км"
        );

        const approachDates = asteroid.close_approach_data.map((approach) =>
          new Intl.DateTimeFormat("ru-RU", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }).format(new Date(approach.close_approach_date))
        );

        const asteroidElement = document.createElement("div");
        asteroidElement.className = "asteroidElement";
        asteroidElement.innerHTML = `
        <h2 class="approachDates">${approachDates}</h2>
        <div class="styledDiv">
        <p class="missDistance">${missDistanceStr}</p>
        <img class="asteroidImg" src="/img/pngegg 1.png" alt="">
        <div class="styledAsteroidName">
        <p class="asteroidName">${asteroidName}</p>
        <p class="estimatedDiameter">Ø ${averageEstimatedDiameterStr}</p>
        </div>
        </div>
        <div class="styledButton">
        <button class="btn">Заказать</button> 
        <span class="hazardousAsteroid">${hazardousAsteroid}</span>
        </div>
      `;
        div.appendChild(asteroidElement);
      });
    }
  } catch (error) {
    console.error("Error:", error);
  }
  const cartText = document.querySelector('.cartText')
  const btn = document.querySelectorAll(".btn").forEach((item) =>
    item.addEventListener("click", function () {
      count++
      cartText.innerHTML = count > 1 ? count + ' астероида' : count + ' остероид';
    })
  );

  const sendCart = document.querySelector('.sendCart')
  const sendBtn = document.querySelector('.sendBtn').addEventListener('click', function(){
    document.querySelector('.myCart').style.display = 'none'
    sendCart.innerHTML = "Заказ отправлен"
  })
  
  
}

getAsteroids();

