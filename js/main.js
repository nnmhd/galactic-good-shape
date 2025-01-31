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

  //   Character Details
  results.addEventListener("click", (event) => {
    if (event.target.tagName === "LI") {
    }
  });
})();
