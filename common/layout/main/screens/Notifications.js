import React from "react";

// react plugin and its CSS styles for creating notifications
import NotificationAlert from "react-notification-alert";
import "react-notification-alert/dist/animate.css";

// react-bootstrap components
import {Alert, Modal, Badge, Button, Card, Navbar, Nav, Table, Container, Row, Col,
} from "react-bootstrap";

import s from './Notifications.scss'

function Notifications() {
  const [showModal, setShowModal] = React.useState(false);
  const notificationAlertRef = React.useRef(null);
  const notify = (place) => {
    var color = Math.floor(Math.random() * 5 + 1);
    var type;
    switch (color) {
      case 1:
        type = "primary";
        break;
      case 2:
        type = "success";
        break;
      case 3:
        type = "danger";
        break;
      case 4:
        type = "warning";
        break;
      case 5:
        type = "info";
        break;
      default:
        break;
    }
    var options = {};
    options = {
      place: place,
      message: (
        <div>
          <div>
            Welcome to <b>Light Bootstrap Dashboard React</b> - a beautiful
            freebie for every web developer.
          </div>
        </div>
      ),
      type: type,
      icon: "nc-icon nc-bell-55",
      autoDismiss: 60,
    };
    notificationAlertRef.current.notificationAlert(options);
  };
  return (
    <>
      {/* Create a parent node for the notification alerts. ALl the notifications get created dynamically
          under this node. We use descendant classes of this parent class to assign CSS styles */}
      <div className="rna-container">
        <NotificationAlert ref={notificationAlertRef} />
      </div>
      <Container fluid>
        <Card>
          <Card.Header>
            <Card.Title as="h4">Notifications</Card.Title>
            <p className="card-category">
              Handcrafted by our friend and colleague{" "}
              <a href="https://github.com/EINazare" rel="noopener noreferrer" target="_blank">
                Nazare Emanuel-Ioan
              </a>
              . Please checkout the{" "}
              <a href="https://github.com/creativetimofficial/react-notification-alert" rel="noopener noreferrer" target="_blank">
                full documentation.
              </a>
            </p>
          </Card.Header>
          <Card.Body>
            <Row>
              <Col md="6">
                <h5>
                  <small>Notifications Style</small>
                </h5>
                <Alert variant="info" className={s.info}>
                  <span>This is a plain notification</span>
                </Alert>
                <Alert variant="info" className={s.info} dismissible>
                  <span className={s.msgClose}>This is a notification with close button.</span>
                </Alert>
                <Alert variant="info" className={s.infoIcon} dismissible>
                  <span data-notify="icon" className={s.alertIcon + " nc-icon nc-bell-55"}></span>
                  <span className={s.msgClose}> This is a notification with close button and icon.</span>
                </Alert>
                <Alert variant="info" className={s.infoIcon} dismissible>
                  <span data-notify="icon" className={s.alertIcon + " nc-icon nc-bell-55"}></span>
                  <span className={s.msgClose}>
                    This is a notification with close button and icon and have
                    many lines. You can see that the icon and the close button
                    are always vertically aligned. This is a beautiful
                    notification. So you don't have to worry about the style.
                  </span>
                </Alert>
              </Col>
              <Col md="6">
                <h5>
                  <small>Notification States</small>
                </h5>
                <Alert variant="primary" className={s.primary} dismissible>
                  <span className={s.msgClose}>
                    <b>Primary -</b>
                    This is a regular notification made with ".alert-primary"
                  </span>
                </Alert>
                <Alert variant="info" className={s.info} dismissible>
                  <span className={s.msgClose}>
                    <b>Info -</b>
                    This is a regular notification made with ".alert-info"
                  </span>
                </Alert>
                <Alert variant="success" className={s.success} dismissible>
                  <span className={s.msgClose}>
                    <b>Success -</b>
                    This is a regular notification made with ".alert-success"
                  </span>
                </Alert>
                <Alert variant="warning" className={s.warning} dismissible>
                  <span className={s.msgClose}>
                    <b>Warning -</b>
                    This is a regular notification made with ".alert-warning"
                  </span>
                </Alert>
                <Alert variant="danger" className={s.danger} dismissible>
                  <span className={s.msgClose}>
                    <b>Danger -</b>
                    This is a regular notification made with ".alert-danger"
                  </span>
                </Alert>
              </Col>
            </Row>
            <br></br>
            <br></br>
            <div className="places-buttons">
              <Row>
                <Col className="offset-md-3 text-center" md="6">
                  <Card.Title as="h4">Notifications Places</Card.Title>
                  <p className="card-category">
                    <small>Click to view notifications</small>
                  </p>
                </Col>
              </Row>
              <Row className="justify-content-center">
                <Col lg="3" md="3">
                  <Button block onClick={() => notify("tl")} variant="default">
                    Top Left
                  </Button>
                </Col>
                <Col lg="3" md="3">
                  <Button block onClick={() => notify("tc")} variant="default">
                    Top Center
                  </Button>
                </Col>
                <Col lg="3" md="3">
                  <Button block onClick={() => notify("tr")} variant="default">
                    Top Right
                  </Button>
                </Col>
              </Row>
              <Row className="justify-content-center">
                <Col lg="3" md="3">
                  <Button block onClick={() => notify("bl")} variant="default">
                    Bottom Left
                  </Button>
                </Col>
                <Col lg="3" md="3">
                  <Button block onClick={() => notify("bc")} variant="default">
                    Bottom Center
                  </Button>
                </Col>
                <Col lg="3" md="3">
                  <Button block onClick={() => notify("br")} variant="default">
                    Bottom Right
                  </Button>
                </Col>
              </Row>
            </div>
            <Row>
              <Col className="text-center" md="12">
                <h4 className="title">Modal</h4>
                <Button
                  className="btn-fill btn-wd"
                  variant="info"
                  onClick={() => setShowModal(true)}
                >
                  Launch Modal Mini
                </Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>
        {/* Mini Modal */}
        <Modal
          className="modal-mini modal-primary"
          show={showModal}
          onHide={() => setShowModal(false)}
        >
          <Modal.Header className="justify-content-center">
            <div className="modal-profile">
              <i className="nc-icon nc-bulb-63"></i>
            </div>
          </Modal.Header>
          <Modal.Body className="text-center">
            <p>Always have an access to your profile</p>
          </Modal.Body>
          <div className="modal-footer">
            <Button
              className="btn-simple"
              type="button"
              variant="link"
              onClick={() => setShowModal(false)}
            >
              Back
            </Button>
            <Button
              className="btn-simple"
              type="button"
              variant="link"
              onClick={() => setShowModal(false)}
            >
              Close
            </Button>
          </div>
        </Modal>
        {/* End Modal */}
      </Container>
    </>
  );
}

export default Notifications;
