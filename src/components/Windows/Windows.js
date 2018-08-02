import React from 'react';
import PropTypes from 'prop-types';

import NewProject from '../../containers/Windows/NewProjectCntr';
import ColorPicker from '../../containers/Windows/ColorPickerCntr';

function Windows ({ windows: w }) {
  const style = {
    windows: w.isOpen ? {
      position: 'fixed',
      width: '100vw',
      height: '100vh',
      background: 'rgba(0, 0, 0, 0.4)'
    } : null
  }

  return (
    <div id="windows" style={style.windows}>
      { w.newProject && <NewProject /> }
      { w.colorPicker && <ColorPicker /> }
    </div>
  );
}

Windows.propTypes = {
  windows: PropTypes.object.isRequired
}

export default Windows;