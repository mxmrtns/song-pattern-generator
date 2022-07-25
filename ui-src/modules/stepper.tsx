import React, { Dispatch, SetStateAction } from 'react';
import classNames from "classnames";




export default function Stepper ({ state, iconClass, msgType, setState }) {


    function handleChange(value: any) {

        setState(value);

        const number = value;

        parent.postMessage({
            pluginMessage: {
              type: msgType,
              number
            }
          }, '*');
    
    }

    return (
        <label className='input'>
            <span>
                <div className={classNames(iconClass,"icon", {})}></div>
            </span>
            <input value={state} onChange={e => handleChange(e.target.value)} type="number" min="1" max="20" />
        </label>
    )

}
