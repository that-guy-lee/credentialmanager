import React from 'react';
import PropTypes from 'prop-types';
// import redux hook
import { useDispatch } from 'react-redux';
// importing bootstrap component
import Col from 'react-bootstrap/Col';
// local redux action imported
import { setUserActions } from '../../../redux/features/usersSlice';
/**
 * UserDivisions component
 * renders the users divisions
 * @param {*} props id, division, orgUnit
 * @returns the divisions the user has access to
 */
function UserDivisions({ id, division, orgUnit }) {
  // dispatch assigned the value of the useDispatch hook
  const dispatch = useDispatch();
  /**
   * handlesDivisionRemove
   * allows the user to remove a users permissions to a specific division.
   * token retrieved from local storage
   * payload object assigned the component props as attributes
   * fetch request wrapped in a try catch block for error handling
   * header contains the token and the body contains the payload
   * if successful user is alerted and the setUsersAction is fired
   * if not, user is alerted of the error
   */
  const handleDivisionRemove = async () => {
    const token = localStorage.getItem('token');
    const payload = {
      id,
      orgUnit,
      division,
    };
    try {
      const response = await fetch('user/remove/division', {
        method: 'PUT',
        headers: { authorization: token, 'Content-Type': 'application/json' },
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
   * User division is returned here
   * with division prop as text value
   * the remove button has an onClick event that fires the handleDivisionRemove function
   */
  return (
    <Col className="col-md-auto">
      <h5> division:</h5>
      <p>{division}</p>
      <button
        className="btn btn-danger"
        type="button"
        onClick={handleDivisionRemove}
      >
        remove
      </button>
    </Col>
  );
}
// propType validation
UserDivisions.propTypes = {
  id: PropTypes.string.isRequired,
  division: PropTypes.string.isRequired,
  orgUnit: PropTypes.string.isRequired,
};

export default UserDivisions;
