import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

function FocusLayer (props) {
  const { 
    focus, 
    onMouseMove, 
    onMouseUp, 
    onMouseLeave
  } = props.focusLayer;
  
  return (
    <div>{ focus &&
      <div className="focus-overlay"
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
  focusLayer: state.focusLayer
});

export default connect(mapStateToProps)(FocusLayer);