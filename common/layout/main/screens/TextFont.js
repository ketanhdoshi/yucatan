import React from "react";

// react-bootstrap components
import {Badge, Button, Card, Navbar, Nav, Table, Container, Row, Col,
} from "react-bootstrap";

import {CardView} from './CardView'
import s from './TextFont.scss'

const TextLine=({tag, type, children}) => {
  // Pass in the name of a HTML tag as a string eg. tag="h1"
  // Here we convert that to a HTML tag and render it.
  // Dynamic HTML tag types can be used at runtime if first assigned to a capitalised 
  // variable first. This is because User Defined JSX Components Must BE Capitalized.
  const TextTag = `${tag}`
  return (
    <div className={s.textLine}>
      <TextTag>
        <span className={s.textType}>{type}</span>
        {children}
      </TextTag>
    </div>
  );
}

function TextFont() {
  const para = "I will be the leader of a company that ends up being worth billions of dollars, \
                because I got the answers. I understand culture. I am the nucleus. I think \
                that’s a responsibility that I have, to push possibilities, to show people, \
                this is the level that things could be at."
  const msg = "I will be the leader of a company that ends up being worth billions of dollars, because I got the answers..."
  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
          < CardView title="Light Bootstrap Table Heading" 
                    subTitle="Created using Montserrat Font Family">
              <TextLine tag="h1" type="Header 1">The Life of Light Bootstrap Dashboard React</TextLine> 
              <TextLine tag="h2" type="Header 2">The Life of Light Bootstrap Dashboard React</TextLine>
              <TextLine tag="h3" type="Header 3">The Life of Light Bootstrap Dashboard React</TextLine>
              <TextLine tag="h4" type="Header 4">The Life of Light Bootstrap Dashboard React</TextLine>
              <TextLine tag="h5" type="Header 5">The Life of Light Bootstrap Dashboard React</TextLine>
              <TextLine tag="h6" type="Header 6">The Life of Light Bootstrap Dashboard React</TextLine>
              <TextLine tag="p" type="Paragraph">
                  {para}
              </TextLine>
              <TextLine type="Quote">
                <blockquote>
                  <p className="blockquote blockquote-primary">
                    {para}
                    <br></br>
                    <br></br>
                    <small>- Noaa</small>
                  </p>
                </blockquote>
              </TextLine>
              <TextLine type="Muted Text">
                <p className="text-muted">{msg}</p>
              </TextLine>
              <TextLine type="Primary Text">
                <p className="text-primary">{msg}</p>
              </TextLine>
              <TextLine type="Info Text">
                <p className="text-info">{msg}</p>
              </TextLine>
              <TextLine type="Success Text">
                <p className="text-success">{msg}</p>
              </TextLine>
              <TextLine type="Warning Text">
                <p className="text-warning">{msg}</p>
              </TextLine>
              <TextLine type="Danger Text">
                <p className="text-danger">{msg}</p>
              </TextLine>
              <TextLine tag="h2" type="Small Tag">
                  Header with small subtitle <br></br>
                  <small>Use "small" tag for the headers</small>
              </TextLine>
            </CardView>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default TextFont;
