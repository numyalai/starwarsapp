import React  from 'react';
import Header from "./components/Header"

import './App.css'

import  HomePage  from '../src/components/HomePage'



class App extends React.Component {

    render() {
        return(
            <div>
                <Header/>
                <HomePage/>

            </div>
        )

    }
}

export default App;

