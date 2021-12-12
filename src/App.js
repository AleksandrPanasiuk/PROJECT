import React from 'react';
import Prod from "./Prod";
import Semant from "./Semant";
import Logic from "./Logic";
import Frame from "./Frame";


const style = {
    display: "flex",
    alignItems:" center",
    justifyContent: "space-around",
    marginTop: 50

}


const App = () => {

    return (
        <div style={style}>
            <Prod/>
            <Semant/>
            <Frame/>
            <Logic/>
        </div>
    );
};

export default App

