// -----------------------------------------------------------------
// Properties page
// -----------------------------------------------------------------
import React from 'react'
import { useDispatch } from "react-redux";
// react-bootstrap components
import {Form, Col, Button} from "react-bootstrap";
// Rename React-Final-Form's Form component so it doesn't clash with React-Bootstrap's Form
import { Form as FinalForm, Field } from 'react-final-form'

import { createProperty, updateProperty } from './propertiesSlice'
import { 
    RbFormControlAdapter, RbFormCheckAdapter, RbFormSelectAdapter,
    StyledLabel, StyledControl
} from '../../widgets/RbFormAdapter'

const PropertiesForm = ({propItem, users}) => {
    const dispatch = useDispatch();
    const onSubmit = async values => {
        // Remove the '_id' and '__v' fields out of the 'values' so that
        // we can pass the remaining fields to the API for saving
        let {_id, __v, ...propValues } = values
        if (_id === "") {
            // Create new property
            dispatch(createProperty(propValues))
        } else {
            // Update existing property
            dispatch(updateProperty({_id, chgProperty: propValues}))
        }
    }

    const usersOptions = users.map(user => (
        <option key={user._id} value={user._id}>
          {user.name}
        </option>
      ))

    // React Final Form's validation functions return 'undefined' if the field value is valid
    const required = value => (value ? undefined : 'Required')
    const mustBeNumber = value => (isNaN(value) ? 'Must be a number' : undefined)
    const minValue = min => value => isNaN(value) || value >= min ? undefined : `Should be >= ${min}`
    const maxValue = max => value => isNaN(value) || value <= max ? undefined : `Should be <= ${max}`
    const composeValidators = (...validators) => value =>
                validators.reduce((error, validator) => error || validator(value), undefined)

    return (
        <FinalForm
            onSubmit={onSubmit}
            initialValues={propItem}
            render={({ handleSubmit, form, submitting, pristine, values }) => (
                <Form onSubmit={handleSubmit}>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridHouseType">
                            <StyledLabel>House Type</StyledLabel>
                            <Field name="houseType" component={RbFormSelectAdapter}>
                                {/* When creating a new property, the field value of houseType starts off 
                                    as blank. So the Select control's dropdown should shou a blank value initially. So
                                    we have to insert a blank option into the Select control initially.
                                    But this field is Required so blank is not a valid value when submitting. So once
                                    you choose something from the dropdown and fill in some value, we remove the 
                                    blank option from the dropdown so that you cannot choose a blank value after that */}
                                {values.houseType === "" ? <option /> : null}
                                <option value="Apartment">Apartment</option>
                                <option value="Bungalow">Bungalow</option>
                                <option value="Castle">Castle</option>
                                <option value="Loft">Loft</option>
                                <option value="Tent">Tent</option>
                            </Field>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridRoomType">
                            <StyledLabel>Room Type</StyledLabel>
                            <Field name="roomType" component={RbFormSelectAdapter}>
                                {values.roomType === "" ? <option /> : null}
                                <option value="Entire House">Entire House</option>
                                <option value="Private Room">Private Room</option>
                                <option value="Shared Room">Shared Room</option>
                            </Field>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridRooms">
                            <Field name="rooms" validate={composeValidators(required, mustBeNumber, minValue(0), maxValue(20))}>
                                {({ input, meta }) => (
                                    <>
                                        <StyledLabel>Rooms</StyledLabel>
                                        <StyledControl {...input} type="number" placeholder="Enter rooms" />
                                        {meta.error && meta.touched && <span>{meta.error}</span>}
                                    </>
                                )}
                            </Field>
                        </Form.Group>
 
                         <Form.Group as={Col} controlId="formGridPrice">
                            <Field name="price" validate={composeValidators(required, mustBeNumber, minValue(0))}>
                                {({ input, meta }) => (
                                    <>
                                        <StyledLabel>Price</StyledLabel>
                                        <StyledControl {...input} type="number" placeholder="Enter price" />
                                        {meta.error && meta.touched && <span>{meta.error}</span>}
                                    </>
                                )}
                            </Field>
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridLocality">
                            <StyledLabel>Locality</StyledLabel>
                            <Field name="address.locality" component={RbFormControlAdapter} type="text" placeholder="Enter locality"/>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridRegion">
                            <StyledLabel>Region</StyledLabel>
                            <Field name="address.region" component={RbFormControlAdapter} type="text" placeholder="Enter Region"/>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridContry">
                            <Field name="address.country" validate={required}>
                                {({ input, meta }) => (
                                    <>
                                        <StyledLabel>Country</StyledLabel>
                                        <StyledControl {...input} type="text" placeholder="Enter country" />
                                        {meta.error && meta.touched && <span>{meta.error}</span>}
                                    </>
                                )}
                            </Field>
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridDescription">
                            <Field name="description" validate={required}>
                                {({ input, meta }) => (
                                    <>
                                        <StyledLabel>Description</StyledLabel>
                                        <StyledControl {...input} type="text" placeholder="Enter description" />
                                        {meta.error && meta.touched && <span>{meta.error}</span>}
                                    </>
                                )}
                            </Field>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridOwner">
                            <StyledLabel>Owner</StyledLabel>
                            <Field name="owner" component={RbFormSelectAdapter}>
                                {usersOptions}
                            </Field>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridAmenities">
                            <StyledLabel>Amenities</StyledLabel>
                            {/* React Final Form requires you to explicitly put the 'type=select' even though
                            this is a HTML select element. Otherwise it complains with a warning */}
                            <Field name="amenities" component={RbFormSelectAdapter} multiple type="select">
                                <option value="AC">AC</option>
                                <option value="Garden">Garden</option>
                                <option value="Internet">Internet</option>
                                <option value="Wifi">Wifi</option>
                                <option value="Pool">Pool</option>
                                <option value="Washer">Washer</option>
                            </Field>
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridCheckType">
                            <Field name="mycheck" component={RbFormCheckAdapter} label="My Check"/>
                        </Form.Group>
                    </Form.Row>

                    <Button variant="primary" type="submit" disabled={submitting || pristine}>
                        Save
                    </Button>
                </Form>
            )}
        />
    );
}

export default PropertiesForm
