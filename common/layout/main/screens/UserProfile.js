import React from "react";
import styled, {css} from 'styled-components';

import {Badge, Button, Card, Form, Navbar, Nav, Container, Row, Col,
} from "react-bootstrap";

import userBackground from "../img/userBackground.jpeg";
import userPhoto from "../img/userPhoto.jpg"

import { transitionMixin, StyledLabel, StyledControl } from '../../../widgets/RbFormAdapter'

const opacityMixin = (opacity) => css`
  opacity: ${opacity};
  filter: alpha(opacity=${opacity * 100});
`;


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

const BackgndPhoto = styled.div`
  width: 100%;
  overflow: hidden;
  height: 110px;
  border-radius: ${props => props.theme.layout.borderRadiusBase} ${props => props.theme.layout.borderRadiusBase} 0 0;
  position: relative;
  -webkit-transform-style: preserve-3d;
  -moz-transform-style: preserve-3d;
  transform-style: preserve-3d;

  img {
    width: 100%;
  }
`;

const BioBody = styled(Card.Body)`
  padding: 15px 15px 10px 15px;

  > div {
    font-size: $font-size-small;
    font-weight: $font-weight-bold;
    text-transform: uppercase;
    text-align: center;
    text-transform: none;
    margin-top: -70px;
  }
`;

const Avatar = styled.img`
  width: 124px;
  height: 124px;
  border: 5px solid #FFFFFF;
  position: relative;
  margin-bottom: 15px;
  border-color: #EEEEEE;

  overflow: hidden;
  border-radius: 50%;
  margin-right: 5px;
`;

const DisplayName = styled.h5`
  line-height: 24px;
  color: ${props => props.theme.colour.infoColour};
`;

const UserId = styled.p`
  font-size: ${props => props.theme.font.fontSizeBase};
  color: #333;
`;

const UserDesc = styled.p.attrs(() => ({
  className: "text-center",
}))`
  font-size: ${props => props.theme.font.fontSizeBase};
  color: #333;
`;

const CardUser = styled(Card)`
  border-radius: ${props => props.theme.layout.borderRadiusBase};
  background-color: ${props => props.theme.colour.whiteColour};
  margin-bottom: 30px;
`;

const ButtonFa = styled(Button)`
  border: ${props => props.theme.none};
  font-size: ${props => props.theme.font.fontSizeMedium};
  padding: ${props => props.theme.layout.paddingBaseVertical};
  color: ${props => props.theme.colour.defaultColour};

  background-color: ${props => props.theme.colour.transparentBg};
  font-weight: ${props => props.theme.font.fontWeightNormal};
  ${opacityMixin(0.8)};
  ${(props) => transitionMixin(props.theme.effect.ultraFastTransitionTime, props.theme.effect.transitionEaseIn)};

  > i {
    width: 18px;
    text-align: center;
  }
`;

const UserProfile = () => {
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
      <UserProfile />
    </StyledCard>
  );
}

const UserBackgnd = ({backgndPhoto}) => {
  return (
    <BackgndPhoto>
      <img alt="..." src={backgndPhoto}></img>
    </BackgndPhoto>
  );
}

const UserBio = ({photo, displayName, userId, desc}) => {
  const onClick = (e) => {
    e.preventDefault()
  }

  return (
    <BioBody>
      <div>
        <a href="#pablo" onClick={onClick}>
          <Avatar alt="..." src={photo}></Avatar>
          <DisplayName>{displayName}</DisplayName>
        </a>
        <UserId>{userId}</UserId>
      </div>
      <UserDesc>{desc}</UserDesc>
    </BioBody>
  );
}

const IconButtonFa = ({iconLink, faIcon}) => {
  const onClick = (e) => {
    e.preventDefault()
  }
  return (
    <ButtonFa href={iconLink} onClick={onClick} variant="link">
      <i className={"fab " + faIcon}></i>
    </ButtonFa>
  )
}

const SocialIcons = () => {
  return (
    <div className="mr-auto ml-auto">
      <IconButtonFa iconLink="#pablo" faIcon="fa-facebook-square"/>
      <IconButtonFa iconLink="#pablo" faIcon="fa-twitter"/>
      <IconButtonFa iconLink="#pablo" faIcon="fa-google-plus-square"/>
    </div>
  );
}

function User() {
  return (
    <>
      <Container fluid>
        <Row>
          <Col md="8">
            <EditUserProfile />
          </Col>
          <Col md="4">
            <CardUser>
              <UserBackgnd backgndPhoto={userBackground} />
              <UserBio photo={userPhoto} displayName="Mike Andrew" userId="michael24"
                    // Wrap with JSX braces since it is HTML with embedded <br> tags and not a plain string
                    desc={<>Lamborghini Mercy <br></br>Your chick she so thirsty <br></br>I'm in that two seat Lambo</>}/>
              {/* Use Styled Component's css prop. No need to define a new component for a single property */}
              <hr css={`margin: 5px 15px;`}></hr>
              <SocialIcons />
            </CardUser>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default User;
