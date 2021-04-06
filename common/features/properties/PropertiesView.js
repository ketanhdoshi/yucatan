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
            propValues.description = "This is auto filled in"
            dispatch(createProperty(propValues))
        } else {
            // Update existing property
            dispatch(updateProperty({_id, chgProperty: propValues}))
        }
    } 

    return (
        <FinalForm
            onSubmit={onSubmit}
            initialValues={propItem}
            render={({ handleSubmit, form, submitting, pristine, values }) => (            
                <Form onSubmit={handleSubmit}>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridHouseType">
                            <Form.Label>House Type</Form.Label>
                            <Field name="houseType" component={RbFormControlAdapter} type="text" placeholder="Enter house type"/>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridRoomType">
                            <Form.Label>Room Type</Form.Label>
                            <Field name="roomType" component={RbFormControlAdapter} type="text" placeholder="Enter room type"/>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridRooms">
                            <Form.Label>Rooms</Form.Label>
                            <Field name="rooms" component={RbFormControlAdapter} type="number" placeholder="Enter rooms"/>
                        </Form.Group>
 
                         <Form.Group as={Col} controlId="formGridPrice">
                            <Form.Label>Price</Form.Label>
                            <Field name="price" component={RbFormControlAdapter} type="number" placeholder="Enter price"/>
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridLocality">
                            <Form.Label>Locality</Form.Label>
                            <Field name="address.locality" component={RbFormControlAdapter} type="text" placeholder="Enter locality"/>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridRegion">
                        <Form.Label>Region</Form.Label>
                        <Field name="address.region" component={RbFormSelectAdapter}>
                            <option value="Rajasthan">🐷 Rajasthan</option>
                            <option value="Pune">🍄 Pune</option>
                            <option value="Delhi">🧀 Delhi</option>
                            <option value="Maharashtra">🐓 Maharashtra</option>
                            <option value="tuna">🐟 Tuna</option>
                            <option value="pineapple">🍍 Pineapple</option>
                        </Field>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridContry">
                            <Form.Label>Country</Form.Label>
                            <Field name="address.country" component={RbFormControlAdapter} type="text" placeholder="Enter country"/>
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
            price: 0,
            roomType: "",
            rooms: 0
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
                    <PropForm propItem={selectedRow >= 0 ? properties.items[selectedRow] : emptyProp()} />
                </CardView>
             {/*    <ul className="list-group">
                    {properties.list.map(item =>
                        <li key={item._id} className="list-group-item" className={s.root}>
                            <span className="badge">{item.houseType}</span>
                            {item.description}
                        </li>
                    )}
                </ul> */}
                </>
            }

        <Button onClick={deletePropCb}>Delete Property</Button>
    </div>
    )
}

export default PropertiesView
