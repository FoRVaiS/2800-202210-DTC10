function easterEgg() {
  const keySequence = [];
  let konamiString = "";
  const konamiCode = [
    "ArrowUp",
    "ArrowUp",
    "ArrowDown",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "ArrowLeft",
    "ArrowRight",
    "b",
    "a",
  ];

  document.addEventListener("keyup", function (e) {
    keySequence.push(e.key);
    keySequence.splice(
      -konamiCode.length - 1,
      keySequence.length - konamiCode.length
    );
    konamiString = konamiCode.join("");

    if (keySequence.join("").includes(konamiString)) {
      console.log("You found the easter egg!");
      // using jquery insert the easter egg snippet
      $("body").html(
        //script showing the easter egg
        `<div class="easter-egg"><h1>You found the easter egg!</h1>` +
          `<button class="easter-egg__button" onclick="init()">Show Easter Egg</button>`
      );
    }
  });
}
easterEgg();
