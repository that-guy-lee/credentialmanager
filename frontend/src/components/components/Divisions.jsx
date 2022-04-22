import React from 'react';
import PropTypes from 'prop-types';
// bootstrap components are imported
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// load component imported
import Credential from './Credential';
/**
 * Divisions component
 * used to sort the credentials by the users divisions
 * @param {*} props unitName, divisions, isArrNotEmpty
 * @returns division heading and credentials
 */
function Divisions({ unitName, divisions, isArrNotEmpty }) {
  const orgName = unitName;
  const { divisionName } = divisions;
  // credentials assigned to credentials array
  const credentialsArr = divisions.credentials;
  let key = 0;
  /**
   * bootstrap components used for layout
   * division text value displayed
   * JSX conditional logic is used with the isArrNotEmpty function (checking if credentials exists)
   * if so, the credentialsArr is iterated over and on each iteration the a Credential component is,
   * returned with props
   */
  return (
    <Container fluid>
      <Row className="division-name-container">
        <h5 className="division-name">{divisionName}</h5>
      </Row>
      <Row className="justify-content-center">
        <Col className="col-md-12 credentials-container">
          {isArrNotEmpty(credentialsArr) &&
            credentialsArr.map((creds) => (
              <Credential
                key={`${creds.id}${(key += 1)}`}
                serviceName={creds.serviceName}
                loginName={creds.loginName}
                divisionName={divisionName}
                unitName={orgName}
                password={creds.password}
                id={creds._id}
              />
            ))}
        </Col>
      </Row>
    </Container>
  );
}
// prop type validation
Divisions.propTypes = {
  unitName: PropTypes.string.isRequired,
  divisions: PropTypes.object.isRequired,
  isArrNotEmpty: PropTypes.func.isRequired,
};

export default Divisions;
