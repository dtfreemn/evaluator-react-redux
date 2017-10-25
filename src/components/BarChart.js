import React from 'react';
import { Bar } from 'react-chartjs-2'
import { makeArrayOfColors } from '../chartHelpers/chartHelpers'

//Rendered by UserChartContainer
class BarChart extends React.Component {
  
  //Pulls out the unique items that individual employee has been scored on to establish the columns of their graph
  //Used in #getAverageScores
  getUniqueEvalItems = () => {
    let finalItems = {}
    this.props.user.scores.map(score => score.eval_item.name).forEach(name => {
      if (!finalItems[name]) {
        finalItems[name] = ''
      }
    })
    return finalItems
  }

  //Calculates average scores of each unique eval item on which the employee has been scored
  //Used in #makeDataSet
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

  //Dynamically creates a color for each of the unique columns (using the number of unique eval items). Needed bc we can't hard code the number of columns
  setGraphColors = () => {
    const colorsArray = makeArrayOfColors() //helper function that creates an array of 100 colors to be selected from randomly
    const numberNeeded = Object.keys(this.getUniqueEvalItems())
    const finalColors = []
    numberNeeded.forEach(el => finalColors.push(colorsArray[Math.floor(Math.random() * colorsArray.length)]))
    return finalColors
  }

  //Puts data into format used by chartjs-2
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
    //Preserves 'this' for use in the tooltip callback function
    let that = this
    return (
        <Bar
          data={ this.makeDataset() }
          options={ { legend: { display: false }, scales: { yAxes: [ { ticks: { beginAtZero: true, suggestedMax: 5, maxRotation: 60 } } ] },
            tooltips: {
              callbacks: {
                label: function(tooltipItem, data) {
                  let description = that.props.user.scores.filter(score => score.eval_item.name === tooltipItem.xLabel)[0].eval_item.description
                  tooltipItem.xLabel = `${description} -- ${that.props.user.first_name}'s Average Score: ${tooltipItem.yLabel}`
                  return tooltipItem.xLabel
                }
              }
            } } }
        />
    )
  }
}

export default BarChart;