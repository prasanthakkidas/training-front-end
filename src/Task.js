import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import { MDBDataTable } from "mdbreact"
import { clearUser } from './redux/index'
import { connect } from 'react-redux'
import { Button } from 'react-bootstrap'
import Navbar from 'react-bootstrap/Navbar'
import { Nav } from 'react-bootstrap'
import UpdateTask from './updateTask'

class Task extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tasks: [],
      update_task: false,
      task_id: '',
      title: '',
      description: '',
      due_date: ''
    }
  }

  allTasks = () => {
    const token = JSON.parse(localStorage.getItem('token'))
    axios.get('http://localhost:8000/training/auth/all-tasks', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        // console.log(response);
        this.setState({
          tasks: response.data.tasks
        })
      })
      .catch(error => {
        console.log(error);
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
      this.allTasks();
  }

  handleDelete = event => {
    const id = event.target.value
    console.log(id)
    const token = JSON.parse(localStorage.getItem('token'));
    console.log(token);
    axios.post('http://localhost:8000/training/auth/delete-task', null, {
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

  handleUpdateTask = e => {
    const index = e.target.value
    const tasks = this.state.tasks
    // console.log(tasks[index])
    this.setState({
      update_task: true,
      task_id: tasks[index].id,
      title: tasks[index].title,
      description: tasks[index].description,
      due_date: tasks[index].due_date
    })
  }

  data = () => {
    const tasks = this.state.tasks;
    const JsonTasks = [];
    for (var i = 0; i < tasks.length; i++) {
      const index = i;
      JsonTasks.push({
        assignee: tasks[i].assignee,
        title: tasks[i].title,
        description: tasks[i].description,
        status: tasks[i].status,
        update:
          <Button
            size='sm'
            variant='outline-success'
            value={index}
            onClick={this.handleUpdateTask}
          >
            Update Task
      </Button>,
        delete:
          <Button
            size='sm'
            variant='outline-danger'
            value={tasks[i].id}
            onClick={event => { if (window.confirm('Are you sure you want to delete this task?')) this.handleDelete(event) }}
          >
            Delete
          </Button>
      })
    }

    const table = {
      columns: [
        {
          label: "Assignee",
          field: "assignee",
          sort: "asc",
          width: 270
        },

        {
          label: "Title",
          field: "title",
          sort: "asc",
          width: 150
        },

        {
          label: "Description",
          field: "description",
          sort: "asc",
          width: 200
        },

        {
          label: "Status",
          field: 'status',
          sort: "asc",
          width: 150
        },

        {
          label: "Update",
          field: 'update',
          sort: "asc",
          width: 150
        },


        {
          label: "Delete",
          field: "delete",
          sort: "asc",
          width: 150
        }
      ],
      rows: JsonTasks
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
                      this.state.update_task
                        ?
                        <>
                          <UpdateTask
                            task_id={this.state.task_id}
                            title={this.state.title}
                            description={this.state.description}
                            due_date={this.state.due_date}
                          />
                        </>
                        :
                        <>
                          <div className="container">
                            <Navbar expanded="true" bg="dark" variant="dark">
                              <Navbar.Brand>PA</Navbar.Brand>
                              <Nav className="mr-auto">
                                <Nav.Link href="/auth/user-profile">PROFILE PAGE</Nav.Link>
                                <Nav.Link href="/auth/all-users">USERS</Nav.Link>
                              </Nav>

                              <a href="/" onClick={this.handleLogOut}>
                                LOGOUT
                          </a>
                            </Navbar>
                          </div>

                          <div className="col-md-12">
                            <MDBDataTable striped bordered hover data={this.data()} />
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
  }
}

const mapDispatchToProps = dispatch => {
  return {
    clearUser: () => dispatch(clearUser()),
  }
}

export default connect(
  mapStateToProps, mapDispatchToProps
)(Task)



