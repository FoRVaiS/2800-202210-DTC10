var numbers = ["10", "9", "8", "7", "6", "5", "4", "3", "2", "1", ""];
i = -1;

function countDown() {
  console.log("Counting down!");
  const secretFound = document.createElement("div");
  secretFound.classList.add("secretFound");
  $("#inner-container").html("<div id='secret-found'></div>") +
    $("#inner-container").append(
      "<div id='secretCodeInput'><input type='tel' id='secretCode'></input></div>"
    );
  //countdown from 10 to 1
  numbersCounting();
}

function numbersCounting() {
  setTimeout(() => {
    2000;
    i++;
    if (i < numbers.length) {
      $("#secret-found").text(numbers[i]);
      setTimeout(numbersCounting, 1000);
    } else {
      explosion();
      $("#secretCodeInput").html("");
    }
  }, 1000);
}

function explosion() {
  document.getElementById("outer-container").style.backgroundImage =
    "url('/images/afterExplosion.png')";
}

function easterEgg() {
  console.log("Easter egg is working!");
  //script showing the easter egg
  $("#inner-container").html(
    `<a onclick="buttonPressed()">` +
      `<div class="easterEggButton">` +
      `</div>` +
      `</a>`
  );
}
easterEgg();

function buttonPressed() {
  console.log("Button pressed!");
  //script showing the easter egg
  countDown();
  defusal();
}
function defusal() {
  let password = "7355608";
  $("#secretCode").keyup(function (event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      if ($("#secretCode").val() === password) {
        console.log("Password is correct!");
        init();
      }
    }
  });
}

function init() {
  $("body").html("");
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

  let boxP = Bodies.rectangle(100, 100, 100, 150, {
    render: {
      sprite: {
        texture: "/images/boxP.png",
      },
    },
  });
  let boxY = Bodies.rectangle(150, 100, 100, 150, {
    render: {
      sprite: {
        texture: "/images/boxY.png",
      },
    },
  });
  let boxT = Bodies.rectangle(200, 100, 100, 150, {
    render: {
      sprite: {
        texture: "/images/boxT.png",
      },
    },
  });
  let boxH = Bodies.rectangle(250, 100, 100, 150, {
    render: {
      sprite: {
        texture: "/images/boxH.png",
      },
    },
  });
  let boxO = Bodies.rectangle(300, 100, 100, 150, {
    render: {
      sprite: {
        texture: "/images/boxO.png",
      },
    },
  });
  let boxN = Bodies.rectangle(350, 100, 100, 150, {
    render: {
      sprite: {
        texture: "/images/boxN.png",
      },
    },
  });
  let boxI = Bodies.rectangle(400, 100, 100, 150, {
    render: {
      sprite: {
        texture: "/images/boxI.png",
      },
    },
  });
  let boxC = Bodies.rectangle(450, 100, 100, 150, {
    render: {
      sprite: {
        texture: "/images/boxC.png",
      },
    },
  });
  Composite.add(engine.world, [
    mouseconstraint,
    boxP,
    boxY,
    boxT,
    boxH,
    boxO,
    boxN,
    boxI,
    boxC,
  ]);

  Matter.Runner.run(engine);
  Render.run(render);
}