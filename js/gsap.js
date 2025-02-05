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
      scrollTrigger: {
        start: "5px",
        end: "100px",
        scrub: false,
      },
    }
  );

  gsap.fromTo(
    filterBox,
    {
      y: `400%`,
    },
    {
      y: "0%",
      duration: 3,
      ease: "circ",
      scrollTrigger: {
        start: "10px",
        end: "20px",
        scrub: false,
      },
    }
  );
})();
