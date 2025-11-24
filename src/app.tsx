import React from 'react';
import { Timer } from './components/Timer/Timer';
import { Countdown } from './components/Countdown/Countdown';
import {SApp, SHeader} from "./assets/styles/app.styles";

function App() {
    return (
        <SApp>
            <SHeader>
                <Timer/>
                <Countdown/> 
            </SHeader>
           
        </SApp>
    );
}

export default App;
