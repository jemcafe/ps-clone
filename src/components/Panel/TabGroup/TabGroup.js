import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TabGroup extends Component {
  componentDidMount () {
    const { refs } = this;
    const { tabGroup, updateOffset } = this.props;
    window.addEventListener("resize", () => updateOffset({refs, tabGroup}));
    updateOffset({refs, tabGroup});
  }

  componentWillUnmount () {
    const { refs } = this;
    const { tabGroup, updateOffset } = this.props;
    window.addEventListener("resize", () => updateOffset({refs, tabGroup}));
  }

  render () {
    const { 
      index,
      tabGroup:{ className, tabs = [], tab = 0, isHidden = true },
      isCollapsed = false,
      togglePanel,
      changeTab
    } = this.props;

    const styles = {
      panel: !isCollapsed ? {
        // flex: 1,
        height: '50%',
        minHeight: '100px'
      } : null,
      container: isCollapsed ? {
        position: 'absolute',
        minWidth: `${220}px`,
        transform: `translate(-${222}px, 0)`  // plus 2 for the border
      } : {
        height: '100%'
      },
      content: isCollapsed ? {
        // minHeight: '200px',
        height: '274px'
      } : null
    }

    const classNames = {
      panel: (
        className ? ` ${className}` : ''
      ),
      tab: (index) => (
        (tab === index) ? 'selected-tab' : 
        (index < tab)   ? 'left-tab' : 
        (index > tab)   ? 'right-tab' : ''
      ),
      icon: (tabName) => (
        (tabName === 'Color')     ? 'icon-color' :
        (tabName === 'Swatches')  ? 'icon-swatches' :
        (tabName === 'Layers')    ? 'icon-layers' :
        (tabName === 'History')   ? 'icon-history' :
        (tabName === 'Character') ? 'icon-character' :
        (tabName === 'Paragraph') ? 'icon-paragraph' : ''
      ),
      selectedIcon: (index) => (
        (!isHidden && (tab === index)) ? ' selected' : ''
      )
    }

    const tabList = tabs.map((e, i) => (
      <li key={i} className={ classNames.tab(i) } onClick={() => changeTab(index, i)}>{ e.name }</li>
    ));

    const menuOptions = tabs[tab].menu.map((e, i) => (
      <option key={i}>{ e }</option>
    ));

    const content = tabs[tab].content;

    const iconList = tabs.map((e, i) => (
      <li key={i} className={ classNames.selectedIcon(i) } onClick={() => changeTab(index, i)}>
        <i className={ classNames.icon(e.name) }></i>
      </li>
    ));

    return (
      <div ref="tab_group" className={`tab-group${ classNames.panel }`} style={ styles.panel }>
        { (!isHidden || !isCollapsed) &&
        <div className="container" style={ styles.container }>
          <nav>
            <ul className="tabs">{ tabList }</ul>
            <div>
              { isCollapsed && 
              <div className="double-angle-btn" onClick={() => togglePanel(index)}><i className="icon-angle-double-right"></i></div> }

              <div className="menu">
                <div><i className="icon-bars"></i></div>
                <select>
                  { menuOptions }
                  <optgroup label="Close">
                    <option>Close</option>
                    <option>Close Tab Group</option>
                  </optgroup>
                </select>
              </div>
            </div>
          </nav>
          <div className="content" style={styles.content}>
            { content }
          </div>
        </div> }

        { isCollapsed &&
        <div className="icon-tabs">
          <div></div>
          <ul>{ iconList }</ul>
        </div> }
      </div>
    );
  }
}

TabGroup.propTypes = {
  index: PropTypes.number.isRequired,
  tabGroup: PropTypes.object.isRequired,
  isCollapsed: PropTypes.bool.isRequired,
  togglePanel: PropTypes.func.isRequired,
  changeTab: PropTypes.func.isRequired
}

export default TabGroup;