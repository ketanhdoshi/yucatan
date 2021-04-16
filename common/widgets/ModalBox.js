import React from "react";
import styled from 'styled-components';

// react-bootstrap components
import {Modal, Button
} from "react-bootstrap";

import {NucleoIcon} from './NucleoIcon'

const ModalButton = styled(Button).attrs(() => ({
  className:  "btn-simple"
}))`
  margin: 0;
  padding-left: 16px;
  padding-right: 16px;
  width: auto;
  background-color: transparent;
  font-weight: 400;
  opacity: .8;
  color: #888;

  &:hover,
  &:focus{
      text-decoration: none;
  }
`;

const Footer = styled.div`
  padding-top: 0;
  border-top: none;
  padding-right: 24px;
  padding-bottom: 16px;
  padding-left: 24px;
  justify-content: space-between;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  border-bottom-right-radius: calc(.3rem - 1px);
  border-bottom-left-radius: calc(.3rem - 1px);
`;

const StyledBody = styled(Modal.Body).attrs(() => ({
  className:  "text-center"
}))`
  padding-top: 24px;
  padding-right: 24px;
  padding-bottom: 16px;
  padding-left: 24px;
  line-height: 1.9;
`;

const StyledHeader = styled(Modal.Header).attrs(() => ({
  className:  "justify-content-center"
}))`
  border-bottom: none;
  padding-top: 24px;
  padding-right: 24px;
  padding-bottom: 0;
  padding-left: 24px;
`;

const StyledModal = styled(Modal).attrs(() => ({
  className:  "modal-mini modal-primary"
}))`
  overflow-x: hidden;
  overflow-y: auto;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1050;
  width: 100%;
  height: 100%;
  outline: 0;
`;

const Profile = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  text-align: center;
  line-height: 5.7;
  box-shadow: 0px 5px 20px 0px rgba(0, 0, 0, 0.3);
`;

const ModalIcon = styled(NucleoIcon)`
  padding-top: 24px;
`;

export const ModalBox = ({icon, children, show, hideCb}) => {
  return (
    <StyledModal show={show} onHide={hideCb}>
      <StyledHeader>
        <Profile>
          <ModalIcon name={icon} />
        </Profile>
      </StyledHeader>
      <StyledBody>
        {children}
      </StyledBody>
      <Footer>
        <ModalButton type="button" variant="link" onClick={hideCb}>Back</ModalButton>
        <ModalButton type="button" variant="link" onClick={hideCb}>Close</ModalButton>
      </Footer>
    </StyledModal>
  )
}

export default ModalBox
