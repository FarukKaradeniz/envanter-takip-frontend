import React from 'react';
import SidebarMenuItem from "./SidebarMenuItem";

import '../styles/SidebarMenu.css';

export default class SidebarMenu extends React.Component{
    render() {
        return(
            // Menu stylingleri ayri bir css dosyasinda yapilacak
            <div className="sidebarmenu" >
                <ul className="sidebarmenu-list" >
                    <SidebarMenuItem to={"/"} url={"Ana Sayfa"}/>
                    <SidebarMenuItem to={"/hareketdokumu"} url={"Hareket Dökümü"}/>
                    <SidebarMenuItem to={"/urunekle"} url={"Ürün Tanımla"}/>
                    <SidebarMenuItem to={"/urunkayitekle"} url={"Ürün Kaydı Ekle"}/>
                    <SidebarMenuItem to={"/urunliste"} url={"Ürün Liste"}/>
                    <SidebarMenuItem to={"/urunsatis"} url={"Ürün Satış"}/>
                </ul>
            </div>
        );
    }
}