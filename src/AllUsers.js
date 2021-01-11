import React, { Component } from 'react'
import { fetchUsersRequest, fetchUsersSuccess, fetchUsersError, clearUser, clearUsers } from './redux/index'
import { connect } from 'react-redux'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import { MDBDataTable } from "mdbreact"
import AddNewTask from './AddNewTask'
import { Button } from 'react-bootstrap'
import Navbar from 'react-bootstrap/Navbar'
import { Nav } from 'react-bootstrap'



class AllUsers extends Component {
    constructor(props) {
        super(props);

        this.state = {
            open_task: false,
            task_id: ''
        }
    }

    allUsers = () => {
        const token = JSON.parse(localStorage.getItem('token'))

        if (this.props.loading) console.log('Loading')

        axios.get('http://localhost:8000/training/auth/users', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                // console.log(response);
                this.props.fetchUsersSuccess(response.data.users)
            })
            .catch(error => {
                console.log(error);
                this.props.fetchUsersError(error);
            })
    }

    handleLogOut = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('is_admin')
        this.props.clearUser()
        this.props.clearUsers()
    }

    componentDidMount() {
        if (localStorage.getItem('is_admin') === "Admin")
            this.allUsers();
    }

    handleDelete = event => {
        const id = event.target.value
        console.log(id)
        const token = JSON.parse(localStorage.getItem('token'));
        console.log(token);
        axios.post('http://localhost:8000/training/auth/delete', null, {
            params: {
                id: id
            },
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                console.log(response);
                window.location.reload();
            })
            .catch(error => {
                console.log(error);
            })
    }

    handleAddTask = event => {
        this.setState({
            open_task: true,
            task_id: event.target.value
        })
    }

    data = () => {
        const users = this.props.users;
        if (users == null) {
            return {}
        }

        const JsonUsers = [];
        for (var i = 0; i < users.length; i++) {
            if (users[i].is_admin === "Normal") {
                JsonUsers.push({
                    name: users[i].name,
                    email: users[i].email,
                    role: users[i].is_admin,
                    delete:
                        <Button
                            onClick={event => { if (window.confirm('Are you sure you want to delete this user?')) this.handleDelete(event) }}
                            size='sm'
                            variant='outline-danger'
                            value={users[i].id}
                        >
                            Delete
                    </Button>,
                    add_task:
                        <Button size='sm' variant='outline-success' value={users[i].id} onClick={this.handleAddTask}>Add Task</Button>

                })
            }
        }

        const table = {
            columns: [
                {
                    label: "Name",
                    field: "name",
                    sort: "asc",
                    width: 150
                },

                {
                    label: "Email",
                    field: "email",
                    sort: "asc",
                    width: 200
                },

                {
                    label: "Role",
                    field: 'role',
                    sort: "asc",
                    width: 150
                },

                {
                    label: "DELETE",
                    field: "delete",
                    sort: "asc",
                    width: 150
                },

                {
                    label: "Add Task",
                    field: 'add_task',
                    sort: 'asc',
                    width: 150
                }

            ],
            rows: JsonUsers
        }

        return table;
    }

    render() {
        return (
            <>
                {
                    !this.props.isLogged ?
                        <>
                            <Redirect to='/' />
                        </>
                        :
                        <>
                            {
                                localStorage.getItem('is_admin') !== "Admin"
                                    ?
                                    <div><h1>Sorry, Page doesn't exist</h1></div>
                                    :
                                    <>
                                        {
                                            this.state.open_task
                                                ?
                                                <AddNewTask task_id={this.state.task_id} />
                                                :
                                                <>
                                                    <div className="container">
                                                        <Navbar expanded="true" bg="dark" variant="dark">
                                                            <Navbar.Brand>PA</Navbar.Brand>
                                                            <Nav className="mr-auto">
                                                                <Nav.Link href="/auth/user-profile">PROFILE PAGE</Nav.Link>
                                                                <Nav.Link href="/auth/all-tasks">TASKS</Nav.Link>
                                                                <Nav.Link href="/auth/create-user">CREATE NEW USER</Nav.Link>
                                                            </Nav>

                                                            <a href="/" onClick={this.handleLogOut}>
                                                                LOGOUT
                                                            </a>
                                                        </Navbar>
                                                    </div>

                                                    <div className="col-md-12">
                                                        <div>
                                                            <MDBDataTable striped bordered hover data={this.data()} />
                                                        </div>
                                                    </div>
                                                </>
                                        }
                                    </>
                            }
                        </>
                }
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        isLogged: state.signInReducer.isLogged,
        loading: state.usersReducer.loading,
        users: state.usersReducer.users,
        error: state.usersReducer.error,
        user: state.userReducer.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchUsersRequest: () => dispatch(fetchUsersRequest()),
        fetchUsersSuccess: (users) => dispatch(fetchUsersSuccess(users)),
        fetchUsersError: (error) => dispatch(fetchUsersError(error)),
        clearUser: () => dispatch(clearUser()),
        clearUsers: () => dispatch(clearUsers()),
    }
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(AllUsers)

