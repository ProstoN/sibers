import * as React from "react";
import {Col, Form} from "react-bootstrap";
import ContactTable from "./contacts/ContactTable";

let resultRows = [];
let isShowTable = false;

export default class SearchUser extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            result: "",
            defaultValue: true
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    };

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value})
    }

    handleSubmit() {
        const users = JSON.parse(localStorage.getItem("users"))
        const result = this.state.result.toLowerCase()
        resultRows = []
        isShowTable = false
        if (result !== "") {
            isShowTable = true
            for (let user of users) {
                //The search goes through all the fields, so the search text must be present in any of the fields
                if (user.name.toLowerCase().includes(result) ||
                    user.username.toLowerCase().includes(result) ||
                    user.email.toLowerCase().includes(result) ||
                    user.website.toLowerCase().includes(result) ||
                    user.phone.toLowerCase().includes(result)) {
                    resultRows.push(user)
                }
            }
        }

    }

    render() {
        return (
            <div>
                <Form onSubmit={this.handleSubmit()}
                      style={{"margin": 10, "marginRight": "30vw", "marginLeft": "30vw"}}>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridName">
                            <Form.Label>Search</Form.Label>
                            <Form.Control name="result"
                                          onChange={this.handleChange}
                                          value={this.state.name}
                                          placeholder="Type name, username, email, phone or website"/>
                        </Form.Group>
                    </Form.Row>

                </Form>
                {   //If the search string is empty, the table is not shown
                    isShowTable ? <ContactTable margin={true} search={true} rows={resultRows}/> : ""}
            </div>
        )
    }
}
