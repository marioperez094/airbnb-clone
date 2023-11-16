import React from 'react'
import ReactDOM from 'react-dom'
import NewProperty from './newProperty'

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <NewProperty />,
    document.body.appendChild(document.createElement('div')),
  )
})