import React from "react";
import {NavBar} from "./NavBar";

import {CircularProgress} from "@rmwc/circular-progress";
import '@rmwc/circular-progress/circular-progress.css';

export const AppContext = React.createContext({initialized: false});

export class AppProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      initialized: false,
      user: {},
      error: false,
      errorTimeout: 3
    };

    this.initializeState = () => {
      fetch("/api/user/state")
          .then(res => res.json())
          .then(res  => {
            this.setState({user: res, initialized: true});
          })
          .catch(err => {

            console.log(err);
          })
    };
  }

  render() {
    if(! this.state.initialized){
      return (
          <div style={{
            display: "flex",
            justifyContent: "center"
          }}>
            <CircularProgress
                size={60}
                style={{
                  marginTop: "calc(50vh - 30px)"
                }}
            />
          </div>
      )
    }

    return (
        <AppContext.Provider value={this.state}>
          {this.props.children}
        </AppContext.Provider>
    );
  }

}