
import React from "react";
import classNames from "classnames";

class Button
  extends React.Component<any, any> {

    constructor(props: any) {
      super(props);
      this.state = {
        msgtype: props.msgtype,
        label: props.label,
        addClasses: props.addClasses,
        iconClass: props.iconClass
      };
      this.handleChange = this.handleChange.bind(this);
    }
  

    
    handleChange() {

      const button = 'pressed';

      parent.postMessage({
        pluginMessage: {
          type: this.state.msgtype,
          button
        }
      }, '*');

    }

    render() {
      return (
        <button
          className={classNames(this.props.addClasses, {
            button: true,
          })}
          onClick={this.handleChange}
        >
          {this.props.iconClass &&
            <div 
              className={classNames(this.props.iconClass, {
                icon: true,
              })}
            ></div>
          }

          {this.state.label}
        </button>

      );
    }

  }

  export default Button;