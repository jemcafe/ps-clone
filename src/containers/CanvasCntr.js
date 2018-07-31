import React, { Component } from 'react';

import { connect } from 'react-redux';
import { focusCanvas, unfocusCanvas } from '../redux/reducer/focusLayer/actions';

import Canvas from '../components/Canvas/Canvas';

class CanvasCntr extends Component {
  constructor (props) {
    super(props);
    this.state = { 
      layers: this.props.project.layers.reverse(),
      mouse: { x: 0, y: 0 },
      inCanvas: false,
      dragging: false,
      brushPoints: []
    }
  }

  // New lifecycle that replaces componentWillReceiveProps. It must return a new state. It does not have access to the "this".
  static getDerivedStateFromProps(nextProps, prevState) {
    return { 
      layers: [...nextProps.project.layers].reverse()
    };
  }

  engage = (canvas, e) => {
    console.log('Canvas',);
    this.setState({ dragging: true });
    this.putPoint(canvas, e, true);  // A point is drawn

    this.props.focusCanvas({
      focus: true, 
      onMouseMove: (e) => this.putPoint(canvas, e),
      onMouseUp: () => this.disengage(canvas),
      onMouseLeave: () => this.disengage(canvas)
    });
  }

  disengage = (canvas) => {
    this.setState({ inCanvas: false, dragging: false, brushPoints: [] });
    canvas.getContext('2d').beginPath();  // The path is reset, so the paths aren't connected

    this.props.unfocusCanvas();
  }

  putPoint = (canvas, e, fire) => {
    const context = canvas.getContext('2d');
    const { dragging, brushPoints } = this.state;
    const { paintBrush, eraser } = this.props.tools;
    const { color_1, color_2 } = this.props.color;

    let tool = null, color = null;
    const mouse = this.canvasMousePosition(canvas, e);  // The location of the point is the mouse' position

    // The selected tool (brush or eraser)
    if (paintBrush.selected) {
      tool = paintBrush;
      color = color_1.hex;
    } else if (eraser.selected) {
      tool = eraser;
      color = color_2.hex;
    }

    if ( tool && (dragging || fire) ) {
      context.lineWidth = tool.radius * 2;
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

      // The mouse position is set
      this.updateMousePosition(e);
    }
  }

  saveBrushPoints = (mouse) => {
    this.setState(prev => {
      const brushPoints = prev.brushPoints;
      brushPoints.push({ x: mouse.x, y: mouse.y });
      return { brushPoints };
    });
  }

  updateMousePosition = (e) => {
    if (e) {
      this.setState({ mouse: { 
        x: e.clientX + window.pageXOffset, 
        y: e.clientY + window.pageYOffset
      } });
    }
  }

  canvasMousePosition = (canvas, e) => ({
    x: e.clientX - canvas.offsetLeft + window.pageXOffset,
    y: e.clientY - canvas.offsetTop + window.pageYOffset
  })

  detectCanvas = (bool) => {
    this.setState({ inCanvas: bool });
  }

  render () {
    // console.log('Canvas project:', this.props.project);
    // console.log('Canvas canvasIsBigger:', this.props.canvasIsBigger);
    // console.log('Canvas inCanvas:', this.state.inCanvas);

    return (
      <Canvas 
        layers={this.state.layers} 
        inCanvas={ this.state.inCanvas }
        engage={ this.engage }
        // updateMousePosition={ this.updateMousePosition }
        detectCanvas={ this.detectCanvas }
        {...this.props} />
    );
  }
}

const mapStateToProps = (state) => ({
  tools: state.tools,
  color: state.color,
});

const mapDispatchToProps = {
  focusCanvas,
  unfocusCanvas
};

export default connect(mapStateToProps, mapDispatchToProps)(CanvasCntr);