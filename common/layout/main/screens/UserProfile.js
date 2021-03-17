import React from "react";

// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Form,
  Navbar,
  Nav,
  Container,
  Row,
  Col,
} from "react-bootstrap";

import userBackground from "../img/userBackground.jpeg";
import userPhoto from "../img/userPhoto.jpg"

import s from './UserProfile.scss'

const UserProfile = () => {
  return (
    <Card.Body className={s.profileBody}>
      <Form>
        <Row>
          <Col className="pr-1" md="5">
            <Form.Group>
              <Form.Label className={s.label}>Company (disabled)</Form.Label>
              <Form.Control className={s.formControl} defaultValue="Creative Code Inc." disabled placeholder="Company" type="text"></Form.Control>
            </Form.Group>
          </Col>
          <Col className="px-1" md="3">
            <Form.Group>
              <Form.Label className={s.label}>Username</Form.Label>
              <Form.Control className={s.formControl} defaultValue="michael23" placeholder="Username" type="text"></Form.Control>
            </Form.Group>
          </Col>
          <Col className="pl-1" md="4">
            <Form.Group>
              <Form.Label className={s.label} htmlFor="exampleInputEmail1">Email address</Form.Label>
              <Form.Control className={s.formControl} placeholder="Email" type="email"></Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col className="pr-1" md="6">
            <Form.Group>
              <Form.Label className={s.label}>First Name</Form.Label>
              <Form.Control className={s.formControl} defaultValue="Mike" placeholder="Company" type="text"></Form.Control>
            </Form.Group>
          </Col>
          <Col className="pl-1" md="6">
            <Form.Group>
              <Form.Label className={s.label}>Last Name</Form.Label>
              <Form.Control className={s.formControl} defaultValue="Andrew" placeholder="Last Name" type="text"></Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <Form.Group>
              <Form.Label className={s.label}>Address</Form.Label>
              <Form.Control className={s.formControl} defaultValue="Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09" placeholder="Home Address" type="text"></Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col className="pr-1" md="4">
            <Form.Group>
              <Form.Label className={s.label}>City</Form.Label>
              <Form.Control className={s.formControl} defaultValue="Mike" placeholder="City" type="text"></Form.Control>
            </Form.Group>
          </Col>
          <Col className="px-1" md="4">
            <Form.Group>
              <Form.Label className={s.label}>Country</Form.Label>
              <Form.Control className={s.formControl} defaultValue="Andrew" placeholder="Country" type="text"></Form.Control>
            </Form.Group>
          </Col>
          <Col className="pl-1" md="4">
            <Form.Group>
              <Form.Label className={s.label}>Postal Code</Form.Label>
              <Form.Control className={s.formControl} placeholder="ZIP Code" type="number"></Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <Form.Group>
              <Form.Label className={s.label}>About Me</Form.Label>
              <Form.Control className={s.formControl} cols="80" placeholder="Here can be your description" rows="4" as="textarea"
                defaultValue="Lamborghini Mercy, Your chick she so thirsty, I'm in that two seat Lambo."></Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Button className="btn-fill pull-right" type="submit" variant="info">Update Profile</Button>
        <div className="clearfix"></div>
      </Form>
    </Card.Body>
  );
}

const EditUserProfile = () => {
  return (
    <Card>
      <Card.Header>
        <Card.Title as="h4">Edit Profile</Card.Title>
      </Card.Header>
      <UserProfile />
    </Card>
  );
}

const UserBackgnd = ({backgndPhoto}) => {
  return (
    <div className={s.backgndPhoto}>
      <img className={s.backgndImg} alt="..." src={backgndPhoto}></img>
    </div>
  );
}

const UserBio = ({photo, displayName, userId, desc}) => {
  const onClick = (e) => {
    e.preventDefault()
  }

  return (
    <Card.Body className={s.bioBody}>
      <div className={s.bio}>
        <a href="#pablo" onClick={onClick}>
          <img alt="..." className={s.avatar} src={photo}></img>
          <h5 className={s.displayName}>{displayName}</h5>
        </a>
        <p className={s.userId}>{userId}</p>
      </div>
      <p className={s.desc + " text-center"}>{desc}</p>
    </Card.Body>
  );
}

const IconButtonFa = ({iconLink, faIcon}) => {
  const onClick = (e) => {
    e.preventDefault()
  }
  return (
    <Button className={s.btnIcon} href={iconLink} onClick={onClick} variant="link">
      <i className={s.faIcon + " fab " + faIcon}></i>
    </Button>
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
            <Card className={s.cardUser}>
              <UserBackgnd backgndPhoto={userBackground} />
              <UserBio photo={userPhoto} displayName="Mike Andrew" userId="michael24"
                    // Wrap with JSX braces since it is HTML with embedded <br> tags and not a plain string
                    desc={<>Lamborghini Mercy <br></br>Your chick she so thirsty <br></br>I'm in that two seat Lambo</>}/>
              <hr className={s.hr}></hr>
              <SocialIcons />
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default User;
