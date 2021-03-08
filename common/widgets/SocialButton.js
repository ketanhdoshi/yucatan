// -----------------------------------------------------------------
// SocialButton component
// -----------------------------------------------------------------
import React, { PropTypes } from 'react'

import s from '../scss/SocialButton.scss'

export const SOCIAL_FACEBOOK = 1;
export const SOCIAL_GOOGLE = 2;
export const SOCIAL_TWITTER = 3;

const SocialButton = (props) => {
    let title = '', icon = '', btnType='';
    switch (props.type) {
        case SOCIAL_FACEBOOK:
            title = "Facebook";
            icon = "fa-facebook";
            btnType = s.btnFacebook;
            break;
        case SOCIAL_GOOGLE:
            title = "Google";
            icon = "fa-google-plus";
            btnType = s.btnGoogle;
            break;
        case SOCIAL_TWITTER:
            title = "Twitter";
            icon = "fa-twitter";
            btnType = s.btnTwitter;
            break;        
    }
    return (
        <a href="#" className={"btn btn-block " + s.btnSocial + " " + btnType}>
            <i className={"fa " + icon}></i>{"Sign in with " + title}
        </a>
    )
}

SocialButton.propTypes = {
}

export default SocialButton