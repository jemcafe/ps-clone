import React, { Component } from 'react';

class Window extends Component {
  constructor () {
    super();
    this.state = {
      browserWindow: { width: 0, height: 0 },
      pos: { x: 0, y: 0 },
      offset: { x: 0, y: 0 },
      dragging: false,
      focused: false
    }
  }

  componentDidMount () {
    window.addEventListener("resize", this.updateDimensions);
    this.updateDimensions();
    this.initPosition();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }

  updateDimensions = () => {
    const { innerWidth, innerHeight } = window;
    // The equation for the position keeps the element within the browser window when it resizes ( a1 / a2 = x / b2 ) ( x = a1 * b2 / a2 )
    this.setState(prev => ({
      browserWindow: { height: innerHeight, width: innerWidth },
      pos: {
        x: Math.round(prev.pos.x/prev.browserWindow.width * innerWidth), 
        y: Math.round(prev.pos.y/prev.browserWindow.height * innerHeight)
      }
    }));
  }

  initPosition = () => {
    const { offsetWidth, offsetHeight } = this.refs.window;
    this.setState({
      pos: {
        x: window.innerWidth/2 - offsetWidth/2,
        y: window.innerHeight/2 - offsetHeight/2
      }
    })
  }

  engage = (e) => {
    const { offsetLeft, offsetTop } = this.refs.window;
    this.setState({ 
      dragging: true,
      focused: true, 
      offset: { 
        x: e.clientX - offsetLeft, 
        y: e.clientY - offsetTop 
      } 
    });
  }

  disengage = () => {
    this.setState({ dragging: false, focused: false });
  }

  updatePosition = ({ nativeEvent: e }) => {
    if (this.state.dragging) {
      this.setState(prev => ({ 
        pos: { 
          x: e.clientX - prev.offset.x, 
          y: e.clientY - prev.offset.y
        } 
      }));
    }
  }

  render () {
    const { pos } = this.state;
    const { name = '?', children } = this.props;

    const style = {
      window: { top: pos.y, left: pos.x }
    }

    return (
      <div ref="window" className="window" style={style.window}>
        <h5 onMouseDown={this.engage}>{ name }</h5>
        <div className="container">
          { children }
        </div>
        { this.state.focused &&
        <div className="focus-overlay"
          onMouseMove={this.updatePosition} 
          onMouseUp={this.disengage}>
        </div> }
      </div>
    );
  }
}

export default Window;