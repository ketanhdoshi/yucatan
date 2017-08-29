// -----------------------------------------------------------------
// Presentational component for the UI Components - Form page
// -----------------------------------------------------------------
import React, { PropTypes } from 'react'

import Box, {BOX_INFO} from './widgets/Box'
import {FormText, FormTextArea, FormCheckbox, 
    FormRadio, FormSelect, FormFileInput, FormInputGroup, FormInputGroupButton,
    ADDON_LABEL, ADDON_ICON, ADDON_CHECKBOX, ADDON_RADIO,
    FORMTEXT_SUCCESS, FORMTEXT_WARNING, FORMTEXT_ERROR} from './widgets/FormControls'

var exRadio = [
    {
        label: 'Option value 1', checked: true
    },
    {
        label: 'Option value 2'
    },
    {
        label: 'Option value 3', disabled: true
    }   
];

var exSelect = ['Select 1', 'Select 2', 'Select 3' ];


// -----------------------------------------------------------------
// This component constructs the overall page. It is not meant to be
// a reusable widget, but an orchestrator for the widgets on this
// page.
// -----------------------------------------------------------------
const UiFormView = () => {
    return (
        <div>
            <div className="row">
                <div className="col-md-6">
                    <Box bg={BOX_INFO} title="Form Controls">
                        <form role="form">                
                            <FormText type="email" label="Email" placeholder="Type Email..." />
                            <FormText type="password" label="Password" placeholder="Type Pwd..." />
                            <FormText label="Text Field" placeholder="Type..." />
                            <FormTextArea label="Text Area" rows='4' placeholder="Type..." />
                            <FormCheckbox label="KD Checkbox" />
                            <FormFileInput label="KD File" help="My help" />
                        </form>
                    </Box>
                </div> {/* /.col */} 
               <div className="col-md-6">
                    <Box bg={BOX_INFO} title="Form Input Groups">
                        <form role="form">                
                            <FormInputGroup preType={ADDON_LABEL} preInfo="@" placeholder="Username..." /><br />
                            <FormInputGroup preType={ADDON_LABEL} preInfo="$" postType={ADDON_LABEL} postInfo=".00" placeholder="Amount..." /><br />
                            <FormInputGroup preType={ADDON_ICON}  preInfo="fa-envelope" placeholder="Email..." /><br />
                            <FormInputGroup preType={ADDON_ICON} preInfo="fa-bell" postType={ADDON_ICON} postInfo="fa-ambulance" placeholder="Type..." /><br />
                            <FormInputGroup preType={ADDON_CHECKBOX}  placeholder="Type..." /><br />
                            <FormInputGroup preType={ADDON_RADIO}  placeholder="Type..." /><br />
                            <FormInputGroupButton preInfo="Input Group Button" /><br />
                            <FormInputGroupButton preInfo="Button1" postInfo="Button2" /><br />
                        </form>
                    </Box>
                </div> {/* /.col */} 
            </div>
            <div className="row">
                <div className="col-md-6">
                    <Box bg={BOX_INFO} title="Form Text States">
                        <form role="form">                
                            <FormText label="Text Disabled" placeholder="Type..." disabled={true} />
                            <FormText label="Text Success" validState={FORMTEXT_SUCCESS} validMsg="Success Msg" />
                            <FormText label="Text Warning" validState={FORMTEXT_WARNING} validMsg="Warning Msg" />
                            <FormText label="Text Error" validState={FORMTEXT_ERROR} validMsg="Error Msg" />
                        </form>
                    </Box>
                </div> {/* /.col */} 
               <div className="col-md-6">
                    <Box bg={BOX_INFO} title="Form Selects">
                        <form role="form">
                            <FormCheckbox label="Disabled Checkbox" disabled={true} />
                            <FormRadio name="exRadio" items={exRadio}/>
                            <FormSelect label="Single Select" items={exSelect}/>
                            <FormSelect label="Multi Select" items={exSelect} multiple={true}/>
                            <FormSelect label="Select Disabled" items={exSelect} disabled={true}/>
                        </form>
                    </Box>
                </div> {/* /.col */} 
            </div>
        </div>
    )
}

UiFormView.propTypes = {
}

export default UiFormView