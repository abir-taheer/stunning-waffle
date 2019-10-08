import React from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

import {NavBar} from "./comps/global/NavBar";
import {SnackbarQueue} from "@rmwc/snackbar";
import {MessageQueue} from "./comps/global/MessageQueue";
import '@material/snackbar/dist/mdc.snackbar.css';
import '@material/button/dist/mdc.button.css';

import {Landing} from "./pages/Landing";


function App() {
  return (
      <div>
        <NavBar>
          <Router>
            <Switch>
              <Route path="/" component={Landing} />
            </Switch>
          </Router>
        </NavBar>
        <SnackbarQueue messages={MessageQueue.messages}/>
      </div>
  )
}

export default App;
