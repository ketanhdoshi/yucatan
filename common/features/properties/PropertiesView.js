// -----------------------------------------------------------------
// Properties page
// -----------------------------------------------------------------
import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch } from "react-redux";
// react-bootstrap components
import {Form, Col, Button} from "react-bootstrap";
// Rename React-Final-Form's Form component so it doesn't clash with React-Bootstrap's Form
import { Form as FinalForm, Field } from 'react-final-form'

// Action helpers
import { listProperties, createProperty, updateProperty, deleteProperty } from './propertiesSlice'

import s from './PropertiesView.scss';
import {CardView} from '../../layout/main/screens/CardView'
import SimpleTable from "../../widgets/SimpleTable.js"

const RbFormControlAdapter = ({ input, ...rest }) => (
    <Form.Control {...input} {...rest} />
)

const RbFormCheckAdapter = ({ input, label, ...rest }) => (
    <Form.Check {...input} type="checkbox" label={label} {...rest} />
)

const RbFormSelectAdapter = ({ input, ...rest }) => (
    <Form.Control as="select" {...input} {...rest} />
)

const PropForm = ({propItem}) => {
    const dispatch = useDispatch();
    const onSubmit = async values => {
        // Remove the '_id' and '__v' fields out of the 'values' so that
        // we can pass the remaining fields to the API for saving
        let {_id, __v, ...propValues } = values
        if (_id === "") {
            // Create new property
            propValues.owner = "506f6e67612050616e646974"
            dispatch(createProperty(propValues))
        } else {
            // Update existing property
            dispatch(updateProperty({_id, chgProperty: propValues}))
        }
    }

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
                            <Form.Label>House Type</Form.Label>
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
                            <Form.Label>Room Type</Form.Label>
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
                                        <Form.Label>Rooms</Form.Label>
                                        <Form.Control {...input} type="number" placeholder="Enter rooms" />
                                        {meta.error && meta.touched && <span>{meta.error}</span>}
                                    </>
                                )}
                            </Field>
                        </Form.Group>
 
                         <Form.Group as={Col} controlId="formGridPrice">
                            <Field name="price" validate={composeValidators(required, mustBeNumber, minValue(0))}>
                                {({ input, meta }) => (
                                    <>
                                        <Form.Label>Price</Form.Label>
                                        <Form.Control {...input} type="number" placeholder="Enter price" />
                                        {meta.error && meta.touched && <span>{meta.error}</span>}
                                    </>
                                )}
                            </Field>
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridLocality">
                            <Form.Label>Locality</Form.Label>
                            <Field name="address.locality" component={RbFormControlAdapter} type="text" placeholder="Enter locality"/>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridRegion">
                            <Form.Label>Region</Form.Label>
                            <Field name="address.region" component={RbFormControlAdapter} type="text" placeholder="Enter Region"/>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridContry">
                            <Field name="address.country" validate={required}>
                                {({ input, meta }) => (
                                    <>
                                        <Form.Label>Country</Form.Label>
                                        <Form.Control {...input} type="text" placeholder="Enter country" />
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
                                        <Form.Label>Description</Form.Label>
                                        <Form.Control {...input} type="text" placeholder="Enter description" />
                                        {meta.error && meta.touched && <span>{meta.error}</span>}
                                    </>
                                )}
                            </Field>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridAmenities">
                            <Form.Label>Amenities</Form.Label>
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

const PropertiesView = () => {
    const properties = useSelector((state) => state.properties);
    const propStatus = properties.status;
    const [selectedRow, setSelectedRow] = useState(0);

    const dispatch = useDispatch();
    useEffect(() => {
        if (propStatus === 'idle') {
            dispatch(listProperties())
        }
    }, [propStatus, dispatch])

    const deletePropCb = async () => {
        if (selectedRow >= 0) {
            let _id = properties.items[selectedRow]._id
            dispatch(deleteProperty(_id))
        }
    }
    const newPropCb = () => {
        setSelectedRow(-1);
    }
    const emptyProp = () => {
        return {
            _id: "",
            __v: "",
            address: {locality: "", region: "", country: ""},
            amenities: [],
            description: "",
            houseType: "",
            photos: [],
            price: "",
            roomType: "",
            rooms: ""
        }
    }
    const rowClickCb = (i, e) => {
        setSelectedRow(i);
    }

    const flattenProperties = (propList) => {
        return propList.map(item =>
            [
                item.houseType, 
                item.address ? item.address.locality: "",
                item.address? item.address.region: "",
                item.address? item.address.country: "", 
                item.roomType, item.rooms, item.price,
                item.description,
            ]
        )
    }
  
    return (
        <div>
            Properties
            <p>{properties.status}{properties.status == "failed" ? properties.error: null}</p>
            {properties.items.length &&
                <>
                <CardView title="Property List" subTitle="Best Properties">
                    <SimpleTable
                        columns={["House Type", "Locality", "Region", "Country", "Room Type", "Rooms", "Price", "Desc"]}
                        rows={flattenProperties(properties.items)}
                        onClickCb={rowClickCb}
                    />
                </CardView>
                <CardView title="Property Detail" subTitle="Edit Property">
                    <Button onClick={newPropCb}>New Property</Button>
                    <Button onClick={deletePropCb}>Delete Property</Button>
                    <PropForm propItem={selectedRow >= 0 ? properties.items[selectedRow] : emptyProp()} />
                </CardView>
                </>
            }
    </div>
    )
}

export default PropertiesView
