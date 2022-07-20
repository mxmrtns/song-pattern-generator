
import React from "react";
import classNames from "classnames";

class ColorSelect
  extends React.Component<any, any> {

    constructor(props: any) {
      super(props);
      this.state = {
        value: props.value,
        msgtype: props.msgtype
      };
      this.handleChange = this.handleChange.bind(this);
    }
  

    
    handleChange(event: { target: { value: string; }; }) {
      this.setState({value: event.target.value});

      const color = event.target.value;

      parent.postMessage({
        pluginMessage: {
          type: this.state.msgtype,
          color
        }
      }, '*');

    }

    render() {
      return (
        <div className="colorSelect row">

          <div 
            className={classNames({
              colorbox: true,
              'reverb-blue': this.state.value == '0.439 0.298 0.996',
              'vanila-phaser': this.state.value == '0.925 0.89 0.815',
              'orange-fuzz': this.state.value == '0.945 0.337 0.137',
              'purple-noise': this.state.value == '0.27 0 0.45',
              'gold-tuner': this.state.value == '0.803 0.619 0.235',
              'black': this.state.value == '0 0 0',
            })}
          >
          </div>

          <select name="colorPillar" id="colorPillar" value={this.state.value} onInput={this.handleChange}>
            <option value='0.439 0.298 0.996'>Reverb Blue</option>
            <option value="0.925 0.89 0.815">Vanila Phaser</option>
            <option value="0.945 0.337 0.137">Orange Fuzz</option>
            <option value='0.27 0 0.45'>Purple Noise</option>
            <option value="0.803 0.619 0.235">Gold Tuner</option>
            <option value="0 0 0">Black</option>
          </select>

        </div> 
      );
    }

  }

  export default ColorSelect;