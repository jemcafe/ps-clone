
import React, { Component } from 'react';

// helpers
import { RGBtoHex, HSLtoRGB } from '../helpers/colorConversion';

// redux
import { connect } from 'react-redux';
import { selectColor, updateColor, updateColorPosition, updateGradientHue, updateGradientDimensions } from '../redux/reducer/color/actions';
import { focusCanvas, unfocusCanvas } from '../redux/reducer/focusLayer/actions';

// components
import HueGradient from '../components/HueGradient/HueGradient';

class HueGradientCntr extends Component {
  constructor (props) {
    super(props);
    const { color: c } = this.props;
    this.state = {
      color: c[c.selected],
      gradient: c.colorPickers.hueGradient,
      mouse: { x: 0, y: 0 },
      dragging: false,
      inCanvas: false,
      initiated: false
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { color: c } = nextProps;
    return {
      color: {...c[c.selected]},
      gradient: {...c.colorPickers.hueGradient}
    };
  }

  initCanvas = (refs) => {
    const { canvas: c, touch: t, wrapper: w } = refs;
    const { updateGradientDimensions, updateColorPosition } = this.props;
    const { color, initiated } = this.state;

    // refs are unmounted then mounted, so they must checked for undefined
    if ( c && t && w ) {
      t.width = w.clientWidth;
      t.height = w.clientHeight;
      c.width = t.width;
      c.height = t.height;

      updateGradientDimensions({
        width: c.width, 
        height: c.height
      });

      updateColorPosition({
        x: color.x,
        y: !initiated ? c.height : Math.round((color.cmyk.k * c.height) * 0.01)
      });
      
      if (!initiated) this.setState({ initiated: true });
      this.setCanvas({ canvas: c });
    }
  }

  changeHue = (canvas, value) => {
    const { updateGradientHue } = this.props;
    // The colors are reverse when subtracting from the max
    value = +value // 360 - (+value);
    const rgb = HSLtoRGB({ h: value, s: 100, l: 50 });
    const hex = RGBtoHex(rgb);
    console.log('changeHue');

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
    const { color:{ x, y }, gradient, dragging } = this.state;
    const { updateColor, focusLayer: fl } = this.props;
    const ctx = canvas.getContext('2d');
    let pos = {}, imgData = null, rgb = {};
    console.log('getColor');

    if ( dragging || fire ) {
      // The canvas is updated so the circle changes position.
      this.setCanvas({ canvas, e });

      // Color position
      pos = this.canvasMousePosition({canvas, e, initial:{ x, y }, offset: fl.offset });
      
      // .getImageData(x, y, width, height) - This method returns an array of the rgb values [r,g,b,a,r,g,b,a,r...] for each pixel
      imgData = ctx.getImageData(pos.x, pos.y, 1, 1).data;
      rgb = { r: imgData[0], g: imgData[1], b: imgData[2] };

      // Mouse position and color updated
      this.updateMousePosition(e);
      updateColor({ rgb, hue:gradient, pos });
    }
  }

  setCanvas = ({canvas, e, hex}) => {
    this.setGradientColor(canvas, hex);
    this.drawCircle(canvas, e);
  }

  setGradientColor = (canvas, hex) => {  // The default hex color is the color stored in state. 
    hex = hex || this.state.gradient.hex;
    const context = canvas.getContext('2d');
    console.log('setGradientColor');
    
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
  }

  drawCircle = (canvas, e) => {
    const { color:{ x, y }, gradient:{ hex }} = this.state;
    const { focusLayer: fl } = this.props;
    const context = canvas.getContext('2d');
    console.log('drawCircle');

    // Arc values
    const pos = this.canvasMousePosition({canvas, e, initial:{ x, y }, offset: fl.offset });
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
      x = x < 0 ? 0 : x > canvas.width-1 ? canvas.width-1 : x;
      y = y < 0 ? 0 : y > canvas.height  ? canvas.height  : y;
    }

    return { x, y };
  }

  selectColor = (canvas, frgd_bkgd) => {
    const { hex } = this.state.color.hue;
    this.props.selectColor(frgd_bkgd);
    this.setCanvas({canvas, hex });
  }

  detectCanvas = (bool) => {
    this.setState({ inCanvas: bool});
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
    // console.log('COLOR:', this.state.color);
    console.log('GRADIENT:', this.state.gradient);
    // console.log('COLOR Initiated:', this.state.initiated);
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
        color={ this.props.color }
        selectColor={ this.selectColor }
        focusLayer={ this.props.focusLayer } />
    );
  }
}

const mapStateToProps = (state) => ({
  color: state.color,
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
