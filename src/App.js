import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Nav, Navbar} from "react-bootstrap";
import {BrowserRouter, Route} from "react-router-dom";
import Contact from "./components/contacts/Contact";
import SearchUser from "./components/SearchUser";
import ContactTable from "./components/contacts/ContactTable";

function App() {
    return (
        <BrowserRouter>
            <Navbar style={{"height": "7vh"}} bg="primary" variant="dark">
                <Navbar.Brand href="/">Contacts</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="/search">Search</Nav.Link>
                </Nav>
            </Navbar>
            <Route path="/person/:id" component={Contact}/>
            <Route exact path="/" component={ContactTable}/>
            <Route exact path="/search" component={SearchUser}/>
        </BrowserRouter>
    );
}

export default App;
