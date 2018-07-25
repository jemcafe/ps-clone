import React from 'react';
import PropTypes from 'prop-types';

import NewProject from '../../containers/Windows/NewProjectCntr';

function Windows ({windows: w}) {
  return (
    <div className="windows">
      { w.newProject && <NewProject /> }
    </div>
  );
}

Windows.propTypes = {
  windows: PropTypes.object.isRequired
}

export default Windows;