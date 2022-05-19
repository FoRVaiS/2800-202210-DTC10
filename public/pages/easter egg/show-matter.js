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
