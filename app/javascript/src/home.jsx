// home.jsx
import React from 'react';
import ReactDOM from 'react-dom';
import Layout from '@src/layout';
import LoadingRing from './loadingRing';
import PropertyCards from './propertyCards';
import { handleErrors } from '@utils/fetchHelper';

import './home.scss';

class Home extends React.Component {
  state = {
    username: '',
    properties: [],
    total_pages: null,
    next_page: null,
    loading: true,
  }

  componentDidMount() {
    fetch('/api/properties?page=1')
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

    fetch('/api/authenticated')
      .then(handleErrors)
      .then(data => {
        if (data.authenticated) {
          this.setState({username: data.username})
        }
      })
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
    const { properties, username, next_page, loading } = this.state;
    return (
      <Layout username={username}>
        <div className="container pt-4">
          <h4 className="mb-1">Top-rated places to stay</h4>
          <p className="text-secondary mb-3">Explore some of the best-reviewed stays in the world</p>
          <div className="row">
            {properties.map(property => {
              return (
                <PropertyCards key={property.id} property={property} link={`/property/${property.id}`} />
              )
            })}
          </div>
          {loading &&
            <div className='text-center'>
              <LoadingRing />
            </div>
          }
          {(loading || next_page === null) ||
            <div className="text-center">
              <button
                className="btn btn-light mb-4"
                onClick={this.loadMore}
              >load more</button>
            </div>
          }
        </div>
      </Layout>
    )
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Home />,
    document.body.appendChild(document.createElement('div')),
  )
})
