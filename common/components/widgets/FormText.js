// -----------------------------------------------------------------
// Form Text component
// -----------------------------------------------------------------
import React, { PropTypes } from 'react'
import styled from 'styled-components';

const FormText = ({label, type = 'text', placeholder}) => {
    const Input = styled.input.attrs({
	className: 'form-control',
    })`
        border-radius: 0;
        box-shadow: none;
        border-color: #d2d6de;
    
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
    return (
        <div className="form-group">
            <label>{label}</label>
            <Input type={type} placeholder={placeholder} />
        </div>
    )
}

FormText.propTypes = {
}

export default FormText