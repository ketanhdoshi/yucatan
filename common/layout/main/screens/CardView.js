import React from "react";

// react-bootstrap components
import {Badge, Button, Card, Navbar, Nav, Table, Container, Row, Col,
} from "react-bootstrap";

import s from './CardView.scss'

export const CardDesc = ({title, subTitle}) => {
  return (
    <Card.Header className={s.cardHeader}>
      <Card.Title as="h4" className={s.cardTitle}>{title}</Card.Title>
      <p className={s.cardSubtitle}>{subTitle}</p>
    </Card.Header>
  );
}

export const CardView = ({title, subTitle, plain, children}) => {
  return (
    <Card className={plain ? s.cardPlain : ""}>
      <CardDesc title={title} subTitle={subTitle}/>
      <Card.Body className="px-0">
        {children}
      </Card.Body>
    </Card>
  );
}

