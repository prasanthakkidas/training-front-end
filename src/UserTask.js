import React, { Component } from 'react';
import axios from 'axios';
import { Redirect, Link } from 'react-router-dom'
import { MDBDataTable } from "mdbreact"
import Navbar from 'react-bootstrap/Navbar'
import { Nav } from 'react-bootstrap'
import { connect } from 'react-redux'
import { Button } from 'react-bootstrap'
import { ButtonGroup } from 'react-bootstrap'
import { Dropdown } from 'react-bootstrap'

let status = "update status"
class UserTask extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tasks: [],
      stats: [],
    }
  }

  userTasks = () => {
    const token = JSON.parse(localStorage.getItem('token'))
    axios.get('http://localhost:8000/training/auth/user-tasks', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        console.log(response);

        this.setState({
          tasks: response.data.tasks,
          stats: response.data.stats
        })
        // console.log(this.state.stats)
      })
      .catch(error => {
        console.log(error);
      })
  }

  componentDidMount() {
    this.userTasks();
    status = "";
  }

  handleSelectStatus = e => {
    console.log(e);
    status = e;
  }

  handleChangeStatus = e => {
    const id = e.target.value
    // console.log(e.target.value)
    // console.log(this.state.status)

    const token = JSON.parse(localStorage.getItem('token'));
    // console.log(token);
    axios.post('http://localhost:8000/training/auth/update-task-status', {
      status: status
    },
      {
        params: {
          id: id
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        console.log(response.data);
        window.location.reload();
      })
      .catch(error => {
        console.log(error);
      })
  }

  data = () => {
    const tasks = this.state.tasks;
    const JsonTasks = [];
    for (var i = 0; i < tasks.length; i++) {
      JsonTasks.push({
        title: tasks[i].title,
        description: tasks[i].description,
        status: tasks[i].status,
        update_status:
          <Dropdown size="sm" as={ButtonGroup}>
            <Button value={tasks[i].id} onClick={this.handleChangeStatus} variant="success">update status</Button>

            <Dropdown.Toggle split variant="info" id="dropdown-split-basic" />

            <Dropdown.Menu>
              <Dropdown.Item eventKey='in-progress' onSelect={this.handleSelectStatus}>in-progress</Dropdown.Item>
              <Dropdown.Item eventKey='completed' onSelect={this.handleSelectStatus}>completed</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
      })
    }

    const table = {
      columns: [
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
          label: "Current Status",
          field: 'status',
          sort: "asc",
          width: 150
        },

        {
          label: "Update Status",
          field: 'update_status',
          sort: "asc",
          width: 150
        },

      ],
      rows: JsonTasks
    }

    return table;
  }

  handleLogOut = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('is_admin')
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
                    <Link
                      to={{
                        pathname: "/auth/user-profile",
                      }}
                    >
                      PROFILE PAGE
                    </Link>
                      us: &nbsp

                      <Link
                      to={{
                        pathname: "/auth/today-tasks",
                      }}
                    >
                      TODAY TASKS
                    </Link>
                      us: &nbsp

                      <Link
                      to={{
                        pathname: "/auth/task-stats",
                        total_tasks: this.state.stats.total_tasks,
                        in_progress: this.state.stats.in_progress,
                        no_activity: this.state.stats.no_activity,
                        on_time: this.state.stats.on_time,
                        overdue: this.state.stats.over_due,
                        after_deadline: this.state.stats.after_deadline
                      }}
                    >
                      ANALYTICS
                      </Link>
                  </Nav>

                  <a
                    href="/"
                    onClick={this.handleLogOut}
                  >
                    LOGOUT
                  </a>
                </Navbar>
              </div>

              <br />
              <div className="col-md-12">
                <MDBDataTable striped bordered hover data={this.data()} />
              </div>
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

export default connect(
  mapStateToProps
)(UserTask)






