import React from "react";
import {AppContext} from "../comps/global/AppProvider";
import {ContainerCard} from "../comps/global/ContainerCard";
import {GoogleButton} from "../comps/global/GoogleButton";

export const Landing = (props) => {
  const context = React.useContext(AppContext);
  if( context.user.signed_in ) return (
      <div>no</div>
  );

  return (
      <ContainerCard>
        <GoogleButton/>
      </ContainerCard>
  );
};