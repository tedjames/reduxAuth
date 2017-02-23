/*
Higher order component for handling authenticated routes
*/

import React, { Component } from 'react'
import { connect } from 'react-redux'

export default (ComposedComponent) => {
  class Authentication extends Component {
    static contextTypes = {
      router: React.PropTypes.object
    }

    // Authentication Handler - if user is not authenticated, redirect them to index
    componentWillMount() {
      if (!this.props.authenticated) {
        this.context.router.push('/');
      }
    }

    // Authentication Listener - when state.authenticated is modified, check for auth status and redirect if false
    componentWillUpdate(nextProps) {
      if (!nextProps.authenticated) {
        this.context.router.push('/');
      }
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  const mapStateToProps = state => {
    return {
      authenticated: state.auth.authenticated
    };
  };

  // Wrap our HOC within the react-redux connect HOC to obtain redux store data with mapStateToProps
  return connect(mapStateToProps)(Authentication);
}
