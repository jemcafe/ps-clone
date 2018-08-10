import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

function FocusLayer (props) {
  const { 
    focusLayer: {
      focus, 
      onMouseMove, 
      onMouseUp, 
      onMouseLeave
    },
    tools: t
  } = props;

  const classNames = {
    cursor: (
      t.tool === 'move' ? ' cursor-move' : 
      t.tool === 'hand' ? ' cursor-hand' :
      t.tool === 'eyedropper' ? ' cursor-eyedropper' :
      t.tool === 'pen' ? ' cursor-pen' :
      t.tool === 'shape' ? ' cursor-shape' :
      t.tool === 'magnify' && t.magnify.in ? ' cursor-zoom-in' : 
      t.tool === 'magnify' && t.magnify.out ? ' cursor-zoom-out' : ''
    )
  }
  
  return (
    <div>{ focus &&
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