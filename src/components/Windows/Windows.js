import React from 'react';
import PropTypes from 'prop-types';

import NewProject from '../../containers/Windows/NewProjectCntr';
import ColorPicker from '../../containers/Windows/ColorPickerCntr';

function Windows ({windows: w}) {
  return (
    <div className="windows">
      { w.newProject && <NewProject /> }
      { w.colorPicker && <ColorPicker /> }
    </div>
  );
}

Windows.propTypes = {
  windows: PropTypes.object.isRequired
}

export default Windows;