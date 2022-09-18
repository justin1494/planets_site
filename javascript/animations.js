export const planetValuesAnimation = (target, targetValue) => {
  anime({
    targets: target,
    innerHTML: [0, targetValue],
    easing: "linear",
    round: 1, // Will round the animated value to 1 decimal
  });
};

export const planetImageAnimation = (planetImage) => {
  anime({
    targets: planetImage,
    opacity: [0, 1],
    scale: [0, 1],
    duration: 500,
    delay: 200,
    easing: "easeOutElastic(3, 0.6)",
  });
};

export const planetStructureChangeAnimation = (planetImage) => {
  anime({
    targets: planetImage,
    opacity: [0.6, 1],
    duration: 400,
    easing: "linear",
  });
};

// export const planetNameAnimation = (planetName) => {
//   anime({
//     targets: planetName,
//     direction: "reverse",
//     easing: "easeInOutSine",
//     keyframes: [
//       { clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)" }, // start frame
//       { clipPath: "polygon(0 100%, 100% 100%, 100% 0, 0 0)" }, // end frame
//     ],
//     duration: 1000,
//   });
// };

// planetValuesAnimation();
