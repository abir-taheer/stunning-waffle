import React from 'react';

import TopAppBar, {
  TopAppBarFixedAdjust,
  TopAppBarIcon,
  TopAppBarRow,
  TopAppBarSection,
  TopAppBarTitle,
} from '@material/react-top-app-bar';
import '@material/react-top-app-bar/dist/top-app-bar.css';

import Drawer, {
  DrawerAppContent,
  DrawerContent,
  DrawerHeader,
  DrawerTitle
} from '@material/react-drawer';
import "@material/react-drawer/dist/drawer.css";

import MaterialIcon from '@material/react-material-icon';
import '@material/react-material-icon/dist/material-icon.css';

import List, {ListItem, ListItemGraphic, ListItemText} from '@material/react-list';
import '@material/react-list/dist/list.css';

import {Spacer} from "./Spacer";

import '@material/react-typography/dist/typography.css';

import {AppContext} from "./AppProvider";

export function NavBar(props){
  let [drawerOpen, setDrawerOpen] = React.useState((window.innerWidth > 600));
  return (
      <div className='drawer-container'>
        <TopAppBar
            fixed
            style={{backgroundColor: "white"}}
        >
          <TopAppBarRow>
            <TopAppBarSection align='start'>
              <TopAppBarIcon navIcon tabIndex={0}>
                <MaterialIcon
                    hasRipple icon='menu'
                    onClick={() => setDrawerOpen(! drawerOpen)}
                    style={{color:"black"}}
                />
              </TopAppBarIcon>
              <TopAppBarTitle
                style={{
                  color: "black",
                  fontFamily: "'Sumana', serif"
                }}
              >
                Stuyvesant Board of Elections
              </TopAppBarTitle>
            </TopAppBarSection>
          </TopAppBarRow>
        </TopAppBar>
        <TopAppBarFixedAdjust className='top-app-bar-fix-adjust'>
          <NavDrawer open={drawerOpen}/>
          <DrawerAppContent className='drawer-app-content'>
            {/* On Mobile Devices, hide the content because it will look distorted */}
            <ContentShade open={drawerOpen}/>
            {props.children}
          </DrawerAppContent>
        </TopAppBarFixedAdjust>
      </div>
  );
}

export function NavDrawer(props) {
  return (
      <Drawer
          dismissible
          open={props.open}
          style={{
            position: "fixed",
            borderRightWidth: "0"
          }}>
        <DrawerHeader>
          <img
            src={"/logo192.png"}
            style={{
              width: "100px"
            }}
          />
          <DrawerTitle use="h3">
            <b>Not Signed In</b>
          </DrawerTitle>
          <Spacer height={"20px"} />
        </DrawerHeader>
        <DrawerContent>
          <List>
            <DrawerItem
                graphic={<MaterialIcon icon='home'/>}
                text={"Home"}
            />
            <DrawerItem
                graphic={<MaterialIcon icon='how_to_vote'/>}
                text={"Elections"}
            />
            <DrawerItem
                graphic={<MaterialIcon icon='ballot'/>}
                text={"Results"}
            />
            <DrawerItem
                graphic={<MaterialIcon icon='people'/>}
                text={"Candidates"}
            />
            <DrawerItem
                graphic={<MaterialIcon icon='help'/>}
                text={"Help"}
            />
          </List>
        </DrawerContent>
      </Drawer>
  )
}

export function DrawerItem(props) {
  return (
      <ListItem onClick={props.onClick}>
        <ListItemGraphic graphic={props.graphic} />
        <ListItemText primaryText={props.text}/>
      </ListItem>
  )
}

function ContentShade(props){
  if(! props.open){
    return null;
  }

  return (
      <div className={["content-shade"]}/>
  )
}