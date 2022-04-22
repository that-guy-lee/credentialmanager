import React from 'react';
// redux hook imported
import { useSelector } from 'react-redux';
// bootstrap component imported
import Container from 'react-bootstrap/Container';
// local components imported
import Header from '../components/Header';
import Register from '../components/Register';
import Login from '../components/Login';
import '../../resources/css/formUI.css';
/**
 * Homepage component
 * @returns Displays the homepage to the user with login or register forms */
function Homepage() {
  // useSelector hook is used to sync with the componentToggle state
  const toggleState = useSelector((state) => state.homepage.componentToggle);
  /**
   * Bootstrap components used for layout
   * Header component called
   * JSX conditional logic,
   * displays either the Register component or the Login component
   */
  return (
    <Container fluid className="homepage">
      <Header />
      {toggleState ? <Register /> : <Login />}
    </Container>
  );
}

export default Homepage;
