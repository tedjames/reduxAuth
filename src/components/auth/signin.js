import React, { Component } from 'react'
import { compose } from "redux"
import { connect } from "react-redux"
import { reduxForm } from 'redux-form'
import * as actions from '../../actions'

class Signin extends Component {
  constructor(props) {
    super(props);

    this.renderAlert = this.renderAlert.bind(this);
  }
  handleFormSubmit({ email, password }) {
    // Need to do something to log user in
    this.props.signinUser({ email, password });
  }

  renderAlert() {
    const { errorMessage } = this.props;
    if (errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong> {errorMessage}
        </div>
      );
    }
  }

  render() {
    const { handleSubmit, fields: { email, password }} = this.props;
    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <fieldset className="form-group">
          <label>Email:</label>
          <input {...email} className="form-control" />
        </fieldset>
        <fieldset className="form-group">
          <label>Password:</label>
          <input {...password} type="password" className="form-control" />
        </fieldset>
        {this.renderAlert()}
        <button action="submit" className="btn btn-primary">Sign in</button>
      </form>
    );
  }
}

const mapStateToProps = state => {
  return {
    errorMessage: state.auth.error
  };
};

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({
    form: 'signin',
    fields: ['email', 'password'],
  })
)(Signin)
