import React from "react";
import styled from 'styled-components';

// react-bootstrap components
import {Badge, Button, Card, Navbar, Nav, Table, Container, Row, Col,
} from "react-bootstrap";

import {CardView} from '../widgets/CardView'

const TextType = styled.span`
  bottom: 10px;
  color: #9A9A9A;
  display: block;
  font-weight: 400;
  font-size: 14px;
  line-height: 13px;
  left: 5px;
  position: absolute;
  width: 260px;
  text-transform: none;
`;

const TextLine = styled.div`
  padding-left: 15%;
  margin-bottom: 35px;
  position: relative;
  display: block;
  width: 100%;
`;

const TextItem=({tag, type, children}) => {
  // Pass in the name of a HTML tag as a string eg. tag="h1"
  // Here we convert that to a HTML tag and render it.
  // Dynamic HTML tag types can be used at runtime if first assigned to a capitalised 
  // variable first. This is because User Defined JSX Components Must BE Capitalized.
  const TextTag = tag ? `${tag}` : `div`
  return (
    <TextLine>
      <TextTag>
        <TextType>{type}</TextType>
        {children}
      </TextTag>
    </TextLine>
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
              <TextItem tag="h1" type="Header 1">The Life of Light Bootstrap Dashboard React</TextItem> 
              <TextItem tag="h2" type="Header 2">The Life of Light Bootstrap Dashboard React</TextItem>
              <TextItem tag="h3" type="Header 3">The Life of Light Bootstrap Dashboard React</TextItem>
              <TextItem tag="h4" type="Header 4">The Life of Light Bootstrap Dashboard React</TextItem>
              <TextItem tag="h5" type="Header 5">The Life of Light Bootstrap Dashboard React</TextItem>
              <TextItem tag="h6" type="Header 6">The Life of Light Bootstrap Dashboard React</TextItem>
              <TextItem tag="p" type="Paragraph">
                  {para}
              </TextItem>
              <TextItem type="Quote">
                <blockquote>
                  <p className="blockquote blockquote-primary">
                    {para}
                    <br></br>
                    <br></br>
                    <small>- Noaa</small>
                  </p>
                </blockquote>
              </TextItem>
              <TextItem type="Muted Text">
                <p className="text-muted">{msg}</p>
              </TextItem>
              <TextItem type="Primary Text">
                <p className="text-primary">{msg}</p>
              </TextItem>
              <TextItem type="Info Text">
                <p className="text-info">{msg}</p>
              </TextItem>
              <TextItem type="Success Text">
                <p className="text-success">{msg}</p>
              </TextItem>
              <TextItem type="Warning Text">
                <p className="text-warning">{msg}</p>
              </TextItem>
              <TextItem type="Danger Text">
                <p className="text-danger">{msg}</p>
              </TextItem>
              <TextItem tag="h2" type="Small Tag">
                  Header with small subtitle <br></br>
                  <small>Use "small" tag for the headers</small>
              </TextItem>
            </CardView>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default TextFont;
