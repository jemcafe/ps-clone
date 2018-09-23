import React from 'react';

// constants
import toolbarItems from '../content/toolbarItems';
import tabGroups from '../content/tabGroups';

// Components
import ToolBar from '../containers/ToolBarCntr';
import ToolSettings from '../containers/ToolSettingsCntr';
import Projects from '../containers/ProjectsCntr';
import Panel from '../containers/PanelCntr';
import Windows from '../containers/Windows/WindowsCntr';
import FocusLayer from './FocusLayer/FocusLayer';

// import NewProject from '../containers/NewProjectCntr';
// import HueGradient from '../containers/HueGradientCntr';

function Layout () {
  return (
    <div id="app-layout">
      <ToolBar items={toolbarItems} />
      <section id="tool-settings">
        <ToolSettings />
      </section>
      <div id="workspace">
        <section className="panels">
          <Panel align={'L'} isTools={true} isCollapsed={true} />
        </section>
        <div id="documents">
          <Projects />
        </div>
        <section className="panels">
          <Panel align={'R'} tabGroups={tabGroups['1']} isCollapsed={true} />
          <Panel align={'R'} tabGroups={tabGroups['2']} />
        </section>
      </div>
      <Windows />
      <FocusLayer />
    </div>
  );
}

export default Layout;
