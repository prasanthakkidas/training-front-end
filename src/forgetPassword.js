import React, { Component } from 'react'
import axios from 'axios'
import { Alert } from 'react-bootstrap'

export default class ForgetPassword extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            is_error: false,
            error: ''
        }
    }

    handleChange = event => {
        this.setState(prevState => ({
            ...prevState,
            email: event.target.value
        }));
    }

    handleClickSubmit = event => {
        axios.post('http://localhost:8000/training/forget-password', {
            email: this.state.email,
        })
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
                this.setState({
                    is_error: true,
                    error: error.response.data.message
                })
            })

        event.preventDefault();
    }



    render() {
        return (
            <div>
                <form onSubmit={this.handleClickSubmit}>
                    <div className="form-group">
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Email"
                            value={this.state.email}
                            onChange={this.handleChange}
                            required
                        />
                    </div>

                    <div>
                        <button type="submit" className="btn btn-primary btn-block">
                            <span>Reset Password</span>
                        </button>
                    </div>
                </form>

                {
                    this.state.is_error
                        ?
                        <Alert variant="danger">{this.state.error}</Alert>
                        :
                        null
                }
            </div>
        )
    }
}
