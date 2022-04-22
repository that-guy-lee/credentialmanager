import React, { useState } from 'react';
import PropTypes from 'prop-types';
// redux hooks imported
import { useDispatch } from 'react-redux';
// bootstrap components imported
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// local components imported
import UserDivisions from './UserDivisions';
// setUserActions redux action imported
import { setUserActions } from '../../../redux/features/usersSlice';
/**
 * Permissions component
 * Adds functionalily to remove the Organisational Unit from the user,
 * and add additional divisions permissions to the user
 * the component also renders UserDivisions components
 * @param {*} props id, orgUnit, divisions, isArrNotEmpty
 */
function Permissions({ id, orgUnit, divisions, isArrNotEmpty }) {
  // randNum function returns a random number - used in key prop mapping
  const randomNum = (min, max) => Math.random() * (max - min) + min;
  // dispatch is assigned the useDispatch hook
  const dispatch = useDispatch();
  // local state declared for the org remove & add division functionality
  const [newDivision, setNewDivision] = useState('');
  const [divInput, toggleDivInput] = useState(false);
  /**
   * handleDivisionToggle function
   * calls the toggleDivInput function with the opposite boolean value,
   * to the current as payload
   */
  const handleDivisionToggle = () => {
    toggleDivInput(!divInput);
  };
  /**
   * handleDivisionInput
   * calls the setNewDivision with the input value as payload
   * @param {*} e event
   */
  const handleDivisionInput = (e) => {
    setNewDivision(e.target.value);
  };
  /**
   * handleDivisionAdd function
   * this function adds a division to the users permission
   * token retrieved from localStorage
   * payload object is assigned attributes: id (prop), orgUnit (prop), division (localState)
   * try catch wraps the fetch request for error handling
   * the fetch request contains the token in the header and the payload in the body
   * its result is set to the response variable
   * if the request is successful,
   * the response is parsed and assigned to result
   * the user is alerted of the success and the setUserActions action is fired
   * toggleDivInput is also fired
   */
  const handleDivisionAdd = async () => {
    const token = localStorage.getItem('token');
    const payload = {
      id,
      orgUnit,
      division: newDivision,
    };
    try {
      const response = await fetch('user/assign/division', {
        method: 'PUT',
        headers: { authorization: token, 'Content-type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (result.status === 'ok') {
        alert(result.message);
        dispatch(setUserActions());
        toggleDivInput(!divInput);
      }
    } catch (err) {
      alert(err.message);
    }
  };
  /**
   * handleOrgRemove function
   * this function removes the org unit from the users permissions
   * token retrieved from local storage
   * payload object assigned id and orgUnit props as attributes
   * try catch wraps the fetch request for error handling
   * header contains the token, and body the payload
   * if successful the user is alerted and the setUserActions is fired
   * if not the user is alerted of the error
   */
  const handleOrgRemove = async () => {
    const token = localStorage.getItem('token');
    const payload = {
      id,
      orgUnit,
    };
    try {
      const response = await fetch('user/remove/org-unit', {
        method: 'PUT',
        headers: { authorization: token, 'Content-type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (result.status === 'ok') {
        alert(result.message);
        dispatch(setUserActions());
      }
    } catch (err) {
      alert(err.message);
    }
  };
  /**
   * Bootstrap components and styling is used for layout, additionally custom css is also used
   * First the Org unit is rendered with orgUnit prop text value
   * a remove button is added for the Org unit, which has an onClick event that fires handleOrgRemove
   * Divisions block,
   * JSX conditional logic is used to initial display an add Division button,
   * if clicked the an input field and submit button is displayed
   * finally, JSX conditional logic is used to display the users division permissions
   */
  return (
    <>
      <Row className="org-unit-container">
        <Col className="col-md-6">
          <h5>Organisational Unit:</h5>
          <p>{orgUnit}</p>
        </Col>
        <Col className="col-md-6 align-items-center justify-content-center">
          <button
            className="btn btn-danger"
            type="button"
            onClick={handleOrgRemove}
          >
            remove
          </button>
        </Col>
      </Row>
      <Row className="justify-content-center pb-3 divisions-container">
        <h5>Divisions:</h5>
        {divInput ? (
          <>
            <input
              type="text"
              value={newDivision}
              onChange={handleDivisionInput}
            />
            <p className="text-muted">
              Either one of: management, finance, development, public relations,
              writing, security, research, admin, proofreaders
            </p>
            <button
              className="btn btn-primary"
              type="button"
              onClick={handleDivisionAdd}
            >
              submit
            </button>
          </>
        ) : (
          <div className="add-division-button">
            <button
              type="button"
              className="btn btn-primary "
              onClick={handleDivisionToggle}
            >
              add Division
            </button>
          </div>
        )}
      </Row>
      <Row className="justify-content-center pb-3">
        {isArrNotEmpty(divisions) &&
          divisions.map((div) => (
            <UserDivisions
              id={id}
              key={`${id}${randomNum(1, 249)}`}
              division={div.division}
              orgUnit={orgUnit}
            />
          ))}
      </Row>
    </>
  );
}
// proptype validation
Permissions.propTypes = {
  id: PropTypes.string.isRequired,
  orgUnit: PropTypes.string.isRequired,
  divisions: PropTypes.array.isRequired,
  isArrNotEmpty: PropTypes.func.isRequired,
};

export default Permissions;
