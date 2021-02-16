// -----------------------------------------------------------------
// Presentational component for all logged-in pages across the app
// Has the basic overall skeleton layout into which all content screens are
// placed.
// The overall organisation is that there is a library of generic and 
// reusable widgets which are then assembled or composed together on 
// application-specific screens.
// The top-level application layout contains a Header and a Footer with the
// main application body in between. That body area has a Sidebar on the left
// and the right, with the application content in between. That content area
// has a Content Header and the actual content. This describes the skeleton 
// layout of the application. Most application screens then populate this 
// actual content using the widget library.
// In other words, the application-specific components are things like Header, 
// Footer, SidebarLeft, SidebarRight, ContentHeader.
// These components are placeholders which are populated using the widget 
// library components. For instance, the Header is populated with the Navbar 
// widget. The SidebarLeft is populated with the Drawer widget and the 
// ContentHeader is populated with the Breadcrumb widget. 
// -----------------------------------------------------------------
import React from 'react'
import PropTypes from 'prop-types'
import { Route, Switch } from 'react-router'

import App from './App'
import Header from './Header'
import Footer from './Footer'
import Drawer, {DrawerControl,
    DRAWER_MODE_OFF, DRAWER_MODE_MINI, DRAWER_MODE_FULL} from '../components/widgets/Drawer'

import Bs3Navbar from '../components/old/Bs3Navbar'
import Sidebar from '../components/old/Sidebar'
import ContentHeader from '../components/widgets/ContentHeader'

import { PropertiesContainer } from '../containers/PropertiesContainer'
import { MatchesContainer, getMatches } from '../containers/MatchesContainer'
import ShortlistContainer from '../containers/ShortlistContainer'

import Home from './Home'
import Dashboard1 from './Dashboard1'
import Dashboard2 from './Dashboard2'
import UiButtonView from './UiButtonView'
import UiGeneralView from './UiGeneralView'
import UiFormView from './UiFormView'
import PaymentView from './PaymentView'

import GoogleMaps from '../components/widgets/GoogleMaps'
// import CalendarView from '../components/widgets/CalendarView'

import ModalView from '../components/old/ModalView'
import BsView from '../components/bs/BsView';


//import s from '../scss/Main.scss'
//import '../scss/General.css'

// TODO: Bring Header component into this file

const SidebarRight = () => (
    <div></div>
)

// -----------------------------------------------------------------
// Primary content for the application
// TODO - A Switch is not needed here, but I left it there because
//  I didn't want to have one more unnecessary level of div
// TODO - Router doesn't support onEnter any more, so change that
//  and implement it differently inside MatchesContainer
// -----------------------------------------------------------------
const Content = () => (
    <Switch>
        <Route path="/home" component={Home}/>
        <Route path="/dashboard1" component={Dashboard1}/>
        <Route path="/dashboard2" component={Dashboard2}/>
        <Route path="/ui/button" component={UiButtonView}/>
        <Route path="/ui/general" component={UiGeneralView}/>
        <Route path="/ui/form" component={UiFormView}/>
        <Route path="/googlemaps" component={GoogleMaps}/>                    
        {/* <Route path="/calendar" component={CalendarView}/> */}
        <Route path="/bsview" component={BsView}/>
        <Route path="/matches" component={MatchesContainer} onEnter={getMatches()}/>
        <Route path="/properties" component={PropertiesContainer}/>
        <Route path="/shortlist" component={ShortlistContainer}/>
        <Route path="/payment" component={PaymentView}/>
        <Route path="/modals" component={ModalView}/>
    </Switch>
)

/* 
KD - Feb 2021 - just for quick testing. Remove it.
import { Link } from 'react-router-dom'
const MainView = () => (
    <App>
        <div>
            <Link to="/dashboard2">Dashboard2</Link>
            <Link to="/dashboard1">Dashboard1</Link>
            <Link to="/matches">Matches</Link>
        </div>
        <Content />
    </App>
)
 */

class MainView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            drawerMode: DRAWER_MODE_FULL // drawer mode
        } ;
        
        // This binding is necessary to make `this` work in the handleDayClick callback
        // Without it, 'this' will be undefined in the callback and calling this.setState 
        // in the callback will give an error
        // See https://facebook.github.io/react/docs/handling-events.html
        this.handleToggleMode = this.handleToggleMode.bind(this);
    }

    handleToggleMode () {
        let mode = this.state.drawerMode;
        switch (mode){
            case DRAWER_MODE_OFF:
                mode = DRAWER_MODE_FULL;
                break;
            case DRAWER_MODE_MINI:
                mode = DRAWER_MODE_FULL;
                break;
            case DRAWER_MODE_FULL:
                mode = DRAWER_MODE_MINI;
                break;
        }
        this.setState ( {drawerMode: mode});
    }
    
    render() {
        const { drawerMode } = this.state;
        const { first, children, onDummyClick } = this.props;
        return (
            <App>
                <Header />
                <div className="container-fluid">
                    <div className="row">
                        <Drawer mode={drawerMode} />
                            <main className="col-sm-9 col-6 pt-3" role="main">
                                <DrawerControl toggleCB={this.handleToggleMode} toggleMode={drawerMode}/>
                                {/* Sidebar toggle button for desktop only */}
                                <a href=".drawerdesk" data-toggle="collapse"><i className="fa fa-desktop fa-lg"></i></a>
                                {/* Sidebar toggle button for mobile only */}
                                <a href=".drawermobile" data-toggle="collapse"><i className="fa fa-mobile fa-lg"></i></a>
                                <a href="#sidebarlist" data-toggle="collapse"><i className="fa fa-navicon fa-lg"></i></a>
                                <ContentHeader header="Stuff"/>
                                <Content />
                            </main>
                        <SidebarRight />
                    </div>
                </div>
                <Footer msg="This is my footer"/>
            </App>
        )
    }
}

