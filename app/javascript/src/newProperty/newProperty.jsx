import React from "react";
import Layout from '../layout';
import { safeCredentialsFormData, handleErrors } from '@utils/fetchHelper';
import PropertyForm from "./propertyForm";

class NewProperty extends React.Component{
  state = {
    authenticated: false,
    loading: true,
    property: {   
      title: '',
      description: '',
      city: '',
      country: '',
      property_type: '',
      price_per_night: 50,
      pets: false,
      max_guests: 1,
      bedrooms: 0,
      beds: 0,
      baths: 0,
    }
  }

  handleChange = (e) => {
    this.setState({
      property: {
        ...this.state.property,
        [e.target.name]: e.target.value
      }
    }, () => {console.log(this.state.property)})
  }

  handleNumChange = (name, num) => {
    this.setState({
      property: {
        ...this.state.property,
        [name]: num
      }
    }, () => {console.log(this.state.property)})
  }

  handleCheck = (e) => {
    this.setState({
      property: {
        ...this.state.property,
        [e.target.name]: e.target.checked
      }
    }, () => {console.log(this.state.property)})
  }

  submitProperty = (e) => {
    if (e) { e.preventDefault(); }
    this.setState({loading: true})

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
    } = this.state.property;


    const fileInputElement = document.querySelector('#images');

    let formData = new FormData();

    for (let i = 0; i < fileInputElement.files.length; i++) {
      formData.append('property[images][]', fileInputElement.files[i]);
    }

    formData.set('property[title]', title)
    formData.set('property[description]', description)
    formData.set('property[city]', city)
    formData.set('property[country]', country)
    formData.set('property[property_type]', property_type)
    formData.set('property[price_per_night]', price_per_night)
    formData.set('property[pets]', pets)
    formData.set('property[max_guests]', max_guests)
    formData.set('property[bedrooms]', bedrooms)
    formData.set('property[beds]', beds)
    formData.set('property[baths]', baths)
    

    fetch(`/api/properties`, safeCredentialsFormData({
      method: 'POST',
      body: formData
    }))
    .then(handleErrors)
    .then(res => {
      if (res.property) {
        window.location.assign('/') 
      }
    })
  }

  render() {

    const { property, formNum } = this.state;
    const arrayTitle = ['Property and guests'];
    return (
      <Layout>
        <h4 className='my-3 ms-5'>{arrayTitle[formNum]}</h4>
        <div className="container-fluid">
          <div className="row">
            <PropertyForm 
              property={property} 
              submitProperty={this.submitProperty} 
              handleChange={this.handleChange}
              handleNumChange={this.handleNumChange}
              handleCheck={this.handleCheck}
            />
          </div>
        </div>

      </Layout>
    )
  }
}

export default NewProperty