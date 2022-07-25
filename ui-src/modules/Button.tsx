import React, { Dispatch, SetStateAction } from 'react';
import classNames from "classnames";




export default function Button ({ label, cNames, msgType, setRandomBeat }) {

    function handleClick() {

        setRandomBeat('changed');

        parent.postMessage({
            pluginMessage: {
              type: msgType
            }
          }, '*');
    
    }

    return (
        <button 
            className={classNames(cNames,"button", {})}
            onClick={() => handleClick()}
        >

            {label}
        </button>
    )

}


// {iconClass &&
//     <div className={classNames(iconClass,"icon", {})}></div>
// }