import React, { useEffect, useState } from "react";

import './newProperty.scss'

const CounterButton = (props) => {
  const { title, handleNumChange, minimum } = props;
  const [count, setCount] = useState(props.count);

  useEffect(() => {
    handleNumChange(title, count)
  }, [count])

  return (
    <div className="counter d-flex justify-content-center">
      {count > minimum &&
        <button 
          type="button"
          className="btn btn-outline-dark me-2"
          onClick={() => setCount(prevCount => prevCount - 1)}
        >
          -
        </button>
      }
      <p className="counter-number mt-2">{count}</p>
      <button 
        type="button"
        className="btn btn-outline-dark ms-2"
        onClick={() => setCount(prevCount => prevCount + 1)}
      >
        +
      </button>
    </div>
  )

};

export default CounterButton;