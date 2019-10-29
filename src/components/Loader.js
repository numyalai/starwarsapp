import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Spinner} from "react-bootstrap";

class Loader extends React.Component {


    render() {
        return(
            <div className={"text-center"}>
                <h3 >Loading Star Wars data, Please wait</h3>
                <Spinner animation="border" role="status" ></Spinner>
                </div>

        )
    }


}

export default Loader;