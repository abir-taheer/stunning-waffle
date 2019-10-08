import React from "react";
import {NavBar} from "./NavBar";

import {CircularProgress} from "@rmwc/circular-progress";
import '@rmwc/circular-progress/circular-progress.css';

export const AppContext = React.createContext({initialized: false});

export class AppProvider extends React.Component {
  constructor(props) {
    super(props);

    this.initializeState = () => {
      this.setState({initialized: false, error: false});

      fetch("/api/user/state")
          .then(res => res.json())
          .then(res  => {
            this.setState({user: res, initialized: true});
          })
          .catch(err => {
            this.setState(() => {

              let errorHandler = setInterval(() => {
                if(this.state.errorTimeout === 0) {
                  clearInterval(errorHandler);
                  return this.initializeState();
                }

                this.setState(state => ({errorTimeout: state.errorTimeout - 1}));

              }, 1000);

              return {error: true, errorTimeout: 3};
            });
          })
    };

    this.state = {
      initialized: false,
      user: {},
      error: false,
      errorTimeout: 3,
      initializeState: this.initializeState
    };

  }

  componentDidMount() {
      this.initializeState();
  }

  render() {

    if(! this.state.initialized){
      return (
          <div>
            <div style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "calc(45vh - 30px)"
            }}>
              <CircularProgress size={60} />
            </div>
            <p style={{textAlign: "center"}}>
              {
                this.state.error ?
                    `There was an error loading the app. Retrying in ${this.state.errorTimeout} seconds...`:
                    "Loading"
              }
            </p>
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