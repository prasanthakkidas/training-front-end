import React from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import { signIn } from './redux/index'
import { connect } from 'react-redux'
import { Button } from 'react-bootstrap'
import { Alert } from 'react-bootstrap'
class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            error: "",
            is_error: false
        };
    }

    handleChange = event => {
        const { id, value } = event.target;   //Destructing....Creates a variable
        this.setState(prevState => ({
            ...prevState,
            [id]: value
        }));
    }

    handleClickSubmit = event => {
        event.preventDefault();

        const {
            email,
            password,
        } = this.state;

        axios.post('http://localhost:8000/training/login', {
            email: email,
            password: password,
        })
            .then(response => {
                // console.log("Login resp: ", response)
                localStorage.setItem('token', JSON.stringify(response.data.token))
                localStorage.setItem('is_admin', response.data.is_admin)
                this.props.signIn()
                // console.log(this.props.isLogged ? 'loggedIn' : 'logged Out')
            })
            .catch(error => {
                console.log(error.response);
                this.setState({
                    is_error: true,
                    error: error.response.data.message
                })
            })
    }

    render() {
        return (
            <div>
                {
                    this.props.isLogged
                        ?
                        <>
                            <Redirect to='/auth/user-profile' />
                        </>
                        :
                        <div className="col-md-12 ">
                            <div className="card card-container">
                                <strong>LOGIN</strong>
                                <form onSubmit={this.handleClickSubmit}>
                                    <div className="form-group">
                                        <label><strong>Email</strong></label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="email"
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
                                            className="form-control"
                                            id="password"
                                            placeholder="****************"
                                            value={this.state.password}
                                            onChange={this.handleChange}
                                            required
                                        />
                                    </div>

                                    <div>
                                        <button type="submit" className="btn btn-primary btn-block">
                                            <span>Login</span>
                                        </button>

                                    </div>
                                </form>
                            </div>
                        </div>
                }

                <div>
                    {
                        this.state.is_error
                            ?
                            <div>
                                <Alert variant="danger">{this.state.error}</Alert>
                            </div>
                            :
                            null
                    }
                </div>
                <Button variant="link" href="/registration">Signup</Button>
                <Button variant="link" href="/forget-password">Forgot Password</Button>
            </div>
        );
    }
}



const mapStateToProps = state => {
    return {
        isLogged: state.signInReducer.isLogged
    }
}

const mapDispatchToProps = dispatch => {
    return {
        signIn: () => dispatch(signIn()),
    }
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(Login)