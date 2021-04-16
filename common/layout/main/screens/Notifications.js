import React from "react";
import styled, {css} from 'styled-components';

// react plugin and its CSS styles for creating notifications
import NotificationAlert from "react-notification-alert";

// We want to import 'animate.css' from the 'react-notification-alert' package
// But for some reason when that file is in the node_modules folder Webpack gives
// an error when we start the web server. So as a workaround we copy that file 
// into our space. The correct fix is to modify the Webpack config that is 
// causing node_modules to behave differently.
// import "react-notification-alert/dist/animate.css";
import "./rnaAnimate.css";

import ReactNotification, {store} from 'react-notifications-component'
// import 'react-notifications-component/dist/theme.css'
import './animate.min.css'
import './theme.css'

// react-bootstrap components
import {Alert, Modal, Badge, Button, Card, Navbar, Nav, Table, Container, Row, Col,
} from "react-bootstrap";

import {CardView} from '../../../widgets/CardView'
import {NucleoIcon} from '../../../widgets/NucleoIcon'

import s from './Notifications.scss'

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
  border-radius: ${props => props.theme.layout.borderRadiusBase};
  position: relative;

  border: 0;
  color: #FFFFFF;
  padding: 10px 15px;
  font-size: 14px;

  background-color: ${props => alertBackgnd(props)};
  ${props => props.icon && 'padding-left: 65px;'}

  ${props => props.notification && css`
    & button.close {
      color: #000;
      display: flex;
      justify-content: center;
      align-items: center; 
    }
    & button.close span {
      margin-top: -4px; 
    }

    & .close ~ span {
      display: block;
      max-width: 89%;
    }
  `}
