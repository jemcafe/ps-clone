import React, { Component } from 'react';

class Swatches extends Component {

  render () {
    const swatches = (num) => {
      let swatches = [];
      for (let i = 0; i < num; i++) 
        swatches.push(<canvas key={i} className="swatch"/>);
      return swatches;
    }

    return (
      <div id="swatches">
        <div className="recent-wrapper">
          <ul className="recent-list">
            { swatches(12) }
          </ul>
        </div>
        <ul className="swatch-list">
          { swatches(100) }
        </ul>
      </div>
    );
  }
}

export default Swatches;