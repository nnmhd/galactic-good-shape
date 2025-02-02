(() => {
  const results = document.querySelector("#results ul");
  const resultDetails = document.querySelector("#result_details");
  const baseURL = "https://swapi.dev/api/";
  const buttonBody = document.querySelectorAll("#filter-list li");

  //   Fetch all characters
  function getAllChars() {
    let allCharacters = [];
    let nextPage = `${baseURL}/people/?page=1`;

    function fetchPage(url) {
      return fetch(url)
        .then((res) => res.json())
        .then((response) => {
          allCharacters.push(...response.results);
          if (response.next) {
            return fetchPage(response.next);
          }
        });
    }
    return fetchPage(nextPage).then(() => {
      return allCharacters;
    });
  }

  //   Fetch all planets
  function getAllPlanets() {
    let allPlanets = [];
    let nextPage = `${baseURL}/planets/?page=1`;

    function fetchPage(url) {
      return fetch(url)
        .then((res) => res.json())
        .then((response) => {
          allPlanets.push(...response.results);
          if (response.next) {
            return fetchPage(response.next);
          }
        });
    }
    return fetchPage(nextPage).then(() => {
      return allPlanets;
    });
  }

  //   Fetch all species
  function getAllSpecies() {
    let allSpecies = [];
    let nextPage = `${baseURL}/species/?page=1`;

    function fetchPage(url) {
      return fetch(url)
        .then((res) => res.json())
        .then((response) => {
          allSpecies.push(...response.results);
          if (response.next) {
            return fetchPage(response.next);
          }
        });
    }
    return fetchPage(nextPage).then(() => {
      return allSpecies;
    });
  }

  //   Fetch all films
  function getAllFilms() {
    let allFilms = [];
    let nextPage = `${baseURL}/films/?page=1`;

    function fetchPage(url) {
      return fetch(url)
        .then((res) => res.json())
        .then((response) => {
          allFilms.push(...response.results);
          if (response.next) {
            return fetchPage(response.next);
          }
        });
    }
    return fetchPage(nextPage).then(() => {
      return allFilms;
    });
  }

  //   Calculate BMI
  function calBMI(height, weight) {
    if (!isNaN(height) && !isNaN(weight)) {
      let calculated = (weight / (height * 2)) * 100;
      return calculated;
    }
  }

  //   Filter Characters
  let filterCharacters = [];
  buttonBody.forEach((list) => {
    list.addEventListener("click", () => {
      const cal = list.dataset.action;
      results.innerHTML = "";
      resultDetails.innerHTML = "";

      getAllChars().then((data) => {
        filterCharacters = data.filter((char) => {
          let height = parseFloat(char.height);
          let weight = parseFloat(char.mass);
          let calculated = calBMI(height, weight);

          if (calculated === null) return false;

          switch (cal) {
            case "obesity":
              return calculated >= 30;
            case "overweight":
              return calculated < 30 && calculated > 25;
            case "normal":
              return calculated >= 18.5 && calculated < 25;
            case "underweight":
              return calculated < 18.5;
            default:
              return false;
          }
        });

        filterCharacters.forEach((char) => {
          const li = document.createElement("li");
          li.textContent = char.name;
          results.appendChild(li);
        });
      });
    });
  });

  buttonBody.forEach((list) => {
    list.addEventListener("click", () => {
      console.log(list.dataset.action);
    });
  });

  //  Filter Planets
  let filterPlanets = [];
  function loadPlanetsData() {
    getAllPlanets()
      .then((data) => {
        filterPlanets = data;
        console.log("Loaded Planets:", filterPlanets);
      })
      .catch((error) => {
        console.error("Issue:", error);
      });
  }
  loadPlanetsData();

  //  Filter Species
  let filterSpecies = [];
  function loadSpeciesData() {
    getAllSpecies()
      .then((data) => {
        filterSpecies = data;
        console.log("Loaded Species:", filterSpecies);
      })
      .catch((error) => {
        console.error("Issue:", error);
      });
  }

  loadSpeciesData();

  //  Filter Films
  let filterFilms = [];
  function loadFilmsData() {
    getAllFilms()
      .then((data) => {
        filterFilms = data;
        console.log("Loaded Films:", filterFilms);
      })
      .catch((error) => {
        console.error("Issue:", error);
      });
  }
  loadFilmsData();

  //  Display Character Details
  results.addEventListener("click", async (event) => {
    resultDetails.innerHTML = "";
    if (event.target.tagName === "LI") {
      const charName = event.target.textContent;
      const selectedCharacter = filterCharacters.find(
        (char) => char.name === charName
      );

      if (selectedCharacter) {
        const h4 = document.createElement("h4");
        const p = document.createElement("p");
        const pHeight = document.createElement("p");
        const pWeight = document.createElement("p");
        h4.textContent = `Name`;
        p.textContent = selectedCharacter.name;
        pHeight.textContent = `Height: ${selectedCharacter.height} cm`;
        pWeight.textContent = `Weight: ${selectedCharacter.mass} kg`;
        resultDetails.appendChild(h4);
        resultDetails.appendChild(p);
        resultDetails.appendChild(pHeight);
        resultDetails.appendChild(pWeight);
        for (let i = 0; i < filterPlanets.length; i++) {
          if (selectedCharacter.homeworld === filterPlanets[i].url) {
            const h4 = document.createElement("h4");
            const p = document.createElement("p");
            h4.textContent = `Planet`;
            p.textContent = filterPlanets[i].name;
            resultDetails.appendChild(h4);
            resultDetails.appendChild(p);
          }
        }
        for (let i = 0; i < filterSpecies.length; i++) {
          if (selectedCharacter.species[0] === filterSpecies[i].url) {
            const h4 = document.createElement("h4");
            const p = document.createElement("p");
            h4.textContent = `Species`;
            p.textContent = filterSpecies[i].name;
            resultDetails.appendChild(h4);
            resultDetails.appendChild(p);
          }
        }

        for (let i = 0; i <= filterFilms.length; i++) {
          if (
            selectedCharacter.films[0] === `https://swapi.dev/api/films/${i}/`
          ) {
            const h4 = document.createElement("h4");
            const p = document.createElement("p");
            const div = document.createElement("div");
            const img = document.createElement("img");
            h4.textContent = `First Film:`;
            p.textContent = filterFilms[i - 1].title;
            img.src = `images/starwars0${i}.jpg`;
            div.appendChild(img);
            resultDetails.appendChild(h4);
            resultDetails.appendChild(p);
            resultDetails.appendChild(div);
          }
        }
      }
    }
  });
})();
