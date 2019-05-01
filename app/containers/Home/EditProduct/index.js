import React, { Component } from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form/immutable';
import { initialize, reset } from 'redux-form';

import InputText from '../../../global/feilds/InputText';
import InputNum from '../../../global/feilds/InputNum';
import RadioBoxField from '../../../global/feilds/RadioBoxField';
import CheckBoxField from '../../../global/feilds/CheckBoxField';
import SelectBox from '../../../global/feilds/SelectBox';

import * as validation from '../../../global/utils/validation';

import { makeHomeFormSelector } from '../selectors';
import * as homeActions from '../actions';

import { pricingInfo } from '../products';

class EditProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      priceTierError: '',
    };
  }

  componentWillMount() {
    window.scrollTo(0, 0);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    if (this.props.formData.products.length === 0) {
      this.props.router.push('/');
    }
    this.props.dispatch(initialize('editProductForm', this.props.formData.formFieldValue));
  }

  onUpdate = (event, fieldValue, previousValue, fieldKey) => {
    this.props.actions.updateFieldValue({ fieldKey, fieldValue });
  }

  setIsEditable = (e, fieldValue, previousValue, fieldKey) => {
    this.props.actions.updateFieldValue({ fieldKey, fieldValue });
  }

  setPriceTier = (e, fieldValue, previousValue, fieldKey) => {
    const target = e.target.id;
    this.props.actions.updateFieldValue({ fieldKey, fieldValue: target });
  }

  onSubmit = (value, dispatch, props) => {
    if (this.props.formData.formFieldValue.priceTier !== '') {
      this.props.actions.updateProducts({ data: this.props.formData, index: this.props.location.state.index }, this.set());
    } else {
      this.setState({ priceTierError: 'Please Select Price Tier' })
    }
  }

  set = () => {
    this.props.router.push('/');
  }

  previousPage = () => {
    this.props.router.push('/');
  }

  render() {
    const ReactFragment = React.Fragment;
    const { handleSubmit } = this.props;

    return (
      <ReactFragment>
        <div className="container">
          <button type="button" className="btn" onClick={this.previousPage}>&larr; Back</button>
          <h2>Edit Product</h2>
          <form onSubmit={handleSubmit(this.onSubmit)} className="form-horizontal">

              <div className="form-group">
                <label className="control-label col-sm-2">Name</label>
                <div className="col-sm-10">
                  <Field
                    name="name"
                    component={InputText}
                    TextValue=""
                    className="form-control"
                    placeholder="Name"
                    validate={[validation.required]}
                    onChange={this.onUpdate}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="control-label col-sm-2">Weight</label>
                <div className="col-sm-10">
                  <Field
                    name="weight"
                    component={InputText}
                    TextValue=""
                    className="form-control"
                    placeholder="Weight"
                    validate={[validation.required]}
                    onChange={this.onUpdate}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="control-label col-sm-2">Availability</label>
                <div className="col-sm-10">
                  <Field
                    name="availability"
                    component={InputNum}
                    TextValue=""
                    className="form-control"
                    placeholder="Availability"
                    // validate={[validation.required]}
                    onChange={this.onUpdate}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="control-label col-sm-2">Product Url</label>
                <div className="col-sm-10">
                  <Field
                    name="productUrl"
                    component={InputText}
                    TextValue=""
                    className="form-control"
                    placeholder="Your Name"
                    floatingLabelText="This feild is required"
                    validate={[validation.required]}
                    onChange={this.onUpdate}
                  />
                </div>
              </div>
              
              <div className="row">
                <div className="col-md-3">
                  Select Price Tier
                </div>
                <div className="col-md-3">
                  <Field
                    name="priceTier"
                    dataId="budget"
                    component={RadioBoxField}
                    label="Budget"
                    className=""
                    defaultChecked={this.props.formData.formFieldValue.priceTier && this.props.formData.formFieldValue.priceTier === 'budget' ? true : false}
                    // validate={[validation.required]}
                    onChange={this.setPriceTier}
                  />
                </div>

                <div className="col-md-3">
                  <Field
                    name="priceTier"
                    dataId="premier"
                    component={RadioBoxField}
                    label="Premier"
                    className=""
                    defaultChecked={this.props.formData.formFieldValue.priceTier && this.props.formData.formFieldValue.priceTier === 'premier' ? true : false}
                    // validate={[validation.required]}
                    onChange={this.setPriceTier}
                  />
                </div>
                <span className="form-display-error">{this.state.priceTierError}</span> 
              </div>

              <div className="form-group">
                <label className="control-label col-sm-2">Price Range</label>
                <div className="col-sm-10">
                  <Field
                    name="priceRange"
                    component={SelectBox}
                    defaultOption="Select Price Range"
                    className="form-control"
                    floatingLabelText="This feild is required"
                    options={this.props.formData.formFieldValue.priceTier && this.props.formData.formFieldValue.priceTier === 'budget' ? pricingInfo.budget : pricingInfo.premier}
                    validate={[validation.required]}
                    onChange={this.onUpdate}
                  />
                </div>
              </div>

              <div className="form-group">
                <div className="col-sm-offset-2 col-sm-10">
                  <div className="checkbox">
                    <Field
                      name="isEditable"
                      component={CheckBoxField}
                      label="Is Editable"
                      className="product-detail-form__input"
                      defaultChecked={this.props.formData.formFieldValue.isEditable ? true: false}
                      validate={[validation.required]}
                      onChange={this.onUpdate}
                    />
                  </div>
                </div>
              </div>

            <div className="row">
              <div className="col-md-12">
                <button type="submit" className="btn btn-primary">Submit</button>
              </div>
            </div>
          </form>
        </div>
      </ReactFragment>
    );
  }
}

EditProduct.propTypes = {
  formData: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  //paramJSON: PropTypes.object.isRequired,
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

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'editProductForm',
})(EditProduct));
