(() => {
  const results = document.querySelector("#results ul");
  const resultDetails = document.querySelector("#result-details");
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
        console.log("Loaded Planets:", filterSpecies);
      })
      .catch((error) => {
        console.error("Issue:", error);
      });
  }

  loadSpeciesData();

  //  Display Character Details
  results.addEventListener("click", async (event) => {
    if (event.target.tagName === "LI") {
      const charName = event.target.textContent;
      const selectedCharacter = filterCharacters.find(
        (char) => char.name === charName
      );

      if (selectedCharacter) {
        console.log("Name", selectedCharacter.name);
        for (let i = 0; i < filterPlanets.length; i++) {
          if (selectedCharacter.homeworld === filterPlanets[i].url) {
            console.log("Home Planet:", filterPlanets[i].name);
          }
        }

        for (let i = 0; i < filterSpecies.length; i++) {
          if (selectedCharacter.species[0] === filterSpecies[i].url) {
            console.log("Species:", filterSpecies[i].name);
          }
        }

        console.log("First Exist:", selectedCharacter.films[0]);

        const li = document.createElement("li");
        li.textContent = `Classification: ${selectedCharacter.name}`;
      }
    }
  });
})();
