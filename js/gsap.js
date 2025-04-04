(() => {
  gsap.registerPlugin(ScrollTrigger);
  gsap.registerPlugin(ScrollToPlugin);

  const resultCon = document.querySelector("#result__container");
  const foreword = document.querySelector("#foreword");
  const filterBox = document.querySelector("#filter__container");
  const screenSize = gsap.matchMedia();

  gsap.fromTo(
    foreword,
    {
      y: `0%`,
    },
    {
      y: "-200%",
      duration: 10,
      ease: "circ",
      delay: 3,
    }
  );

  gsap.fromTo(
    filterBox,
    {
      opacity: 0,
    },
    {
      opacity: 1,
      duration: 3,
      ease: "circ",
      delay: 3,
    }
  );
})();
