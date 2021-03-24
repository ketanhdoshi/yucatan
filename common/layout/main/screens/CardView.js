import React from "react";
import styled from 'styled-components';

// react-bootstrap components
import {Badge, Button, Card, Navbar, Nav, Table, Container, Row, Col,
} from "react-bootstrap";

// import s from './CardView.scss'

const Subtitle = styled.p`
  font-size: ${props => props.theme.font.fontSizeBase};
  font-weight: ${props => props.theme.font.fontWeightNormal};
  color: ${props => props.theme.colour.darkGray};
  margin-bottom: 0px;
`;

const Title = styled(Card.Title)`
  margin: ${props => props.theme.none};
  color: ${props => props.theme.colour.blackColor};
  font-weight: ${props => props.theme.font.fontWeightLight};
`;

const Header = styled(Card.Header)`
  padding: 15px 15px 0;
  border-bottom: none !important;
  background-color: transparent!important;
`;

const StyledCard = styled(Card)`
  ${props => props.plain && '\
    background-color: transparent;\
    box-shadow: none;\
    border-radius: 0;\
    border: none !important;\
  '}
`;

export const CardDesc = ({title, subTitle}) => {
  return (
    // <Card.Header className={s.cardHeader}>
    <Header>
      <Title as="h4">{title}</Title>
      {/* <Card.Title as="h4" className={s.cardTitle}>{title}</Card.Title> */}
      <Subtitle>{subTitle}</Subtitle>
      {/* <p className={s.cardSubtitle}>{subTitle}</p> */}
    </Header>
  );
}

export const CardView = ({title, subTitle, plain, children}) => {
  return (
    // <Card className={plain ? s.cardPlain : ""}>
    <StyledCard plain={plain}>
      <CardDesc title={title} subTitle={subTitle}/>
      <Card.Body className="px-0">
        {children}
      </Card.Body>
    </StyledCard>
  );
}

