
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
    _rows = parseInt(msg.number, 10);
    updateCanvas(_rows, _cols, _colorValPillar, _colorValBubble, _colorValVector);
  }

  if (msg.type == 'cols') {
    _cols = parseInt(msg.number, 10);
    updateCanvas(_rows, _cols, _colorValPillar, _colorValBubble, _colorValVector)
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


  function updateCanvas (rows: number, cols: number, colorValPillar: any[], colorValBubble: any[], colorValVector: any[]) {

    // Requires the user to create and select a frame first ——————————————————————————————————————————
    const frame = figma.currentPage.selection[0] || null
    if (!frame || frame.type !== "FRAME") {
      figma.notify("Please select a target frame", {
        error: true
      })
      return
    }

    // Creating and setting the size of the bars ————————————————————————————————————————————————————
    let canvasHeight = frame.height
    let canvasWidth = frame.width

    let factor = canvasWidth / (6 + 14 * cols)

    let barWidth = 12 * factor
    let barHeight = (canvasHeight - (rows + 1) * 4 * factor) / rows

    let verticalSpace = 4 * factor
    let horizontalSpace = 2 * factor

    // Check if bars fullfill the minimum height requirement ————————————————————————————————————————
    if (barHeight < 24 * factor) {
      figma.notify("Too many rows", {
        error: true
      })
      return
    }

    // Logic for clearing the old Frame ——————————————————————————————————————————————————————————————
    const oldNodes = figma.currentPage.findAll(node =>
      node.type === "RECTANGLE" && node.name === "Bar" ||
      node.type === "ELLIPSE" && node.name === "Beat" ||
      node.type === "VECTOR" && node.name === "Fluid Beat");

    if (oldNodes !== null) {
      oldNodes.forEach((nodeElement) => nodeElement.remove());
    } else { };

    // Drawing the elements on the frame with loops ——————————————————————————————————————————————————
    const nodes: SceneNode[] = [];

    for (let i = 0; i < cols; i++) {

      bubblePos[i] = [];

      for (let l = 0; l < rows; l++) {

        //Pillars ——————————————————————————————————————————————————
        let calcX = 4 * factor + i * (barWidth + horizontalSpace);
        let calcY = 4 * factor + l * (barHeight + verticalSpace)

        const pillar: RectangleNode = figma.createRectangle();
        pillar.resize(barWidth, barHeight);

        pillar.x = calcX;
        pillar.y = calcY;
        pillar.name = "Bar";

        if (i % 2 == 0) {
          pillar.topLeftRadius = 999
          pillar.topRightRadius = 999

        } else {
          pillar.bottomLeftRadius = 999
          pillar.bottomRightRadius = 999
        }

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
        let calcBubbleX = calcX;
        let calcBubbleYTop = calcY
        let calcBubbleYBot = calcY + barHeight - barWidth

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
          bubble.name = "Beat"
          bubble.x = bubblePos[i][l].x;
          bubble.y = bubblePos[i][l].y;
          bubble.resize(barWidth, barWidth)
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
        } else { };

        vertexPos.push(bubblePos[i][l]);

      }
    }

    //Fluid Beats ——————————————————————————————————————————————————

    for (let i = 0; i < 4; i++) {
      if (Math.random() < 0.5) {

        let randomVertex = getRandomInt(0, vertexPos.length - 1);

        const vector: VectorNode = figma.createVector();
        vector.vectorNetwork = {
          // The vertices of the triangle
          vertices: [{
            x: vertexPos[randomVertex].x + barWidth / 2,
            y: vertexPos[randomVertex].y + barWidth / 2,
            strokeCap: "ROUND"
          },
          {
            x: vertexPos[randomVertex + 1].x + barWidth / 2,
            y: vertexPos[randomVertex + 1].y + barWidth / 2,
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

        vector.strokeWeight = barWidth;

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


        // figma.currentPage.selection = nodes;
        // figma.viewport.scrollAndZoomIntoView(nodes);

      } else {};
    }


  }


};






function getRandomInt(min:number, max:number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}