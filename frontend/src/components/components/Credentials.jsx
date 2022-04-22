import React from 'react';
import { useSelector } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PropTypes from 'prop-types';
import Spinner from 'react-bootstrap/Spinner';
import Divisions from './Divisions';

function Credentials({ orgData }) {
  const dataStatus = useSelector((state) => state.orgData.status);
  const dataError = useSelector((state) => state.orgData.error);
  let newsManagementArr;
  let softwareReviewsArr;
  let hardwareReviewsArr;
  let opinionPublishArr;
  const isArrNotEmpty = (arr) => {
    if (arr.length === 0) {
      return false;
    }
    return true;
  };

  if (typeof orgData === 'object' && dataStatus === 'success') {
    newsManagementArr = orgData.newsManagement;
    softwareReviewsArr = orgData.softwareReviews;
    hardwareReviewsArr = orgData.hardwareReviews;
    opinionPublishArr = orgData.opinionPublishing;
  }

  const displayController = (status) => {
    if (status === 'pending' || status === '' || status === undefined) {
      return (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      );
    }
    if (status === 'rejected') {
      return <h4> {`${dataError}`}</h4>;
    }

    if (status === 'success') {
      let key = 0;
      return (
        <>
          <Row>
            {isArrNotEmpty(newsManagementArr) && <h4>News management</h4>}
          </Row>
          <Row className=" d-flex justify-content-center">
            {isArrNotEmpty(newsManagementArr) &&
              newsManagementArr.map((newsCred) => (
                <Divisions
                  key={(key += 1)}
                  unitName={newsCred.unitName}
                  divisions={newsCred.divisions}
                  isArrNotEmpty={isArrNotEmpty}
                />
              ))}
          </Row>
          <Row>
            {isArrNotEmpty(softwareReviewsArr) && <h4>Software Reviews</h4>}
          </Row>
          <Row>
            {isArrNotEmpty(softwareReviewsArr) &&
              softwareReviewsArr.map((softCred) => (
                <Divisions
                  key={(key += 1)}
                  unitName={softCred.unitName}
                  divisions={softCred.divisions}
                  isArrNotEmpty={isArrNotEmpty}
                />
              ))}
          </Row>
          <Row>
            {isArrNotEmpty(hardwareReviewsArr) && <h4>Hardware Reviews</h4>}
          </Row>
          <Row>
            {isArrNotEmpty(hardwareReviewsArr) &&
              hardwareReviewsArr.map((hardCred) => (
                <Divisions
                  key={(key += 1)}
                  unitName={hardCred.unitName}
                  divisions={hardCred.divisions}
                  isArrNotEmpty={isArrNotEmpty}
                />
              ))}
          </Row>
          <Row>
            {isArrNotEmpty(opinionPublishArr) && <h4>Opinion Publishing</h4>}
          </Row>
          <Row>
            {isArrNotEmpty(opinionPublishArr) &&
              opinionPublishArr.map((opinionCred) => (
                <Divisions
                  key={(key += 1)}
                  unitName={opinionCred.unitName}
                  divisions={opinionCred.divisions}
                  isArrNotEmpty={isArrNotEmpty}
                />
              ))}
          </Row>
        </>
      );
    }

    return <h4> {`${dataError}`}</h4>;
  };

  return (
    <Container fluid>
      <Row>
        <Col className="col-md-12">{displayController(dataStatus)}</Col>
      </Row>
    </Container>
  );
}

Credentials.propTypes = {
  orgData: PropTypes.object.isRequired,
};

export default Credentials;
