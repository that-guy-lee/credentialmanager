import React, { useState } from 'react';
import PropTypes from 'prop-types';
// redux hook imported
import { useDispatch } from 'react-redux';
// bootstrap components imported
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// local components imported
import Role from './Role';
import Permissions from './Permissions';
// redux action setUserActions imported
import { setUserActions } from '../../../redux/features/usersSlice';

/**
 * User component
 * the primary display component for the users data of the dashboard
 * @param {*} props id, name, email, roles, permissions, isArrNotEmpty props
 * @returns users data in components
 */
function User({ id, name, email, roles, permissions, isArrNotEmpty }) {
  // dispatch assigned the value of the useDispatch hook
  const dispatch = useDispatch();
  // local state variable
  const [orgUnit, setOrgUnit] = useState('');
  const [toggleAddOrg, setToggleOrg] = useState(false);
  // key variable used in some additional key logic assignment
  let key = 0;
  /**
   * handleSetUser function
   * this function is used to update the user role to user
   * duplicate logic is used in the handleSetManagement & handleSetAdmin,
   * so will be thoroughly explained here and diversion will be explained for the other functions
   * token is retrieved from the localStorage
   * payload variable is declared with two attributes,
   * id (from props)
   * newRoles with user attribute set to true, management set to false, and admin to false
   * a try catch block then wraps the fetch request for error handling
   * the fetch request,
   * headers contains the JWT token and the body contains the payload parsed to JSON
   * response is assigned the result of the request
   * if successful,
   * the user is alerted and the setUserActions is fired
   * if not,
   * the error is caught and the user is alerted
   */
  const handleSetUser = async () => {
    const token = localStorage.getItem('token');
    const payload = {
      id,
      newRoles: {
        user: true,
        management: false,
        admin: false,
      },
    };
    try {
      const response = await fetch('user/edit/roles', {
        method: 'PUT',
        headers: { authorization: token, 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (result.status === 'ok') {
        alert(`${name} role set to user`);
        dispatch(setUserActions());
      }
    } catch (err) {
      alert(err.message);
    }
  };
  /**
   * handleSetManagement
   * sets the users role to management
   * same logic as handleSetUser,
   * however the payload has management as true and user as false
   */
  const handleSetManagement = async () => {
    const token = localStorage.getItem('token');
    const payload = {
      id,
      newRoles: {
        user: false,
        management: true,
        admin: false,
      },
    };
    try {
      const response = await fetch('user/edit/roles', {
        method: 'PUT',
        headers: { authorization: token, 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      console.log(result);
      if (result.status === 'ok') {
        alert(`${name} role set to management`);
        dispatch(setUserActions());
      }
    } catch (err) {
      alert(err.message);
    }
  };
  /**
   * handleSetAdmin
   * sets the users role to admin
   * same logic as the other role handles, however,
   * payload - admin is true and the other attributes is false
   */
  const handleSetAdmin = async () => {
    const token = localStorage.getItem('token');
    const payload = {
      id,
      newRoles: {
        user: false,
        management: false,
        admin: true,
      },
    };
    try {
      const response = await fetch('user/edit/roles', {
        method: 'PUT',
        headers: { authorization: token, 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      console.log(result);
      if (result.status === 'ok') {
        alert(`${name} role set to admin`);
        dispatch(setUserActions());
      }
    } catch (err) {
      alert(err.message);
    }
  };
  /**
   * addOrgUnit function
   * this function adds a organisational unit the users permissions when called
   * token is extracted from the localStorage
   * payload object created with id, orgUnit props as attributes
   * try catch block is wrapped around the fetch request for error handling
   * response is assigned the result of the fetch request,
   * the request has the token in the header,
   * and the body of the request contains the payload,
   * result is assigned the parsed response form json
   * if successful,
   * the user is alerted,
   * the setUserActions action is fired
   * and the setToggleOrg is fired with a payload of false
   * errors are caught and alerted to the user
   */
  const addOrgUnit = async () => {
    const token = localStorage.getItem('token');
    const payload = {
      id,
      orgUnit,
    };
    try {
      const response = await fetch('user/assign/org-unit', {
        method: 'PUT',
        headers: { authorization: token, 'Content-type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (result.status === 'ok') {
        alert(`${name} given permissions for ${orgUnit}`);
        dispatch(setUserActions());
        setToggleOrg(false);
      }
    } catch (err) {
      alert(err.message);
    }
  };
  /**
   * handleOrgUnitChange function
   * sets the local state orgUnit value to the event value
   * @param {*} e event
   */
  const handleOrgUnitChange = (e) => {
    setOrgUnit(e.target.value);
  };
  /**
   * Bootstrap components & styling are used for layout
   * custom styling is also used for some layout
   * the id, name, & email props are displayed to the user
   * Three buttons are added to allow the user to change the roles of user
   * all three buttons have onClick events that fire the handleSet(role) functions
   * Below the buttons the roles are displayed
   * Using JSX conditional the isArrNotEmpty prop function is called on the roles array
   * if not empty,
   * a Role component is rendered with props
   * Below the Roles the Permission section continues
   * First,
   * the user is displayed a add organisational unit button,
   * that has an onClick event that toggles a state to display an input field and submit button
   * the input field has an onChange event that updates local state and the button an onClick event
   * that fires a function to submit the new organisational unit.
   * Secondly,
   * JSX conditional logic is used with the ArrIsNotEmpty function that checks the permissions prop array is not empty
   * if not empty, the permission array is iterated over and on each iteration a permissions component is render with props
   * */
  return (
    <Container fluid className="users-container-outer">
      <Row className="user-ui-outer">
        <Row className="p-1">
          <Col className="col-md-4">
            <h5>id:</h5> <p>{id}</p>
          </Col>
          <Col className="col-md-4">
            <h5>name:</h5> <p>{name}</p>
          </Col>
          <Col className="col-md-4">
            <h5>email:</h5> <p>{email}</p>
          </Col>
        </Row>
        <Row className="users-container-title">
          <h4 className="text-center">Roles:</h4>
        </Row>
        <Row className="justify-content-center p-3">
          <Col className="col-md-auto">
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSetUser}
            >
              set User
            </button>
          </Col>
          <Col className="col-md-auto">
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSetManagement}
            >
              set Management
            </button>
          </Col>
          <Col className="col-md-auto">
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSetAdmin}
            >
              set Admin
            </button>
          </Col>
        </Row>
        <Row className="pb-5">
          {isArrNotEmpty(roles) && (
            <Role
              key={`${id}${(key += 1)}`}
              id={id}
              role={roles.user}
              roleName="user"
            />
          )}
          {isArrNotEmpty(roles) && (
            <Role
              key={`${id}${(key += 1)}`}
              id={id}
              role={roles.management}
              roleName="management"
            />
          )}
          {isArrNotEmpty(roles) && (
            <Role
              key={`${id}${(key += 1)}`}
              id={id}
              role={roles.admin}
              roleName="admin"
            />
          )}
        </Row>
        <Row className="users-container-title">
          <h4>Permissions</h4>
        </Row>
        <Row className="add-org-button-container">
          <Col className="col-md-12">
            {toggleAddOrg ? (
              <>
                <input
                  type="text"
                  value={orgUnit}
                  onChange={handleOrgUnitChange}
                  placeholder="news management"
                />
                <p className="text-muted">
                  Either one of: news management, software reviews, hardware
                  reviews, opinion publishing
                </p>
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={addOrgUnit}
                >
                  submit
                </button>
              </>
            ) : (
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => setToggleOrg(!toggleAddOrg)}
              >
                add Organisational Unit
              </button>
            )}
          </Col>
        </Row>
        {isArrNotEmpty(permissions) &&
          permissions.map((perm) => (
            <Permissions
              key={`${id}${(key += 1)}`}
              id={id}
              orgUnit={perm.orgUnit}
              divisions={perm.divisions}
              isArrNotEmpty={isArrNotEmpty}
            />
          ))}
      </Row>
    </Container>
  );
}
// User propType validation
User.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  roles: PropTypes.shape({
    user: PropTypes.bool.isRequired,
    management: PropTypes.bool.isRequired,
    admin: PropTypes.bool.isRequired,
  }).isRequired,
  permissions: PropTypes.array.isRequired,
  isArrNotEmpty: PropTypes.func.isRequired,
};

export default User;
