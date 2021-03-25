import React from "react";
import styled from 'styled-components';

// react-bootstrap components
import {Badge, Button, Card, Navbar, Nav, Container, Row, Col,
} from "react-bootstrap";

import {CardView} from './CardView'

const Detail = styled.div`
  text-align: center;
  padding: 45px 0px 30px;
  border: 1px solid #e5e5e5;
  border-radius: 6px;
  margin: 15px 0;
`;

export const NucleoIcon = styled.i.attrs(props => ({
  className: props.name,
}))`
  display: inline-block;
  font: normal normal normal 14px/1 'nucleo-icons';
  font-size: 32px;
  speak: none;
  text-transform: none;
  /* Better Font Rendering */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
`;

const IconCard = ({name}) => {
  return (
    <Col lg="2" md="3" sm="4" xs="6">
      <Detail>
        <NucleoIcon name={name} />
        <p>{name}</p>
      </Detail>
    </Col>
  );
}

const IconList = ({icons}) => {
  return (
    <Row>
      {
        icons.map((icon, index) =>
          <IconCard key={index} name={icon} />
        )
      }
    </Row>
  );
}

export const Icons = () => {
  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <CardView title="100 Awesome Nucleo Icons" 
                    subTitle={<>Handcrafted by our friends from{" "}
                              <a href="https://nucleoapp.com/?ref=1712">NucleoApp</a></>}>
              <IconList icons={[
                "nc-air-baloon", "nc-album-2", "nc-alien-33", "nc-align-center", "nc-align-left-2", "nc-ambulance", 
                "nc-android", "nc-app", "nc-apple", "nc-atom", "nc-attach-87", "nc-audio-92", "nc-backpack",
                "nc-badge", "nc-bag", "nc-bank", "nc-battery-81", "nc-bell-55", "nc-bold", 
                "nc-bulb-63", "nc-bullet-list-67", "nc-bus-front-12", "nc-button-pause", "nc-button-play", "nc-button-power",
                "nc-camera-20", "nc-caps-small", "nc-cart-simple", "nc-cctv", "nc-chart-bar-32", "nc-chart-pie-35",
                "nc-chart-pie-36", "nc-chart", "nc-chat-round", "nc-check-2", "nc-circle-09", "nc-circle",
                "nc-cloud-download-93", "nc-cloud-upload-94", "nc-compass-05", "nc-controller-modern", "nc-credit-card", "nc-delivery-fast",
                "nc-email-83", "nc-email-85", "nc-explore-2", "nc-fav-remove", "nc-favourite-28", "nc-globe-2",
                "nc-grid-45", "nc-headphones-2", "nc-html5", "nc-istanbul", "nc-key-25", "nc-layers-3",
                "nc-light-3", "nc-lock-circle-open", "nc-map-big", "nc-mobile", "nc-money-coins", "nc-note-03",
                "nc-notes", "nc-notification-70", "nc-palette", "nc-paper-2", "nc-pin-3", "nc-planet",
                "nc-preferences-circle-rotate", "nc-puzzle-10", "nc-quote", "nc-refresh-02", "nc-ruler-pencil", "nc-satisfied",
                "nc-scissors", "nc-send", "nc-settings-90", "nc-settings-gear-64", "nc-settings-tool-66", "nc-simple-add",
                "nc-simple-delete", "nc-simple-remove", "nc-single-02", "nc-single-copy-04", "nc-spaceship", "nc-square-pin",
                "nc-stre-down", "nc-stre-left", "nc-stre-right", "nc-stre-up", "nc-sun-fog-29", "nc-support-17",
                "nc-tablet-2", "nc-tag-content", "nc-tap-01", "nc-time-alarm", "nc-tv-2", "nc-umbrella-13",
                "nc-vector", "nc-watch-time", "nc-zoom-split"
              ]}/>
            </CardView>
          </Col>
        </Row>
      </Container>
    </>
  );
}

