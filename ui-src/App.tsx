
import React, { useState } from "react";
import Slider from '@mui/material/Slider';

import "./App.css";
import "../node_modules/figma-plugin-ds/dist/figma-plugin-ds.css"

import InputNumber from "./modules/InputNumber";
import ColorSelect from "./modules/ColorSelect";
import ButtonClass from "./modules/ButtonClass";
import Button from "./modules/Button";
import Stepper from "./modules/stepper";

import { COLORS } from "./constants/enums";

import P5Component from './p5Sketch'





function App() {

  const [beatFreq, setBeatFreq] = useState(2);
  const [beatTresh, setBeatTresh] = useState(4);

  return (
    <div>

      <div className="container row">
        <InputNumber value="2" class="icon icon--tidy-up-list-vertical" msgtype='rows'/>
        <InputNumber value="6" class="icon icon--tidy-up-list-horizontal" msgtype='cols'/>
      </div>
      <div className="container col">
        <label for="colorPillar">Color Pillar</label>
        <ColorSelect msgtype='colorPillar' value={COLORS.PURPLE_NOISE}/>
      </div>
      <div className="container col">
        <label for="colorPillar">Color Bubble</label>
        <ColorSelect msgtype='colorBubble' value={COLORS.REVERB_BLUE}/>
      </div>
      <div className="container col">
        <label for="colorPillar">Color Vector</label>
        <ColorSelect msgtype='colorVector' value={COLORS.ORANGE_FUZZ}/>
      </div>


      
      


      <div className="container col">
        <P5Component beatFreq={beatFreq} beatTresh={beatTresh} />
        <div className="row">
          <Stepper state={beatFreq} iconClass="icon--tidy-up-list-vertical" msgType="beatFreq" setState={setBeatFreq} />
          <Stepper state={beatTresh} iconClass="icon--tidy-up-list-horizontal" msgType="beatTresh" setState={setBeatTresh}  />
        </div>
      </div>

      <div className="container row">
        <Button label="Save Copy" cNames="button--secondary" iconClass="" msgType="clone"/>
        <Button label="Reload" cNames="button--primary icon-button-padding" iconClass="icon--swap icon--white" msgType="reload"/>
      </div>


    </div>
  );
  
  //<Button label="Save Copy" classnames="Save Copy" iconClass="" msgType="clone" setRandomBeat={setRandomBeat}/> 

          
  // { Button("Save Copy", "button--secondary", "", "clone") setRandomBeat={setRandomBeat} }
  // { Button("Reload", "button--primary icon-button-padding", "icon--swap icon--white", "reload") }

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