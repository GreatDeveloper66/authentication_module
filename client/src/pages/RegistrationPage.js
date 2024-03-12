import React, { Component, useState } from 'react';

export default class RegistrationPage extends Component {
    setEmail = useState('');
    setPassword = useState('');
    setConfirmPassword = useState('');
    rememberMe = useState(false);


    handleSubmit = (event) => {
        event.preventDefault();
    };
    
    handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    
    handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value)
    }

    handleRemberMeChange = (event) => {
        rememberMe(event.target.checked);
    };

    handleSubmit = (event) => {
        event.preventDefault();
        console.log('You are submitting ' + this.state.email + ' and ' + this.state.password);
    };
     
    render() {
        return (
        <div>
            <form onSubmit={this.handleSubmit}>
            <h3>Sign Up</h3>
            <div className="mb-3">
                <label>Email</label>
                <input
                type="email"
                className="form-control"
                placeholder="**********@gmail.com"
                value={email}
                onChange={handleEmailChange}
                />
            </div>
            <div className="mb-3">
                <label>Password</label>
                <input
                type="password"
                className="form-control"
                value={password}
                onChange={handlePasswordChange}
                />
            </div>
            <div className="mb-3">
                <label>Confirm Password</label>
                <input
                type="password"
                className="form-control"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                />
            </div>
            <div className="mb-3">
          <div className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              id="customCheck1"
            />
            <label className="custom-control-label" htmlFor="customCheck1" onChange={handleRemberMeChange}>
              Remember me
            </label>
          </div>
        </div>
        <button type="submit" className="btn btn-primary btn-block">
          Sign Up
        </button>
      </form>
    </div>
  );
}
}