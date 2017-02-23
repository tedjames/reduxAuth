import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import * as actions from '../../actions'

class Signup extends Component {
  constructor(props) {
    super(props);

    this.renderAlert = this.renderAlert.bind(this);
  }
  handleFormSubmit({ email, password, passwordConfirm }) {
    this.props.signupUser({ email, password });
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
    const { handleSubmit, fields: { email, password, passwordConfirm }} = this.props;
    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <fieldset className="form-group">
          <label>Email:</label>
          <input {...email} className="form-control" />
        </fieldset>
        <fieldset className="form-group">
          <label>Password:</label>
          <input {...password} type="password" className="form-control" />
          {/* if a user touched the field and if there is an error, render this component */}
          {password.touched && password.error && <div className="error">{password.error}</div>}
        </fieldset>
        <fieldset className="form-group">
          <label>Confirm password:</label>
          <input {...passwordConfirm} type="password" className="form-control" />
        </fieldset>
        {this.renderAlert()}
        <button action="submit" className="btn btn-primary">Sign up</button>
      </form>
    );
  }
}

function validate(formProps) {
  const errors = {};

  if (formProps.password !== formProps.passwordConfirm) {
    errors.password = 'Passwords must match'
  }

  return errors;
}

const mapStateToProps = state => {
  return {
    errorMessage: state.auth.error
  };
};

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({
    form: 'signup',
    fields: ['email', 'password', 'passwordConfirm'],
    validate
  })
)(Signup)
