import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { updateOffset } from '../redux/reducer/focusLayer/actions';

import Panel from '../components/Panel/Panel';

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
      tabGroups: prev.tabGroups.map((e, i) => {
        e.isHidden = true;
        return e;
      }), 
      isCollapsed: !prev.isCollapsed 
    }));
  }

  togglePanel = (panelIndex) => {
    this.setState(prev => ({
      tabGroups: prev.tabGroups.map((e, i) => {
        if (panelIndex === i) e.isHidden = true;
        return e;
      })
    }));
  }

  changeTab = (panelIndex, tabIndex) => {
    this.setState(prev => ({ 
      tabGroups: prev.tabGroups.map((e, i) => {

        if ( i === panelIndex ) {
          if ( e.tab === tabIndex ) {
            e.isHidden = !e.isHidden;
          } else {
            e.tab = tabIndex;
            e.isHidden = false;
          }
        } else {
          e.isHidden = true;
        }
        return e;

      })
    }));
  }

  render () {
    return (
      <Panel
        align={this.props.align}
        isTools={this.props.isTools}
        isCollapsed={this.state.isCollapsed}
        tabGroups={this.state.tabGroups} 
        togglePanels={this.togglePanels}
        togglePanel={this.togglePanel}
        changeTab={this.changeTab}
        updateOffset={this.props.updateOffset}/>
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