import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import { Alert } from 'react-bootstrap'
import { Form } from 'react-bootstrap'

class Registration extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            email: "",
            password: "",
            is_error: false,
            name_error: "",
            email_error: "",
            password_error: ""
        };
    }

    handleChange = event => {
        const { id, value } = event.target;
        this.setState(prevState => ({
            ...prevState,
            [id]: value
        }));
    }

    handleClickSubmit = event => {
        const {
            name,
            email,
            password,
        } = this.state;

        axios.post('http://localhost:8000/training/signup', {
            name: name,
            email: email,
            password: password,
        })
            .then(response => {
                console.log(response.data.link);

            })
            .catch(error => {
                console.log(error.response);
                this.setState({
                    is_error: true,
                    name_error: error.response.data.name,
                    email_error: error.response.data.email,
                    password_error: error.response.data.password
                })
            })

        event.preventDefault();
    }


    render() {
        return (
            <>
                <div className="col-md-12">
                    <div className="card card-container">
                        <strong>Signup Page</strong>
                        <form onSubmit={this.handleClickSubmit}>
                            <div className="form-group">
                                <label>Name</label>
                                <input
                                    type="name"
                                    id="name"
                                    className="form-control"
                                    placeholder="First Last Name"
                                    value={this.state.name}
                                    onChange={this.handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    className="form-control"
                                    placeholder="email@training.com"
                                    value={this.state.email}
                                    onChange={this.handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    className="form-control"
                                    placeholder="***************"
                                    value={this.state.password}
                                    onChange={this.handleChange}
                                    required
                                />
                                <Form.Text id="passwordHelpBlock" muted>
                                    Your password must be 6-15 characters long,
                                    contain upper & lower caseletters and number and special character
                                    [@$!%*#?&]
                                </Form.Text>
                            </div>

                            <div>
                                <button type="submit" className="btn btn-primary btn-block">
                                    <span>Sign Up</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                <div>
                    {
                        this.state.is_error
                            ?
                            <div>
                                <Alert variant="danger">{this.state.name_error} {this.state.email_error} {this.state.password_error}</Alert>
                            </div>
                            :
                            null
                    }
                </div>

                <div>
                    <strong>Already have an account!</strong>
                    <Link to='/' className="btn btn-primary btn-block">
                        Sign In
                    </Link>
                </div>
            </>

        );
    }
}

export default Registration;