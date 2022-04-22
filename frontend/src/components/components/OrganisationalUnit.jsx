import React from 'react';
import PropTypes from 'prop-types';

function OrganisationalUnit({ name }) {
  return (
    <button className="btn btn-primary mt-3" type="button">
      {name}
    </button>
  );
}

OrganisationalUnit.propTypes = {
  name: PropTypes.string.isRequired,
};

export default OrganisationalUnit;
