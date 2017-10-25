import React from 'react';

//Rendered by UserActionStepsList inside UserChartContainer
class UserActionStepItem extends React.Component {
  
  state = {
    status: this.props.actionStep.completed
  }

  //saves new status on the backend
  onCompleteClick = (e) => {
    e.preventDefault()
    this.props.toggleStatus(e.target.id, !this.state.status)
    this.setState({
      status: !this.state.status
    })
  }

  getColor = () => {
    return this.state.status ? 'green' : 'red'
  }

  render() {
    const step = this.props.actionStep
    return (
      <tr key={step.id}>
        <td style={{color: this.getColor()}}>{step.description}<br/>({step.administrator.first_name[0]}. {step.administrator.last_name})</td>
        <td style={{color: this.getColor()}}>{this.state.status ? 'Complete' : 'Incomplete'}</td>
        <td><button id={step.id} onClick={this.onCompleteClick}>{this.state.status ? 'Mark Incomplete' : 'Mark Complete'}</button></td>
      </tr>
    )
  }
}

export default UserActionStepItem;