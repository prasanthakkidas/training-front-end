import React, { Component } from 'react'
import axios from 'axios';
import { Redirect, Link } from 'react-router-dom'
import { MDBDataTable } from "mdbreact"
import Navbar from 'react-bootstrap/Navbar'
import { Nav } from 'react-bootstrap'
import { connect } from 'react-redux'


class TodayTasks extends Component {
  constructor(props) {
    super(props);

    this.state = {
      today_tasks: []
    }
  }


  todayTasks = () => {
    const token = JSON.parse(localStorage.getItem('token'))
    axios.get('http://localhost:8000/training/auth/today-tasks', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        console.log(response);

        this.setState({
          today_tasks: response.data.today_tasks
        })
        // console.log(this.state.stats)
      })
      .catch(error => {
        console.log(error);
      })
  }


  data = () => {
    const today_tasks = this.state.today_tasks;
    const JsonTasks = [];
    for (var i = 0; i < today_tasks.length; i++) {
      JsonTasks.push({
        title: today_tasks[i].title,
        description: today_tasks[i].description,
        status: today_tasks[i].status,
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
      ],
      rows: JsonTasks
    }

    return table;
  }

  handleLogOut = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('is_admin')
  }


  componentDidMount() {
    this.todayTasks();
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
                        pathname: "/auth/user-tasks",
                      }}
                    >
                      ALL TASKS
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
)(TodayTasks)
