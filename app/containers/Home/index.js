import React, { Component } from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { reset } from 'redux-form';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import * as Products from './products';

import { makeHomeFormSelector } from './selectors';
import * as homeActions from './actions';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    if (this.props.formData.products.length === 0) {
      this.props.actions.setProducts({ data: Products.products });
    }
  }

  onEdit = (e) => {
    const name  = e.currentTarget.dataset.name;
    const index = Products.products.findIndex(x=> x.name === name);
    this.props.actions.setEditFormFields({ data: index });
    this.props.router.push({
      pathname: '/edit-product',
      state: {
        index,
      },
    });
  }

  render() {
    const ReactFragment = React.Fragment;
    
    return (
      <ReactFragment>
        <div className="container">
          <h2>List of products</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Weight</th>
                <th>Availability</th>
                <th>isEditable</th>
              </tr>
            </thead>
            <tbody>
              {
                this.props.formData.products && this.props.formData.products.map((data, index) => {
                  return (
                    <tr key={index}>
                      <td>{data.name}</td>
                      <td>{data.weight} grams</td>
                      <td>{data.availability}</td>
                      <td>{data.isEditable && <button type="button" data-name={data.name} className="btn btn-primary" onClick={this.onEdit}>Edit</button>}</td>
                    </tr>
                  )
                })
              }
              
            </tbody>
          </table>
        </div>
      </ReactFragment>
    );
  }
}

Home.propTypes = {
  formData: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  formData: makeHomeFormSelector(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    actions: bindActionCreators({ ...homeActions, reset }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
