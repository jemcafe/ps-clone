import React from 'react';
import Window from '../Window';

function NewProject (props) {
  return (
    <Window name={'New'}>
      <form onSubmit={(e) => e.preventDefault()}>
        <div>
          <div className="submit-btn">
            <input type="submit" value="Open"/>
          </div>
          <button className="btn">Cancel</button>
        </div>
      </form>
    </Window>
  );
}

export default NewProject;