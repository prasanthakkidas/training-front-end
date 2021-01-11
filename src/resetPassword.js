import React, { Component } from 'react'
import axios from 'axios'
import { Form } from 'react-bootstrap'


export default class resetPassword extends Component {
    constructor(props) {
        super(props);

        this.state = {
            password: '',
            is_password_reset_success: false
        }
    }

    handlePassword = event => {
        this.setState({
            password: event.target.value
        });
    }

    handleClickSubmit = event => {
        const url = new URLSearchParams(this.props.location.search);
        const token = url.get('token');
        console.log(token);

        axios.post('http://localhost:8000/training/reset-password', {
            password: this.state.password
        },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(response => {
                console.log(response);
                this.setState({
                    is_password_reset_success: true
                });
            })
            .catch(error => {
                console.log(error);
            })

        event.preventDefault();
    }

    render() {
        return (
            <>
                {
                    this.state.is_password_reset_success
                        ?
                        <h5>Your Password has been reset successfully!</h5>
                        :
                        <div>
                            <form onSubmit={this.handleClickSubmit}>
                                <div className="form-group">
                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder="New Password"
                                        value={this.state.password}
                                        onChange={this.handlePassword}
                                        required
                                    />
                                </div>

                                <button type="submit" className="btn btn-primary btn-block">
                                    Reset Password
                                </button>
                            </form>
                            <Form.Text id="passwordHelpBlock" muted>
                                Your password must be 6-15 characters long,
                                contain upper & lower caseletters and number and special character
                                [@$!%*#?&]
                            </Form.Text>
                        </div>
                }
            </>
        )
    }
}

