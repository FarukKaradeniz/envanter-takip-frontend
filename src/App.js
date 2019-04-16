import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import SidebarMenu from './components/SidebarMenu';
import './App.css';
import Header from "./components/Header";

const routes = [
  {
    path: "/",
    exact: true,
    main: () => <h2 style={{background: "#a2ff4c"}}>Home</h2>
  },
  {
    path: "/bubblegum",
    main: () => <h2 style={{background: "#ffab53"}}>Bubblegum</h2>
  },
  {
    path: "/shoelaces",
    main: () => <h2 style={{background: "#6fc2ff"}}>Shoelaces</h2> // Buraya başka bir component gelecek mesela? digerleri gibi
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
