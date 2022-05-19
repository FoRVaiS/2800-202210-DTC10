var numbers = ["10", "9", "8", "7", "6", "5", "4", "3", "2", "1"];
i = -1;

function countDown() {
  console.log("Counting down!");
  const secretFound = document.createElement("div");
  secretFound.classList.add("secretFound");
  $("body").html("<div id='secret-found'>Initiating Countdown Sequence</div>") +
    $("body").append(
      "<div id='secretCodeInput'><input type='tel' id='secretCode'></input></div>"
    );
  //countdown from 10 to 1
  numbersCounting();
}

function numbersCounting() {
  setTimeout(() => {
    1000;
    i++;
    if (i < numbers.length) {
      $("#secret-found").text(numbers[i]);
      setTimeout(numbersCounting, 1000);
    } else {
      $("#secret-found").text("Oh the Humanity!!");
      $("#secretCode").html("");
    }
  }, 1000);
}

function easterEgg() {
  console.log("Easter egg is working!");
  //script showing the easter egg
  $("body").html(
    `<div class="easter-egg"><h1>You found the easter egg!</h1><h2>Please do not touch anything</h2>` +
      `<button class="easterEggButton" onclick="buttonPressed()">I'm Warning You...</button>`
  );
}
easterEgg();

function buttonPressed() {
  console.log("Button pressed!");
  //script showing the easter egg
  countDown();
}
function defusal() {
  let password = "7355608";
  // listen to secretCode input, and if it matches the password, show the easter egg
  $("#secretCode").keyup(function (event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      if ($("#secretCode").val() === password) {
        console.log("Password is correct!");
      }
    }
  });
}

function init() {
  var Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies;
  Composite = Matter.Composite;
  var engine = Engine.create();
  World.add(engine.world, [
    Bodies.rectangle(400, 0, 800, 50, { isStatic: true }),
    Bodies.rectangle(400, 600, 800, 50, { isStatic: true }),
    Bodies.rectangle(0, 300, 50, 600, { isStatic: true }),
    Bodies.rectangle(800, 300, 50, 600, { isStatic: true }),
  ]);

  var render = Render.create({
    element: document.body,
    engine: engine,
    options: { wireframes: false },
  });
  let mouseconstraint = Matter.MouseConstraint.create(engine, {
    element: render.canvas,
    constraint: {
      render: {
        visible: false,
      },
    },
  });
  let boxP = Bodies.rectangle(
    Math.random() * 800,
    Math.random() * 600,
    50,
    50,
    {
      render: {
        sprite: {
          texture: "../images/boxC.png",
        },
      },
    }
  );
  let boxY = Bodies.rectangle(
    Math.random() * 800,
    Math.random() * 600,
    50,
    50,
    {
      render: {
        sprite: {
          texture: "../images/boxC.png",
        },
      },
    }
  );
  let boxT = Bodies.rectangle(
    Math.random() * 800,
    Math.random() * 600,
    50,
    50,
    {
      render: {
        sprite: {
          texture: "../images/boxC.png",
        },
      },
    }
  );
  let boxH = Bodies.rectangle(
    Math.random() * 800,
    Math.random() * 600,
    50,
    50,
    {
      render: {
        sprite: {
          texture: "../images/boxC.png",
        },
      },
    }
  );
  let boxO = Bodies.rectangle(
    Math.random() * 800,
    Math.random() * 600,
    50,
    50,
    {
      render: {
        sprite: {
          texture: "../images/boxC.png",
        },
      },
    }
  );
  let boxN = Bodies.rectangle(
    Math.random() * 800,
    Math.random() * 600,
    50,
    50,
    {
      render: {
        sprite: {
          texture: "../images/boxC.png",
        },
      },
    }
  );
  let boxI = Bodies.rectangle(
    Math.random() * 800,
    Math.random() * 600,
    50,
    50,
    {
      render: {
        sprite: {
          texture: "../images/boxC.png",
        },
      },
    }
  );
  let boxC = Bodies.rectangle(Math.random() * 800, Math.random() * 600, {
    render: {
      sprite: {
        texture: "../images/boxC.png",
      },
    },
  });

  Composite.add(engine.world, [
    boxP,
    boxY,
    boxT,
    boxH,
    boxO,
    boxN,
    boxI,
    boxC,
    mouseconstraint,
  ]);

  Matter.Runner.run(engine);
  Render.run(render);
}
