import React, { useState } from 'react';
// react redux hooks imported
import { useDispatch } from 'react-redux';
// outlet component imported
import { Outlet } from 'react-router';
// local component imported
import Homepage from '../pages/Homepage';
// redux action imported
import { setLoggedUser } from '../../redux/features/orgUnitSlice';
/**
 * authenticate function
 * retrieves the JWT token from local storage
 * fetch request to the auth-check endpoint wrapped in try catch block for error handling
 * result of request assigned to response variable
 * response parsed from json and assigned to result variable
 * if  successful,
 * returns results, else returns error
 * @returns endpoint request result or error
 */
export const authenticate = async () => {
  const token = localStorage.getItem('token');
  let result;
  try {
    const response = await fetch('auth/auth-check', {
      method: 'GET',
      headers: { authorization: `${token}` },
    });
    result = await response.json();
    if (result.status === 'ok') {
      return result;
    }
    return result;
  } catch (err) {
    alert(err);
    return err;
  }
};
/**
 * ProtectedRoutes component
 * used to enforce authentication when accessing a route
 * @returns Outlet Component (redirects to dashboard/) or Homepage component
 */
function ProtectedRoutes() {
  // local state declared used as auth store
  const [auth, setAuth] = useState(false);
  // dispatch declared as the useDispatch hook
  const dispatch = useDispatch();
  /**
   * authenticate function is called
   * .then is used to handle the promise
   * conditional then checks if status of data ok
   * indicating successful authentication,
   * calls setAuth with true payload
   * and dispatches the setLoggedUser actions with data as payload
   * if not authenticated
   * calls setAuth with false payload
   */
  authenticate().then((data) => {
    if (data.status === 'ok') {
      setAuth(true);
      dispatch(setLoggedUser(data.data));
    }
    if (data.status === 'error') {
      setAuth(false);
    }
  });
  // if true outlet returned, if not Homepage component returned
  return auth ? <Outlet /> : <Homepage />;
}

export default ProtectedRoutes;
