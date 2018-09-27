import React from 'react';
import PropTypes from 'prop-types';
import tools from '../../constants/tools';

function ToolMenu (props) {
  const { 
    isCollapsed,
    tools: t,
    color: c,
    // colorPickers: cp
    selectTool,
    resetColors,
    swapColors,
    openWindow
  } = props;

  const classNames = {
    tools: isCollapsed ? 'tools-collapsed' : 'tools',
    tool: (e) => t.tool === e.name ? ' selected' : '',
    color: isCollapsed ? 'color-collapsed' : 'color'
  }

  return (
    <div id="tool-menu">
      <ul className={classNames.tools}>
        { tools.map((tool, i) => (
          <li key={i} title={tool.name} className={`tool${classNames.tool(tool)}`} onClick={() => selectTool(tool.name)}>
            <i className={tool.icon}></i>
          </li>
        )) }
      </ul>
      <div className={classNames.color}>
        <div>
          <div className="reset" onClick={() => resetColors()}><i className="icon-undo"></i></div>
          <div className="swap" onClick={() => swapColors()}><i className="icon-swap"></i></div>
        </div>
        <div className="colors">
          <div className="color-block">
            <div style={{background: c.bkgd.hex}} onClick={() => openWindow('colorPicker')}></div>
          </div>
          <div className="color-block">
            <div style={{background: c.frgd.hex}} onClick={() => openWindow('colorPicker')}></div>
          </div>
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