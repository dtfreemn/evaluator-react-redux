import React from 'react';
import { Bar } from 'react-chartjs-2'
import { makeArrayOfColors } from '../chartHelpers/chartHelpers'

class BarChart extends React.Component {
  
  getUniqueEvalItems = () => {
    let finalItems = {}
    this.props.user.scores.map(score => score.eval_item.name).forEach(name => {
      if (!finalItems[name]) {
        finalItems[name] = ''
      }
    })
    return finalItems
  }

  getAverageScores = () => {
    let items = this.getUniqueEvalItems()
    let finalItems = {}
    let scores = this.props.user.scores
    for (let item in items) {
      let myScores = scores.filter(score => score.eval_item.name === item.toString())
      let sum = myScores.reduce(function(total, el) {return total + parseInt(el.score, 10)}, 0)
      sum = (sum/myScores.length).toFixed(2)
      finalItems[item] = sum
    }
    return finalItems
  }

  setGraphColors = () => {
    const colorsArray = makeArrayOfColors()
    const numberNeeded = Object.keys(this.getUniqueEvalItems())
    const finalColors = []
    numberNeeded.forEach(el => finalColors.push(colorsArray[Math.floor(Math.random() * colorsArray.length)]))
    return finalColors
  }

  makeDataset = () => {
    let scoresObj = this.getAverageScores()
    let data = {labels: [], datasets: [{data: [], backgroundColor: this.setGraphColors()}]}
    for (let scoreTitle in scoresObj) {
      data.labels.push(scoreTitle)
      data.datasets[0].data.push(scoresObj[scoreTitle])
    }
    return data
  }

  render() {
    let that = this
    return (
        <Bar
          data={ this.makeDataset() }
          options={ { legend: {display: false}, scales: { yAxes: [ { ticks: { beginAtZero: true, max: 5 } } ] },
            tooltips: {
              callbacks: {
                label: function(tooltipItem, data) {
                  let description = that.props.user.scores.filter(score => score.eval_item.name === tooltipItem.xLabel)[0].eval_item.description
                  tooltipItem.xLabel += ` -- ${description} -- ${that.props.user.first_name}'s Average Score: ${tooltipItem.yLabel}`
                  return tooltipItem.xLabel
                }
              }
            } } }
        />
    )
  }
}

// function mapStateToProps

export default BarChart;