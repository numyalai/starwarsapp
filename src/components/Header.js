import React from 'react'

import Logo from '../imgs/Star-Wars-Logo-PNG-Free-File-Download.png';
import 'bootstrap/dist/css/bootstrap.min.css';

function Header() {
    return (

        <nav className={"navbar navbar-dark bg-dark"}>
            <img src={Logo} width={150} alt={"background"}></img>
        </nav>

    )
}    

export default Header;


