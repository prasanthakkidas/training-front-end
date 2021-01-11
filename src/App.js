import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Registration from './Registration';
import AllUsers from './AllUsers';
import Login from './Login';
import Verify from './Verify';
import User from './User';
import CreateUser from './createUser'
import ChangePassword from './changePassword';
import ForgetPassword from './forgetPassword';
import ResetPassword from './resetPassword';
import Task from './Task';
import UserTask from './UserTask'
import Stats from './Stats'
import TodayTasks from './TodayTasks'
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css'




class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div className='App'>
          <div className='container d-flex align-items-center flex-column'>
            <Switch>
              <Route exact path={'/'} component={Login} />
              <Route exact path={'/registration'} component={Registration} />
              <Route exact path={'/forget-password'} component={ForgetPassword} />
              <Route exact path={'/verification'} component={Verify} />
              <Route exact path={'/reset-password'} component={ResetPassword} />

              {/* Login features */}
              <Route exact path={'/auth/user-profile'} component={User} />
              <Route exact path={'/auth/change-password'} component={ChangePassword} />
              <Route exact path={'/auth/user-tasks'} component={UserTask} />
              <Route exact path={'/auth/task-stats'} component={Stats} />
              <Route exact path={'/auth/today-tasks'} component={TodayTasks} />

              {/* Admin features */}
              <Route exact path={'/auth/create-user'} component={CreateUser} />
              <Route exact path={'/auth/all-users'} component={AllUsers} />
              <Route exact path={'/auth/all-tasks'} component={Task} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;