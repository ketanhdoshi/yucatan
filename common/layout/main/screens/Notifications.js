import React from "react";
import styled from 'styled-components';

// react plugin and its CSS styles for creating notifications
import NotificationAlert from "react-notification-alert";

// We want to import 'animate.css' from the 'react-notification-alert' package
// But for some reason when that file is in the node_modules folder Webpack gives
// an error when we start the web server. So as a workaround we copy that file 
// into our space. The correct fix is to modify the Webpack config that is 
// causing node_modules to behave differently.
// import "react-notification-alert/dist/animate.css";
import "./rnaAnimate.css";

// react-bootstrap components
import {Alert, Modal, Badge, Button, Card, Navbar, Nav, Table, Container, Row, Col,
} from "react-bootstrap";

import {CardView} from './CardView'
import {NucleoIcon} from './Icons'
// import s from './Notifications.scss'

const ModalButton = styled(Button).attrs(() => ({
  className:  "btn-simple"
}))`
  margin: 0;
  padding-left: 16px;
  padding-right: 16px;
  width: auto;
  background-color: transparent;
  font-weight: 400;
  opacity: .8;
  color: #888;

  &:hover,
  &:focus{
      text-decoration: none;
  }
`;

const Footer = styled.div`
  padding-top: 0;
  border-top: none;
  padding-right: 24px;
  padding-bottom: 16px;
  padding-left: 24px;
  justify-content: space-between;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  border-bottom-right-radius: calc(.3rem - 1px);
  border-bottom-left-radius: calc(.3rem - 1px);
`;

const StyledBody = styled(Modal.Body).attrs(() => ({
  className:  "text-center"
}))`
  padding-top: 24px;
  padding-right: 24px;
  padding-bottom: 16px;
  padding-left: 24px;
  line-height: 1.9;
`;

const StyledHeader = styled(Modal.Header).attrs(() => ({
  className:  "justify-content-center"
}))`
  border-bottom: none;
  padding-top: 24px;
  padding-right: 24px;
  padding-bottom: 0;
  padding-left: 24px;
`;

const StyledModal = styled(Modal).attrs(() => ({
  className:  "modal-mini modal-primary"
}))`
  overflow-x: hidden;
  overflow-y: auto;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1050;
  width: 100%;
  height: 100%;
  outline: 0;
`;

const Profile = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  text-align: center;
  line-height: 5.7;
  box-shadow: 0px 5px 20px 0px rgba(0, 0, 0, 0.3);
`;

const ModalIcon = styled(NucleoIcon)`
  padding-top: 24px;
`;

const AlertIcon = styled(NucleoIcon)`
  display: block;
  max-width: 89%;
  font-size: 30px !important;
  display: block;
  left: 15px;
  position: absolute;
  top: 50%;
  margin-top: -15px;
`;

const AlertMsg = styled.span`
  display: block;
  max-width: 89%;
`;

const alertBackgnd = (props) => {
  switch(props.variant) {
    case "info":
      return props.theme.colour.azureNavbar;
      break;
    case "primary":
      return props.theme.colour.blueNavbar;
        break;
    case "success":
      return props.theme.colour.greenNavbar;
      break;
    case "warning":
      return props.theme.colour.orangeNavbar;
      break;
    case "danger":
      return props.theme.colour.redNavbar;
      break;
    default:
      return props.theme.colour.azureNavbar;
      break;
  }
}

const StyledAlert = styled(Alert)`
  border-radius: $border-radius-base;
  position: relative;

  border: 0;
  color: #FFFFFF;
  padding: 10px 15px;
  font-size: 14px;

  background-color: ${props => alertBackgnd(props)};
  ${props => props.icon && 'padding-left: 65px;'}
