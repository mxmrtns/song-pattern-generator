import React, { useRef } from "react";
import logoPng from "./logo.png";
import logoSvg from "./logo.svg?raw";
import Logo from "./Logo";
import "./App.css";
import "../node_modules/figma-plugin-ds/dist/figma-plugin-ds.css"
import { selectMenu, disclosure } from 'figma-plugin-ds';


    selectMenu.init(); //initiates the select menu component
    disclosure.init(); //initiates the disclosure component

function App() {
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
