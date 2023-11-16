import React from 'react';
import Layout from '@src/layout';
import LoadingRing from '../loadingRing'
import { safeCredentials, handleErrors } from '@utils/fetchHelper';

import './my_properties.scss';
import BookingHistory from './bookingHistory';

class MyProperties extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
      username: '',
      properties: [],
      loading: true,
      total_pages: null,
      next_page: null,
    }
  }

  componentDidMount() {
    fetch('/api/authenticated')
      .then(handleErrors)
      .then(data => {
        this.setState({
          username: data.username,
          authenticated: data.authenticated,
        })
        this.loadProperties(data.username)
      })
  }

  loadProperties(user) {
    fetch(`/api/properties/${user}/user`)
      .then(handleErrors)
      .then(data => {
        console.log(data)
        this.setState({
          properties: data.properties,
          total_pages: data.total_pages,
          next_page: data.next_page,
          loading: false,
        })
      })
  }

  deleteProperty = (id) => {
    this.setState({ loading: true })
    fetch(`/api/properties/${id}`, safeCredentials({
      method: 'DELETE',
    }))
      .then(handleErrors)
      .then(res => {
        if (res.success) {
          this.loadProperties(this.state.username)
        }
      })
      .then(this.setState({ loading: false }))
  }

  loadMore = () => {
    if (this.state.next_page === null) {
      return;
    }
    this.setState({ loading: true });
    fetch(`/api/properties?page=${this.state.next_page}`)
      .then(handleErrors)
      .then(data => {
        this.setState({
          properties: this.state.properties.concat(data.properties),
          total_pages: data.total_pages,
          next_page: data.next_page,
          loading: false,
        })
      })
  }

  render() {
    const { authenticated, username, properties, next_page, addProperty, loading, property } = this.state;
    if (!authenticated) {
      return (
        <div className="border p-4 mb-4">
          Please <a href={`/login?redirect_url=${window.location.pathname}`}>log in</a> to make add your home.
        </div>
      );
    };


    if (loading) {
      return (
        <div className='text-center'>
          <LoadingRing />
        </div>
      );
    };

    return (
      <Layout>
        <div className='container pt-4'>
          <h4 className='mb-1'>Your properties</h4>
            <a 
              className='btn btn-warning mb-2'
              href='/new-property'
            >
              Add a new property!
            </a>
            <div className='row'>
              {properties.map(property => {
                return (
                  <React.Fragment key={property.id}>
                    <div className="col-6 col-lg-4 mb-4 property">
                      <a href={`/property/${property.id}/update`} className="text-body text-decoration-none">
                        <div className="property-image mb-1 rounded" style={{ backgroundImage: `url(${property.images[0].image_url})  ` }}>
                          <div>Edit</div>
                        </div>
                      </a>
                      <button className='btn btn-danger w-100' onClick={() => this.deleteProperty(property.id)}>Delete</button>
                      <p className="text-uppercase mb-0 text-secondary"><small><b>{property.city}</b></small></p>
                      <h6 className="mb-0">{property.title}</h6>
                      <p className="mb-0"><small>${property.price_per_night} USD/night</small></p>
                    </div>
                    <BookingHistory property_id={property.id} />
                    </React.Fragment>
                  )
                })}
                {(loading || next_page === null) ||
                  <div className="text-center">
                    <button
                      className="btn btn-light mb-4"
                      onClick={this.loadMore}
                    >load more</button>
                  </div>
                }
              </div>
            </div>
        </Layout>
      )
    }
  }

export default MyProperties;