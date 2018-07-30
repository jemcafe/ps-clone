import React, { Fragment as Aux } from 'react';

// constants
import toolbarItems from '../tabs/toolbarItems';
import tabGroups from '../tabs/tabGroups';

// Components
import ToolBar from '../containers/ToolBarCntr';
import ToolSettings from '../containers/ToolSettingsCntr';
import Projects from '../containers/ProjectsCntr';
import CanvasArea from '../containers/CanvasAreaCntr';
import Panel from '../containers/PanelCntr';

import Windows from '../containers/Windows/WindowsCntr';
// import NewProject from '../containers/NewProjectCntr';
// import HueGradient from '../containers/HueGradientCntr';

import FocusLayer from './FocusLayer/FocusLayer';

function Layout () {
  return (
    <Aux>
    <div id="app-layout">
      <ToolBar items={toolbarItems}/>
      <section id="tool-settings">
        <ToolSettings />
      </section>
      <div id="workspace">
        <section className="panels">
          <Panel align={'L'} isTools={true} isCollapsed={true} />
        </section>
        <div id="documents">
          <Projects>
            <CanvasArea />
          </Projects>
        </div>
        <section className="panels">
          <Panel align={'R'} tabGroups={tabGroups['1']} isCollapsed={true} />
          <Panel align={'R'} tabGroups={tabGroups['2']} />
        </section>
      </div>
      <Windows />
      {/* <NewProject /> */}
      <FocusLayer />
    </div>
    </Aux>
  );
}

export default Layout;
