import React, { useState } from 'react';
// prop type validation
import PropTypes from 'prop-types';
// redux hooks
import { useDispatch, useSelector } from 'react-redux';
// react bootstrap components
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// redux actions imported
import { setActions } from '../../redux/features/orgUnitSlice';

function Credential({
  serviceName,
  loginName,
  divisionName,
  unitName,
  password,
}) {
  // dispatch assigned the value of the useDispatch hook
  const dispatch = useDispatch();
  // local state variables declared for edit functionality
  const [service, setService] = useState(serviceName);
  const [username, setUsername] = useState(loginName);
  const [passwordState, setPassword] = useState(password);
  const [serviceEdit, toggleServiceEdit] = useState(false);
  const [usernameEdit, toggleUsernameEdit] = useState(false);
  const [passwordEdit, togglePasswordEdit] = useState(false);
  // useSelector hook used to sync with redux store state values
  const management = useSelector(
    (state) => state.orgData.loggedUser.roles.management
  );
  const admin = useSelector((state) => state.orgData.loggedUser.roles.admin);
  const dataStatus = useSelector((state) => state.orgData.status);
  /**
   * handle(input)Change function
   * each handles function fires a local state setFunction
   * that sets the local state to the event value
   */
  const handleServiceChange = (e) => {
    setService(e.target.value);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  /**
   * handleSubmit function
   * submits the updated service credentials to the database
   * token is retrieved from the localStorage
   * payload object is assigned the props and local state as attributes
   * the fetch request is wrapped in a try catch block for error handling
   * the headers contains the token
   * and the body contains the payload
   * if successful
   * the user is alerted and the setActions action is fired
   */
  const handleSubmit = async () => {
    const token = localStorage.getItem('token');
    const payload = {
      orgUnit: unitName,
      division: divisionName,
      targetServiceName: serviceName,
      credentials: {
        serviceName: service,
        loginName: username,
        password: passwordState,
      },
    };
    const response = await fetch('/units/edit/credentials', {
      method: 'PUT',
      headers: {
        authorization: `${token}`,
        'Content-type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    const result = await response.json();
    if (result.status === 'ok') {
      alert(`Succesfully updated ${serviceName} `);
      dispatch(setActions());
    }
  };
  /**
   * editDisplayService function
   * the next display function duplicate logic, so the logic will be explained thoroughly here
   * two conditionals are used to determine firstly if the user is management or an admin
   * secondly to see if the user wants to edit the service
   * if so,
   * an input field and submit button is returned with an onChange event and onClick event
   * if not an edit button
   * if the user is not an admin or management nothing is returned
   * @returns an Edit button or input field and submit button
   */
  const editDisplayService = () => {
    if ((management || admin) && serviceEdit === false) {
      return (
        <button
          type="button"
          className="btn btn-warning btn-edit"
          onClick={() => toggleServiceEdit(!serviceEdit)}
        >
          Edit
        </button>
      );
    }
    if ((management || admin) && serviceEdit) {
      return (
        <Row>
          <input type="text" value={service} onChange={handleServiceChange} />
          <button
            type="button"
            className="btn btn-warning btn-edit"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </Row>
      );
    }
  };
  // editDisplayUsername function displays the username edit button or input field and submit button
  const editDisplayUsername = () => {
    if ((management || admin) && usernameEdit === false) {
      return (
        <button
          type="button"
          className="btn btn-warning btn-edit"
          onClick={() => toggleUsernameEdit(!usernameEdit)}
        >
          Edit
        </button>
      );
    }
    if ((management || admin) && usernameEdit) {
      return (
        <Row>
          <input type="text" value={username} onChange={handleUsernameChange} />
          <button
            type="button"
            className="btn btn-warning btn-edit"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </Row>
      );
    }
  };
  // editDisplayPassword function displays the password edit button or input field and submit button
  const editDisplayPassword = () => {
    if ((management || admin) && passwordEdit === false) {
      return (
        <button
          type="button"
          className="btn btn-warning btn-edit"
          onClick={() => togglePasswordEdit(!passwordEdit)}
        >
          Edit
        </button>
      );
    }
    if ((management || admin) && passwordEdit) {
      return (
        <Row>
          <input
            type="password"
            value={passwordState}
            onChange={handlePasswordChange}
          />
          <button
            type="button"
            className="btn btn-warning btn-edit"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </Row>
      );
    }
  };
  /**
   * bootstrap styling & components are used in conjunction with custom styling for layout
   * each credential data is displayed with props as text value
   * further JSX conditional is used to check if the data has been retrieved and then the display controllers are called
   */
  return (
    <div className="credentials-container-outer">
      <Row className="credentials-container-inner">
        <Col className="col-md-auto">
          <h5>Service: {serviceName}</h5>
          {dataStatus === 'success' && editDisplayService()}
        </Col>
        <Col className="col-md-auto">
          <h5>username: {loginName}</h5>
          {dataStatus === 'success' && editDisplayUsername()}
        </Col>
        <Col className="col-md-auto">
          <h5>password: {password}</h5>
          {dataStatus === 'success' && editDisplayPassword()}
        </Col>
      </Row>
    </div>
  );
}
// prop type validation
Credential.propTypes = {
  serviceName: PropTypes.string.isRequired,
  loginName: PropTypes.string.isRequired,
  divisionName: PropTypes.string.isRequired,
  unitName: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
};
export default Credential;
