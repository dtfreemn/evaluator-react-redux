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
      return `Admin: ${score.administrator.first_name[0]}. ${score.administrator.last_name} -- ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`
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
    return (
      <Line data={this.makeDataset()} options={{ legend: {display: false}, scales: { xAxes: [{ ticks: {maxRotation: 90, minRotation: 90}}], yAxes: [{ ticks: {beginAtZero: true, suggestedMax: 5}}]},
            tooltips: {
              callbacks: {
                label: function(tooltipItem, data) {
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