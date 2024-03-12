import React, { Component, useState } from 'react';

export default class LoginPage extends Component {
    setEmail = useState('');
    setPassword = useState('');
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
            <h3>Sign In</h3>
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
            <div>
                <label>Password</label>
                <input
                type="password"
                className="form-control"
                value={password}
                onChange={handlePasswordChange}
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
        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
        <p className="forgot-password text-right">
          Forgot <a href="#">password?</a>
        </p>
        </form>
        </div>
        );
    }
    }