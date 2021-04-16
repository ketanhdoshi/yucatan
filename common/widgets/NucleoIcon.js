import React from "react";
import styled from 'styled-components';

export const NucleoIcon = styled.i.attrs(props => ({
  className: props.name,
}))`
  display: inline-block;
  font: normal normal normal 14px/1 'nucleo-icons';
  font-size: 32px;
  speak: none;
  text-transform: none;
  /* Better Font Rendering */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
`;


