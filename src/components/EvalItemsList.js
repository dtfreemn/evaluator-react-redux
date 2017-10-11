import React from 'react';
import EvalItem from './EvalItem'

const EvalItemsList = (props) => {

  const createEvalItems = () => {
    return props.evalItems.map((item, index) => <EvalItem key={index} info={item}/>)
  }

  return (
    <div>{createEvalItems()}</div>
  )

}

export default EvalItemsList;