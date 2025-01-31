(() => {
  const results = document.querySelector("#results");
  const resultDetails = document.querySelector("#result-details");
  const baseURL = "https://swapi.dev/api/";
  const buttonBody = document.querySelectorAll("#filter-list li");

  buttonBody.forEach((list) => {
    console.log(list);
  });

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
      console.log(allCharacters);
      return allCharacters;
    });
  }

  getAllChars();
  function showGoodShape() {
    getAllChars().then((data) => {
      const tallCharacters = data.filter((char) => char.height > 150);

      console.log(
        `There are ${tallCharacters.length} characters in good shape!`
      );

      tallCharacters.forEach((char, index) =>
        console.log(`${index + 1}. ${char.name} is in good shape!`)
      );
    });
  }

  showGoodShape();
})();
