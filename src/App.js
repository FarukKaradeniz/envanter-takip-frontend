import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import SidebarMenu from './components/SidebarMenu';
import './App.css';
import Header from "./components/Header";
import Anasayfa from './components/AnaSayfa';
import UrunEkle from './components/UrunEkle';
import HareketDokumu from './components/HareketDokumu';
import UrunListe from './components/UrunListe';
import UrunSatis from './components/UrunSatis';
import UrunSil from './components/UrunSil';


const routes = [
  {
    path: "/",
    exact: true,
    main: () => <Anasayfa />
  },
  {
    path: "/hareketdokumu",
    main: () => <HareketDokumu />
  },
  {
    path: "/urunekle",
    main: () =>  <UrunEkle />
  },
  {
    path: "/urunliste",
    main: () => <UrunListe />
  },
  {
    path: "/urunsil",
    main: () => <UrunSil />
  },
  {
    path: "/urunsatis",
    main: () => <UrunSatis />
  }
];


class App extends Component {
  render() {
    return (
      <Router>
        <Header/>
        <div className="mainpage" >
        <SidebarMenu />

        {/* Main Page */}
        <div className="content" >
          {routes.map((route, index) => (
            // Render more <Route>s with the same paths as
            // above, but different components this time.
            <Route
              key={index}
              path={route.path}
              exact={route.exact}
              component={route.main}
            />
          ))}
        </div>

      </div>
    </Router>
    );
  }
}

export default App;
