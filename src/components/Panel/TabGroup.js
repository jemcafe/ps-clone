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
      tabGroup: { 
        className, 
        tabs = [], 
        tabIndex = 0, 
        isHidden = true 
      },
      isCollapsed = false,
      togglePanel,
      toggleMenu,
      changeTab,
      handleAction
    } = this.props;

    const styles = {
      panel: !isCollapsed ? {
        // flex: 1,
        height: '50%',
        minHeight: '100px'
      } : null,
      container: isCollapsed ? {
        position: 'absolute',
        width: `${216}px`,
        transform: `translate(-${218}px, 0)`  // plus 2 for the border
      } : {
        height: '100%'
      },
      content: isCollapsed ? {
        height: '274px'
      } : null,
      menu: tabs[tabIndex].optionsVisible ? {
        display: 'block',
        borderRadius: '4px'
      } : null
    }

    const classNames = {
      panel: className ? ` ${className}` : '',
      tab: (index) => (
        (tabIndex === index) ? 'selected-tab' : 
        (index < tabIndex)   ? 'left-tab' : 
        (index > tabIndex)   ? 'right-tab' : ''
      ),
      selectedIcon: (index) => (
        (!isHidden && (tabIndex === index)) ? ' selected' : ''
      )
    }

    const tabList = tabs.map((tab, i) => (
      <li key={i} className={ classNames.tab(i) } onClick={() => changeTab(index, i)}>{ tab.name }</li>
    ));

    const options = tabs[tabIndex].options.map((option, i) => (
      <li key={i} className="option" onClick={() => handleAction(option, index, tabIndex)}>{ option.name }</li>
    ));

    const content = tabs[tabIndex].content;

    const iconList = tabs.map((tab, i) => (
      <li key={i} className={ classNames.selectedIcon(i) } onClick={() => changeTab(index, i)}>
        <i className={ tab.icon }></i>
      </li>
    ));

    return (
      <div ref="tab_group" className={`tab-group${classNames.panel}`} style={ styles.panel }>

        { (!isHidden || !isCollapsed) &&
        <div className="container" style={ styles.container }>
          <nav>
            <ul className="tabs">{ tabList }</ul>
            <div>
              { isCollapsed && 
              <div className="double-angle-btn" onClick={() => togglePanel(index)}>
                <i className="icon-angle-double-right"></i>
              </div> }

              <div className="option-menu">
                <div className="menu-btn" onClick={() => toggleMenu(index, tabIndex)} onBlur={() => toggleMenu(index, tabIndex)}>
                  <i className="icon-bars"></i>
                </div>
                <ul className="menu" style={ styles.menu }>
                  { options }
                  <li className="option">Close</li>
                  <li className="option">Close Tab Group</li>
                </ul>
              </div>
            </div>
          </nav>
          <div className="content" style={ styles.content }>
            { content }
          </div>
        </div> }

        { isCollapsed &&
        <div className="icon-tabs">
          <div></div>
          <ul>
            { iconList }
          </ul>
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

// import React, { Component } from 'react';
// import PropTypes from 'prop-types';

// class TabGroup extends Component {
//   componentDidMount () {
//     const { refs } = this;
//     const { tabGroup, updateOffset } = this.props;
//     window.addEventListener("resize", () => updateOffset({refs, tabGroup}));
//     updateOffset({refs, tabGroup});
//   }

//   componentWillUnmount () {
//     const { refs } = this;
//     const { tabGroup, updateOffset } = this.props;
//     window.addEventListener("resize", () => updateOffset({refs, tabGroup}));
//   }

//   render () {
//     const { 
//       index,
//       tabGroup: { 
//         className, 
//         tabs = [], 
//         tabIndex = 0, 
//         isHidden = true 
//       },
//       isCollapsed = false,
//       togglePanel,
//       toggleMenu,
//       changeTab,
//       handleAction
//     } = this.props;

//     const styles = {
//       panel: !isCollapsed ? {
//         height: '50%',
//         minHeight: '100px'
//       } : null,
//       container: isCollapsed ? {
//         position: 'absolute',
//         width: '216px',
//         transform: `translate(-36px, 0)`
//       } : {
//         height: '100%'
//       },
//       content: isCollapsed ? {
//         height: '274px'
//       } : null,
//       menu: tabs[tabIndex].optionsVisible ? {
//         display: 'block',
//         borderRadius: '4px'
//       } : null
//     }

//     const classNames = {
//       panel: className ? ` ${className}` : '',
//       tab: (index) => (
//         (tabIndex === index) ? 'selected-tab' : 
//         (index < tabIndex)   ? 'left-tab' : 
//         (index > tabIndex)   ? 'right-tab' : ''
//       ),
//       selectedIcon: (index) => (
//         (!isHidden && (tabIndex === index)) ? ' selected' : ''
//       )
//     }

//     const tabList = tabs.map((tab, i) => (
//       <li key={i} className={ classNames.tab(i) } onClick={() => changeTab(index, i)}>{ tab.name }</li>
//     ));

//     const options = tabs[tabIndex].options.map((option, i) => (
//       <li key={i} className="option" onClick={() => handleAction(option, index, tabIndex)}>
//         <div className="option-name">{ option.name }</div>
//       </li>
//     ));

//     const content = tabs[tabIndex].content;

//     const tabGroup = (
//       <div className="container" style={ styles.container }>
//         <nav>
//           <ul className="tabs">
//             { tabList }
//           </ul>
//           <div>
//             { isCollapsed && 
//             <div className="double-angle-btn" onClick={() => togglePanel(index)}>
//               <i className="icon-angle-double-right"></i>
//             </div> }

//             <div className="option-menu">
//               <div className="menu-btn" 
//                 onClick={() => toggleMenu(index, tabIndex)} 
//                 onBlur={() => toggleMenu(index, tabIndex)}>
//                 <i className="icon-bars"></i>
//               </div>
//               <ul className="menu" style={ styles.menu }>
//                 { options }
//               </ul>
//             </div>
//           </div>
//         </nav>
//         <div className="content" style={ styles.content }>
//           { content }
//         </div>
//       </div>
//     );

//     const iconList = tabs.map((tab, i) => (
//       <li key={i} className={ classNames.selectedIcon(i) } onClick={() => changeTab(index, i)}>
//         <i className={ tab.icon }></i>
//       </li>
//     ));

//     return (
//       <div ref="tab_group" className={`tab-group${ classNames.panel }`} style={ styles.panel }>

//         { !isCollapsed && tabGroup }

//         { isCollapsed &&
//           <div className="icon-tabs">
//             { !isHidden &&
//             <div style={{display:'flex', justifyContent:'flex-end'}}>
//               { tabGroup }
//             </div> }
//             <div className="bar"></div>
//             <ul>
//               { iconList }
//             </ul>
//           </div> }

//       </div>
//     );
//   }
// }

// TabGroup.propTypes = {
//   index: PropTypes.number.isRequired,
//   tabGroup: PropTypes.object.isRequired,
//   isCollapsed: PropTypes.bool.isRequired,
//   togglePanel: PropTypes.func.isRequired,
//   changeTab: PropTypes.func.isRequired
// }

// export default TabGroup;