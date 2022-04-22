import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// redux actions imported
import { toggleUsers } from '../../redux/features/dashboardSlice';
/**
 * Dashboard header
 * Component uses bootstrap components and styling for layout and display
 * primary purpose to preserve a consistent display between layout views (credentials & users),
 * and offer navigation between them.
 * @returns dashboard header displaying user greeting, title, view users button
 */
function DashboardHeader() {
  // disaptch is assigned the value of the useDispatch hook
  const dispatch = useDispatch();
  // useSelector hook is used to sync with global state
  const companyID = useSelector((state) => state.orgData.loggedUser.id);
  const adminRole = useSelector(
    (state) => state.orgData.loggedUser.roles.admin
  );
  const viewUsers = useSelector((state) => state.dashboard.viewUsers);
  // handleView function fires the toggleUsers action when called
  const handleView = () => {
    dispatch(toggleUsers());
  };
  /**
   * Bootstrap components are used for layout
   * the users company ID is displayed
   * further a button or emoji is displayed to the user depending if they are and admin or not
   * if they are the button is displayed with a onClick event that fires the handleView action
   */
  return (
    <Container fluid>
      <Row>
        <Col className="col-md-4">
          <h3>id: {companyID}</h3>
        </Col>
        <Col className="col-md-4">
          <h1>Dashboard</h1>
        </Col>
        <Col className="col-md-4">
          {adminRole ? (
            <button
              className="btn btn-primary"
              type="button"
              onClick={handleView}
            >
              {viewUsers ? 'View credentials' : 'View users'}
            </button>
          ) : (
            <div>
              <h1>🐱‍👓</h1>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default DashboardHeader;
