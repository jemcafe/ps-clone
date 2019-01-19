
import React, { Component } from 'react';

// helpers
import { RGBtoHex, HSLtoRGB, HSVtoRGB } from '../helpers/colorConversion';

// redux
import { connect } from 'react-redux';
import { selectColor, updateColor } from '../redux/reducer/color/actions';
import { addRecentSwatch } from '../redux/reducer/swatches/actions';
// import { updateGradientHue, updateGradientDimensions, updateColorPosition } from '../redux/reducer/colorPickers/actions';
import { focusCanvas, unfocusCanvas } from '../redux/reducer/focusLayer/actions';

// components
import HueGradient from '../components/HueGradient/HueGradient';

class HueGradientCntr extends Component {
  constructor (props) {
    super(props);
    const { color: c } = this.props;
    this.state = {
      color: c,
      selectedColor: c[c.selected],
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      mouse: { x: 0, y: 0 },
      dragging: false,
      inCanvas: false
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { color } = nextProps;
    const selectedColor = color[color.selected]
    const x = Math.round((selectedColor.hsv.s * prevState.width) * 0.01);
    const y = Math.round(((100 - selectedColor.hsv.v) * prevState.height) * 0.01);

    return { color, selectedColor, x, y };
  }

  initCanvas = (refs) => {
    const { canvas: c, touch: t, wrapper: w } = refs;
    // const { updateGradientDimensions, updateColorPosition } = this.props;
    // const { color, initiated } = this.state;

    // refs are unmounted then mounted, so they must checked for undefined
    if ( c && t && w ) {
      t.width = w.clientWidth;
      t.height = w.clientHeight;
      c.width = t.width;
      c.height = t.height;

      this.setState(prev => ({
        width: c.width,
        height: c.height,
        x: Math.round((prev.selectedColor.hsv.s * c.width) * 0.01),
        y: Math.round(((100 - prev.selectedColor.hsv.v) * c.height) * 0.01)
      }));
      
      this.setCanvas({ canvas: c });
    }
  }

  changeHue = (canvas, value) => {
    const { selectedColor: sc } = this.state;
    const { updateColor, addRecentSwatch } = this.props;
    value = +value
    const rgb = HSLtoRGB({ h: value, s: 100, l: 50 });
    const hex = RGBtoHex(rgb);

    updateColor({ hsv: { h: value } });
    addRecentSwatch({ hsv: { h: value, s: sc.hsv.s, v: sc.hsv.v } });

    // The color and canvas are updated
    this.setCanvas({ canvas, hex });
  }

  engage = (canvas, e) => {
    const { focusCanvas } = this.props;
    this.setState({ dragging: true, inCanvas: true });
    this.getColor({ canvas, e, fire: true });
    focusCanvas({
      focus: 'hueGradient', 
      onMouseMove: (e) => this.getColor({canvas, e}),
      onMouseUp: () => this.disengage(),
      onMouseLeave: () => this.disengage()
    });
  }

  disengage = (canvas) => {
    const { unfocusCanvas } = this.props;
    this.setState({ dragging: false, inCanvas: false });
    unfocusCanvas();
  }

  getColor = ({canvas, e, fire}) => {
    const { selectedColor, x, y, dragging } = this.state;
    const { updateColor, addRecentSwatch, focusLayer } = this.props;
    const ctx = canvas.getContext('2d');
    let pos;

    if ( dragging || fire ) {
      // Color position
      pos = this.canvasMousePosition({
        canvas,
        e,
        initial: { x, y },
        offset: focusLayer.offset
      });

      // Mouse position
      this.updateMousePosition(e);

      this.setState(prev => {
        const s = Math.round((pos.x * 100)/prev.width);
        const v = Math.round(100 - ((pos.y * 100)/prev.height));
        const x = Math.round((s * prev.width) * 0.01);
        const y = Math.round(((100 - v) * prev.height) * 0.01);

        updateColor({ hsv: { s, v } });

        return { x, y }
      });

      addRecentSwatch({ color: selectedColor });

      // The canvas is updated so the circle changes position.
      this.setCanvas({ canvas, e });
    }
  }

  setCanvas = ({canvas, e, hex}) => {
    this.setGradientColor(canvas, hex);
    this.drawCircle(canvas, e);
  }

  setGradientColor = (canvas, hex) => {  // The default hex color is the color stored in state. 
    hex = hex || this.state.selectedColor.hue.hex;
    const context = canvas.getContext('2d');
    // console.log('setGradientColor');
    
    // White linear gradient
    const whiteGrd = context.createLinearGradient(0, 0, canvas.width, 0);
    whiteGrd.addColorStop(0, "#fff");
    whiteGrd.addColorStop(1, hex);
    context.fillStyle = whiteGrd;
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Black linear gradient
    const blackGrd = context.createLinearGradient(0, canvas.height, 0, 0);
    blackGrd.addColorStop(0, "#000");
    blackGrd.addColorStop(1, "transparent");
    context.fillStyle = blackGrd;
    context.fillRect(0, 0, canvas.width, canvas.height);
  }

  drawCircle = (canvas, e) => {
    const { x, y, selectedColor:{hue:{ hex }} } = this.state;
    const { focusLayer } = this.props;
    const context = canvas.getContext('2d');

    // Arc values
    const pos = this.canvasMousePosition({
      canvas,
      e,
      initial: { x, y },
      offset: focusLayer.offset
    });
    const radius = 5;
    
    // Stroke Color
    const range = {
      x: Math.floor(canvas.width/2), 
      y: Math.floor(canvas.height/3) 
    };
    // The fourth character in the hexidecimal string is tested to see if the gradient hue is one of the lighter colors (colors between orange and light blue)
    let isLighter = /^([a-f])$/.test(hex[3]);
    isLighter = (isLighter || pos.x < range.x) && pos.y < range.y;
    const strokeStyle = isLighter ? '#000' : '#fff';

    // Circle
    context.arc(pos.x, pos.y, radius, 0, 2 * Math.PI);
    context.strokeStyle = strokeStyle;
    context.stroke();

    // The path is reset, so it's not connected to the next path.
    context.beginPath();
  }

  canvasMousePosition = ({canvas, e, initial, offset}) => {
    // Initial / Default position
    let x = initial.x; 
    let y = initial.y;

    if (e && e.clientX && e.clientY) {
      // Subtracting the canvas offset from the event coordinates get the coordinates relative to the canvas, which is needed to position the circle when the mouse is out the canvas. Adding the window offset gets the coordinates relative to the canvas when the window page is scrolled.
      x = e.clientX - canvas.offsetLeft + window.pageXOffset;
      y = e.clientY - canvas.offsetTop + window.pageYOffset;

      if (offset) {
        x -= offset.width;
        y -= offset.height;
      }

      // Boundaries so the circle stays with in the canvas (-1 is necessary because the left edge of the canvas is black)
      x = x < 0 ? 0 : x > canvas.width ? canvas.width : x;
      y = y < 0 ? 0 : y > canvas.height ? canvas.height : y;
    }

    return { x, y };
  }

  detectCanvas = (bool) => {
    this.setState({ inCanvas: bool });
  }

  updateMousePosition = (e) => {
    const { offset } = this.props.focusLayer;
    if (e) {
      this.setState({ mouse: { 
        x: e.clientX - offset.width + window.pageXOffset, 
        y: e.clientY - offset.height + window.pageYOffset
      }});
    }
  }

  render() {
    return (
      <HueGradient
        color={ this.state.color }
        selectedColor={ this.state.selectedColor }
        mouse={ this.state.mouse }
        inCanvas={ this.state.inCanvas }
        initCanvas={ this.initCanvas }
        engage={ this.engage }
        changeHue={ this.changeHue }
        setCanvas={ this.setCanvas }
        updateMousePosition={ this.updateMousePosition }
        detectCanvas={ this.detectCanvas }
        selectColor={ this.props.selectColor }
        focusLayer={ this.props.focusLayer } />
    );
  }
}

const mapStateToProps = (state) => ({
  color: state.color,
  swatches: state.swatches,
  // colorPickers: state.colorPickers,
  focusLayer: state.focusLayer
});

const mapDispatchToProps = {
  selectColor,
  updateColor,
  addRecentSwatch,
  // updateGradientHue,
  // updateGradientDimensions,
  focusCanvas,
  unfocusCanvas
};

export default connect(mapStateToProps, mapDispatchToProps)(HueGradientCntr);
