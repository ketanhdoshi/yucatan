import React from "react";
import styled from 'styled-components';

// react-bootstrap components
import {Table} from "react-bootstrap";

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

const TableRow = ({values, id, onClickCb}) => {
 /*  const tdItems = values.map((value, index) =>
    <td key={index}>{value}</td>
  ); */

  return (
    <tr onClick={onClickCb ? onClickCb.bind(this, id) : null}>
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
        )
      }
    </tr>
  );
}

const SimpleTable = ({columns, rows, striped, onClickCb}) => {
  return (
    <Table responsive striped hover>
      <thead>
        <TableHeader columns={columns}/>
      </thead>
      <tbody>
        {
          rows.map((row, index) => 
            <TableRow key={index} values={row} id={index} onClickCb={onClickCb}/>
          )
        }
      </tbody>
    </Table>
  );
}

export default SimpleTable
