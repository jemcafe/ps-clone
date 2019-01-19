import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

function FocusLayer (props) {
  const { 
    tools: t,
    focusLayer: {
      focus, 
      onMouseMove, 
      onMouseUp, 
      onMouseLeave
    }
  } = props;

  const classNames = {
    cursor: t[t.tool].cursor ? ` ${t[t.tool].cursor}` : ''
  }
  
  return (
    <div className="focus-overlay-wrapper">
      { focus &&
      <div className={`focus-overlay${classNames.cursor}`}
        onMouseMove={ onMouseMove }
        onMouseUp={ onMouseUp }
        onMouseLeave={ onMouseLeave }>
      </div> }
    </div>
  );
}

FocusLayer.propTypes = {
  focusLayer: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  focusLayer: state.focusLayer,
  tools: state.tools
});

export default connect(mapStateToProps)(FocusLayer);