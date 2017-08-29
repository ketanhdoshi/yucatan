// -----------------------------------------------------------------
// Collection of Form components
// -----------------------------------------------------------------
import React, { PropTypes } from 'react'
import styled from 'styled-components';

// TODO: Disabled Select
// Input Groups with Buttons

// -----------------------------------------------------------------
// Form input field component
// -----------------------------------------------------------------
const Input = styled.input.attrs({
    className: 'form-control',
})`
    border-radius: 0;
    box-shadow: none;
    border-color: ${props => props.validColor ? props.validColor : '#d2d6de'};

    &:focus {
        border-color: #3c8dbc;
        box-shadow: none;
    }

    &::-moz-placeholder,
    &::-ms-input-placeholder,
    &::-webkit-input-placeholder {
        color: #bbb;
        opacity: 1;
    }
    &:not(select) {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
    }
`;

export const FORMTEXT_SUCCESS = 1;
export const FORMTEXT_WARNING = 2;
export const FORMTEXT_ERROR = 3;

// -----------------------------------------------------------------
// Form Text - has a label and a single line text field
//      label - text of the label
//      type - text, email, password
//      placeholder - text prompt displayed in the field
//      validState - null normally. Validation state is Success, Warning or Error
//      validMsg - null normally. Validation message if the validState is set
//      disabled - optionally disable the text field
// -----------------------------------------------------------------
export const FormText = ({label, type='text', placeholder, validState, validMsg, disabled=false}) => {
    const Label = styled.label.attrs({
        className: 'control-label',
    })`
        color: ${props => props.validColor ? props.validColor : ''};
    `;
    
    const ValidMsg = styled.span.attrs({
        className: 'help-block',
    })`
        color: ${props => props.validColor ? props.validColor : 'red'};;
    `;
 
    let validIcon=null, validColor = null, validElement=null;
    switch (validState) {
        case FORMTEXT_SUCCESS:
            validIcon = 'fa-check';
            validColor = '#00a65a';
            break;
        case FORMTEXT_WARNING:
            validIcon = 'fa-bell-o';
            validColor = '#f39c12';
            break;
        case FORMTEXT_ERROR:
            validIcon = 'fa-times-circle-o';
            validColor = '#dd4b39';
            break;
    }
    if (validIcon) {
        validElement = <i className={"fa " + validIcon}></i>;
    }

    // Note that the HTML spec says to set an attribute <input disabled /> and
    // not <input disabled=true />. We do this by passing <input disabled={true} />
    // and then React is intelligent enough to do the right thing and emit only
    // <input disabled /> as required by the spec
    return (
        <div className="form-group">
            <Label validColor={validColor}>{validElement}{label}</Label>
            <Input type={type} placeholder={placeholder} validColor={validColor} disabled={disabled} />
            {validMsg ? <ValidMsg validColor={validColor}>{validMsg}</ValidMsg> : null}
        </div>
    )
}

// -----------------------------------------------------------------
// Form TextArea component
// -----------------------------------------------------------------
export const FormTextArea = ({label, rows=2, placeholder, disabled=false}) => {
    const TextArea = Input.withComponent('textarea');
    return (
        <div className="form-group">
            <label>{label}</label>
            <TextArea rows={rows} placeholder={placeholder} disabled={disabled} />
        </div>
    )
}

// -----------------------------------------------------------------
// Checkbox
// -----------------------------------------------------------------
export const FormCheckbox = ({label, disabled=false}) => {
    return (
        <div className="checkbox">
            <label>
                <input type="checkbox" disabled={disabled} /> {label}
            </label>
        </div>
    )
}

// -----------------------------------------------------------------
// Radio button
// -----------------------------------------------------------------
export const FormRadio = ({name, items}) => {
    return (
        <div className="form-group">
        {
            items.map ((item, i) => 
                <div className="radio" key={i} >
                    <label>
                        <input type="radio" name={name} 
                            checked={item.checked} disabled={item.disabled} />
                        {item.label}
                    </label>
                </div>
            )
        }
        </div>
    )
}

// -----------------------------------------------------------------
// Select - single or multiple
// -----------------------------------------------------------------
export const FormSelect = ({label, items, multiple=false, disabled=false}) => {
    const Select = Input.withComponent('select');
    return (
        <div className="form-group">
            <label>{label}</label>
            <Select multiple={multiple} className="form-control" disabled={disabled}>
            {
                items.map ((item, i) => 
                    <option key={i}>{item}</option>
                )
            }
            </Select>
        </div>
    )
}

// -----------------------------------------------------------------
// File Input
// -----------------------------------------------------------------
export const FormFileInput = ({label, help}) => {
    return (
        <div className="form-group">
            <label >{label}</label>
            <input type="file" />

            <p className="helpBlock">{help}</p>
        </div>
    )
}

export const ADDON_LABEL = 1;
export const ADDON_ICON = 2;
export const ADDON_CHECKBOX = 3;
export const ADDON_RADIO = 4;

// -----------------------------------------------------------------
// Input Group - text/icon and form control together on same line
// -----------------------------------------------------------------
export const FormInputGroup = ({type = 'text', preType, preInfo, postType, postInfo, placeholder}) => {
    const Addon = styled.span.attrs({
	className: 'input-group-addon',
    })`
        border-radius: 0;
        border-color: #d2d6de;
        background-color: #fff;
    `;
    
    const addonFormat = (type, info) => {
        switch (preType) {
            case ADDON_LABEL:
                return info;
                break;
            case ADDON_ICON:
                return <i className={"fa " + info}></i>;
                break;
            case ADDON_CHECKBOX:
                return <input type="checkbox" />;
                break;
            case ADDON_RADIO:
                return <input type="radio" />;
                break;
        }
    }

    return (
        <div className="input-group">
            { preType ? <Addon>{addonFormat (preType, preInfo)}</Addon> : null }
            <Input type={type} placeholder={placeholder} />
            { postType ? <Addon>{addonFormat (postType, postInfo)}</Addon> : null }
        </div>
    )
}

// -----------------------------------------------------------------
// Input Group Button - button and form control together on same line
// -----------------------------------------------------------------
export const FormInputGroupButton = ({type = 'text', preInfo, postInfo, placeholder}) => {
    const buttonFormat = (info) => {
        if (info) { 
            return (
                <div className="input-group-btn">
                  <button type="button" className="btn btn-info">{info}</button>
                </div>                    
            );
        } else {
            return null;
        }
    }
    
    return (
        <div className="input-group">
            {buttonFormat(preInfo)}
            <Input type={type} placeholder={placeholder} />
            {buttonFormat(postInfo)}
        </div>
    )
}

FormCheckbox.propTypes = {
}
