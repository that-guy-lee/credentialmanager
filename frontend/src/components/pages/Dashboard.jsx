import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// bootstrap components
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';
// application components
import DashboardHeader from '../components/DashboardHeader';
import Credentials from '../components/Credentials';
import Controls from '../components/Controls';
import AddCredential from '../components/AddCredential';
import Users from '../components/users/Users';
// redux actions
import { getOrgData } from '../../redux/features/orgUnitSlice';
// form ui styles
import '../../resources/css/formUI.css';
// credentials styles
import '../../resources/css/credentials.css';
// usersUI styles
import '../../resources/css/usersUI.css';
/**
 * Dashboard component
 * renders a dashboard for the user to interact with org data
 * @returns dashboard dependent components depending on user interaction and application state
 */
function Dashboard() {
  // dispatch variable assigned the useDispatch hook
  const dispatch = useDispatch();
  // action state sync with the useSelector hook
  const actionsStatus = useSelector((state) => state.orgData.actions);
  const dataStatus = useSelector((state) => state.orgData.status);
  const addFormStatus = useSelector((state) => state.dashboard.addComponent);
  const viewUsers = useSelector((state) => state.dashboard.viewUsers);
  /**
   * useEffect used to call the getOrgData on first render,
   * and when there is a change in the actions state
   */
  useEffect(() => {
    dispatch(getOrgData());
  }, [actionsStatus]);
  // orgData is assigned the value of the orgUnits state
  const orgData = useSelector((state) => state.orgData.orgUnits);
  /**
   * Dashboard display
   * bootstrap components & styles are used for layout
   * nested JSX conditionals is used to display different components,
   * depending on user interaction
   * DashboardHeader component is displayed regardless of user interaction
   * if user has selected to view the users
   * the users component is rendered
   * if not,
   * conditional checks if the user has selected to add a credential
   * if so,
   * AddCredential component is render with the Controls component
   * if not,
   * Credentials component is render with the controls component
   * a conditional is used to either load the Credentials or display a spinner,
   * as the data is fetched.
   */
  return (
    <Container fluid>
      <Row className="border-bottom">
        <DashboardHeader />
      </Row>
      {viewUsers ? (
        <Users />
      ) : (
        <Row className="pt-5">
          {addFormStatus ? (
            <Row>
              <AddCredential />
              <Col className="col-md-4 border">
                <h3>Controls</h3>
                <Controls />
              </Col>
            </Row>
          ) : (
            <>
              <Col className="col-md-8 border">
                <h3>Credentials</h3>
                {dataStatus === 'success' ? (
                  <Credentials orgData={orgData} />
                ) : (
                  <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                )}
              </Col>
              <Col className="col-md-4 border">
                <h3>Controls</h3>
                <Controls />
              </Col>
            </>
          )}
        </Row>
      )}
    </Container>
  );
}

export default Dashboard;
