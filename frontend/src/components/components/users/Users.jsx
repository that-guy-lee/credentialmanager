import React, { useEffect } from 'react';
// redux hooks
import { useSelector, useDispatch } from 'react-redux';
// bootstrap components
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';
// local components
import User from './User';
// redux actions
import { getUsers } from '../../../redux/features/usersSlice';
/**
 * Users component
 * primarily serves as the root injection of users data,
 * but also has conditional rendering depending on state
 * @returns users data
 */
function Users() {
  // dispatch assigned the value of the useDispatch hook
  const dispatch = useDispatch();
  // useSelector hook used to sync with conditional state
  const usersActions = useSelector((state) => state.users.userActions);
  const usersDataStatus = useSelector((state) => state.users.status);
  const usersDataError = useSelector((state) => state.users.error);
  const usersData = useSelector((state) => state.users.data);
  /**
   * isArrNotEmpty
   * checks if an array is empty or not
   * @param {Array} arr an array
   * @returns {Boolean}
   */
  const isArrNotEmpty = (arr) => {
    if (arr.length === 0) {
      return false;
    }
    return true;
  };
  /**
   * useEffect hook used to fetch users data on first render,
   * usersActions dependency, will also fetch data if usersActions state changes
   */
  useEffect(() => {
    dispatch(getUsers());
  }, [usersActions]);
  /**
   * displayUsers Controller
   * first conditional checks if the data is still being fetched
   * if so, displays a spinner to the user
   * second conditional checks if the data fetched failed,
   * if so, displays a heading with an error
   * third conditional checks if the data has been successfully fetch,
   * if so, assigns the usersData to the userDataArr
   * the isArrNotEmpty is used to check that data was received,
   * if so,
   * the array is map over and on each iteration a user component is rendered with users Data as props
   * @param {String} status the state of the data fetch
   * @returns three different displays depending on the data status (spinner, error message heading or User components)
   */
  const displayUsers = (status) => {
    if (status === 'pending' || status === '' || status === undefined) {
      return (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      );
    }
    if (status === 'rejected') {
      return <h4> {`${usersDataError}`}</h4>;
    }
    if (status === 'success') {
      const userDataArr = usersData.data;
      return (
        <Col className="col-md-12">
          {isArrNotEmpty(userDataArr) &&
            userDataArr.map((userData) => (
              <User
                id={userData._id}
                key={userData._id}
                name={userData.name}
                email={userData.email}
                roles={userData.roles}
                permissions={userData.permissions}
                isArrNotEmpty={isArrNotEmpty}
              />
            ))}
        </Col>
      );
    }
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  };
  /**
   * Users component primary return
   * Bootstrap components & styles are used for layout
   * JSX is used to call the displayUsers function with usersDataStatus as param
   */
  return (
    <Container fluid className="pt-5">
      <Row className="justify-content-center align-content-center">
        <h2>Users</h2>
      </Row>
      <Row className="justify-content-center align-content-center pt-5">
        {displayUsers(usersDataStatus)}
      </Row>
    </Container>
  );
}

export default Users;
