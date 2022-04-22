import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import bootstrap components
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
/**
 * Login component
 * uses bootstrap components for layout
 * provides a login window for the user
 * @returns login window for the user requiring email & password details
 */
function Login() {
  const navigate = useNavigate();
  // local state used for login credentials
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // handleEmail function sets the email state to the value of the input field
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  // handlePassword function sets the password state to the value of the input field
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  /**
   * loginHandler function
   * this function handles the login of the user
   * assigns the params to the credentials variable
   * a fetch request is wrapped in a try catch block for error handling
   * the POST request is sent with a body of the credentials variable parsed to JSON.
   * the result variable is assigned the response variable parsed from JSON
   * if successful,
   * user is alerted and the JWT token is set in localStorage
   * if unsuccessful,
   * the user is alerted with the error message
   * @param {String} userEmail the users email
   * @param {String} userPassword the users password
   */
  const loginHandler = async (userEmail, userPassword) => {
    const credentials = { email: userEmail, password: userPassword };
    try {
      const response = await fetch('auth/login', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(credentials),
      });
      const result = await response.json();
      if (result.status === 'ok') {
        alert('Login successful');
        localStorage.setItem('token', `Bearer ${result.data}`);
        navigate('/dashboard');
      }
      if (result.status === 'error') {
        alert(result.message);
      }
    } catch (err) {
      alert(err.message);
    }
  };
  /**
   * Login component JSX return
   * Bootstrap components used for layout & styling
   * some custom css used on the wrapping container & Col
   * Each form control has a onChange event that fires the corresponding handle function
   * the 'Login' button has a onClick event that fires the loginHandler function with 'email' & 'password' as params
   */
  return (
    <Container fluid className="login-container">
      <Row className="justify-content-center p-5">
        <Col className="col-md-3 ui-form-outer">
          <Form className="p-5">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                onChange={handleEmail}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={handlePassword}
              />
            </Form.Group>
            <Button
              variant="primary"
              type="button"
              onClick={() => loginHandler(email, password)}
            >
              Login
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
