import React from "react";
import styled, {css} from 'styled-components';

import {Button, Card
} from "react-bootstrap";

import { transitionMixin } from './RbFormAdapter'

const opacityMixin = (opacity) => css`
  opacity: ${opacity};
  filter: alpha(opacity=${opacity * 100});
`;

const StyledCard = styled(Card)`
  border-radius: ${props => props.theme.layout.borderRadiusBase};
  background-color: ${props => props.theme.colour.whiteColour};
  margin-bottom: 30px;
`;

const BackgndPhoto = styled.div`
  width: 100%;
  overflow: hidden;
  height: 110px;
  border-radius: ${props => props.theme.layout.borderRadiusBase} ${props => props.theme.layout.borderRadiusBase} 0 0;
  position: relative;
  -webkit-transform-style: preserve-3d;
  -moz-transform-style: preserve-3d;
  transform-style: preserve-3d;

  img {
    width: 100%;
  }
`;

const BioBody = styled(Card.Body)`
  padding: 15px 15px 10px 15px;

  > div {
    font-size: $font-size-small;
    font-weight: $font-weight-bold;
    text-transform: uppercase;
    text-align: center;
    text-transform: none;
    margin-top: -70px;
  }
`;

const Avatar = styled.img`
  width: 124px;
  height: 124px;
  border: 5px solid #FFFFFF;
  position: relative;
  margin-bottom: 15px;
  border-color: #EEEEEE;

  overflow: hidden;
  border-radius: 50%;
  margin-right: 5px;
`;

const DisplayName = styled.h5`
  line-height: 24px;
  color: ${props => props.theme.colour.infoColour};
`;

const UserId = styled.p`
  font-size: ${props => props.theme.font.fontSizeBase};
  color: #333;
`;

const UserDesc = styled.p.attrs(() => ({
  className: "text-center",
}))`
  font-size: ${props => props.theme.font.fontSizeBase};
  color: #333;
`;

const ButtonFa = styled(Button)`
  border: ${props => props.theme.none};
  font-size: ${props => props.theme.font.fontSizeMedium};
  padding: ${props => props.theme.layout.paddingBaseVertical};
  color: ${props => props.theme.colour.defaultColour};

  background-color: ${props => props.theme.colour.transparentBg};
  font-weight: ${props => props.theme.font.fontWeightNormal};
  ${opacityMixin(0.8)};
  ${(props) => transitionMixin(props.theme.effect.ultraFastTransitionTime, props.theme.effect.transitionEaseIn)};

  > i {
    width: 18px;
    text-align: center;
  }
`;

const UserBio = ({photo, displayName, userId, desc}) => {
  const onClick = (e) => {
    e.preventDefault()
  }

  return (
    <BioBody>
      <div>
        <a href="#pablo" onClick={onClick}>
          <Avatar alt="..." src={photo}></Avatar>
          <DisplayName>{displayName}</DisplayName>
        </a>
        <UserId>{userId}</UserId>
      </div>
      <UserDesc>{desc}</UserDesc>
    </BioBody>
  );
}

const UserCard = ({data}) => {
  const {userId, displayName, photo, backgndPhoto, desc} = data

  return (
    <StyledCard>
      <BackgndPhoto>
        <img alt="..." src={backgndPhoto}></img>
      </BackgndPhoto>
      <UserBio photo={photo} displayName={displayName} userId={userId} desc={desc}/>
      {/* Use Styled Component's css prop. No need to define a new component for a single property */}
      <hr css={`margin: 5px 15px;`}></hr>
      <SocialIcons />
    </StyledCard>
  )
}

const IconButtonFa = ({iconLink, faIcon}) => {
  const onClick = (e) => {
    e.preventDefault()
  }
  return (
    <ButtonFa href={iconLink} onClick={onClick} variant="link">
      <i className={"fab " + faIcon}></i>
    </ButtonFa>
  )
}

const SocialIcons = () => {
  return (
    <div className="mr-auto ml-auto">
      <IconButtonFa iconLink="#pablo" faIcon="fa-facebook-square"/>
      <IconButtonFa iconLink="#pablo" faIcon="fa-twitter"/>
      <IconButtonFa iconLink="#pablo" faIcon="fa-google-plus-square"/>
    </div>
  );
}

export default UserCard