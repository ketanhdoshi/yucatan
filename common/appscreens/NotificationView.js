import React from "react";

// react plugin and its CSS styles for creating notifications
// import NotificationAlert from "react-notification-alert";

import ReactNotification from 'react-notifications-component'

// react-bootstrap components
import {Alert, Modal, Badge, Button, Card, Navbar, Nav, Table, Container, Row, Col,
} from "react-bootstrap";

import {CardView} from '../widgets/CardView'
import {NucleoIcon} from '../widgets/NucleoIcon'
import {AlertBox, RnaContainer, rnaNotify, newNotify, newNotifyCustom } from '../widgets/Notification'
import ModalBox from '../widgets/ModalBox'

import s from '../layout/main/screens/Notifications.scss'

const AlertView = () => {
  return (
    <React.Fragment>
      <h5>Alert Style</h5>
      <AlertBox variant="info">
        This is a plain Alert
      </AlertBox>
      <AlertBox variant="info" dismissible>
        This is a Alert with close button.
      </AlertBox>
      {/* With a boolean 'icon' prop, just passing 'icon' by itself or 'icon={true}' results 
          in a React warning - Received "true" for a non-boolean attribute. This is because
          of the way Styled Components passes props. So putting the '+' before the 'true' converts
          the boolean to a 0/1 numeric value and prevents the error.  */}
      <AlertBox variant="info" icon="nc-bell-55" dismissible>
        This is a Alert with close button and icon.
      </AlertBox>
      <AlertBox variant="info" icon="nc-bell-55" dismissible>
          This is a Alert with close button and icon and have
          many lines. You can see that the icon and the close button
          are always vertically aligned. This is a beautiful
          notification. So you don't have to worry about the style.
      </AlertBox>
    </React.Fragment>
  )
}

const AlertTypes = () => {
  return (
    <React.Fragment>
      <h5>Alert States</h5>
      <AlertBox variant="primary" dismissible>
          <b>Primary -</b>
          This is a regular Alert made with ".alert-primary"
      </AlertBox>
      <AlertBox variant="info" dismissible>
          <b>Info -</b>
          This is a regular Alert made with ".alert-info"
      </AlertBox>
      <AlertBox variant="success" dismissible>
          <b>Success -</b>
          This is a regular Alert made with ".alert-success"
      </AlertBox>
      <AlertBox variant="warning" dismissible>
          <b>Warning -</b>
          This is a regular Alert made with ".alert-warning"
      </AlertBox>
      <AlertBox variant="danger" dismissible>
          <b>Danger -</b>
          This is a regular Alert made with ".alert-danger"
      </AlertBox>
    </React.Fragment>
  )
}

const ModalView = () => {
  const [showModal, setShowModal] = React.useState(false);

  return (
    <React.Fragment>
      <h4 className="title">Modal</h4>
      <Button className="btn-fill btn-wd" variant="warning" onClick={() => setShowModal(true)}>
        Modal Mini
      </Button>
      <ModalBox icon="nc-atom" show={showModal} hideCb={() => setShowModal(false)}>
        <p>Always access your profile</p>
      </ModalBox>
    </React.Fragment>
  )
}

const RnaNotificationView = () => {
  const notificationAlertRef = React.useRef(null);
  const notify = (place) => {
    rnaNotify(place, notificationAlertRef)
  }

  return (
    <React.Fragment>
      {/* Create a parent node for the notification alerts. ALl the notifications get created dynamically
          under this node. We use descendant classes of this parent class to assign CSS styles */}
      <RnaContainer notificationAlertRef={notificationAlertRef} />
      <Row>
        <Col className="offset-md-3 text-center" md="6">
          <h5 className="title">Notifications using React-Notification-Alert (Obsolete)</h5>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col lg="3" md="3">
          <Button block onClick={() => notify("tl")} variant="info">Top Left</Button>
        </Col>
        <Col lg="3" md="3">
          <Button block onClick={() => notify("tc")} variant="info">Top Center</Button>
        </Col>
        <Col lg="3" md="3">
          <Button block onClick={() => notify("tr")} variant="info">Top Right</Button>
        </Col>
      </Row>
    </React.Fragment>
  )
}

const NewNotificationView = () => {
  return (
    <React.Fragment>
      <Row>
        <Col className="offset-md-3 text-center" md="6">
          <h4 className="title">Notifications using React-Notification-Component</h4>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col lg="3" md="3">
          <Button block onClick={() => newNotifyCustom("bc")} variant="success">New Notify Custom</Button>
        </Col>
        <Col lg="3" md="3">
          <Button block onClick={() => newNotify("br")} variant="success">New Notify</Button>
        </Col>
      </Row>
    </React.Fragment>
  )
}

const NotificationView = () => {
  return (
    <>
      {/* Create a parent node for the notification alerts. ALl the notifications get created dynamically
          under this node. */}
      <ReactNotification />
      <Container fluid>
        <CardView title="Notifications" 
                    subTitle={<>Handcrafted by our friend and colleague{" "}
                      <a href="https://github.com/EINazare" rel="noopener noreferrer" target="_blank">
                        Nazare Emanuel-Ioan
                      </a>
                      . Please checkout the{" "}
                      <a href="https://github.com/creativetimofficial/react-notification-alert" rel="noopener noreferrer" target="_blank">
                        full documentation.
                      </a>
                    </>}
        >
            <Row>
              <Col md="6"><AlertView /></Col>
              <Col md="6"><AlertTypes /></Col>
            </Row>
            <NewNotificationView />
            <Row>
              <Col className="text-center" md="12"><ModalView /></Col>
            </Row>
            <br></br>
            <RnaNotificationView />
          </CardView>
      </Container>
    </>
  );
}

export default NotificationView;
