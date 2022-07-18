
figma.showUI(__html__, {width: 240, height: 450 });

figma.ui.resize(240, 500);

const padding = 4;
const gap = padding / 2;

const pillarW = 12;
const pillarH = 24;

let bubblePos = [];
let vertexPos = [];


let frame;

// Calls to "parent.postMessage" from within the HTML page will trigger this
// callback. The callback will be passed the "pluginMessage" property of the
// posted message.
figma.ui.onmessage = (msg) => {


  if (msg.type != 'clone') {

    vertexPos = [];

    const colorValPillar = msg.colorSelectPillar.split(' ');
    const colorValBubble = msg.colorSelectBubble.split(' ');
    const colorValVector = msg.colorSelectVector.split(' ');

    // Logic for clearing the old Frame ——————————————————————————————————————————————————————————————
    const oldFrame = figma.currentPage.findOne(node => node.type === "FRAME" && node.name === "Song");

    if (oldFrame !== null) {
      oldFrame.remove();
    } else {};


    // Creating and setting the size of the frame ————————————————————————————————————————————————————
    frame = figma.createFrame();

    let canvasHeight = padding * 2 + msg.rows * pillarH + (msg.rows - 1) * gap;
    let canvasWidth = padding * 2 + msg.cols * pillarW + (msg.cols - 1) * gap;

    frame.x = 0
    frame.y = 0
    frame.name = "Song"
    frame.constrainProportions = true;
    frame.resize(canvasWidth, canvasHeight)


    // Drawing the elements on the frame with loops ——————————————————————————————————————————————————
    const nodes: SceneNode[] = [];

    for (let i = 0; i < msg.rows; i++) {

      bubblePos[i] = [];

      for (let l = 0; l < msg.cols; l++) {


        //Pillars ——————————————————————————————————————————————————
        let calcX = l * (pillarW + gap) + padding;
        let calcY = i * (pillarH + gap) + padding;

        let calcRTop = ((0 + (i + l) * 100) % 200);
        let calcRBot = ((100 + (i + l) * 100) % 200);

        const pillar = figma.createRectangle();
        pillar.resize(pillarW, pillarH);
        pillar.topLeftRadius = calcRTop;
        pillar.topRightRadius = calcRTop;
        pillar.bottomLeftRadius = calcRBot;
        pillar.bottomRightRadius = calcRBot;
        pillar.x = calcX;
        pillar.y = calcY;

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

        //Bubbles ——————————————————————————————————————————————————

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

        if (Math.random() < 0.5) {
          const bubble = figma.createEllipse();
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

        vertexPos.push(bubblePos[i][l]);

        console.log(vertexPos.length);

      }
    }

    //Vector ——————————————————————————————————————————————————



    for (let i = 0; i < 4; i++) {
      if (Math.random() < 0.5) {

        let randomVertex = getRandomInt(0, vertexPos.length - 1);

        const vector = figma.createVector();
        vector.vectorNetwork = {
          // The vertices of the triangle
          vertices: [{
              x: vertexPos[randomVertex].x + pillarW / 2,
              y: vertexPos[randomVertex].y + pillarW / 2,
              strokeCap: "ROUND"
            },
            {
              x: vertexPos[randomVertex + 1].x + pillarW / 2,
              y: vertexPos[randomVertex + 1].y + pillarW / 2,
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


        frame.appendChild(vector);
        nodes.push(vector);


        figma.currentPage.selection = nodes;
        figma.viewport.scrollAndZoomIntoView(nodes);

      } else {};
    }

  }

  if (msg.type == 'clone') {
    console.log("clone");
    frame.clone();
    frame.x = 100;
    frame.name = "saved-Song"
  }


};




function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}
