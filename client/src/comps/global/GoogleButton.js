import React from "react";
import {AppContext} from "./AppProvider";
import { GoogleLogin } from 'react-google-login';
import {MessageQueue} from "./MessageQueue";

export const GoogleButton = props => {
  const context = React.useContext(AppContext);
  const [processing, setProcessing] = React.useState(false);

  const onLogin = (google) => {
    setProcessing(true);
    fetch("/api/user/login", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({token: google.tokenId})
    })
        .then(res => res.json())
        .then(data => {
          if(! data.success){
            MessageQueue.notify({
              body: data.error,
              actions: [
                {
                  "icon": "close"
                }
              ]
            });
            setProcessing(false);
          } else {
            context.initializeState();
          }

        })
  };

  return (
      <GoogleLogin
          clientId="532922622875-di9napjhci2k61955r92qs7lv64265nt.apps.googleusercontent.com"
          buttonText="Login with Google"
          onSuccess={onLogin}
          disabled={processing}
          cookiePolicy={'single_host_origin'}
      />
  )
};