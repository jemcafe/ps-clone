import React, { Component } from 'react';

import { connect } from 'react-redux';
import { focusCanvas, unfocusCanvas } from '../redux/reducer/focusLayer/actions';

import Canvas from '../components/Canvas/Canvas';

class CanvasCntr extends Component {
  constructor (props) {
    super(props);
    const { projects, tab } = this.props.projects;

    this.state = { 
      project: projects[tab],
      layers: projects[tab].layers.reverse(),
      // mouse: { x: 0, y: 0 },
      offset: { top: 0, left: 0 },
      // inCanvas: false,
      dragging: false,
      brushPoints: [],
    }
  }

  // New lifecycle that replaces componentWillReceiveProps. It must return a new state. It does not have access to the "this".
  static getDerivedStateFromProps(nextProps, prevState) {
    const { projects, tab } = nextProps.projects;
    const project = projects[tab];

    return { 
      project: {...project},
      layers: [...project.layers].reverse()
    };
  }

  initCanvas = (refs) => {
    const { canvasWrapper, layer_1 } = refs;

    if (canvasWrapper) this.updateOffset(canvasWrapper);
    if (layer_1) this.setCanvasColor(layer_1);
  }

  engage = (canvas, e) => {
    this.setState({ dragging: true });
    this.putPoint(canvas, e, true);  // A point is drawn

    this.props.focusCanvas({
      focus: 'canvas', 
      onMouseMove: (e) => this.putPoint(canvas, e),
      onMouseUp: () => this.disengage(canvas),
      onMouseLeave: () => this.disengage(canvas)
    });
  }

  disengage = (canvas) => {
    this.setState({ dragging: false, brushPoints: [] });
    canvas.getContext('2d').beginPath();  // The path is reset, so the paths aren't connected

    this.props.unfocusCanvas();
  }

  putPoint = (canvas, e, fire) => {
    const context = canvas.getContext('2d');
    const { dragging, brushPoints } = this.state;
    const { tool: t, paintBrush, eraser } = this.props.tools;
    const { color_1, color_2 } = this.props.color;

    let tool = null
    let color = null;
    const mouse = this.canvasMousePosition(canvas, e);  // The location of the point is the mouse' position

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
        context.arc(mouse.x, mouse.y, context.lineWidth / 2, 0, Math.PI * 2, !0);
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
      this.saveBrushPoints(mouse);

      // The mouse position is updated
      this.props.updateMousePosition(e, true);
    }
  }

  saveBrushPoints = (mouse) => {
    this.setState(prev => {
      const brushPoints = prev.brushPoints;
      brushPoints.push({ x: mouse.x, y: mouse.y });
      return { brushPoints };
    });
  }

  setCanvasColor = (canvas) => { 
    const context = canvas.getContext('2d');
    const { background } = this.state.project;
    
    // layer color
    context.fillStyle = background;
    context.fillRect(0, 0, canvas.width, canvas.height);
  }

  updateOffset = (canvasWrapper) => {
    this.setState({ offset: {
      top: canvasWrapper.offsetTop, 
      left: canvasWrapper.offsetLeft
    }});
  }

  canvasMousePosition = (canvas, e) => {
    if (e) {
      return {
        x: e.clientX - this.state.offset.left + window.pageXOffset,
        y: e.clientY - this.state.offset.top + window.pageYOffset
      }
    }
  }

  // detectCanvas = (bool) => {
  //   this.setState({ inCanvas: bool });
  // }

  render () {
    // console.log('Canvas project:', this.props.project);
    // console.log('Canvas canvasIsBigger:', this.props.canvasIsBigger);
    // console.log('Canvas inCanvas:', this.state.inCanvas);
    // console.log('Canvas offset:', this.state.offset);

    return (
      <Canvas 
        project={ this.state.project }
        layers={ this.state.layers } 
        // inCanvas={ this.state.inCanvas }
        initCanvas={ this.initCanvas }
        engage={ this.engage }
        // detectCanvas={ this.detectCanvas }
        {...this.props} />
    );
  }
}

const mapStateToProps = (state) => ({
  projects: state.projects,
  tools: state.tools,
  color: state.color
});

const mapDispatchToProps = {
  focusCanvas,
  unfocusCanvas
};

export default connect(mapStateToProps, mapDispatchToProps)(CanvasCntr);