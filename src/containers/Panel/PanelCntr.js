import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { updateOffset } from '../../redux/reducer/focusLayer/actions';
import { openWindow } from '../../redux/reducer/windows/actions';
// import {  } from '../redux/reducer/projects/actions';

import Panel from '../../components/Panel/Panel';

class PanelCntr extends Component {
  constructor (props) {
    super(props);
    this.state = { 
      tabGroups: this.props.tabGroups || [],
      isCollapsed: this.props.isCollapsed || false
    }
  }

  togglePanels = () => {
    this.setState(prev => ({ 
      tabGroups: prev.tabGroups.map((tabGroup, i) => {
        tabGroup.isHidden = true;
        return tabGroup;
      }), 
      isCollapsed: !prev.isCollapsed 
    }));
  }

  togglePanel = (panelIndex) => {
    this.setState(prev => ({
      tabGroups: prev.tabGroups.map((tabGroup, i) => {
        if (panelIndex === i) tabGroup.isHidden = true;
        return tabGroup;
      })
    }));
  }

  toggleMenu = (panelIndex, tabIndex) => {
    this.setState(prev => ({
      tabGroups: prev.tabGroups.map((tabGroup, i) => {
        if ( panelIndex === i ) {
          tabGroup.tabs.map((tab, j) => {
            tab.optionsVisible = !tab.optionsVisible;
            return tab;
          });
        } else {
          tabGroup.tabs.map(tab => {
            tab.optionsVisible = false;
            return tab;
          });
        }
        return tabGroup;
      })
    }));
  }

  changeTab = (panelIndex, tabIndex) => {
    this.setState(prev => ({ 
      tabGroups: prev.tabGroups.map((tabGroup, i) => {
        if ( panelIndex === i ) {
          if ( tabGroup.tabIndex === tabIndex ) {
            tabGroup.isHidden = !tabGroup.isHidden;
          } else {
            tabGroup.tabIndex = tabIndex;
            tabGroup.isHidden = false;
          }
        } else {
          tabGroup.isHidden = true;
        }
        return tabGroup;
      })
    }));
  }

  updateOffset = ({refs, tabGroup}) => {
    const { tab_group: t } = refs;
    const { isCollapsed } = this.state;
    const { updateOffset } = this.props;

    if ( tabGroup.id === 3 ) {
      if (t && isCollapsed) {
        // console.log('focusLayer offset', { width: t.offsetLeft-222, height: t.offsetTop });
        updateOffset({ width: t.offsetLeft-218, height: t.offsetTop });
      } else {
        // console.log('focusLayer offset', { width: 0, height: 0 });
        updateOffset({ width: 0, height: 0 });
      }
    }
  }

  handleAction = (option, panelIndex, tabIndex) => {
    if (option.window) openWindow(option.window);
    console.log(option);
    this.toggleMenu(panelIndex, tabIndex);
  }

  render () {
    console.log('tabGroups', this.state.tabGroups);
    return (
      <Panel
        align={ this.props.align }
        isTools={ this.props.isTools }
        isCollapsed={ this.state.isCollapsed }
        tabGroups={ this.state.tabGroups } 
        togglePanels={ this.togglePanels }
        togglePanel={ this.togglePanel }
        toggleMenu={ this.toggleMenu }
        changeTab={ this.changeTab }
        updateOffset={ this.updateOffset }
        handleAction={ this.handleAction } />
    );
  }
}

PanelCntr.propTypes = {
  align: PropTypes.string.isRequired,
  tools: PropTypes.bool,
  isCollapsed: PropTypes.bool,
  tabGroups: PropTypes.array
}

const mapStateToProps = (state) => ({
  focusLayer: state.focusLayer
});

const mapDispatchToProps = {
  updateOffset
}

export default connect(mapStateToProps, mapDispatchToProps)(PanelCntr);