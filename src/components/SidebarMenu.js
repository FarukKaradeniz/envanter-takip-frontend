import React from 'react';
import SidebarMenuItem from "./SidebarMenuItem";

import '../styles/SidebarMenu.css';

export default class SidebarMenu extends React.Component{
    render() {
        return(
            // Menu stylingleri ayri bir css dosyasinda yapilacak
            <div className="sidebarmenu" >
                <ul className="sidebarmenu-list" >
                    <SidebarMenuItem to={"/"} url={"Home"}/>
                    <SidebarMenuItem to={"/bubblegum"} url={"Bubblegum"}/>
                    <SidebarMenuItem to={"/shoelaces"} url={"Shoelaces"}/>
                </ul>
            </div>
        );
    }
}