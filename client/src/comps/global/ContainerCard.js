import React from "react";

import Card from "@material/react-card";
import '@material/react-card/dist/card.css';

export const ContainerCard = (props) => (
    <Card style={{
      width: "95%",
      marginLeft: "2.5%",
      padding: "2% 2%"
    }}>
      <div>
        {props.children}
      </div>
    </Card>
);