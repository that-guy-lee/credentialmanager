import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
// react bootstrap components
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// toggleAdd redux action imported
import { toggleAdd } from '../../redux/features/dashboardSlice';
/**
 * Controls component
 * @returns a button for adding credentials
 */
function Controls() {
  // dispatch assigned the value of the useDispatch hook
  const dispatch = useDispatch();
  // useSelector hook used to sync with global state
  const viewCredentials = useSelector((state) => state.dashboard.addComponent);
  // handleAddCredential fires the toggleAdd action
  const handleAddCredential = () => {
    dispatch(toggleAdd());
  };
  /**
   * bootstrap components are used for layout
   * add credentials button added with onClick event that fires the handleAddCredential function
   * the buttons text also changes with its state, when in the add credential state, viewCredentials is displayed
   */
  return (
    <Container fluid>
      <Row>
        <Col className="col-md-12">
          <button
            className="btn btn-primary"
            type="button"
            onClick={handleAddCredential}
          >
            {viewCredentials ? 'view credentials' : 'add credential'}
          </button>
        </Col>
      </Row>
    </Container>
  );
}

export default Controls;
