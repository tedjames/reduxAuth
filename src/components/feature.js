import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'

class Feature extends Component {
  componentWillMount() {
    this.props.fetchMessage();
  }

  render() {
    return (
      <div>
        This is a feature
      </div>
    );
  }
}

export default connect(null, actions)(Feature);
