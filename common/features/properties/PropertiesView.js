// -----------------------------------------------------------------
// Properties page
// -----------------------------------------------------------------
import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch } from "react-redux";
// react-bootstrap components
import {Form, Col, Button} from "react-bootstrap";

// Action helpers
import { 
    listProperties, deleteProperty, 
    selectAllProperties, selectPropertiesStatus, selectPropertiesError 
} from './propertiesSlice'
import { listUsers, selectAllUsers } from '../users/usersSlice'

import s from './PropertiesView.scss';
import {CardView} from '../../widgets/CardView'
import PropertiesList from './PropertiesList';
import PropertiesForm from './PropertiesForm';

const PropertiesView = () => {
    const properties = useSelector(selectAllProperties);
    const propertiesStatus = useSelector(selectPropertiesStatus);
    const propertiesError = useSelector(selectPropertiesError);
    const users = useSelector(selectAllUsers);
    const [selectedProperty, setSelectedProperty] = useState(properties ? properties[0] : null);

    const dispatch = useDispatch();
    // Fetch the list of properties when the component is mounted, if the
    // API request has not been initiated previously.
    useEffect(() => {
        if (propertiesStatus === 'idle') {
            dispatch(listProperties())
        }
    }, [propertiesStatus, dispatch])

    useEffect(() => {
        if (users.length == 0) {
            dispatch(listUsers())
        }
    }, [dispatch])

    const onSelectCb = (property) => {
        setSelectedProperty(property);
    }
    const deletePropCb = async () => {
        if (selectedProperty) {
            let _id = selectedProperty._id
            setSelectedProperty(null);
            dispatch(deleteProperty(_id))
        }
    }
    const newPropCb = () => {
        setSelectedProperty(null);
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
  
    return (
        <div>
            Properties
            <p>{propertiesStatus}{propertiesStatus == "failed" ? propertiesError: null}</p>
            {properties.length &&
                <>
                    <PropertiesList properties={properties} selectedId={selectedProperty ? selectedProperty._id : -1} onSelectCb={onSelectCb} />
                    <CardView title="Property Detail" subTitle="Edit Property">
                        <Button onClick={newPropCb}>New Property</Button>
                        <Button onClick={deletePropCb} disabled={!selectedProperty}>Delete Property</Button>
                        <PropertiesForm propItem={selectedProperty ? selectedProperty : emptyProp()} users={users}/>
                    </CardView>
                </>
            }
    </div>
    )
}

export default PropertiesView
