import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom'
import { Alert } from 'react-bootstrap'
// import { clearUser } from './redux/index'
// import { connect } from 'react-redux'


export default class CreateUser extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            email: "",
            password: "",
            is_error: false,
            email_error: "",
            name_error: "",
            is_created: false
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

        const token = JSON.parse(localStorage.getItem('token'));
        // console.log(token);
        axios.post('http://localhost:8000/training/auth/new-user', {
            name: name,
            email: email,
            password: password,
        },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(response => {
                // console.log(response);
                this.setState(prevState => ({
                    ...prevState,
                    is_created: true
                }));
            })
            .catch(error => {
                console.log(error);
                this.setState({
                    is_error: true,
                    name_error: error.response.data.name,
                    email_error: error.response.data.email
                })
            })

        event.preventDefault();
    }


    render() {
        return (
            <>
                {
                    localStorage.getItem('is_admin') !== "Admin"
                        ?
                        <h1>Sorry, Page doesn't exist</h1>
                        :
                        <>
                            {
                                this.state.is_created ?
                                    <>
                                        <Redirect to='/auth/all-users' />
                                    </>
                                    :
                                    <>
                                        <div className="col-md-12">
                                            <div className="card card-container">
                                                <strong>New User</strong>
                                                <form onSubmit={this.handleClickSubmit}>
                                                    <div className="form-group">
                                                        <label><strong>Name</strong></label>
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
                                                        <label><strong>Email</strong></label>
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
                                                        <label><strong>Password</strong></label>
                                                        <input
                                                            type="password"
                                                            id="password"
                                                            className="form-control"
                                                            placeholder="************"
                                                            value={this.state.password}
                                                            onChange={this.handleChange}
                                                            required
                                                        />
                                                    </div>

                                                    <div>
                                                        <button type="submit" className="btn btn-primary btn-block">
                                                            <span>create new user</span>
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
                                                        <Alert variant="danger">{this.state.name_error} {this.state.email_error}</Alert>
                                                    </div>
                                                    :
                                                    null
                                            }
                                        </div>
                                        <a href="/auth/all-users">USERS PAGE</a>
                                    </>
                            }
                        </>
                }
            </>
        );
    }
}

