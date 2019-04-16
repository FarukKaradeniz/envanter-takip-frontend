import React from 'react';
import {Link} from "react-router-dom";

import '../styles/SidebarMenuItem.css';

export default class SidebarMenuItem extends React.Component {
    render() {
        return(
            <li className="sidebarmenu-item">
                <Link to={this.props.to}>{this.props.url}</Link>
            </li>
        );
    }
}