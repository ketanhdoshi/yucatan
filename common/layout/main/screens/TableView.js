import React from "react";
import styled from 'styled-components';

// react-bootstrap components
import {Badge, Button, Card, Navbar, Nav, Table, Container, Row, Col,
} from "react-bootstrap";

import {CardView} from './CardView'
import SimpleTable from "../../../widgets/SimpleTable.js"

function TableView() {
  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <CardView title="Striped Table with Hover" subTitle="Striped Table subtitle">
              <SimpleTable
                columns={["ID", "Name", "Salary", "Country", "City"]}
                rows={[
                  ["1", "Dakota Rice", "$36,738", "Niger", "Oud-Turnhout"],
                  ["2", "Minerva Hooper", "$23,789", "Curaçao", "Sinaai-Waas"],
                  ["3", "Sage Rodriguez", "$56,142", "Netherlands", "Baileux"],
                  ["4", "Philip Chaney", "$38,735", "Korea, South", "Overland Park"],
                  ["5", "Doris Greene", "$63,542", "Malawi", "Feldkirchen in Kärnten"],
                  ["6", "Mason Porter", "$78,615", "Chile", "Gloucester"]
                ]}
              />
            </CardView>
          </Col>
          <Col md="12">
            <CardView title="Table on Plain Background" subTitle="Plain Table subtitle" plain="true">
              <SimpleTable
                columns={["ID", "Name", "Salary", "Country", "City"]}
                rows={[
                  ["1", "Dakota Rice", "$36,738", "Niger", "Oud-Turnhout"],
                  ["2", "Minerva Hooper", "$23,789", "Curaçao", "Sinaai-Waas"],
                  ["3", "Sage Rodriguez", "$56,142", "Netherlands", "Baileux"],
                  ["4", "Philip Chaney", "$38,735", "Korea, South", "Overland Park"],
                  ["5", "Doris Greene", "$63,542", "Malawi", "Feldkirchen in Kärnten"],
                  ["6", "Mason Porter", "$78,615", "Chile", "Gloucester"]
                ]}
              />
            </CardView>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default TableView;