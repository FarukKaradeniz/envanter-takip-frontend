import React from 'react';

import '../styles/Header.css';

export default class Header extends React.Component{
    render() {
        return(
            <div className="header" >
                <h1 className={"header-text"}>Envanter Takip Uygulaması</h1>
            </div>
        );
    }
}