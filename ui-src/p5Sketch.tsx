import './App.css';
import { useEffect, useRef } from 'react';
import p5 from 'p5';
import React from 'react';
import { cyan } from '@mui/material/colors';
import { height } from '@mui/system';

const canvasW = 200;
const canvasH = 100;

let yRec: number = 50;
let freq: number = 1;

function sketch(p) {
    // p is a reference to the p5 instance this sketch is attached to
    p.setup = function() {
        p.colorMode(p.RGB, 255, 255, 255, 1);
        p.createCanvas(canvasW, canvasH);
        p.background(255);

        p.beginShape();
        let xoff = 0;
          for (let x = 0; x < p.width; x++ ) {
            p.noFill();
            p.stroke(50);
            p.strokeWeight(2);
            xoff += 0.02 * freq;
            let y = p.noise(xoff)* p.height;
            p.vertex(x, y);
          }
        p.endShape();

        
        p.fill(255, 255, 255, 0.8);
        p.noStroke();
        p.rect(0, yRec, canvasW, canvasH-yRec);


        // p.stroke(217);
        // p.strokeWeight(1);
        // p.drawingContext.setLineDash([3, 3]);
        // p.line(4, canvasH/2, 4, yRec);
        // p.line(canvasW - 4, canvasH/2, canvasW - 4, yRec);

        //p.drawingContext.setLineDash([,]);

        // p.noStroke();
        // p.fill(217);
        // p.square(0, canvasH/2 - 4, 8);
        // p.square(canvasW - 8, canvasH/2 - 4, 8);

        p.fill(254, 98, 98);
        p.ellipse(4, yRec, 8);
        p.ellipse(canvasW - 4, yRec, 8);

        p.stroke(254, 98, 98);
        p.line(0, yRec, canvasW, yRec);

    }
        
      
    p.draw = function() {
      
        // your draw code here
    }
}

function P5Component({beatFreq, beatTresh}) {
    // create a reference to the container in which the p5 instance should place the canvas
    const p5ContainerRef = useRef();

    yRec = beatTresh * (canvasH/10);
    freq = beatFreq;

    useEffect(() => {
        // On component creation, instantiate a p5 object with the sketch and container reference 
        const p5Instance = new p5(sketch, p5ContainerRef.current);

        // On component destruction, delete the p5 instance
        return () => {
            p5Instance.remove();
        }
    }, [yRec, freq]);

    return (
        <div className="p5Graph" ref={p5ContainerRef} />
    );
}

export default P5Component;


// // Exporting a function called 'mySketch'
// export const mySketch = (p) => {

//   const canvasW = 200;
//   const canvasH = 100;

  
//   let r = 4;

//   // Calling p5.js functions, using the variable 'p'
//   p.setup = () => {


//     // Creating a canvas using the entire screen of the webpage
//     p.createCanvas(canvasW, canvasH)
//     p.background(255)


//     p.translate(canvasW/2, canvasH/2);

//     let total = p.floor(p.width / (r * 2));

//     p.noFill();
//     p.stroke(0);
//     p.strokeWeight(1);
  
//     p.beginShape();
//     for (let i = 0; i < total + 1; i++) {
//       let angle = p.map(i, 0, total, 0, p.TWO_PI);
//       let y = p.map(p.sin(angle), -1, 1, -25, 25);
//       let x = p.map(i, 0, total + 1, -100, 100);
//       p.vertex(x, y);
//     }
//     p.endShape();


//     console.log('p5.js setup function executed!')

//   }

//   p.draw = () => {

//   }


  
// }