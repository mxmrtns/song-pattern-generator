
figma.showUI(__html__, {width: 240, height: 650 });


const padding = 4;
const gap = padding / 2;

const pillarW = 12;
const pillarH = 24;

let bubblePos: any[][] = [];
let vertexPos: any[] = [];


let frame: FrameNode;


let _rows = 2,
    _cols = 6,
    _colorValPillar = [0.27, 0, 0.45],
    _colorValBubble = [0.439, 0.298, 0.996],
    _colorValVector = [0.945, 0.337, 0.137];


let beatTresh: number = 0.4;

figma.ui.onmessage = (msg) => {

  if (msg.type == 'rows') {
    _rows = msg.number;
    updateCanvas(msg.number, _cols, _colorValPillar, _colorValBubble, _colorValVector);
  }

  if (msg.type == 'cols') {
    _cols = msg.number;
    updateCanvas(_rows, msg.number, _colorValPillar, _colorValBubble, _colorValVector)
  }
    
  if (msg.type == 'colorPillar') {
    _colorValPillar = msg.color.split(' ');
    updateCanvas(_rows, _cols, _colorValPillar, _colorValBubble, _colorValVector);
  }

  if (msg.type == 'colorBubble') {
    _colorValBubble = msg.color.split(' ');
    updateCanvas(_rows, _cols, _colorValPillar, _colorValBubble, _colorValVector);
  }

  if (msg.type == 'colorVector') {
    _colorValVector = msg.color.split(' ');
    updateCanvas(_rows, _cols, _colorValPillar, _colorValBubble, _colorValVector);
  }

  if (msg.type == 'reload') {
    updateCanvas(_rows, _cols, _colorValPillar, _colorValBubble, _colorValVector);
  }

  if (msg.type == 'clone') {
    frame.clone();
    frame.x = 100;
    frame.name = "saved-Song"
  }

  if (msg.type == 'beatTresh') {
    beatTresh = 0.1 * msg.number;
    updateCanvas(_rows, _cols, _colorValPillar, _colorValBubble, _colorValVector);
  }
};



