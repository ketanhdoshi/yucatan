// -----------------------------------------------------------------
// Presentational component for the UI Components - General page
// -----------------------------------------------------------------
import React, { PropTypes } from 'react'

import Box, {BOX_INFO} from '../widgets/Box'
import InfoBox from '../widgets/InfoBox'
import SmallBox from '../widgets/SmallBox'

// -----------------------------------------------------------------
// This component constructs the overall page. It is not meant to be
// a reusable widget, but an orchestrator for the widgets on this
// page.
// -----------------------------------------------------------------
const UiGeneralView = () => {
    return (
        <div>
            <div className="row">
                <div className="col-md-3 col-sm-6 col-xs-12">
                    <InfoBox bg="bg-blue" icon="fa-bookmark-o" title="Bookmarks" value="283" pct='50%' desc="50% Increase in 30 Days"/>
                </div> {/* /.col */}        
                <div className="col-md-3 col-sm-6 col-xs-12">
                    <InfoBox bg="bg-green" icon="fa-desktop" title="Users" value="47865" pct='15%' desc="15% Improvement"/>
                </div> {/* /.col */}        
            </div>
            <div className="row">
                <div className="col-lg-3 col-xs-6">
                    <SmallBox bg="bg-green" title="Bounce Rate" value="43" ss='%' icon='ion-stats-bars' fs='20px'/>
                </div> {/* /.col */} 
            </div>
            <div className="row">
                <div className="col-md-6">
                    <Box bg={BOX_INFO} title="My Box">
                        <p>This is my box</p>
                    </Box>
                </div> {/* /.col */} 
            </div>
        </div>
    )
}

UiGeneralView.propTypes = {
}

export default UiGeneralView