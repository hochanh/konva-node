const Konva = require('konva/cmj').default;
const Koa = require('koa');
const imageDataURI = require('image-data-uri');

const render = () => {
  // first we need to create a stage
  const stage = new Konva.Stage({
    width: 500,
    height: 500
  });

  // then create layer
  const layer = new Konva.Layer();

  // create our shape
  const circle = new Konva.Circle({
    x: stage.width() / 2,
    y: stage.height() / 2,
    radius: 70,
    fill: 'red',
    stroke: 'black',
    strokeWidth: 4
  });

  // add the shape to the layer
  layer.add(circle);

  // add the layer to the stage
  stage.add(layer);

  // draw the image
  return stage.toDataURL()
}


const app = new Koa();

app.use(async ctx => {
    const img = imageDataURI.decode(render());
    ctx.set("Content-Type", img.imageType);
    ctx.body = img.dataBuffer
});

app.listen(8000);