function updateCanvas (rows: number, cols: number, colorValPillar: any[], colorValBubble: any[], colorValVector: any[]) {

  // Logic for clearing the old Frame ——————————————————————————————————————————————————————————————
  const oldFrame = figma.currentPage.findOne(node => node.type === "FRAME" && node.name === "Song");

  if (oldFrame !== null) {
    oldFrame.remove();
  } else {};

   // Creating and setting the size of the frame ————————————————————————————————————————————————————
   frame = figma.createFrame();

   let canvasHeight = padding * 2 + rows * pillarH + (rows - 1) * gap;
   let canvasWidth = padding * 2 + cols * pillarW + (cols - 1) * gap;

   frame.x = 0
   frame.y = 0
   frame.name = "Song"
   frame.constrainProportions = true;
   frame.resize(canvasWidth, canvasHeight)

       
   // Drawing the elements on the frame with loops ——————————————————————————————————————————————————
  const nodes: SceneNode[] = [];

  for (let i = 0; i < rows; i++) {

    bubblePos[i] = [];
    vertexPos[i] = [];

    for (let l = 0; l < cols; l++) {

      //Pillars ——————————————————————————————————————————————————
      let calcX = l * (pillarW + gap) + padding;
      let calcY = i * (pillarH + gap) + padding;

      let calcRTop = ((0 + (i + l) * 100) % 200);
      let calcRBot = ((100 + (i + l) * 100) % 200);

      const pillar: RectangleNode = figma.createRectangle();
      pillar.resize(pillarW, pillarH);
      pillar.topLeftRadius = calcRTop;
      pillar.topRightRadius = calcRTop;
      pillar.bottomLeftRadius = calcRBot;
      pillar.bottomRightRadius = calcRBot;
      pillar.x = calcX;
      pillar.y = calcY;
      pillar.name = "Bar";

      pillar.fills = [{
        type: 'SOLID',
        color: {
          r: Number(colorValPillar[0]),
          g: Number(colorValPillar[1]),
          b: Number(colorValPillar[2])
        }
      }];
      frame.appendChild(pillar);
      nodes.push(pillar);


      //Beats ——————————————————————————————————————————————————

      // X und Y positon der Bubbles berechnen
      let calcBubbleX = l * (gap + pillarW) + padding;
      let calcBubbleYTop = i * (gap + pillarH) + padding;
      let calcBubbleYBot = i * (gap + pillarH) + padding + pillarH - pillarW;

      //X und Y Pos in Object und Arry speichern
      if ((l + i) % 2 == 0) {
        // Bottom
        bubblePos[i][l] = {
          x: calcBubbleX,
          y: calcBubbleYBot
        };
      } else {
        // Top
        bubblePos[i][l] = {
          x: calcBubbleX,
          y: calcBubbleYTop
        };
      }

      if (Math.random() < beatTresh) {
        const bubble: EllipseNode = figma.createEllipse();
        bubble.name = "Beat";
        bubble.x = bubblePos[i][l].x;
        bubble.y = bubblePos[i][l].y;
        bubble.resize(pillarW, pillarW)
        bubble.fills = [{
          type: 'SOLID',
          color: {
            r: Number(colorValBubble[0]),
            g: Number(colorValBubble[1]),
            b: Number(colorValBubble[2])
          }
        }];

        frame.appendChild(bubble);
        nodes.push(bubble);
      } else {};

      // vertexPos.push(bubblePos[i][l]);

      vertexPos[i].push({ 
        x: calcBubbleX, 
        y: calcBubbleYTop
      });

      vertexPos[i].push({ 
        x: calcBubbleX, 
        y: calcBubbleYBot
      });


      console.log(vertexPos.length);
      console.log(vertexPos[0].length / 2);


    }
  }

  //Fluid Beats ——————————————————————————————————————————————————
  for (let i = 0; i < 4; i++) {
    if (Math.random() < 1) {

      let randomRow = getRandomInt(0, vertexPos.length);
      let randomStart = getRandomInt(0, vertexPos[0].length - 1);
      let randomEnd;

      do {
        randomEnd = getRandomInt(0, vertexPos[0].length - 1);
      } while (randomEnd === randomStart);


      
      const vector: VectorNode = figma.createVector();
      vector.vectorNetwork = {
        // The vertices of the triangle
        vertices: [{
            x: vertexPos[randomRow][randomStart].x + pillarW / 2,
            y: vertexPos[randomRow][randomStart].y + pillarW / 2,
            strokeCap: "ROUND"
          },
          {
            x: vertexPos[randomRow][randomEnd].x + pillarW / 2,
            y: vertexPos[randomRow][randomEnd].y + pillarW / 2,
            strokeCap: "ROUND"
          },
        ],

        segments: [{
          start: 0,
          tangentStart: {
            x: 0,
            y: 0
          }, // optional
          end: 1,
          tangentEnd: {
            x: 0,
            y: 0
          }, // optional
        }],

        regions: [{
          windingRule: "NONZERO",
          loops: [
            [0]
          ]
        }],
      }

      vector.strokeWeight = pillarW;

      vector.strokes = [{
        type: 'SOLID',
        color: {
          r: Number(colorValVector[0]),
          g: Number(colorValVector[1]),
          b: Number(colorValVector[2])
        }
      }];

      
      const newV: PolygonNode = vector.outlineStroke();
      newV.name = "Fluid Beat"

      vector.remove();

      frame.appendChild(newV);
      nodes.push(newV);


      figma.currentPage.selection = nodes;
      figma.viewport.scrollAndZoomIntoView(nodes);

    } else {};
  }

  //TODO Get all Beats and push them to the top of the layer list, so they are above the fluid beats

}






function getRandomInt(min:number, max:number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}