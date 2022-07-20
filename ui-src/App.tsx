
import React, { useRef } from "react";

import "./App.css";
import "../node_modules/figma-plugin-ds/dist/figma-plugin-ds.css"

import InputNumber from "./modules/InputNumber";
import ColorSelect from "./modules/ColorSelect";
import Button from "./modules/Button";


import p5 from 'p5';
import { mySketch } from './p5Sketch'





function App() {

  new p5(mySketch);

  return (
    <div>
      <div className="container row">
        <InputNumber value="2" class="icon icon--tidy-up-list-horizontal" msgtype='rows'/>
        <InputNumber value="6" class="icon icon--tidy-up-list-vertical" msgtype='cols'/>
      </div>
      <div className="container col">
        <label for="colorPillar">Color Pillar</label>
        <ColorSelect msgtype='colorPillar' value='0.27 0 0.45'/>
      </div>
      <div className="container col">
        <label for="colorPillar">Color Bubble</label>
        <ColorSelect msgtype='colorBubble' value='0.439 0.298 0.996'/>
      </div>
      <div className="container col">
        <label for="colorPillar">Color Vector</label>
        <ColorSelect msgtype='colorVector' value='0.945 0.337 0.137'/>
      </div>
      <div className="container row">
        <Button msgtype='clone' label="Save Copy" addClasses="button--secondary" />
        <Button msgtype='reload' label="Reload" addClasses="button--primary icon-button-padding" iconClass="icon--swap icon--white"/>
      </div>
    </div>
  );
  

  // const inputRef = useRef<HTMLInputElement>(null);

  // const onCreate = () => {
  //   const count = Number(inputRef.current?.value || 0);
  //   parent.postMessage(
  //     { pluginMessage: { type: "create-rectangles", count } },
  //     "*"
  //   );
  // };

  // const onCancel = () => {
  //   parent.postMessage({ pluginMessage: { type: "cancel" } }, "*");
  // };

  // return (
  //   <main>

  //     <section>
  //       <input id="input" type="number" min="0" ref={inputRef} />
  //       <label htmlFor="input">Rectangle Count</label>
  //     </section>
  //     <footer>
  //       <button className="brand" onClick={onCreate}>
  //         Create
  //       </button>
  //       <button onClick={onCancel}>Cancel</button>
  //     </footer>
  //   </main>
  // );

}


export default App;