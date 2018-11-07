
import React, { Component } from 'react';

// helpers
import { RGBtoHex, HSLtoRGB, HSVtoRGB } from '../helpers/colorConversion';

// redux
import { connect } from 'react-redux';
import { selectColor, updateColor } from '../redux/reducer/color/actions';
// import { updateGradientHue, updateGradientDimensions, updateColorPosition } from '../redux/reducer/colorPickers/actions';
import { focusCanvas, unfocusCanvas } from '../redux/reducer/focusLayer/actions';

// components
import HueGradient from '../components/HueGradient/HueGradient';

class HueGradientCntr extends Component {
  constructor (props) {
    super(props);
    const { color: c } = this.props;
    this.state = {
      // hue: {
      //   hue: 0,
      //   rgb: { r: 255, g: 0, b: 0 },
      //   hex: '#ff0000',
      // },
      // hsv: { h: 0, s: 0, v: 0 },
      // rgb: { r: 0, g: 0, b: 0 },
      // x: 0,
      // y: 0,
      // width: 0,
      // height: 0,
      // ...cp.hueGradient,
      color: c[c.selected],
      // hue: c[selected],
      // rgb: { r: 255, g: 0, b: 0 },
      // hex: '#ff0000',
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      mouse: { 
        x: 0, 
        y: 0 
      },
      dragging: false,
      inCanvas: false
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { color: c } = nextProps;
    const color = { ...c[c.selected] };
    const x = Math.round((color.hsv.s * prevState.width) * 0.01);
    const y = Math.round(((100 - color.hsv.v) * prevState.height) * 0.01);

    return { color, x, y };
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

      // updateGradientDimensions({
      //   width: c.width, 
      //   height: c.height,
      //   x: Math.round((color.hsv.s * c.width) * 0.01),
      //   y: Math.round(((100 - color.hsv.v) * c.height) * 0.01),
      // });

      this.setState(prev => ({
        width: c.width,
        height: c.height,
        x: Math.round((prev.color.hsv.s * c.width) * 0.01),
        y: Math.round(((100 - prev.color.hsv.v) * c.height) * 0.01)
      }));
      
      this.setCanvas({ canvas: c });
    }
  }

  changeHue = (canvas, value) => {
    const { color } = this.state;
    const { updateColor } = this.props;
    
    value = +value
    const rgb = HSLtoRGB({ h: value, s: 100, l: 50 });
    const hex = RGBtoHex(rgb);
    // const hsv = { ...color.hsv };
    // hsv.h = value;
    // console.log('changeHue', hsv)

    updateColor({ 
      hsv: { h: value }
    });

    // The color and canvas are updated
    // updateGradientHue(rgb);
    // this.getColor({ canvas, fire: true });
    this.setCanvas({ canvas, hex });

    // this.setState(prev => ({
    //   hsv: { h: value, s: prev.hsv.s, b: prev.hsv.v },
    //   rgb: HSVtoRGB({ h: value, s: prev.hsv.s, b: prev.hsv.v }),
    //   hue: { hue: value, rgb, hex } 
    // }));
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
    const { x, y, dragging } = this.state;
    const { updateColor, focusLayer: fl } = this.props;
    const ctx = canvas.getContext('2d');
    let pos = null;

    if ( dragging || fire ) {
      // // The canvas is updated so the circle changes position.
      // this.setCanvas({ canvas, e });

      // // Color position
      // pos = this.canvasMousePosition({canvas, e, initial:{ x, y }, offset: fl.offset });
      // console.log('canvasMousePosition', pos)
      // // .getImageData(x, y, width, height) - This method returns an array of the rgb values [r,g,b,a,r,g,b,a,r...] for each pixel
      // imgData = ctx.getImageData(pos.x, pos.y, 1, 1).data;
      // rgb = { 
      //   r: imgData[0], 
      //   g: imgData[1], 
      //   b: imgData[2] 
      // };
      // hue = { 
      //   rgb: gradient.rgb, 
      //   hex: gradient.hex, 
      //   hue: gradient.hue 
      // };

      // this.setState(prev => {
      //   const hsv = {
      //     h: prev.hsv.h,
      //     s: Math.ceil((pos.x * 100)/prev.width),
      //     v: Math.round(100 - ((pos.y * 100)/prev.height))
      //   }
      //   const rgb = HSVtoRGB(hsv);
      //   const x = Math.round((hsv.s * prev.width) * 0.01);
      //   const y = Math.round(((100 - hsv.v) * prev.height) * 0.01);
      //   return { hsv, rgb, x, y };
      // });

      // Color position
      pos = this.canvasMousePosition({
        canvas,
        e,
        initial: { x, y },
        offset: fl.offset
      });

      // Mouse position
      this.updateMousePosition(e);

      this.setState(prev => {
        const s = Math.round((pos.x * 100)/prev.width);
        const v = Math.round(100 - ((pos.y * 100)/prev.height));

        updateColor({
          hsv: { s, v }
        });

        return {
          x: Math.round((s * prev.width) * 0.01), 
          y: Math.round(((100 - v) * prev.height) * 0.01)
        }
      });

      // The canvas is updated so the circle changes position.
      this.setCanvas({ canvas, e });
    }
  }

  setCanvas = ({canvas, e, hex}) => {
    console.log('setCanvas')
    this.setGradientColor(canvas, hex);
    this.drawCircle(canvas, e);
  }

  setGradientColor = (canvas, hex) => {  // The default hex color is the color stored in state. 
    hex = hex || this.state.color.hue.hex;
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
    const { x, y, color:{hue:{ hex }} } = this.state;
    const { focusLayer: fl } = this.props;
    const context = canvas.getContext('2d');

    // Arc values
    const pos = this.canvasMousePosition({
      canvas,
      e,
      initial: { x, y },
      offset: fl.offset
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

  // selectColor = ({canvas, frgd_bkgd}) => {
  //   this.props.selectColor(frgd_bkgd);
  //   this.setCanvas({canvas});
  // }

  render() {
    // console.log('COLOR:', this.state.color.rgb);
    // console.log('COLOR:', this.state.color);
    // console.log('GRADIENT:', this.state.gradient);
    // console.log('COLOR Initiated:', this.state.initiated);
    // console.log('COLOR', this.props.color.frgd);
    // console.log('COLOR', this.props.color.bkgd);
    // console.log('STATE', this.state);
    // console.log('HUE: ', this.state.hue);
    // console.log('HSV: ', this.state.hsv);
    // console.log('RGB: ', this.state.rgb);
    // console.log('x: ', this.state.x);
    // console.log('y: ', this.state.y);
    // console.log('mouse: ', this.state.mouse);
    // console.log('width: ', this.state.width);
    // console.log('height: ', this.state.height);
    // console.log('state HUE: ', this.state.hue);
    
    return (
      <HueGradient
        state={ this.state }
        initCanvas={ this.initCanvas }
        engage={ this.engage }
        changeHue={ this.changeHue }
        setCanvas={ this.setCanvas }
        updateMousePosition={ this.updateMousePosition }
        detectCanvas={ this.detectCanvas }
        color={ this.props.color }
        selectColor={ this.props.selectColor }
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
  // updateGradientHue,
  // updateGradientDimensions,
  focusCanvas,
  unfocusCanvas
};

export default connect(mapStateToProps, mapDispatchToProps)(HueGradientCntr);
