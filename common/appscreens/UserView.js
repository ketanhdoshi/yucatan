import React from "react";
import styled, {css} from 'styled-components';

import {Badge, Button, Card, Form, Navbar, Nav, Container, Row, Col,
} from "react-bootstrap";

import userBackground from "../layout/main/img/userBackground.jpeg";
import userPhoto from "../layout/main/img//userPhoto.jpg"

import { StyledLabel, StyledControl } from '../widgets/RbFormAdapter'
import UserCard from '../widgets/UserCard'

const ProfileBody = styled(Card.Body)`
  padding: 15px 15px 10px 15px;
`;

const Title = styled(Card.Title)`
  margin: ${props => props.theme.none};
  color: ${props => props.theme.colour.blackColour};
  font-weight: ${props => props.theme.font.fontWeightLight};
`;

const Header = styled(Card.Header)`
  padding: 15px 15px 0;
  background-color: ${props => props.theme.colour.whiteColour};
  border-bottom: none !important;
`;

const StyledCard = styled(Card)`
  border-radius: ${props => props.theme.layout.borderRadiusBase};
  background-color: ${props => props.theme.colour.whiteColour};
  margin-bottom: 30px;
`;

const UserProfileForm = () => {
  return (
    <ProfileBody>
      <Form>
        <Row>
          <Col className="pr-1" md="5">
            <Form.Group>
              <StyledLabel>Company (disabled)</StyledLabel>
              <StyledControl defaultValue="Creative Code Inc." disabled placeholder="Company" type="text"></StyledControl>
            </Form.Group>
          </Col>
          <Col className="px-1" md="3">
            <Form.Group>
              <StyledLabel>Username</StyledLabel>
              <StyledControl defaultValue="michael23" placeholder="Username" type="text"></StyledControl>
            </Form.Group>
          </Col>
          <Col className="pl-1" md="4">
            <Form.Group>
              <StyledLabel htmlFor="exampleInputEmail1">Email address</StyledLabel>
              <StyledControl placeholder="Email" type="email"></StyledControl>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col className="pr-1" md="6">
            <Form.Group>
              <StyledLabel>First Name</StyledLabel>
              <StyledControl defaultValue="Mike" placeholder="Company" type="text"></StyledControl>
            </Form.Group>
          </Col>
          <Col className="pl-1" md="6">
            <Form.Group>
              <StyledLabel>Last Name</StyledLabel>
              <StyledControl defaultValue="Andrew" placeholder="Last Name" type="text"></StyledControl>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <Form.Group>
              <StyledLabel>Address</StyledLabel>
              <StyledControl defaultValue="Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09" placeholder="Home Address" type="text"></StyledControl>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col className="pr-1" md="4">
            <Form.Group>
              <StyledLabel>City</StyledLabel>
              <StyledControl defaultValue="Mike" placeholder="City" type="text"></StyledControl>
            </Form.Group>
          </Col>
          <Col className="px-1" md="4">
            <Form.Group>
              <StyledLabel>Country</StyledLabel>
              <StyledControl defaultValue="Andrew" placeholder="Country" type="text"></StyledControl>
            </Form.Group>
          </Col>
          <Col className="pl-1" md="4">
            <Form.Group>
              <StyledLabel>Postal Code</StyledLabel>
              <StyledControl placeholder="ZIP Code" type="number"></StyledControl>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <Form.Group>
              <StyledLabel>About Me</StyledLabel>
              <StyledControl cols="80" placeholder="Here can be your description" rows="4" as="textarea"
                defaultValue="Lamborghini Mercy, Your chick she so thirsty, I'm in that two seat Lambo."></StyledControl>
            </Form.Group>
          </Col>
        </Row>
        <Button className="btn-fill pull-right" type="submit" variant="info">Update Profile</Button>
        <div className="clearfix"></div>
      </Form>
    </ProfileBody>
  );
}

const EditUserProfile = () => {
  return (
    <StyledCard>
      <Header>
        <Title as="h4">Edit Profile</Title>
      </Header>
      <UserProfileForm />
    </StyledCard>
  );
}

const userData = {
  userId: "michael24",
  displayName: "Mike Andrew",
  photo: userPhoto,
  backgndPhoto: userBackground,
  // Wrap with JSX braces since it is HTML with embedded <br> tags and not a plain string
  desc: <>Lamborghini Mercy <br></br>Your chick she so thirsty <br></br>I'm in that two seat Lambo</>
}

const UserView = () => {
  return (
    <>
      <Container fluid>
        <Row>
          <Col md="8">
            <EditUserProfile />
          </Col>
          <Col md="4">
            <UserCard data={userData}/>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default UserView;