`;

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
        < CardView title="Notifications" 
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

{/*         <Card>
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
          <Card.Body> */}

            <Row>
              <Col md="6">
                <h5>
                  <small>Notifications Style</small>
                </h5>
                <StyledAlert variant="info">
                  <span>This is a plain notification</span>
                </StyledAlert>
                <StyledAlert variant="info" dismissible>
                  <AlertMsg>This is a notification with close button.</AlertMsg>
                </StyledAlert>
                {/* With a boolean 'icon' prop, just passing 'icon' by itself or 'icon={true}' results 
                    in a React warning - Received "true" for a non-boolean attribute. This is because
                    of the way Styled Components passes props. So putting the '+' before the 'true' converts
                    the boolean to a 0/1 numeric value and prevents the error.  */}
                <StyledAlert variant="info" icon={+true} dismissible>
                  <AlertIcon as="span" data-notify="icon" name="nc-bell-55" />
                  <AlertMsg>This is a notification with close button and icon.</AlertMsg>
                  {/* <span data-notify="icon" className={s.alertIcon + " nc-icon nc-bell-55"}></span> */}
                  {/* <span className={s.msgClose}> This is a notification with close button and icon.</span> */}
                </StyledAlert>
                <StyledAlert variant="info" icon={+true} dismissible>
                  <AlertIcon as="span" data-notify="icon" name="nc-bell-55" />
                  <AlertMsg>
                    This is a notification with close button and icon and have
                    many lines. You can see that the icon and the close button
                    are always vertically aligned. This is a beautiful
                    notification. So you don't have to worry about the style.
                  </AlertMsg>
                  {/* <span data-notify="icon" className={s.alertIcon + " nc-icon nc-bell-55"}></span>
                  <span className={s.msgClose}>
                    This is a notification with close button and icon and have
                    many lines. You can see that the icon and the close button
                    are always vertically aligned. This is a beautiful
                    notification. So you don't have to worry about the style.
                  </span> */}
                </StyledAlert>
              </Col>
              <Col md="6">
                <h5>
                  <small>Notification States</small>
                </h5>
                <StyledAlert variant="primary" dismissible>
                  <AlertMsg>
                    <b>Primary -</b>
                    This is a regular notification made with ".alert-primary"
                  </AlertMsg>
                </StyledAlert>
                <StyledAlert variant="info" dismissible>
                  <AlertMsg>
                    <b>Info -</b>
                    This is a regular notification made with ".alert-info"
                  </AlertMsg>
                </StyledAlert>
                <StyledAlert variant="success" dismissible>
                  <AlertMsg>
                    <b>Success -</b>
                    This is a regular notification made with ".alert-success"
                  </AlertMsg>
                </StyledAlert>
                <StyledAlert variant="warning" dismissible>
                  <AlertMsg>
                    <b>Warning -</b>
                    This is a regular notification made with ".alert-warning"
                  </AlertMsg>
                </StyledAlert>
                <StyledAlert variant="danger" dismissible>
                  <AlertMsg>
                    <b>Danger -</b>
                    This is a regular notification made with ".alert-danger"
                  </AlertMsg>
                </StyledAlert>
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
                  <Button block onClick={() => notify("tl")} variant="default">Top Left</Button>
                </Col>
                <Col lg="3" md="3">
                  <Button block onClick={() => notify("tc")} variant="default">Top Center</Button>
                </Col>
                <Col lg="3" md="3">
                  <Button block onClick={() => notify("tr")} variant="default">Top Right</Button>
                </Col>
              </Row>
              <Row className="justify-content-center">
                <Col lg="3" md="3">
                  <Button block onClick={() => notify("bl")} variant="default">Bottom Left</Button>
                </Col>
                <Col lg="3" md="3">
                  <Button block onClick={() => notify("bc")} variant="default">Bottom Center</Button>
                </Col>
                <Col lg="3" md="3">
                  <Button block onClick={() => notify("br")} variant="default">Bottom Right</Button>
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
          </CardView>
          {/* </Card.Body>
        </Card> */}
        {/* Mini Modal */}
        <StyledModal
          // className={s.modal + " modal-mini modal-primary"}
          show={showModal}
          onHide={() => setShowModal(false)}
        >
          {/* <Modal.Header className={s.modalHeader + " justify-content-center"}> */}
          <StyledHeader>
            <Profile>
              <ModalIcon name="nc-bulb-63" />
              {/* <i className={s.modalIcon + " nc-icon nc-bulb-63"}></i> */}
            </Profile>
          </StyledHeader>
          <StyledBody>
            <p>Always have an access to your profile</p>
          </StyledBody>
          <Footer>
            {/* className={s.modalBtn + " btn-simple"} */}
            <ModalButton type="button" variant="link" onClick={() => setShowModal(false)}>Back</ModalButton>
            {/* className={s.modalBtn + " btn-simple"} */}
            <ModalButton type="button" variant="link" onClick={() => setShowModal(false)}>Close</ModalButton>
          </Footer>
        </StyledModal>
        {/* End Modal */}
      </Container>
    </>
  );
}

export default Notifications;
