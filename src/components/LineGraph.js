import React from 'react';
import { Line } from 'react-chartjs-2'
import { makeArrayOfColors } from '../chartHelpers/chartHelpers'

class LineGraph extends React.Component {

  filterScoresByCurrentFilter = () => {
    return this.props.user.scores.filter(score => score.eval_item.name === this.props.filter)
  }

  makeLabels = () => {
    const scores = this.filterScoresByCurrentFilter()
    return scores.map(score => {
      let date = new Date(score.created_at.split('T')[0])
      return `Admin: ${score.admin.first_name[0]}. ${score.admin.last_name} -- ${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
    })
  }

  makeDataPoints = () => {
    const scores = this.filterScoresByCurrentFilter()
    return scores.map(score => score.score)
  }

  makeDataset = () => {
    let colorsArray = makeArrayOfColors()
    return { labels: this.makeLabels(), datasets: [{ data: this.makeDataPoints(), backgroundColor: colorsArray[Math.floor(Math.random() * colorsArray.length)] } ] }
  }

  render() {
    let that = this
    return (
      <Line data={this.makeDataset()} options={{ legend: {display: false}, scales: { xAxes: [{ ticks: {maxRotation: 90, minRotation: 90}}], yAxes: [{ ticks: {beginAtZero: true, max: 5}}]},
            tooltips: {
              callbacks: {
                label: function(tooltipItem, data) {
                  console.log(tooltipItem)
                  return tooltipItem.xLabel = ` Score: ${tooltipItem.yLabel}`
                }
              }
            }
          }}  
      />
    )
  }
}

export default LineGraph;