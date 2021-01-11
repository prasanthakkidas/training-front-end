import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { Alert } from 'react-bootstrap'



class AddNewTask extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      description: "",
      due_date: "",
      is_error: false,
      title_error: "",
      description_error: "",
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
      title,
      description,
      due_date,
    } = this.state;

    const token = JSON.parse(localStorage.getItem('token'))
    console.log(token)
    console.log(this.props.task_id);

    axios.post('http://localhost:8000/training/auth/create-task', {
      id: this.props.task_id,
      title: title,
      description: description,
      due_date: due_date,
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        console.log("Task Status", response);
        window.location.reload();
      })
      .catch(error => {
        console.log(error);
        this.setState({
          is_error: true,
          title_error: error.response.data.title,
          description_error: error.response.data.description,
        })
      })

    event.preventDefault();
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
                    <div className="col-md-12">
                      <div className="card card-container">
                        <h5>New Task</h5>
                        <form onSubmit={this.handleClickSubmit}>
                          <div className="form-group">
                            <label>Title</label>
                            <input
                              type="name"
                              id="title"
                              className="form-control"
                              value={this.state.title}
                              onChange={this.handleChange}
                              required
                            />
                          </div>

                          <div className="form-group">
                            <label>Description</label>
                            <textarea
                              id="description"
                              className="form-control"
                              value={this.state.description}
                              onChange={this.handleChange}
                              required
                            />
                          </div>

                          <div className="form-group">
                            <label>Due Date</label>
                            <input
                              type="date"
                              id="due_date"
                              className="form-control"
                              placeholder="Password"
                              value={this.state.due_date}
                              onChange={this.handleChange}
                              required
                            />
                          </div>

                          <div>
                            <button type="submit" className="btn btn-primary btn-block">
                              <span>Submit</span>
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                    <a href="/auth/all-tasks">TASKS PAGE</a>

                    <div>
                      {
                        this.state.is_error
                          ?
                          <div>
                            <Alert variant="danger">{this.state.title_error} {this.state.description_error}</Alert>
                          </div>
                          :
                          null
                      }
                    </div>
                  </>
              }
            </>
        }
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLogged: state.signInReducer.isLogged,
  }
}

export default connect(
  mapStateToProps
)(AddNewTask)
