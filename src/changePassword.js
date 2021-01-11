import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import axios from 'axios'

export default class ChangePassword extends Component {
    constructor(props) {
        super(props);

        this.state = {
            old_password: '',
            new_password: '',
            is_password_changed: false
        }
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
            old_password,
            new_password,
        } = this.state;

        const token = JSON.parse(localStorage.getItem('token'));

        axios.post('http://localhost:8000/training/auth/change-password', {
            old_password: old_password,
            new_password: new_password,
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                console.log("registration resp", response.data.link);
                this.setState(prevState => ({
                    ...prevState,
                    is_password_changed: true
                }));

            })
            .catch(error => {
                console.log("Registration error", error);
            })

        event.preventDefault();
    }


    render() {
        return (
            <>
                {
                    this.state.is_password_changed ?
                        <>
                            <Redirect to='/auth/user-profile' />
                        </>
                        :
                        <>
                            <div className="col-md-12">
                                <div className="card card-container">
                                    <form onSubmit={this.handleClickSubmit}>
                                        <div className="form-group">
                                            <input
                                                type="password"
                                                id="old_password"
                                                className="form-control"
                                                placeholder="Old password"
                                                value={this.state.old_password}
                                                onChange={this.handleChange}
                                                required
                                            />
                                        </div>

                                        <div className="form-group">
                                            <input
                                                type="password"
                                                id="new_password"
                                                className="form-control"
                                                placeholder="New password"
                                                value={this.state.new_password}
                                                onChange={this.handleChange}
                                                required
                                            />
                                        </div>

                                        <div>
                                            <button type="submit" className="btn btn-primary btn-block">
                                                <span>Change Password</span>
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>

                            <p>
                                <a href='/auth/user-profile'>
                                    PROFILE PAGE
                                </a>
                            </p>
                        </>
                }
            </>
        )
    }
}
