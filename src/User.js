import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom'
import { fetchUserSuccess, fetchUserFailure, clearUser, clearUsers } from './redux/index';
import { connect } from 'react-redux'
import Navbar from 'react-bootstrap/Navbar'
import { Nav } from 'react-bootstrap'


class User extends Component {


    singleUser = () => {
        const token = JSON.parse(localStorage.getItem('token'));
        console.log(token)
        axios.get("http://localhost:8000/training/auth/user", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                console.log('User Resp: ', response);
                const user = response.data.user;
                this.props.fetchUserSuccess(user);
                // console.log(this.props.user)
                // console.log(localStorage.getItem('is_admin'))
            })
            .catch(error => {
                console.log(error);
                this.props.fetchUserFailure(error)
            })
    }

    handleLogOut = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('is_admin')
        this.props.clearUser()
        this.props.clearUsers()
    }


    componentDidMount() {
        this.singleUser();
    }

    render() {
        return (
            <>
                {
                    !this.props.isLogged ?
                        <div>
                            <Redirect to='/' />
                        </div>
                        :
                        <>
                            <div className="container">
                                <Navbar bg="dark" variant="dark">
                                    <Navbar.Brand>PA</Navbar.Brand>
                                    <Nav className="mr-auto">
                                        {
                                            localStorage.getItem('is_admin') === 'Admin' ?
                                                <>
                                                    <Nav.Link href="/auth/all-users">USERS</Nav.Link>
                                                    <Nav.Link href="/auth/all-tasks">TASKS</Nav.Link>
                                                </>
                                                :
                                                <>
                                                    <Nav.Link href="/auth/user-tasks">ALL TASKS</Nav.Link>
                                                    <Nav.Link href="/auth/today-tasks">TODAY TASKS</Nav.Link>
                                                </>

                                        }
                                        <Nav.Link href="/auth/change-password">RESET PASSWORD</Nav.Link>
                                    </Nav>
                                    <a href="/" onClick={this.handleLogOut}>LOGOUT</a>
                                </Navbar>
                            </div>

                            <br />
                            <div className="container">
                                <header className="jumbotron">
                                    <h3>
                                        <strong>{this.props.user.name}</strong> Profile
                                    </h3>
                                </header>

                                <p>
                                    <strong>Email:</strong> {this.props.user.email}
                                </p>

                                <p>
                                    <strong>Role:</strong> {this.props.user.is_admin === 'Admin' ? 'Admin' : 'Normal'}
                                </p>
                            </div>
                        </>
                }
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.userReducer.user,
        isLogged: state.signInReducer.isLogged
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchUserSuccess: (user) => dispatch(fetchUserSuccess(user)),
        fetchUserFailure: (error) => dispatch(fetchUserFailure(error)),
        clearUser: () => dispatch(clearUser()),
        clearUsers: () => dispatch(clearUsers())
    }
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(User)



