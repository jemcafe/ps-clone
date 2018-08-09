import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Window from '../Window/Window';

class NewProject extends Component {
  render () {
    const { 
      state,
      handleChange, 
      confirmSize,
      createProject,
      closeWindow
    } = this.props;

    return (
      <Window name={'New'}>
        <form id="new-project" onSubmit={(e) => createProject(e, this.refs.canvas)}>
          <div className="fields-wrapper">
            <div className="field">
              <label>Name:</label>
              <input autoFocus type="text" value={state.name} onChange={(e) => handleChange(e,'name')}/>
            </div>
            <div className="field-group">
              <div className="field">
                <label>Width:</label>
                <div className="input-wrapper">
                  <input type="text" value={state.width.size} onChange={(e) => handleChange(e,'width','size')} onBlur={() => confirmSize('width')}/>
                  <select value={state.width.units} onChange={(e) => handleChange(e,'width','units')}>
                    <option>Pixels</option>
                    {/* <option>Inches</option> */}
                  </select>
                </div>
              </div>
              <br/>
              <div className="field">
                <label>Height:</label>
                <div className="input-wrapper">
                  <input type="text" value={state.height.size} onChange={(e) => handleChange(e,'height','size')} onBlur={() => confirmSize('height')}/>
                  <select value={state.height.units} onChange={(e) => handleChange(e,'height','units')}>
                    <option>Pixels</option>
                    {/* <option>Inches</option> */}
                  </select>
                </div>
              </div>
              <br/>
              <div className="field">
                <label>Resolution:</label>
                <div className="input-wrapper">
                  <input type="text" value={state.resolution.size} onChange={(e) => handleChange(e,'resolution','size')} onBlur={() => confirmSize('resolution')}/>
                  <select defaultValue={state.resolution.units} onChange={(e) => handleChange(e,'resolution','units')}>
                    <option>Pixels/Inch</option>
                  </select>
                </div>
              </div>
              <br/>
              <div className="field">
                <label>Color Mode:</label>
                <div className="input-wrapper">
                  <select value={state.colorMode.mode} onChange={(e) => handleChange(e,'colorMode','mode')}>
                    <option>RGB</option>
                  </select>
                  <select value={state.colorMode.bit} onChange={(e) => handleChange(e,'colorMode','bit')}>
                    <option>8 bit</option>
                  </select>
                </div>
              </div>
              <br/>
              <div className="field">
                <label>Background:</label>
                <div className="input-wrapper">
                  <select value={state.background} onChange={(e) => handleChange(e,'background')}>
                    <option value="#ffffff">White</option>
                    <option value="transparent">Transparent</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="btns">
            <div className="submit-btn"><input type="submit" value="Open"/></div>
            <button className="btn" onClick={ closeWindow }>Cancel</button>
          </div>
          <canvas ref="canvas"/>
        </form>
      </Window>
    );
  }
}

NewProject.propTypes = {
  handleChange: PropTypes.func.isRequired
}

export default NewProject;