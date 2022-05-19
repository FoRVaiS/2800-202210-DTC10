function init() {
  var Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies;
  Composite = Matter.Composite;
  var boxes = [];

  var engine = Engine.create();

  var render = Render.create({
    element: document.body,
    engine: engine,
  });
  var ground = Bodies.rectangle(400, 600, 900, 60, { isStatic: true });
  let mouseconstraint = Matter.MouseConstraint.create(engine, {
    element: render.canvas,
    constraint: {
      render: {
        visible: false,
      },
    },
  });

  Composite.add(engine.world, [ground, mouseconstraint]);

  Matter.Runner.run(engine);
  Render.run(render);
}
function mouseClicked() {
  boxes.push(new Box(mouseX, mouseY, random(10, 40), random(10, 40)));
}
function showBoxOnClick() {
  background(51);
  for (var i = 0; i < boxes.length; i++) {
    boxes[i].show();
  }
}
