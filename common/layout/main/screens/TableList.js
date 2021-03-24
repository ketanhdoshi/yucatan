import React from "react";
import styled from 'styled-components';

// react-bootstrap components
import {Badge, Button, Card, Navbar, Nav, Table, Container, Row, Col,
} from "react-bootstrap";

import {CardView} from './CardView'
// import s from './TableList.scss'

const ColHeader = styled.th`
  padding: 12px 8px;
  vertical-align: middle;
  border-bottom-width: 1px;
  font-size: ${props => props.theme.font.fontSizeSmall};
  text-transform: uppercase;
  color: ${props => props.theme.colour.darkGray};
  font-weight: ${props => props.theme.font.fontWeightNormal};
  padding-bottom: 5px;
  border-top: none !important;
  border-bottom: none;
  text-align: left !important;
`;

const TableRow = ({values}) => {
  const tdItems = values.map((value, index) =>
    <td key={index}>{value}</td>
  );

  return (
    <tr>
      {
        values.map((value, index) =>
          <td key={index}>{value}</td>
        )
      }
    </tr>
  );
}

const TableHeader = ({columns}) => {
  return (
    <tr>
      {
        columns.map((column, index) => 
          <ColHeader key={index}>{column}</ColHeader>
          // <th key={index} className={s.colHeader}>{column}</th>
        )
      }
    </tr>
  );
}

const TableView = ({columns, rows, striped}) => {
  return (
    <Table responsive striped hover>
      <thead>
        <TableHeader columns={columns}/>
      </thead>
      <tbody>
        {
          rows.map((row, index) => 
            <TableRow key={index} values={row}/>
          )
        }
      </tbody>
    </Table>
  );
}

function TableList() {
  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <CardView title="Striped Table with Hover" subTitle="Striped Table subtitle">
              <TableView
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
              <TableView
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

export default TableList;
