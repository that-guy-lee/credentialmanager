import React, { useState } from 'react';
// redux hooks
import { useDispatch } from 'react-redux';
// bootstrap components
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
// redux actions
import { toggleAdd } from '../../redux/features/dashboardSlice';
import { setActions } from '../../redux/features/orgUnitSlice';
/**
 *
 * @returns a form that the user can use to add credentials
 */
function AddCredential() {
  // dispatch assigned the value of the useDispatch hook
  const dispatch = useDispatch();
  // local state variables used for the form submission details
  const [orgUnit, setOrgUnit] = useState('');
  const [division, setDivision] = useState('');
  const [service, setService] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  /*
   *handle(input)Change functions
   each handle function below fires
   the corresponding local state set function
   and sets the local state to the event value
   * */
  const handleOrgUnitChange = (e) => {
    setOrgUnit(e.target.value);
  };

  const handleDivisionChange = (e) => {
    setDivision(e.target.value);
  };

  const handleServiceChange = (e) => {
    setService(e.target.value);
  };

  const handleLoginChange = (e) => {
    setLogin(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  /**
   * handleSubmission function
   * this function submits the users entry data to the database
   * the users token is retrieved from the local storage
   * payload object is assigned the local state variables as attributes
   * the fetch request is wrapped in a try catch block for error handling
   * fetch request contains the token as header and payload as body
   * if successful,
   * the user is alerted and the setActions & toggleAdd actions are fired
   * if not the error is logged to the console
   */
  const handleSubmission = async () => {
    const token = localStorage.getItem('token');
    const payload = {
      orgUnit,
      division,
      credentials: {
        serviceName: service,
        loginName: login,
        password,
      },
    };
    try {
      const response = await fetch('units/add/credentials', {
        method: 'POST',
        headers: {
          authorization: `${token}`,
          'Content-type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (result.status === 'ok') {
        alert('Successfully added credential');
        dispatch(setActions());
        dispatch(toggleAdd());
      }
    } catch (err) {
      console.log(err);
    }
  };
  /**
   * bootstrap components are used for layout with some custom styling
   * each Form.Control (input field) has an onChange event that fires,
   * the corresponding handle(input)change function
   * the submit button has an onClick event that fires the handleSubmission function
   */
  return (
    <Col className="col-md-8 border">
      <Row className="justify-content-center p-5">
        <Col className="col-md-5 ui-form-outer">
          <Form className="p-5">
            <Form.Group className="mb-3" controlId="formOrgUnit">
              <Form.Label> Organisational Unit</Form.Label>
              <Form.Control
                type="text"
                placeholder="news management"
                onChange={handleOrgUnitChange}
              />
              <Form.Text className="text-muted">
                please enter one of: news management, software reviews, hardware
                reviews, opinion publishing
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formDivision">
              <Form.Label> Division</Form.Label>
              <Form.Control
                type="text"
                placeholder="finance"
                onChange={handleDivisionChange}
              />
              <Form.Text className="text-muted">
                please enter one of: it, management, finance, development,
                public relations, writing, security, research, admin,
                proofreaders
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formService">
              <Form.Label> Service:</Form.Label>
              <Form.Control
                type="text"
                placeholder="github"
                onChange={handleServiceChange}
              />
              <Form.Text className="text-muted">
                please enter the name of the service
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formLoginName">
              <Form.Label> Login name:</Form.Label>
              <Form.Control
                type="text"
                placeholder="cooltechcode"
                onChange={handleLoginChange}
              />
              <Form.Text className="text-muted">
                please enter the login name used for the service
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label> Password:</Form.Label>
              <Form.Control
                type="password"
                placeholder="cooltechcode"
                onChange={handlePasswordChange}
              />
              <Form.Text className="text-muted">
                please enter the password used for the service
              </Form.Text>
            </Form.Group>
            <Button variant="primary" type="button" onClick={handleSubmission}>
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Col>
  );
}

export default AddCredential;
