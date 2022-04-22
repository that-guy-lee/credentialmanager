import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { toggleComponent } from '../../redux/features/homepageSlice';
/**
 * Header component
 * component that serves as a consistent header for the homepage
 * @returns the application logo, title and register/login button
 */
function Header() {
  // dispatch variable is assigned the useDispatch hook as value
  const dispatch = useDispatch();
  // useSelector hook is used to sync with the componentToggle state
  const toggleState = useSelector((state) => state.homepage.componentToggle);
  // handleAuth function is used to dispatch the toggleComponent action
  const handleAuth = () => {
    dispatch(toggleComponent());
  };
  /**
   * Bootstrap components used for layout of the header component
   * the button has an onClick event that fires the handleAuth function
   * JSX logic is also used to change the text of the button depending on,
   * the application state
   */
  return (
    <Container fluid>
      <Row>
        <Col className="col-md-4">
          <h1>Cool Tech</h1>
        </Col>
        <Col className="col-md-4">
          <h1>Credential Manager</h1>
        </Col>
        <Col className="col-md-4">
          <button
            className="btn btn-primary"
            type="button"
            onClick={handleAuth}
          >
            {toggleState ? 'Login' : 'Register'}
          </button>
        </Col>
      </Row>
    </Container>
  );
}

export default Header;
