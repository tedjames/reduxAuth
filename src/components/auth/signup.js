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
    if (this.props.errorMessage) {
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
          {email.touched && email.error && <div className="error">{email.error}</div>}
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
          {passwordConfirm.touched && passwordConfirm.error && <div className="error">{passwordConfirm.error}</div>}
        </fieldset>
        {this.renderAlert()}
        <button action="submit" className="btn btn-primary">Sign up</button>
      </form>
    );
  }
}

function validate(formProps) {
  const errors = {};
  const { email, password, passwordConfirm } = formProps;

  if (password !== passwordConfirm) {
    errors.password = 'Passwords must match'
  }

  if (!email) {
    errors.email = 'Please enter an email'
  }

  if (!password) {
    errors.password = 'Please enter a password'
  }

  if (!passwordConfirm) {
    errors.passwordConfirm = 'Please confirm password'
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
