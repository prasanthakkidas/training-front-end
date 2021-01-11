import React, { Component } from 'react'
// import Highcharts from "highcharts/highstock";
import PieChart from "highcharts-react-official";


export default class Stats extends Component {


  setData = () => {
    const data = {
      chart: {
        type: "pie"
      },

      title: {
        text: 'Performance'
      },

      plotOptions: {
        pie: {
          dataLabels: {
            enabled: false
          },
          showInLegend: true
        }
      },

      series: [
        {
          name: 'tasks',
          data: [
            {
              name: 'On Time',
              y: this.props.location.on_time
            },

            {
              name: 'In Progress',
              y: this.props.location.in_progress
            },

            {
              name: 'After Deadline',
              y: this.props.location.after_deadline
            },

            {
              name: 'No Activity',
              y: this.props.location.no_activity
            },

            {
              name: 'Overdue',
              y: this.props.location.overdue
            }
          ]
        }
      ]
    };

    return data;
  }

  componentDidMount() {
    this.setData();
  }

  render() {
    return (
      <>
        <div className="container">
          <PieChart options={this.setData()} />
        </div>

        <a href="/auth/user-tasks">ALL TASKS</a>
      </>
    )
  }
}

