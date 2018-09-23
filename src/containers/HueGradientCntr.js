
import React, { Component } from 'react';

// helpers
import { RGBtoHex, HSLtoRGB } from '../helpers/colorConversion';
// import { getPosition } from '../helpers/canvas';

// redux
import { connect } from 'react-redux';
import { selectColor, updateColor, updateColorPosition } from '../redux/reducer/color/actions';
import { updateGradientHue, updateGradientDimensions } from '../redux/reducer/colorPickers/actions';
import { focusCanvas, unfocusCanvas } from '../redux/reducer/focusLayer/actions';

// components
import HueGradient from '../components/HueGradient/HueGradient';

class HueGradientCntr extends Component {
  constructor (props) {
    super(props);
    const { color, colorPickers } = this.props;
    this.state = {
      initiated: false,
      color: color[color.selected],
      hue: colorPickers.hueGradient.hue,
      mouse: { x: 0, y: 0 },
      dragging: false,
      inCanvas: false
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { color, colorPickers } = nextProps;
    return {
      color: {...color[color.selected]},
      hue: {...colorPickers.hueGradient.hue}
    };
  }

  initCanvas = (refs) => {
    const { canvas: c, touch: t, wrapper: w } = refs;
    const { updateGradientDimensions, updateColorPosition } = this.props;
    const { initiated } = this.state;

    // refs are unmounted then mounted, so they must checked for undefined
    if ( c && t && w ) {
      t.width = w.clientWidth;
      t.height = w.clientHeight;
      c.width = t.width;
      c.height = t.height;

      updateGradientDimensions({
        colorPicker: 'hueGradient', 
        dimensions: { 
          width: c.width, 
          height: c.height 
        }
      });

      if ( !initiated ) {
        updateColorPosition({ x: 0, y: c.height });
      }
      
      this.setCanvas({ canvas: c });
      this.setState({ initiated: true });
    }
  }

  changeHue = (canvas, value) => {
    // // value = e ? +e.target.value : value;         // The string is converted to a number
    // value = (255 * 6) - value;                   // The value starts at max
    // let rgb = [0, 0, 0];
    // const range = new Array(rgb.length * 2 + 1); // red, green, and blue increases to 255 and decreases to 0  (3 * 2).  1 is added for when the color goes back to red.

    // // Range values. RGB values range from 0 to 255.
    // for (let i = 0; i < range.length; i++) range[i] = i * 255;

    // // RGB values
    // const l = range.length-1;
    // rgb = rgb.map((e, i) => {
    //   // The ranges's index value. The value loops around.
    //   const index = (offset, j = (i * 2 + offset)) => {
    //     return (i === rgb.length-1 && j === l) ? l : (j % l)
    //   };

    //   // The rgb values change if the input value is within the specific ranges
    //   if (value >= range[index(4)] && value < range[index(5)]+1) {
    //     return (value - range[index(4)]);
    //   } else if (value >= range[index(5)] && value < range[index(1)]+1) {
    //     return range[1];
    //   } else if (i === 0 && (value >= range[5] || (value >= range[0] && value < range[1]+1))) {
    //     return range[1];
    //   } else if (value >= range[index(1)] && value < range[index(2)]+1) {
    //     return (range[index(2)] - value);
    //   } else {
    //     return range[0];
    //   }
    // });

    // rgb = { r: rgb[0], g: rgb[1], b: rgb[2] };
    // const hex = RGBtoHex(rgb);

    // this.setState({ 
    //   gradientHue: { rgb, hex }
    // });
    
    const { updateGradientHue } = this.props;
    // The colors are reverse when subtracting from the max
    value = 360 - (+value);
    const rgb = HSLtoRGB({ h: value, s: 100, l: 50 });
    const hex = RGBtoHex(rgb);
    console.log('HUE', value);

    // The color and canvas are updated
    updateGradientHue(rgb);
    this.getColor({ canvas, fire: true });
    this.setCanvas({ canvas, hex });
  }

  engage = (canvas, e) => {
    const { focusCanvas } = this.props;
    this.setState({ dragging: true, inCanvas: true });
    this.getColor({ canvas, e, fire: true });
    focusCanvas({
      focus: 'hueGradient', 
      onMouseMove: (e) => this.getColor({ canvas, e }),
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
    const { color, hue, dragging } = this.state;
    const { updateColor, focusLayer } = this.props;
    const ctx = canvas.getContext('2d');

    if ( dragging || fire ) {
      // The canvas is updated so the circle changes position.
      this.setCanvas({ canvas, e });

      // Color position
      const pos = this.canvasMousePosition({
        canvas, 
        e,
        initial: { x: color.x, y: color.y },
        offset: focusLayer.offset
      });
      const x = pos.x,
            y = pos.y;
      
      // The .getImageData() method returns an array of the rgb values [r,g,b,a,r,g,b,a,r...] for each pixel
      // .getImageData(x, y, width, height)
      const imgData = ctx.getImageData(x, y, 1, 1).data;
      const rgb = { r: imgData[0], g: imgData[1], b: imgData[2] };

      // Mouse position and color updated
      this.updateMousePosition(e);
      updateColor({ rgb, hue, pos });
    }
  }

  setCanvas = ({canvas, e, hex}) => {
    this.setGradientColor(canvas, hex);
    this.drawCircle(canvas, e);
  }

  setGradientColor = (canvas, hex) => {  // The default hex color is the color stored in state. 
    hex = hex || this.state.hue.hex;
    const context = canvas.getContext('2d');
    
    // White linear gradient
    const whiteGrd = context.createLinearGradient(0, 0, canvas.width, 0);
    whiteGrd.addColorStop(0.01, "#fff");
    whiteGrd.addColorStop(0.99, hex);
    context.fillStyle = whiteGrd;
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Black linear gradient
    const blackGrd = context.createLinearGradient(0, canvas.height, 0, 0);
    blackGrd.addColorStop(0.01, "#000");
    blackGrd.addColorStop(0.99, "transparent");
    context.fillStyle = blackGrd;
    context.fillRect(0, 0, canvas.width, canvas.height);
    console.log('setGradientColor');
  }

  drawCircle = (canvas, e) => {
    const { color, hue } = this.state;
    const { focusLayer } = this.props;
    const context = canvas.getContext('2d');

    // Arc values
    // Color position
    const pos = this.canvasMousePosition({
      canvas, 
      e,
      initial: { x: color.x, y: color.y },
      offset: focusLayer.offset
    });
    const x = pos.x, 
          y = pos.y,
          radius = 5;
    
    // Stroke Color
    // Values for where the stroke color should change
    const range = {
      x: Math.floor(canvas.width/2), 
      y: Math.floor(canvas.height/3) 
    };
    // The fourth character in the hexidecimal string is tested to see if the gradient hue is one of the lighter colors (colors between orange and light blue)
    let isLighter = /^([a-f])$/.test( hue.hex[3] );
    isLighter = (x < range.x || isLighter) && y < range.y;
    const strokeStyle = isLighter ? '#000' : '#fff';

    // Circle
    context.arc(x, y, radius, 0, 2 * Math.PI);
    context.strokeStyle = strokeStyle;
    context.stroke();

    // The path is reset, so it's not connected to the next path.
    context.beginPath();
    console.log('drawCircle');
  }

  updateMousePosition = (e) => {
    const { offset } = this.props.focusLayer;
    if (e) {
      this.setState({
         mouse: { 
          x: e.clientX - offset.width + window.pageXOffset, 
          y: e.clientY - offset.height + window.pageYOffset
        } 
      });
    }
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
      x = x < 0 ? 0 : x > canvas.width-1 ? canvas.width-1 : x;
      y = y < 0 ? 0 : y > canvas.height  ? canvas.height  : y;
    }

    // console.log('canvasMousePosition', { x, y });
    return { x, y };
  }

  detectCanvas = (bool) => {
    this.setState({ inCanvas: bool});
  }

  selectColor = (canvas, selected) => {
    const { selectColor } = this.props;
    const { hex } = this.state.color.hue;
    selectColor(selected);
    this.setCanvas({ canvas, hex });
  }

  render() {
    // console.log('COLOR: ', this.state.color);
    // console.log('GRADIENT HUE: ', this.state.hue);
    // console.log('COLOR Initiated: ', this.state.initiated);
    // console.log('COLOR', this.props.color.frgd);
    // console.log('COLOR', this.props.color.bkgd);
    
    return (
      <HueGradient
        state={ this.state }
        initCanvas={ this.initCanvas }
        engage={ this.engage }
        changeHue={ this.changeHue }
        updateMousePosition={ this.updateMousePosition }
        detectCanvas={ this.detectCanvas }
        selectColor={ this.selectColor }
        color={ this.props.color }
        focusLayer={ this.props.focusLayer } />
    );
  }
}

const mapStateToProps = (state) => ({
  color: state.color,
  colorPickers: state.colorPickers,
  focusLayer: state.focusLayer
});

const mapDispatchToProps = {
  selectColor,
  updateColor,
  updateColorPosition,
  updateGradientHue,
  updateGradientDimensions,
  focusCanvas,
  unfocusCanvas
};

export default connect(mapStateToProps, mapDispatchToProps)(HueGradientCntr);
