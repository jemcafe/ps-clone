import React, { Component } from 'react';
// import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import Windows from '../../components/Windows/Windows';

class WindowsCntr extends Component {
  constructor (props) {
    super(props);
    this.state = { }
  }

  render () {
    return (
      <Windows {...this.props} />
    );
  }
}

const mapStateToProps = (state) => ({
  windows: state.windows
})

export default connect(mapStateToProps)(WindowsCntr);