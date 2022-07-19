// Exporting a function called 'mySketch'
export const mySketch = (p) => {

  const canvasW = 200;
  const canvasH = 50;

  
  let r = 4;

  // Calling p5.js functions, using the variable 'p'
  p.setup = () => {


    // Creating a canvas using the entire screen of the webpage
    p.createCanvas(canvasW, canvasH)
    p.background(255)


    p.translate(canvasW/2, canvasH/2);
    let total = p.floor(p.width / (r * 2));
    p.noFill();
    p.stroke(252, 238, 33);
    p.strokeWeight(8);
  
    p.beginShape();
    for (let i = 0; i < total + 1; i++) {
      let angle = p.map(i, 0, total, 0, p.TWO_PI);
      let y = p.map(p.sin(angle), -1, 1, -25, 25);
      let x = p.map(i, 0, total + 1, -100, 100);
      p.vertex(x, y);
    }
    p.endShape();


    console.log('p5.js setup function executed!')
  }

  p.draw = () => {

  }


  
}