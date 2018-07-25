import React from 'react';
// import PropTypes from 'prop-types';

import NewProject from '../../containers/NewProjectCntr';

function Windows (props) {
  const {
    windows: w
  } = props;

  return (
    <div className="windows">
      { w.newProject && <NewProject /> }
    </div>
  );
}

// Windows.propTypes = {
//   windows: PropTypes.object.isRequired
// }

export default Windows;