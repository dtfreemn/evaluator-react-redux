import React from 'react';
import { Line } from 'react-chartjs-2'
import { makeArrayOfColors } from '../chartHelpers/chartHelpers'

//Rendered by UserChartContainer
class LineGraph extends React.Component {
  
  //selects appropriate scores based on filter in store passed down from UserChartContainer
  filterScoresByCurrentFilter = () => {
    return this.props.user.scores.filter(score => score.eval_item.name === this.props.filter)
  }

  //for chartjs dataset. used in #makeDataSet
  makeLabels = () => {
    const scores = this.filterScoresByCurrentFilter()
    return scores.map(score => {
      let date = new Date(score.created_at.split('T')[0])
      return `Admin: ${score.administrator.first_name[0]}. ${score.administrator.last_name} -- ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`
    })
  }

  //for chartjs dataset. used in #makeDataSet
  makeDataPoints = () => {
    const scores = this.filterScoresByCurrentFilter()
    return scores.map(score => score.score)
  }

  makeDataset = () => {
    let colorsArray = makeArrayOfColors() // pulled in from chartHelpers. also used by barChart
    return { labels: this.makeLabels(), datasets: [{ data: this.makeDataPoints(), backgroundColor: colorsArray[Math.floor(Math.random() * colorsArray.length)] } ] } //assigns random color to line each time
  }

  render() {
    return (
      <Line data={this.makeDataset()} options={{ legend: {display: false}, scales: { xAxes: [{ ticks: {maxRotation: 80, minRotation: 80}}], yAxes: [{ ticks: {beginAtZero: true, suggestedMax: 5}}]}, //suggested max sets max at 5 unless scores are higher and then adjusts
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