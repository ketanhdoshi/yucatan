// -----------------------------------------------------------------
// Properties List Table
// -----------------------------------------------------------------
import React, {useState} from 'react'

// react-bootstrap components
import {Form, Col, Button} from "react-bootstrap";

import {CardView} from '../../layout/main/screens/CardView'
import SimpleTable from "../../widgets/SimpleTable.js"

const PropertiesList = ({properties, selectedId, onSelectCb}) => {
    const rowClickCb = (i, e) => {
        onSelectCb (properties[i])
    }

    const flattenProperties = (properties) => {
        return properties.map(item =>
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
        <>
            <CardView title="Property List" subTitle="Best Properties">
                <SimpleTable
                    columns={["House Type", "Locality", "Region", "Country", "Room Type", "Rooms", "Price", "Desc"]}
                    rows={flattenProperties(properties)}
                    onClickCb={rowClickCb}
                />
            </CardView>
        </>
    )
}

export default PropertiesList