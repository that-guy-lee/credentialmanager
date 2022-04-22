import React, { useState } from 'react';
// redux hooks imported
import { useDispatch, useSelector } from 'react-redux';
// react bootstrap components
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
// actions imported from the userSlice & homepageSlice
import {
  setDefault,
  setName,
  setEmail,
  setPassword,
  setPermissions,
  removePermissions,
} from '../../redux/features/userSlice';
import { toggleComponent } from '../../redux/features/homepageSlice';
/**
 * Register component
 * used to register a user to the application
 * @returns a register form for the user
 */
function Register() {
  // dispatch set to the useDispatch hook
  const dispatch = useDispatch();
  // useSelector hook used to sync with redux states (of user input)
  const password = useSelector((state) => state.user.password);
  const userProfile = useSelector((state) => state.user);
  // local state for the confirm password entry
  const [confirmPassword, setConfirmPassword] = useState('');
  // local state used for org unit check boxes
  const [newsManage, setNewsManage] = useState(false);
  const [softwareRev, setSoftwareRev] = useState(false);
  const [hardwareRev, setHardwareRev] = useState(false);
  const [opinionPublish, setOpinionPublish] = useState(false);
  /**
   * handleNameChange function
   * assigns the target value to the nameInput variable
   * uses the dispatch to fire the setName action with the nameInput variable as payload
   * @param {*} e event
   */
  const handleNameChange = (e) => {
    const nameInput = e.target.value;
    dispatch(setName(nameInput));
  };
  /**
   * handleEmailChange function
   * assigns the target value to the emailInput variable
   * uses the dispatch to fire the setEmail action with the emailInput variable as payload
   * @param {*} e event
   */
  const handleEmailChange = (e) => {
    const emailInput = e.target.value;
    dispatch(setEmail(emailInput));
  };
  /**
   * handlePasswordChange function
   * assigns the target value to the passwordInput variable
   * uses the dispatch to fire the setPassword action with the passwordInput variable as payload
   * @param {*} e event
   */
  const handlePasswordChange = (e) => {
    const passwordInput = e.target.value;
    dispatch(setPassword(passwordInput));
  };
  /**
   * handleConfirmPassChange
   * calls the setConfirmPassword local state function with target value as param
   * @param {*} e event
   */
  const handleConfirmPassChange = (e) => {
    setConfirmPassword(e.target.value);
  };
  /**
   * handleOrgUnitChange function
   * assigns a nested object with the event target value to the orgUnit key as value, to the payload variable.
   * Conditionals are used to distinguish between the four org unit checkbox values & events
   * Each org unit has two conditionals
   * if the local state of the checkbox was true, meaning checked when fired,
   * the user is un-checking the org unit, so dispatch is used to fire the removePermissions action with the target value as payload
   * the local state is then set to false and the function is exited with a return
   * if the local state of the checkbox was false, meaning un un checked when fired,
   * the user is checking the box, so dispatch fires the setPermissions with the payload variable as payload.
   * the local state is then set to true and the function is then exited with a return
   * @param {*} e event
   * @returns exits function
   */
  const handleOrgUnitChange = (e) => {
    const payload = {
      orgUnit: e.target.value,
      divisions: [
        {
          division: 'new',
        },
      ],
    };

    if (e.target.value === 'news management' && newsManage) {
      dispatch(removePermissions(e.target.value));
      setNewsManage(false);
      return;
    }
    if (e.target.value === 'news management' && newsManage === false) {
      dispatch(setPermissions(payload));
      setNewsManage(true);
      return;
    }
    if (e.target.value === 'software reviews' && softwareRev) {
      dispatch(removePermissions(e.target.value));
      setSoftwareRev(false);
      return;
    }
    if (e.target.value === 'software reviews' && softwareRev === false) {
      dispatch(setPermissions(payload));
      setSoftwareRev(true);
      return;
    }
    if (e.target.value === 'hardware reviews' && hardwareRev) {
      dispatch(removePermissions(e.target.value));
      setHardwareRev(false);
      return;
    }
    if (e.target.value === 'hardware reviews' && hardwareRev === false) {
      dispatch(setPermissions(payload));
      setHardwareRev(true);
      return;
    }
    if (e.target.value === 'opinion publishing' && opinionPublish) {
      dispatch(removePermissions(e.target.value));
      setOpinionPublish(false);
      return;
    }
    if (e.target.value === 'opinion publishing' && opinionPublish === false) {
      dispatch(setPermissions(payload));
      setOpinionPublish(true);
    }
  };
  /**
   * passwordCompare function
   * Checks if the two given passwords match.
   * @param {String} entered the first password entered
   * @param {String} confirmation the second password to compare
   * @returns Boolean indicating if the passwords match or not.
   */
  const passwordCompare = (entered, confirmation) => {
    if (entered === confirmation) {
      return true;
    }
    alert('Password mismatch');
    return false;
  };
  /**
   * submitUser function
   * registers the user on the application
   * a fetch post request is wrapped in a try catch block for error handling
   * the result of the request with the user object as body is assigned to the response variable
   * the result variable is assigned the parsed response variable from JSON
   * if successful,
   * the user is alerted of success
   * dispatch is used to set the user state to default and toggle the login component returning the user to the login 'view'
   * if unsuccessful,
   * the user is alerted of the error
   * other errors are caught in the catch block and also alerts the user
   * @param {Object} user the user data as an object.
   */
  const submitUser = async (user) => {
    try {
      const response = await fetch('auth/register', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(user),
      });
      const result = await response.json();
      if (result.status === 'ok') {
        alert('Registration successful');
        dispatch(setDefault());
        dispatch(toggleComponent());
      }
      if (result.status === 'error') {
        alert(result.message);
      }
    } catch (err) {
      alert(err.message);
    }
  };
  /**
   * handleSubmit function
   * calls the passwordCompare function on the password state, and the confirmPassword state
   * if matched the submitUser function is called with the userProfile state as its param
   */
  const handleSubmit = () => {
    if (passwordCompare(password, confirmPassword)) {
      submitUser(userProfile);
    }
  };
  /**
   * JSX display
   * Bootstrap components are used for layout with bootstrap styling
   * some custom CSS classes are added
   * each form control has a handle function which is called when their onChange event is fired
   * checkboxes also have the checked attribute added with the corresponding local state as value
   * the register button has an onClick event that calls the handleSubmit function when fired
   */
  return (
    <Container fluid className="register-container">
      <Row className="justify-content-center p-5">
        <Col className="col-md-3 ui-form-outer">
          <Form className="p-5">
            <Form.Group className="mb-3" controlId="formUserName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Jane"
                onChange={handleNameChange}
              />
              <Form.Text className="text-muted">
                Ensure to use your first name.
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                onChange={handleEmailChange}
              />
              <Form.Text className="text-muted">
                We will never share your email with anyone else.
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={handlePasswordChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPasswordConfirm">
              <Form.Label> Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={handleConfirmPassChange}
              />
            </Form.Group>
            <Form.Text className="text-muted">
              Please select your organisational unit(s)
            </Form.Text>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check
                type="checkbox"
                label="News Management"
                value="news management"
                checked={newsManage}
                onChange={handleOrgUnitChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check
                type="checkbox"
                label="Software Reviews"
                value="software reviews"
                checked={softwareRev}
                onChange={handleOrgUnitChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check
                type="checkbox"
                label="Hardware reviews"
                value="hardware reviews"
                checked={hardwareRev}
                onChange={handleOrgUnitChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check
                type="checkbox"
                label="Opinion publishing"
                value="opinion publishing"
                checked={opinionPublish}
                onChange={handleOrgUnitChange}
              />
            </Form.Group>
            <Button variant="primary" type="button" onClick={handleSubmit}>
              Register profile
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Register;
