import React, { Fragment as Aux } from 'react';

// data
import toolbarItems from '../tabs/toolbarItems';
import tabGroups from '../tabs/tabGroups';
import projects from '../tabs/projects';

// Components
import ToolBar from '../containers/ToolBarCntr';
import ToolSettings from '../containers/ToolSettingsCntr';
import Projects from '../containers/ProjectsCntr';
import Panel from '../containers/PanelCntr';

import NewProject from '../containers/NewProjectCntr';
import HueGradient from '../containers/HueGradientCntr';

import FocusLayer from './FocusLayer/FocusLayer';

function Layout () {
  return (
    <Aux>
    <div id="app-layout">
      <ToolBar items={toolbarItems}/>
      <section>
        <ToolSettings />
      </section>
      <div id="workspace">
        <section className="panels">
          <Panel align={'L'} isTools={true} isCollapsed={true} />
        </section>
        <div id="documents">
          <Projects projects={projects}/>
        </div>
        <section className="panels">
          <Panel align={'R'} tabGroups={tabGroups['1']} isCollapsed={true} />
          <Panel align={'R'} tabGroups={tabGroups['2']} />
        </section>
      </div>
      {/* <NewProject /> */}
      <FocusLayer />
    </div>
    </Aux>
  );
}

export default Layout;