`;

const AlertBox = ({icon, children, ...rest}) => {
  return (
    <StyledAlert icon={icon} {...rest}>
      {icon && <AlertIcon as="span" data-notify="icon" name={icon} />}
      <AlertMsg>{children}</AlertMsg>
    </StyledAlert>
  )
}

const ModalBox = ({icon, children, show, hideCb}) => {
  return (
    <StyledModal show={show} onHide={hideCb}>
      <StyledHeader>
        <Profile>
          <ModalIcon name={icon} />
        </Profile>
      </StyledHeader>
      <StyledBody>
        {children}
      </StyledBody>
      <Footer>
        <ModalButton type="button" variant="link" onClick={hideCb}>Back</ModalButton>
        <ModalButton type="button" variant="link" onClick={hideCb}>Close</ModalButton>
      </Footer>
    </StyledModal>
  )
}

function OldNotifications() {
  const notify = (place) => {
    store.addNotification({
      title: "Wonderful!",
      message: "teodosii@react-notifications-component",
      type: "success",
      insert: "top",
      container: "top-left",
      animationIn: ["animate__animated", "animate__jackInTheBox"],
      animationOut: ["animate__animated", "animate__flipOutY"],
      dismiss: {
        duration: 3000,
        onScreen: true,
        showIcon: true,
        click: true,
        touch: true
      }
    });  
  }

  return (

    <>
      {/* Create a parent node for the notification alerts. ALl the notifications get created dynamically
          under this node. We use descendant classes of this parent class to assign CSS styles */}
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
                </Row>
        </CardView>
      </Container>
    </>
  );
}

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
  const newNotify = (place) => {
    store.addNotification({
      title: "Wonderful!",
      message: "teodosii@react-notifications-component",
      type: "success",
      insert: "top",
      container: "top-left",
      animationIn: ["animate__animated", "animate__jackInTheBox"],
      animationOut: ["animate__animated", "animate__flipOutY"],
      dismiss: {
        duration: 3000,
        onScreen: true,
        showIcon: true,
        click: true,
        touch: true
      }
    });  
  }
  const newNotifyRna = (place) => {
    store.addNotification({
      title: "Wonderful!",
      message: "teodosii@react-notifications-component",
      type: "success",
      content: (
        <div className="rna-container">
          <Alert icon="nc-bell-55" variant="success" dismissible>
            <AlertIcon as="span" data-notify="icon" name="nc-bell-55" />
            <AlertMsg>
              <b>Success -</b>
              My Custom Toast Notification
            </AlertMsg>
          </Alert>
        </div>
      ),
      insert: "top",
      container: "top-left",
      animationIn: ["animate__animated", "animate__jackInTheBox"],
      animationOut: ["animate__animated", "animate__flipOutY"],
      dismiss: {
        duration: 3000,
        onScreen: true,
        showIcon: true,
        click: true,
        touch: true
      }
    });  
  }
  const newNotifyCustom = (place) => {
    store.addNotification({
      title: "Wonderful!",
      message: "teodosii@react-notifications-component",
      type: "success",
      content: (
        <StyledAlert icon="nc-scissors" variant="success" dismissible notification="true">
          <AlertIcon as="span" data-notify="icon" name="nc-scissors" />
          <AlertMsg>
            <b>Success -</b>
            My Custom Toast Notification
          </AlertMsg>
        </StyledAlert>
      ),
      insert: "top",
      container: "top-left",
      animationIn: ["animate__animated", "animate__jackInTheBox"],
      animationOut: ["animate__animated", "animate__flipOutY"],
      dismiss: {
        duration: 3000,
        onScreen: true,
        showIcon: true,
        click: true,
        touch: true
      }
    });  
  }

  return (
    <>
      {/* Create a parent node for the notification alerts. ALl the notifications get created dynamically
          under this node. We use descendant classes of this parent class to assign CSS styles */}
      <div className="rna-container">
        <NotificationAlert ref={notificationAlertRef} />
      </div>
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
              <Col md="6">
                <h5>
                  <small>Notifications Style</small>
                </h5>
                <AlertBox variant="info">
                  This is a plain notification
                </AlertBox>
                <AlertBox variant="info" dismissible>
                  This is a notification with close button.
                </AlertBox>
                {/* With a boolean 'icon' prop, just passing 'icon' by itself or 'icon={true}' results 
                    in a React warning - Received "true" for a non-boolean attribute. This is because
                    of the way Styled Components passes props. So putting the '+' before the 'true' converts
                    the boolean to a 0/1 numeric value and prevents the error.  */}
                <AlertBox variant="info" icon="nc-bell-55" dismissible>
                  This is a notification with close button and icon.
                </AlertBox>
                <AlertBox variant="info" icon="nc-bell-55" dismissible>
                    This is a notification with close button and icon and have
                    many lines. You can see that the icon and the close button
                    are always vertically aligned. This is a beautiful
                    notification. So you don't have to worry about the style.
                </AlertBox>
              </Col>
              <Col md="6">
                <h5>
                  <small>Notification States</small>
                </h5>
                <AlertBox variant="primary" dismissible>
                    <b>Primary -</b>
                    This is a regular notification made with ".alert-primary"
                </AlertBox>
                <AlertBox variant="info" dismissible>
                    <b>Info -</b>
                    This is a regular notification made with ".alert-info"
                </AlertBox>
                <AlertBox variant="success" dismissible>
                    <b>Success -</b>
                    This is a regular notification made with ".alert-success"
                </AlertBox>
                <AlertBox variant="warning" dismissible>
                    <b>Warning -</b>
                    This is a regular notification made with ".alert-warning"
                </AlertBox>
                <AlertBox variant="danger" dismissible>
                    <b>Danger -</b>
                    This is a regular notification made with ".alert-danger"
                </AlertBox>
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
                  <Button block onClick={() => newNotifyRna("bl")} variant="default">New Notify Rna</Button>
                </Col>
                <Col lg="3" md="3">
                  <Button block onClick={() => newNotifyCustom("bc")} variant="default">New Notify Custom</Button>
                </Col>
                <Col lg="3" md="3">
                  <Button block onClick={() => newNotify("br")} variant="default">New Notify</Button>
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

        {/* Mini Modal */}
          <ModalBox icon="nc-atom" show={showModal} hideCb={() => setShowModal(false)}>
            <p>Always access to your profile</p>
          </ModalBox>
{/*         <StyledModal
          show={showModal}
          onHide={() => setShowModal(false)}
        >
          <StyledHeader>
            <Profile>
              <ModalIcon name="nc-bulb-63" />
            </Profile>
          </StyledHeader>
          <StyledBody>
            <p>Always have an access to your profile</p>
          </StyledBody>
          <Footer>
            <ModalButton type="button" variant="link" onClick={() => setShowModal(false)}>Back</ModalButton>
            <ModalButton type="button" variant="link" onClick={() => setShowModal(false)}>Close</ModalButton>
          </Footer>
        </StyledModal> */}
        {/* End Modal */}
      </Container>
    </>
  );
}

export default Notifications;
