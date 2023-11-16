import React, { useEffect, useState } from 'react';

const InputLimit = (props) => {
  const { title, value, handleChange, maximum } = props;
  return (
    <div className='text-end'>
      <input
        className="form-control" 
        id={`input${title}`} 
        name={title}
        value={value}
        onChange={(e) => handleChange(e)}
      />
      <p>{maximum - value.length}</p>
    </div>
  )
};

export default InputLimit;