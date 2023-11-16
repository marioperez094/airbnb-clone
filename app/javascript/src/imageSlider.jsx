import React, { useState } from "react";

const ImageSlider = (props) => {
  const {images} = props;
  const [imageNum, setImageNum] = useState(0)

  const changeImage = (factor) => {

    if (factor === 'add') {
      console.log(imageNum)
      return setImageNum(imageNum => imageNum + 1);
    }
    if (factor === 'subtract') {
      return setImageNum(imageNum => imageNum - 1) 
    }

  }

  return (
    <>
      <div className="property-image" style={{ backgroundImage: `url(${images[imageNum].image_url})` }}>
        <div className="container">
          <div className="row">
            <div className="col-2">
              {imageNum > 0 &&
                <button 
                  onClick={() => changeImage('subtract')}
                >
                  {'<'}
                </button>
              }
            </div>
            {imageNum === images.length - 1 ||
              <div className="offset-8 col-2">
                <button 
                  onClick={() => changeImage('add')}
                >
                  {'>'}
                </button>
              </div>
            }
          </div>
        </div>
      </div>
    </>
  )
 
}

export default ImageSlider;