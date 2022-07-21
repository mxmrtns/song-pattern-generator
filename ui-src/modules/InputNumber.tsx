
import React from "react";

class InputNumber 
  extends React.Component<any, any> {

    constructor(props: any) {
      super(props);
      this.state = {
        class: props.class,
        value: props.value,
        msgtype: props.msgtype
      };
      this.handleChange = this.handleChange.bind(this);
    }
  

    
    handleChange(event: { target: { value: number; }; }) {
      this.setState({value: event.target.value});

      const number = event.target.value;

      parent.postMessage({
        pluginMessage: {
          type: this.state.msgtype,
          number
        }
      }, '*');

    }

    render() {
      return (
        <label className="input">
          <span>
            <div className={this.state.class}></div>
          </span>
          <input type="number" value={this.state.value} onChange={this.handleChange} min="1" max="20" />
        </label> 
      );
    }

  }

  export default InputNumber;