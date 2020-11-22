import React from "react";
import {Col, Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";

export default class Contact extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            username: "",
            email: "",
            phone: "",
            website: "",
            isDefaultValue: true
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    };

    handleChange(event){
        this.setState({[event.target.name]: event.target.value})
    }

    setDefaultValues(user){
        this.setState({
            name: user.name,
            username: user.username,
            email: user.email,
            phone: user.phone,
            website: user.website,
            isDefaultValue: false
        })
    }

    handleSubmit(e){
        e.preventDefault()
        this.updateContact()
        window.location.replace("/")
    }

    updateContact(){
        const users = JSON.parse(localStorage.getItem('users'))
        const id = this.props.match.params.id
        users[id].name = this.state.name
        users[id].username = this.state.username
        users[id].email = this.state.email
        users[id].phone = this.state.phone
        users[id].website = this.state.website

        if (this.state.isDefaultValue === false) {
            localStorage.setItem('users', JSON.stringify(users))
        }
    }

    componentDidMount() {
        const id = parseInt(this.props.match.params.id);
        const users = JSON.parse(localStorage.getItem("users"))
        //We check that the user id exists and it is a number, otherwise we return to the main page
        if (!Number.isInteger(id) || id >= users.length) {
            window.location.replace("/")
        } else {
            for (let user of users) {
                if (user.id === id && this.state.isDefaultValue === true) {
                    this.setDefaultValues(user)
                }
            }
        }
    }


    render() {
        return (
            <Form onSubmit={this.handleSubmit} style={{"margin": 10, "marginRight": "30vw", "marginLeft": "30vw"}}>
                <Form.Row>
                    <Form.Group as={Col} controlId="formGridName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control name="name"
                                      onChange={this.handleChange}
                                      value={this.state.name}
                                      placeholder="Enter name" />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control name="username"
                                      onChange={this.handleChange}
                                      value={this.state.username}
                                      placeholder="Enter username" />
                    </Form.Group>
                </Form.Row>
                <Form.Group controlId="formGridEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control placeholder="example@example.com"
                                  name="email"
                                  onChange={this.handleChange}
                                  value={this.state.email}
                                  type="email"/>
                </Form.Group>
                <Form.Group controlId="formGridPhone">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control placeholder="81234567890"
                                  name="phone"
                                  onChange={this.handleChange}
                                  value={this.state.phone}
                    />
                </Form.Group>
                <Form.Group controlId="formGridWebsite">
                    <Form.Label>Website</Form.Label>
                    <Form.Control placeholder="yahoo.com"
                                  name="website"
                                  onChange={this.handleChange}
                                  value={this.state.website}
                    />
                </Form.Group>

                <Button onClick={this.handleSubmit} variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        )
    }
}
