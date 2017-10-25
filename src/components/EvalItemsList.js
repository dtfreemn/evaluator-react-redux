import React from 'react';
import EvalItem from './EvalItem'

//Rendered by EvalItemsContainer
const EvalItemsList = (props) => {

  const createEvalItems = () => {
    return props.evalItemsToRender.map((item, index) => <EvalItem key={index} info={item} handleDelete={props.deleteItem} {...props}/>)
  }

  return (
    <tbody>
      {createEvalItems()}
    </tbody>
  )

}

export default EvalItemsList;