// -----------------------------------------------------------------
// Presentational component for the UI Components - Button page
// -----------------------------------------------------------------
import React, { PropTypes } from 'react'

import SocialButton, {SOCIAL_FACEBOOK, SOCIAL_GOOGLE, SOCIAL_TWITTER} from '../components/widgets/SocialButton'
import Box, {BOX_INFO} from '../components/widgets/Box'

// -----------------------------------------------------------------
// This component constructs the overall page. It is not meant to be
// a reusable widget, but an orchestrator for the widgets on this
// page.
// -----------------------------------------------------------------
const UiButtonView = () => {
    return (
        <div>
            <div className="row">
                <div className="col-md-6">
                    <Box bg={BOX_INFO} title="Social Sign In Buttons">
                        <SocialButton type={SOCIAL_FACEBOOK}/>
                        <SocialButton type={SOCIAL_GOOGLE}/>
                        <SocialButton type={SOCIAL_TWITTER}/>
                    </Box>
                </div> {/* /.col */}        
                <div className="col-md-6">
                    <p>2nd Column</p>
                </div> {/* /.col */}        
            </div>
        </div>
    )
}

UiButtonView.propTypes = {
}

export default UiButtonView