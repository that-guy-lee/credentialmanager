import React from 'react';
import PropTypes from 'prop-types';
// bootstrap component imported
import Col from 'react-bootstrap/Col';
/**
 * Role component
 * @param {*} props role, roleName
 * @returns user role data
 */
function Role({ role, roleName }) {
  return (
    <Col className="col-md-4">
      <h5>
        {roleName}:{`${role}`}
      </h5>
    </Col>
  );
}
// props validation
Role.propTypes = {
  role: PropTypes.bool.isRequired,
  roleName: PropTypes.string.isRequired,
};

export default Role;
