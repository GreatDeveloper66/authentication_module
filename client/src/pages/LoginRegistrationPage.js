import React, { useState } from 'react';
import { Tabs, Tab, Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import AuthCalls from '../api_calls/authCalls';
import { FaEnvelope, FaLock } from 'react-icons/fa';
const registerUser = AuthCalls.registerUser;
const loginUser = AuthCalls.loginUser;

const LoginRegistrationPage = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [loginError, setLoginError] = useState(''); 
  const [registerError, setRegisterError] = useState('');
  const [passwordValidation, setPasswordValidation] = useState(null);
  const [confirmPasswordValidation, setConfirmPasswordValidation] = useState(null);
  const [emailValidation, setEmailValidation] = useState(null);
  const [ showForgotPasswordModal, setShowForgotPasswordModal ] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
  const modalStyle = { backgroundColor: 'rgba(0, 0, 0, 0.5)', position: 'fixed', top: 0, left: 0, bottom: 0,diplay: 'flex', justifyContent: 'center', alignItems: 'center'};


  const navigate = useNavigate();
  const redStyle = { color: 'red' };
  const greenStyle = { color: 'green' };

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validatePassword = (password) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,20}$/.test(password);
  
  const validateConfirmPassword = (password) => password === registerPassword;

  const getPasswordMask = (length) => '*'.repeat(length);

  const validUser = () => emailValidation && passwordValidation && confirmPasswordValidation;

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleRegistrationEmailChange = (e) => {
    const emailValue = e.target.value;
    setEmailValidation(validateEmail(emailValue)); 
    setRegisterEmail(emailValue);
  };

  const handleRegistrationPasswordChange = (e) => {
    const passwordValue = e.target.value;
    setPasswordValidation(validatePassword(passwordValue));
    setRegisterPassword(passwordValue);
  };

  const handleRegistrationPasswordConfirmationChange = (e) => {
    const passwordValue = e.target.value;
    setConfirmPassword(passwordValue);
    setConfirmPasswordValidation(validateConfirmPassword(passwordValue));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const userBody = {
      email: loginEmail,
      password: loginPassword,
      rememberMe
    };
    const response = await loginUser(userBody);
    if(response.status === 500) {
      setLoginError('Internal Server Error');
    } else if(response.status === 401) {
      setLoginError('Authentication failed');
    } else {
      localStorage.setItem('token', response.token);
      navigate('/dashboard');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const userBody = {
      name: registerName,
      email: registerEmail,
      password: registerPassword
    };
    const response = await registerUser(userBody);
    if(response.status === 500) {
      setRegisterError('Internal Server Error');
    } else if(response.status === 400) {
      setRegisterError('User not created');
    } else {
      localStorage.setItem('token', response.token);
      navigate('/dashboard');
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    const response = await forgotPassword(forgotPasswordEmail);
    setShowForgotPasswordModal(false);

  };

  return (
    <Container className="my-5 d-flex justify-content-center align-items-center">
    <Card className="shadow-lg p-4" style={{ width: '500px' }}>
      <Tabs activeKey={activeTab} onSelect={(tab) => handleTabChange(tab)} id="auth-tabs">
        <Tab eventKey="login" title="Sign In">
          <Card.Header style={redStyle}>
            <h5 className="text-center text-light m-0">Sign In</h5>
          </Card.Header>
          <Card.Body className="border border-top-0 border-end-0 border-start-0">
            <Form onSubmit={handleLogin}>
              <InputGroup className="mb-3">
                <InputGroup.Prepend>
                  <InputGroup.Text style={{ backgroundColor }}><FaEnvelope color="white" /></InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control type="email" placeholder="Email address" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} />
              </InputGroup>
              <InputGroup className="mb-3">
                <InputGroup.Prepend>
                  <InputGroup.Text style={{ backgroundColor }}><FaLock color="white" /></InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control type="password" placeholder="Password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} />
              </InputGroup>
              <Button variant="primary" type="submit" className="w-100">
                Sign in
              </Button>
              {loginError && <p className="text-danger mt-3">{loginError}</p>} 
            </Form>
          </Card.Body>
        </Tab>
        <Tab eventKey="register" title="Sign Up">
          <Card.Header style={greenStyle}>
            <h5 className="text-center text-light m-0">Sign Up</h5>
          </Card.Header>
          <Card.Body className="border border-top-0 border-end-0 border-start-0">
            <Form onSubmit={handleRegister}>
              <InputGroup className="mb-3">
                <InputGroup.Prepend>
                  <InputGroup.Text style={{ backgroundColor }}><FaEnvelope color="white" /></InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control type="text" placeholder="Name" value={registerName} onChange={(e) => setRegisterName(e.target.value)} />
              </InputGroup>
              <InputGroup className="mb-3">
                <InputGroup.Prepend>
                  <InputGroup.Text style={{ backgroundColor }}><FaEnvelope color="white" /></InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control type="email" placeholder="Email address" value={registerEmail} onChange={handleRegistrationEmailChange} style={ emailValidation ? greenStyle : redStyle }/>
                </InputGroup>
                <InputGroup className="mb-3">
                  <InputGroup.Prepend>
                    <InputGroup.Text style={{ backgroundColor }}><FaLock color="white" /></InputGroup.Text>
                  </InputGroup.Prepend>
                  <Form.Control type="password" placeholder="Password" value={registerPassword} onChange={handleRegistrationPasswordChange} style={passwordValidation ? greenStyle : redStyle} />
                </InputGroup>
                <InputGroup className="mb-3">
                  <InputGroup.Prepend>
                    <InputGroup.Text style={{ backgroundColor }}><FaLock color="white" /></InputGroup.Text>
                  </InputGroup.Prepend>
                  <Form.Control type="password" placeholder="Confirm Password" value={confirmPassword} onChange={handleRegistrationPasswordConfirmationChange} style={confirmPasswordValidation ? greenStyle : redStyle } />
                </InputGroup>
                <Button variant="primary" type="submit" className="w-100" disabled={!validUser()}>
                  Sign up
                </Button>
                {registerError && <p className="text-danger mt-3">{registerError}</p>}
              </Form>
            </Card.Body>
          </Tab>
        </Tabs>
        <Modal show={showForgotPasswordModal} onHide={() => setShowForgotPasswordModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Enter email to send forget password link</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formBasicEmail">
                <Form.Control type="email" placeholder="Enter email" value={forgotPasswordEmail} onChange={(e) => setForgotPasswordEmail(e.target.value)} />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleForgotPassword}>
              Send
            </Button>
          </Modal.Footer>
        </Modal>
      </Card>
    </Container>
  );
};


export default LoginRegistrationPage;
