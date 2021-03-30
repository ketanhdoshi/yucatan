// -----------------------------------------------------------------
// Properties page
// -----------------------------------------------------------------
import React, {useState} from 'react'
import { useSelector, useDispatch } from "react-redux";
// react-bootstrap components
import {Form, Col, Button} from "react-bootstrap";
// Rename React-Final-Form's Form component so it doesn't clash with React-Bootstrap's Form
import { Form as FinalForm, Field } from 'react-final-form'

// Action helpers
import { 
    getPropertiesReqAction, 
} from '../actions/action.js'

import s from '../scss/PropertiesView.scss';
import {CardView} from '../layout/main/screens/CardView'
import SimpleTable from "../widgets/SimpleTable.js"

const RbFormControlAdapter = ({ input, type, ...rest }) => (
    <Form.Control {...input} type={type} {...rest} />
)

const RbFormCheckAdapter = ({ input, label, ...rest }) => (
    <Form.Check {...input} type="checkbox" label={label} {...rest} />
)

const RbFormSelectAdapter = ({ input, ...rest }) => (
    <Form.Control as="select" {...input} {...rest} />
)

const PropForm = ({propItem}) => {
    const onSubmit = async values => {
        console.log ('Doing Props')
        const creds = {
          houseType: values.houseType,
          price: values.price
        }
        // localLoginReqAction (creds, dispatch)
        window.alert(JSON.stringify(values, 0, 2))
    } 

    return (
        <FinalForm
            onSubmit={onSubmit}
            initialValues={{ 
                houseType: propItem.houseType, roomType: propItem.roomType, price: propItem.price, rooms: propItem.rooms,
                locality: propItem.address? propItem.address.locality: "",
                region: propItem.address? propItem.address.region: "",
                country: propItem.address? propItem.address.country: "",
            }}
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
                            <Field name="rooms" component={RbFormControlAdapter} type="text" placeholder="Enter rooms"/>
                        </Form.Group>
 
                         <Form.Group as={Col} controlId="formGridPrice">
                            <Form.Label>Price</Form.Label>
                            <Field name="price" component={RbFormControlAdapter} type="text" placeholder="Enter price"/>
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridLocality">
                            <Form.Label>Locality</Form.Label>
                            <Field name="locality" component={RbFormControlAdapter} type="text" placeholder="Enter locality"/>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridRegion">
                        <Form.Label>Region</Form.Label>
                        <Field name="region" component={RbFormSelectAdapter}>
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
                            <Field name="country" component={RbFormControlAdapter} type="text" placeholder="Enter country"/>
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
    const [selectedRow, setSelectedRow] = useState(0);

    const dispatch = useDispatch();
    const onClickCb = async values => {
        getPropertiesReqAction (dispatch)
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
            <p>{properties.api}</p>
            {properties.list &&
                <>
                <CardView title="Property List" subTitle="Best Properties">
                    <SimpleTable
                        columns={["House Type", "Locality", "Region", "Country", "Room Type", "Rooms", "Price", "Desc"]}
                        rows={flattenProperties(properties.list)}
                        onClickCb={rowClickCb}
                    />
                </CardView>
                <CardView title="Property Detail" subTitle="Edit Property">
                    <PropForm propItem={properties.list[selectedRow]} />
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

        <button type="button" onClick={onClickCb}>Get Properties!</button>
    </div>
    )
}

export default PropertiesView
