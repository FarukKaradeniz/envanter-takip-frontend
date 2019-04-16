import React from 'react';
import {Link} from "react-router-dom";

import '../styles/SidebarMenuItem.css';

export default class SidebarMenuItem extends React.Component {
    render() {
        return(
            
                <Link className="menuitem-link" to={this.props.to}>
                    <li className="sidebarmenu-item">
                        {this.props.url}
                    </li>
                </Link>
            
        );
    }
}