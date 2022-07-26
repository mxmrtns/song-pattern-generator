import React, { Dispatch, SetStateAction } from 'react';
import classNames from "classnames";




export default function Button ({ label, cNames, iconClass, msgType }) {

    function handleClick() {

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
            {iconClass &&
                <div className={classNames(iconClass,"icon", {})}></div>
            }

            {label}
        </button>
    )

}


