import React from 'react';
import PropTypes from 'prop-types';

function ToolMenu (props) {
  const { 
    isCollapsed,
    tools: t,
    color: c,
    selectTool,
    resetColors,
    swapColors,
    openWindow
  } = props;

  const tools = [
    { name: 'move', icon: 'icon-move' },
    { name: 'eyedropper', icon: 'icon-eyedropper' },
    { name: 'paintBrush', icon: 'icon-paint-brush' },
    { name: 'eraser', icon: 'icon-eraser' },
    { name: 'paintBucket', icon: 'icon-paint-bucket' },
    { name: 'pen', icon: 'icon-pen' },
    { name: 'shape', icon: 'icon-shape-circle' },
    { name: 'magnify', icon: 'icon-magnify' },
    { name: 'hand', icon: 'icon-hand' },
    { name: 'ellipsis', icon: 'icon-ellipsis' }
  ];

  const classNames = {
    tools: isCollapsed ? 'tools-collapsed' : 'tools',
    tool: (e) => t.tool === e.name ? ' selected' : '',
    color: isCollapsed ? 'color-collapsed' : 'color'
  }

  const listOfTools = tools.map((e, i) => {
    return <li key={i} className={`tool${classNames.tool(e)}`} title={e.name} onClick={() => selectTool(e.name)}><i className={e.icon}></i></li>
  });

  return (
    <div id="tool-menu">
      <ul className={classNames.tools}>
        { listOfTools }
      </ul>
      <div className={classNames.color}>
        <div>
          <div className="reset" onClick={ resetColors }><i className="icon-undo"></i></div>
          <div className="swap" onClick={ swapColors }><i className="icon-swap"></i></div>
        </div>
        <div className="colors">
          <div className="color-block"><div style={{background: c.color2.hex}} onClick={() => openWindow('colorPicker')}></div></div>
          <div className="color-block"><div style={{background: c.color1.hex}} onClick={() => openWindow('colorPicker')}></div></div>
        </div>
      </div>
    </div>
  );
}

ToolMenu.propTypes = {
  isCollapsed: PropTypes.bool.isRequired,
  tools: PropTypes.object.isRequired,
  color: PropTypes.object.isRequired,
  selectTool: PropTypes.func.isRequired,
  resetColors: PropTypes.func.isRequired,
  swapColors: PropTypes.func.isRequired,
  openWindow: PropTypes.func,
}

export default ToolMenu;