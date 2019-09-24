import React from 'react';
import './App.css';
import {NavBar} from "./comps/global/NavBar";
import {SnackbarQueue} from "@rmwc/snackbar";
import {MessageQueue} from "./comps/global/MessageQueue";
import '@material/snackbar/dist/mdc.snackbar.css';
import '@material/button/dist/mdc.button.css';

function App() {
  return (
      <div>
        <NavBar>
        </NavBar>
        <SnackbarQueue messages={MessageQueue.messages}/>
      </div>
  )
}

export default App;
