// -----------------------------------------------------------------
// Presentational component for the Header
// -----------------------------------------------------------------
import React, { PropTypes } from 'react'
import styled from 'styled-components';

// -----------------------------------------------------------------
// DropdownMessages component
// -----------------------------------------------------------------
const DropdownMessages = styled.ul.attrs({
    className: 'dropdown-menu',
})`
    width: 280px;
    padding: 0 0 0 0;
    margin: 0;
    top: 100%;
    box-shadow: none;
    border-color: #eee;

`;

// -----------------------------------------------------------------
// DropdownMessagesHeader component
// -----------------------------------------------------------------
const DropdownMessagesHeader = styled.li`
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
    background-color: #ffffff;
    padding: 7px 10px;
    border-bottom: 1px solid #f4f4f4;
    color: #444444;
    font-size: 14px;
`;

// -----------------------------------------------------------------
// NotifBody component
// -----------------------------------------------------------------
const NotifBody = styled.ul`
    max-height: 200px;
    margin: 0;
    padding: 0;
    list-style: none;
    overflow-x: hidden;
`;

// -----------------------------------------------------------------
// NotifItem component
// -----------------------------------------------------------------
const NotifItem = styled.a`
    display: block;
    white-space: nowrap;
    /* Prevent text from breaking */
    border-bottom: 1px solid #f4f4f4;
    margin: 0;
    padding: 10px 10px;
`;

// -----------------------------------------------------------------
// NotifItemImg component
// -----------------------------------------------------------------
const NotifItemImg = styled.img`
    margin: auto 10px auto auto;
    width: 40px;
    height: 40px;
    border-radius: 50%;
`;

// -----------------------------------------------------------------
// NotifItemTitle component
// -----------------------------------------------------------------
const NotifItemTitle = styled.h4`
    padding: 0;
    margin: 0 0 0 45px;
    color: #444444;
    font-size: 15px;
    position: relative;
`;

// -----------------------------------------------------------------
// NotifItemTime component
// -----------------------------------------------------------------
const NotifItemTime = styled.small`
    color: #999999;
    font-size: 10px;
    position: absolute;
    top: 0;
    right: 0;
`;

// -----------------------------------------------------------------
// NotifItemDesc component
// -----------------------------------------------------------------
const NotifItemDesc = styled.p`
    margin: 0 0 0 45px;
    font-size: 12px;
    color: #888888;
`;

// -----------------------------------------------------------------
// DropdownMessagesFooter component
// -----------------------------------------------------------------
const DropdownMessagesFooter = styled.a`
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    border-bottom-right-radius: 4px;
    border-bottom-left-radius: 4px;
    font-size: 12px;
    background-color: #fff;
    padding: 7px 10px;
    border-bottom: 1px solid #eeeeee;
    color: #444 !important;
    text-align: center;
`;


// -----------------------------------------------------------------
// Dropdown Notification Menu
// -----------------------------------------------------------------
const DropdownNotification = () => (
    <DropdownMessages>
        <DropdownMessagesHeader>You have 4 messages</DropdownMessagesHeader>
        <li>
            <NotifBody>
                <li>
                    <NotifItem>
                        <div className="pull-left">
                            <NotifItemImg src="https://adminlte.io/themes/AdminLTE/dist/img/user2-160x160.jpg" alt="User Image" />
                        </div>
                        <NotifItemTitle>
                            Support Team
                            <NotifItemDesc><i className="fa fa-clock-o"></i> 5 mins</NotifItemDesc>
                        </NotifItemTitle>
                        <NotifItemDesc>Why not buy a new awesome theme?</NotifItemDesc>
                    </NotifItem>
                </li>
            </NotifBody>
        </li>
        <li><DropdownMessagesFooter href="#">See All Messages</DropdownMessagesFooter></li>
    </DropdownMessages>
)

DropdownNotification.propTypes = {
}

export default DropdownNotification
