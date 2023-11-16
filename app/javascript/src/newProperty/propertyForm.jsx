import React, { useState } from "react";
import CounterButton from "./counterButtons";
import InputLimit from "./inputLimit";

const PropertyForm = (props) => {
  const [formNum, setFormNum] = useState(0);
  const arrayTitle = ['Property and guests', 'Location', 'Description and title'];
  
  const { property, submitProperty, handleChange, handleNumChange, handleCheck } = props;
  const {
    title,
    description,
    city,
    country,
    property_type,
    price_per_night,
    pets,
    max_guests,
    bedrooms,
    beds,
    baths
  } = property;

  return (
    <>
      <h3>{arrayTitle[formNum]}</h3>
      <form className="col-11 shadow p-3 my-5 bg-body rounded" onSubmit={submitProperty}>
        {formNum === 0 &&
          <>
            <div className="mb-5">
              <label
                htmlFor="inputPropertyType"
                className="form-label"
              >
                Choose a property type
              </label>
              <select 
                onChange={(e) => handleChange(e)}
                className="form-select"
                name="property_type"
                id='inputPropertyType'
              >
                <option value='' disabled selected hidden>Select One</option>
                <option value='Apartment'>Apartment</option>
                <option value='House'>House</option>
                <option value='Private Rooms'>Private Room</option>
                <option value='Shared Room'>Shared Room</option>
                <option value='Hotel Room'>Hotel Room</option>
              </select>
            </div>
            {property_type &&
              <>
                <div className="mb-3">
                  <label
                    htmlFor="inputMaxGuests"
                    className="form-label"
                  >
                    Guests
                  </label>
                  <CounterButton count={max_guests} title='max_guests' handleNumChange={handleNumChange} minimum={1} />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="inputBedrooms"
                    className="form-label"
                  >
                    Bedrooms
                  </label>
                  <CounterButton count={bedrooms} title='bedrooms' handleNumChange={handleNumChange} minimum={0} />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="inputBeds"
                    className="form-label"
                  >
                    Beds
                  </label>
                  <CounterButton count={beds} title='beds' handleNumChange={handleNumChange} minimum={0} />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="inputBaths"
                    className="form-label"
                  >
                    Baths
                  </label>
                  <CounterButton count={baths} title='baths' handleNumChange={handleNumChange} minimum={0} />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="inputPets"
                    className="form-label"
                  >
                    Pets?
                  </label>
                  <input 
                    type="checkbox"
                    className="form-checkbox ms-5"
                    id='inputPets'
                    name='pets'
                    value={pets}
                    onChange={(e) => handleCheck(e)}
                  />
                </div>
                <div className="text-end">
                  <NextButton setFormNum={setFormNum} />
                </div>
              </>
            }
          </>
        }
        {formNum === 1 &&
          <>
            <div className="mb-3">
              <label
                htmlFor="inputBedrooms"
                className="form-label"
              >
                City
              </label>
              <InputLimit title='city' value={city} handleChange={handleChange} maximum={200}/>
            </div>
            <div className="mb-3">
              <label
                htmlFor="inputBedrooms"
                className="form-label"
              >
                Country
              </label>
              <InputLimit title='country' value={country} handleChange={handleChange} maximum={200}/>
            </div>
            <div className="d-flex justify-content-evenly align-items-end">
              <PrevButton setFormNum={setFormNum} />
              <NextButton setFormNum={setFormNum} />
            </div>
          </>
        }
        {formNum === 2 &&
          <>
            <div className="mb-3">
              <label
                htmlFor="inputBedrooms"
                className="form-label"
              >
                Title
              </label>
              <InputLimit title='title' value={title} handleChange={handleChange} maximum={70}/>
            </div>
            <div className="mb-3">
              <label
                htmlFor="inputBedrooms"
                className="form-label"
              >
                Description
              </label>
              <div className="text-end">
                <textarea
                  className="form-control"
                  id='inputDescription'
                  name='description'
                  value={description}
                  onChange={(e) => handleChange(e)}
                />
                <p>{2000 - description.length}</p>
              </div>
            </div>
            <div className="mb-3">
              <label
                htmlFor="inputBedrooms"
                className="form-label"
              >
                Price Per Night
              </label>
              <div className="text-center">
                <input 
                  className="form-range"
                  type='range'
                  name='price_per_night'
                  min={50}
                  max={99998}
                  value={price_per_night}
                  onChange={(e) => handleChange(e)}
                />
                <p>${price_per_night}</p>
              </div>
            </div>
            <div className="mb-3">
              <input
                type='file'
                id='images'
                name='images'
                accept='images/*'
                multiple
              />
            </div>
            <div className="d-flex justify-content-evenly align-items-end">
              <PrevButton setFormNum={setFormNum} />
              <button type="submit" className="btn btn-danger">Submit</button>
            </div>
          </>
        }
      </form>
    </>
  )
};

const NextButton = (props) => {
  const { setFormNum } = props;
  return (
    <button type='button' className='btn btn-danger' onClick={() => setFormNum(prevCount => prevCount + 1)}>Next</button>
  )
}

const PrevButton = (props) => {
  const { setFormNum } = props;
  return(
    <button type='button' className='btn btn-light me-auto' onClick={() => setFormNum(prevCount => prevCount - 1)}>Back</button>
  ) 
}

export default PropertyForm;