const OldMainView = ({ first, children, onDummyClick }) => (
    <App>
        <Header />
        <AppBody />
        <Footer msg="This is my footer"/>
    </App>
)

// -----------------------------------------------------------------
// Primary content area
// -----------------------------------------------------------------
const OldContent = ({toggleCB, toggleMode}) => (
    <main className="col-sm-9 col-6 pt-3" role="main">
        <DrawerControl toggleCB={toggleCB} toggleMode={toggleMode}/>
        {/* Sidebar toggle button for desktop only */}
        <a href=".drawerdesk" data-toggle="collapse"><i className="fa fa-desktop fa-lg"></i></a>
        {/* Sidebar toggle button for mobile only */}
        <a href=".drawermobile" data-toggle="collapse"><i className="fa fa-mobile fa-lg"></i></a>
        <a href="#sidebarlist" data-toggle="collapse"><i className="fa fa-navicon fa-lg"></i></a>
        <h1>Dashboard</h1>
    </main>
)

const OldView = ({ first, children, onDummyClick }) => (
    <div>
        <Bs3Navbar brand={first}/>
        <div className="container-fluid">
            <div className={"row " + s.main}>
                <Sidebar />
                <div className={"col-xs-12 col-sm-9 " + s.content}>
                    <ContentHeader header="Stuff"/>
                    {children}
                </div>
            </div>
    
            <Footer msg="This is my footer"/>
        </div>
    </div>
)

MainView.propTypes = {
  first: PropTypes.string.isRequired,
  onDummyClick: PropTypes.func.isRequired
}

export default MainView


// -----------------------------------------------------------------
// Navbar - has two sections: Logo and Menu, and an external Toggle button
//  On Desktop - Logo section collapses on Toggle
//  On Mobile - Logo section becomes full width top row and
//              Menu section becomes full width second row
// 
// Drawer - has an external Toggle button
//  On Desktop - Drawer collapses on Toggle
//  On Mobile - Drawer becomes off-canvas
//              Drawer slides on-canvas on Toggle and "pushes" Content
//              
// Aside - has an external Toggle button
//  On Desktop - Aside slides on-canvas on Toggle and "overlaps" Content
//  On Mobile - Aside slides on-canvas on Toggle and "overlaps" Content

// -----------------------------------------------------------------

// -----------------------------------------------------------------
// Structure of Container components for primary layout
// 
// <Body>
//      <App>
//          <Header>
//              <Navbar>
//                  <NavbarHeader>
//                      <NavbarLogo />
//                      <NavbarToggle />
//                  </NavbarHeader>
//                  <NavbarMain>
//                      <NavbarMenu />  // Contains Dropdown Menus or Tabs
//                      <NavbarStatus />
//                          <Notifications />
//                          <LoggedInUserStatus />
//                          <UserSettings />
//                  </NavbarMain>
//              </Navbar>
//          </Header>
//          <AppBody>
//              <Sidebar Drawer = offCanvas collapsing /> // Use Drawer terminlogy instead of offCanvas
//                  <UserPanel />
//                  <SearchBar />
//                  <SidebarMenu />
//                      <Application />
//                          <Dashboards />
//                          <HousePropertyScreen />
//                      <Forms />
//                          <StandardControls />
//                          <AdvancedControls />
//                              <RichTextEditor />
//                      <StandardWidgets />
//                          <Buttons />
//                          <ProgressBar />
//                          <Modals />
//                          <Alerts and Dialogs />
//                          <Lists />
//                          <Sliders />
//                          <Gauges, Switches and Knobs />
//                          <Tooltips />
//                          <Carousel />
//                          <Slideshow />
//                          <ImageGallery />
//                      <Navigations />
//                          <DropdownMenus />
//                          <Tabs />
//                          <AppLauncher />
//                      <CompositeComponents />
//                          <Social />
//                          <Chat />
//                          <Cards and InfoBoxes />
//                      <Tables />
//                      <Charts />
//                      <AdvancedComponents />
//                          <GoogleCalendar />
//                          <Calendar />
//                          <DatePicker />//                      
//                      <Pages />
//                          <LoginPage />
//                          <RegistrationPage />
//                          <ForgotPasswordPage />
//                          <ResetPasswordPage />
//                          <InvoicePage />
//                          <MailCompose />
//                          <MailList />
//                      <Experiments />
//                          <Redux />
//              <Content>
//                  <ContentHeader>
//                      <Breadcrumb routes={this.props.routes} params={this.props.params} />
//                      <TitleHeading /> 
//                  </ContentHeader>
//                  <ContentMain>
//                  </ContentMain>
//              </Content>
//              <Aside />
//          </AppBody>
//          <Footer />//      
//      </App>
// </Body>
// -----------------------------------------------------------------
