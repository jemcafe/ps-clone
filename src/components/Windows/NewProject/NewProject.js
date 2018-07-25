import React from 'react';
import PropTypes from 'prop-types';

import Window from '../Window/Window';

function NewProject (props) {
  const { 
    state,
    handleChange, 
    createProject,
    closeWindow
  } = props;

  return (
    <Window name={'New'}>
      <form id="new-project" onSubmit={ createProject }>
        <div className="fields-wrapper">
          <div className="field">
            <label>Name:</label>
            <input autoFocus type="text" value={state.name} onChange={(e) => handleChange({p1:'name'}, e.target.value)}/>
          </div>
          <div className="field-group">
            <div className="field">
              <label>Width:</label>
              <div className="input-wrapper">
                <input type="text" value={state.width.size} onChange={(e) => handleChange({p1:'width',p2:'size'}, e.target.value)}/>
                <select value={state.width.units} onChange={(e) => handleChange({p1:'width',p2:'units'}, e.target.value)}>
                  <option>Pixels</option>
                  <option>Inches</option>
                </select>
              </div>
            </div>
            <br/>
            <div className="field">
              <label>Height:</label>
              <div className="input-wrapper">
                <input type="text" value={state.height.size} onChange={(e) => handleChange({p1:'height',p2:'size'}, e.target.value)}/>
                <select value={state.height.units} onChange={(e) => handleChange({p1:'height',p2:'units'}, e.target.value)}>
                  <option>Pixels</option>
                  <option>Inches</option>
                </select>
              </div>
            </div>
            <br/>
            <div className="field">
              <label>Resolution:</label>
              <div className="input-wrapper">
                <input type="text" value={state.resolution.size} onChange={(e) => handleChange({p1:'resolution',p2:'size'}, e.target.value)}/>
                <select defaultValue={state.resolution.units} onChange={(e) => handleChange({p1:'resolution',p2:'units'}, e.target.value)}>
                  <option>Pixels/Inch</option>
                </select>
              </div>
            </div>
            <br/>
            <div className="field">
              <label>Color Mode:</label>
              <div className="input-wrapper">
                <select value={state.colorMode.mode} onChange={(e) => handleChange({p1:'colorMode',p2:'mode'}, e.target.value)}>
                  <option>RGB</option>
                </select>
                <select value={state.colorMode.bit} onChange={(e) => handleChange({p1:'colorMode',p2:'bit'}, e.target.value)}>
                  <option>8 bit</option>
                </select>
              </div>
            </div>
            <br/>
            <div className="field">
              <label>Background:</label>
              <div className="input-wrapper">
                <select value={state.background} onChange={(e) => handleChange({prop1:'background'}, e.target.value)}>
                  <option>White</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="confirmation-btns">
          <div className="submit-btn"><input type="submit" value="Open"/></div>
          <button className="btn" onClick={ closeWindow }>Cancel</button>
        </div>
      </form>
    </Window>
  );
}

NewProject.propTypes = {
  handleChange: PropTypes.func.isRequired
}

export default NewProject;