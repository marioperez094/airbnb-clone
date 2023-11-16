import React from 'react';
import Layout from '@src/layout';
import LoadingRing from '../loadingRing'
import { safeCredentialsFormData, handleErrors } from '@utils/fetchHelper';

import './update_properties.scss';
import PropertyForm from '@src/newProperty/propertyForm';

class UpdateProperties extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      property: {},
      loading: false,
    }
  }
  componentDidMount() {
    fetch(`/api/properties/${this.props.property_id}`)
      .then(handleErrors)
      .then(data => {
        console.log(data)
        this.setState({
          property: data.property,
          loading: false,
        })
      })

    fetch('/api/authenticated')
      .then(handleErrors)
      .then(data => {
        if (data.authenticated) {
          this.setState({ username: data.username })
        }
      })
  }

  handleChange = (e) => {
    this.setState({
      property: {
        ...this.state.property,
        [e.target.name]: e.target.value
      }
    })
    console.log(this.state.property)
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
    

    fetch(`/api/properties/${this.props.property_id}`, safeCredentialsFormData({
      method: 'PUT',
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
    const { username, property, loading } = this.state;
    if (loading) {
      return (
        <div className='text-center'>
          <LoadingRing />
        </div>
      );
    };

    return (
      <Layout username={username}>
        <PropertyForm 
              property={property} 
              submitProperty={this.submitProperty} 
              handleChange={this.handleChange}
              handleNumChange={this.handleNumChange}
              handleCheck={this.handleCheck}
            />
      </Layout>
    )
  }
}

export default UpdateProperties;