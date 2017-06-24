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

import s from '../../scss/BsView.scss';

function BsView(props) {
    return (
        <div className={s.root}>
            Wowman {props.name}
            <BsDropdownMenu />
            <BsPopover id="basic" title="My Popover" text="This is my message">My link</BsPopover>
            <BsTooltip id="tooltip-basic" text="Holy guacamole! Check this out.">My tip link</BsTooltip>
            <BsModal />
            <BsNavbar />
            <BsNavtabs />
            <BsTabs />
            <BsPagination />
            <BsButton text="Superb" />
            <BsList />
        </div>
    );
}

export default BsView;