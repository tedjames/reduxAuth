import React, { Component } from 'react'
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import * as actions from '../../actions';

class Signin extends Component {
  handleFormSubmit({ email, password }) {
    // Need to do something to log user in
    this.props.signinUser({ email, password });
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
        <button action="submit" className="btn btn-primary">Sign in</button>
      </form>
    );
  }
}

// Create a form called 'signin' with an email and password fields
// Assign this form to the Signin component
const SigninForm = reduxForm({
  form: 'signin',
  fields: ['email', 'password']
})(Signin);

// Export SigninForm, the redux-form connected component, instead of the Signin component
export default connect(null, actions)(SigninForm);
