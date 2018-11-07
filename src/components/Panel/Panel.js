import React from 'react';
import PropTypes from 'prop-types';

// Components
import TabGroup from './TabGroup/TabGroup';
import ToolMenu from '../../containers/ToolMenuCntr';

function Panel (props) {
  const {
    isCollapsed,
    align = 'R',
    isTools = false,
    tabGroups: tg,
    togglePanels,
    togglePanel,
    toggleMenu,
    changeTab,
    updateOffset,
    handleAction
  } = props;

  const tabGroups = tg.length > 0 &&
    tg.map((tabGroup, i) => (
      <TabGroup 
        key={tabGroup.id}
        index={i}
        tabGroup={tabGroup}
        isCollapsed={isCollapsed}
        togglePanel={togglePanel}
        toggleMenu={toggleMenu}
        changeTab={changeTab}
        updateOffset={updateOffset}
        handleAction={handleAction} />
    ));

  return (
    <div className="panel">
      <div className={align === 'L' ? 'left' : 'right'}>
        { !isCollapsed 
        ? <div onClick={ togglePanels }><i className={`icon-angle-double-${align === 'L' ? 'left' : 'right'}`}></i></div>
        : <div onClick={ togglePanels }><i className={`icon-angle-double-${align === 'L' ? 'right' : 'left'}`}></i></div> }
      </div>
      
      <div className="container">
        { !isCollapsed ? tabGroups : tabGroups }
        { isTools && <ToolMenu isCollapsed={isCollapsed} /> }
      </div>
    </div>
  );
}

Panel.propTypes = {
  tabGroups: PropTypes.array.isRequired
}

export default Panel;