import React, { Component } from 'react';

import { connect } from 'react-redux';
import { saveImageData, updateScroll } from '../redux/reducer/projects/actions';
import { focusCanvas, unfocusCanvas } from '../redux/reducer/focusLayer/actions';

import CanvasArea from '../components/CanvasArea/CanvasArea';

class CanvasAreaCntr extends Component {
  constructor (props) {
    super(props);
    const { projects, tab } = this.props.projects;
    const project = projects[tab];

    this.state = {
      project: project,
      layers: project.layers.reverse(),
      width: 0,
      height: 0,
      mouse: { x: 0, y: 0 },
      canvasMouse: { x: 0, y: 0 },
      canvasMouseOffset: { x: 0, y: 0 },
      dragging: false,
      brushPoints: [],
      canvasIsBigger: false,
      inCanvas: false
    }
  }

  // New lifecycle that replaces componentWillReceiveProps. 
  // It must return a new state. It does not have access to "this"
  static getDerivedStateFromProps(nextProps, prevState) {
    const { projects, tab } = nextProps.projects;
    const p = projects[tab];

    return {
      project: {...p},
      layers: [...p.layers].reverse(),
      canvasIsBigger: (p.width.size > prevState.width || p.height.size > prevState.height)
    };
  }

  initCanvas = (refs) => {
    this.updateDimensions(refs);
    this.updateScroll(refs);
    this.putCanvasColor(refs);
    this.putLayerImageData(refs);
  }

  updateDimensions = (refs) => {
    const { canvasArea: ca, canvasWrapper: cw } = refs;
    const { updateScroll } = this.props;
    
    if (cw && ca) {
      this.setState(prev => ({ 
        width: ca.clientWidth, 
        height: ca.clientHeight, 
        canvasMouseOffset: {
          x: ca.scrollLeft - cw.offsetLeft,
          y: ca.scrollTop - cw.offsetTop
        }
      }));
      updateScroll({ x: ca.scrollLeft, y: ca.scrollTop });
    }
  }

  updateScroll = (refs) => {
    const { canvasArea: ca, canvasWrapper: cw } = refs;

    if (cw && ca) {
      ca.scrollLeft = this.state.project.scroll.x;
      ca.scrollTop = this.state.project.scroll.y;
    }
  }

  putCanvasColor = (refs) => { 
    const { background } = this.state.project;
    const { layer_1: canvas } = refs;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = background;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  putLayerImageData = (refs) => {
    const { layers } = this.state;

    for (let i = 0; i < layers.length; i++) {
      const canvas = refs[`layer_${i+1}`];
      const ctx = canvas.getContext('2d');
      const layer = layers[i];

      if (layer.imgData) {
        ctx.putImageData(layer.imgData, 0, 0);
      }
    }
  }

  updateMousePosition = ({ nativeEvent: e }) => {
    if (e) {
      this.setState(prev => {
        const mouse = {
          x: e.clientX + window.pageXOffset,
          y: e.clientY + window.pageYOffset
        };
        const canvasMouse = {
          x: mouse.x + prev.canvasMouseOffset.x,
          y: mouse.y + prev.canvasMouseOffset.y
        };
        return { mouse, canvasMouse };
      });
    }
  }

  engage = (canvas, e) => {
    const { focusCanvas } = this.props;

    this.setState({ dragging: true });

    this.putPoint(canvas, e, true);  // A point is drawn

    focusCanvas({
      focus: 'canvas', 
      onMouseMove: (e) => this.putPoint(canvas, e),
      onMouseUp: () => this.disengage(canvas),
      onMouseLeave: () => this.disengage(canvas)
    });
  }

  disengage = (canvas) => {
    const { unfocusCanvas, saveImageData } = this.props;
    const ctx = canvas.getContext('2d');
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    this.setState({ dragging: false, brushPoints: [] });

    ctx.beginPath(); // The path is reset, so the paths aren't connected

    unfocusCanvas();
    saveImageData(imgData);
  }

  putPoint = (canvas, e, fire) => {
    const { canvasMouse, dragging, brushPoints } = this.state;
    const { tool: t, paintBrush, eraser } = this.props.tools;
    const { color_1, color_2 } = this.props.color;
    const context = canvas.getContext('2d');

    let tool = null
    let color = null;
    this.updateMousePosition(e)  // The location of the point is the mouse' position

    // The selected tool (brush or eraser)
    if (t === 'paintBrush') {
      tool = paintBrush;
      color = color_1.hex;
    } else if (t === 'eraser') {
      tool = eraser;
      color = color_2.hex;
    }

    if ( tool && (dragging || fire) ) {
      context.lineWidth = parseInt(tool.radius, 10) * 2;
      context.lineCap = 'round';
      context.lineJoin = 'round';
      context.strokeStyle = color;
      context.fillStyle = color;

      if (brushPoints.length < 3) {
        context.beginPath();
        context.arc(canvasMouse.x, canvasMouse.y, context.lineWidth / 2, 0, Math.PI * 2, !0);
        context.fill();
        context.closePath();
      } else {
        context.beginPath();
        context.moveTo(brushPoints[0], brushPoints[0]);

        for (let i = 1; i < brushPoints.length - 2; i++) {
          const c = (brushPoints[i].x + brushPoints[i + 1].x) / 2;
          const d = (brushPoints[i].y + brushPoints[i + 1].y) / 2;
          
          context.quadraticCurveTo(brushPoints[i].x, brushPoints[i].y, c, d);
        }

        // Draw Stroke
        context.stroke();
      }

      // Brush position points are saved for smooth lines
      this.saveBrushPoints(canvasMouse);
    }
  }

  saveBrushPoints = (canvasMouse) => {
    this.setState(prev => {
      const brushPoints = prev.brushPoints;
      brushPoints.push(canvasMouse);
      return { brushPoints };
    });
  }

  detectCanvas = (bool) => {
    this.setState({ inCanvas: bool });
  }

  render() {
    // console.log('CanvasArea project:', this.state.project);
    // console.log('CanvasArea dimensions:', this.state.width, this.state.height);
    // console.log('CanvasArea offset:', this.state.offset);
    // console.log('CanvasArea canvasIsBigger:', this.state.canvasIsBigger);
    // console.log('CanvasArea inCanvas:', this.state.inCanvas);
    // console.log('CanvasArea hasLayers:', this.state.hasLayers);
    // console.log('CanvasArea mouse:', this.state.mouse);
    // console.log('CanvasArea canvasMouse:', this.state.canvasMouse);
    // console.log('CanvasArea canvasMouseOffset:', this.state.canvasMouseOffset);

    return (
      <CanvasArea 
        project={ this.state.project }
        layers={ this.state.layers }
        hasLayers={ this.state.layers.length > 0 }
        mouse={ this.state.mouse }
        canvasMouse={ this.state.canvasMouse }
        // canvasIsBigger={ this.state.canvasIsBigger }
        inCanvas={ this.state.inCanvas}
        initCanvas={ this.initCanvas }
        updateDimensions={ this.updateDimensions }
        updateMousePosition={ this.updateMousePosition }
        engage={ this.engage }
        detectCanvas={ this.detectCanvas }
        tools={ this.props.tools }
        focus={ this.props.focusLayer.focus } />
    );
  }
}

const mapStateToProps = (state) => ({
  projects: state.projects,
  tools: state.tools,
  color: state.color,
  focusLayer: state.focusLayer
});

const mapDispatchToProps = {
  saveImageData,
  updateScroll,
  focusCanvas,
  unfocusCanvas
};

export default connect(mapStateToProps, mapDispatchToProps)(CanvasAreaCntr);