// -----------------------------------------------------------------
// Launch page for all the utility widgets we built using React-Bootstrap
// All those widgets start with Bs***
// These widgets should be refined and incorporated into the component
// library that we want to build using CSS and Bootstrap.
// -----------------------------------------------------------------
import React from 'react';

import BsDropdownMenu from './BsDropdownMenu'
import BsPopover from './BsPopover'
import BsTooltip from './BsTooltip'
import BsModal from './BsModal'
import BsNavbar from './BsNavbar'
import BsNavtabs from './BsNavtabs'
import BsTabs from './BsTabs'
import BsPagination from './BsPagination'
import BsButton from './BsButton'
import BsList from './BsList'
import BsPanel from './BsPanel'

import s from '../../scss/BsView.scss';

const BsView = () => (
    <div className={s.root}>
        <BsPanel title="Panel" content="My Content" />
        <BsPanel title="Dropdown Menu" content={<BsDropdownMenu />} />
        <BsPanel title="Popover and Tooltip" content={
                <div>
                    <BsPopover id="basic" title="My Popover" text="This is my message">
                        My link
                    </BsPopover>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <BsTooltip id="tooltip-basic" text="Holy guacamole! Check this out.">
                        My tip link
                    </BsTooltip>
                </div>
            } 
        /> 
        <BsPanel title="Button" content={
                <BsButton text="Superb" />
            } 
        /> 
        <BsPanel title="Modal" content={
                <BsModal />
            } 
        /> 
         <BsPanel title="Navbar" content={
                <BsNavbar />
            } 
        /> 
         <BsPanel title="Navtabs" content={
                <BsNavtabs />
            } 
        /> 
         <BsPanel title="Tabs" content={
                <BsTabs />
            } 
        /> 
         <BsPanel title="Pagination" content={
                <BsPagination />
            } 
        /> 
         <BsPanel title="List" content={
                <BsList />
            } 
        /> 
    </div>
)

export default BsView;