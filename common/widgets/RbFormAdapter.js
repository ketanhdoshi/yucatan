// react-bootstrap components
import React from 'react'
import {Form} from "react-bootstrap";
import styled, {css} from 'styled-components';

// -----------------------------------------------------------------
// Wrapper components to use React Bootstrap form controls on a form controlled
// by React Final Form
// -----------------------------------------------------------------

export const oldRbFormControlAdapter = ({ input, ...rest }) => (
  <Form.Control {...input} {...rest} />
)

export const RbFormControlAdapter = ({ input, ...rest }) => (
    <StyledControl {...input} {...rest} />
)

export const RbFormCheckAdapter = ({ input, label, ...rest }) => (
    <Form.Check {...input} type="checkbox" label={label} {...rest} />
)

export const RbFormSelectAdapter = ({ input, ...rest }) => (
    <Form.Control as="select" {...input} {...rest} />
)

export const transitionMixin = (time, type) => css`
  -webkit-transition: all ${time} ${type};
  -moz-transition: all ${time} ${type};
  -o-transition: all ${time} ${type};
  -ms-transition: all ${time} ${type};
  transition: all ${time} ${type};
`;

const inputSizeMixin = (paddingVertical, paddingHorizontal, height) => css`
  padding: ${paddingVertical} ${paddingHorizontal};
  height: ${height};
`;

const boxShadowMixin = (shadow) => css`
  -webkit-box-shadow: ${shadow}; // iOS <4.3 & Android <4.1
  box-shadow: ${shadow};
`;

export const StyledLabel = styled(Form.Label)`
  font-size: ${props => props.theme.font.fontSizeSmall};
  margin-bottom: 5px;
  text-transform: uppercase;
  font-weight: ${props => props.theme.font.fontWeightNormal};
  color: ${props => props.theme.colour.darkGray};
`;

export const StyledControl = styled(Form.Control)`
  background-color: ${props => props.theme.colour.whiteBg};
  color: #565656;
  border: 1px solid ${props => props.theme.colour.lightGray};
  border-radius: ${props => props.theme.layout.borderRadiusBase};
  ${(props) => inputSizeMixin(props.theme.layout.paddingBaseVertical, props.theme.layout.paddingBaseHorizontalMinus4, props.theme.layout.heightBase)};
  ${boxShadowMixin("none")};
  ${(props) => transitionMixin(props.theme.effect.generalTransitionTime, props.theme.effect.transitionLinear)};

  &[disabled] {
    background-color: #F5F5F5;
    color: #888888;
    cursor: not-allowed; 
  }

  &:focus{
    background-color: ${props => props.theme.colour.whiteBg};
    border: 1px solid ${props => props.theme.colour.mediumDarkGray};
    ${boxShadowMixin('none')};
    outline: 0 !important;    
    color: #333333;   
  }
`;