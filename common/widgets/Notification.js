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

import {store as rncStore} from 'react-notifications-component'
// import 'react-notifications-component/dist/theme.css'
import './animate.min.css'
import './theme.css'

// react-bootstrap components
import {Alert, Modal, Badge, Button, Card, Navbar, Nav, Table, Container, Row, Col,
} from "react-bootstrap";

import {NucleoIcon} from './NucleoIcon'

import s from '../layout/main/screens/Notifications.scss'

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

export const AlertBox = ({icon, children, ...rest}) => {
  return (
    <StyledAlert icon={icon} {...rest}>
      {icon && <AlertIcon as="span" data-notify="icon" name={icon} />}
      <AlertMsg>{children}</AlertMsg>
    </StyledAlert>
  )
}

export const RnaContainer = ({notificationAlertRef}) => {
  return (
    <div className="rna-container">
      <NotificationAlert ref={notificationAlertRef} />
    </div>
  )
}

export const rnaNotify = (place, notificationAlertRef) => {
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

export const newNotify = (place) => {
  rncStore.addNotification({
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

/* export const newNotifyRna = (place) => {
  rncStore.addNotification({
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
} */

export const newNotifyCustom = (place) => {
  rncStore.addNotification({
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
