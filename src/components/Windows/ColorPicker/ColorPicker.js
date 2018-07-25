import React from 'react';
import PropTypes from 'prop-types';

import Window from '../Window/Window';
import HueGradient from '../../../containers/HueGradientCntr';

function ColorPicker (props) {
  const { 
    // state,
    // handleChange,
    changeColor,
    closeWindow
  } = props;

  return (
    <Window name={'Color Picker'}>
      <form id="color-picker" onSubmit={ changeColor }>
        {/* COLOR PICKER */}
        <HueGradient colorPair={false} slider={false} />
        <div className="btns">
          <div className="submit-btn"><input type="submit" value="OK"/></div>
          <button className="btn" onClick={ closeWindow }>Cancel</button>
        </div>
      </form>
    </Window>
  );
}

ColorPicker.propTypes = {
  handleChange: PropTypes.func.isRequired
}

export default ColorPicker;