import React from 'react';
import moment from 'moment'

import {
  Form, Input, Button, InputNumber, DatePicker
} from 'antd';

const DATE_FORMAT = 'MMM Do, YYYY'

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class EventForm extends React.Component {

  componentDidMount() {
    // To disabled submit button at the beginning.
    this.props.form.validateFields();
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {

        var encodedEvent = Object.assign({}, values)

        if (encodedEvent.date) {
            encodedEvent.date = encodedEvent.date.toDate()
        }

        this.props.onSubmit(encodedEvent);
      }
    });
  }

  render() {
    const {
      getFieldDecorator, getFieldsError, getFieldError, isFieldTouched
    } = this.props.form;

    // Only show error after a field is touched.
    const nameError = isFieldTouched('name') && getFieldError('name');
    const locationError = isFieldTouched('location') && getFieldError('location');
    const priceError = isFieldTouched('price') && getFieldError('price');
    const dateError = isFieldTouched('date') && getFieldError('date');

    return (
      <Form layout="inline" onSubmit={this.handleSubmit}>

        <Form.Item
          validateStatus={nameError ? 'error' : ''}
          help={nameError || ''}
        >
          {getFieldDecorator('name', {
            rules: [{ required: true, message: 'Please input an event name' }],
            initialValue: this.props.event ? this.props.event.name : null
          })(
            <Input placeholder="Event Name" />
          )}
        </Form.Item>

        <Form.Item
          validateStatus={locationError ? 'error' : ''}
          help={locationError || ''}
        >
          {getFieldDecorator('location', {
            rules: [{ required: true, message: 'Please add a location' }],
            initialValue: this.props.event ? this.props.event.location : null
          })(
            <Input placeholder="Location" />
          )}
        </Form.Item>

        <Form.Item
          validateStatus={priceError ? 'error' : ''}
          help={priceError || ''}
        >
          {getFieldDecorator('price', {
            rules: [{ type: 'number', message: 'Price must be a number' }],
            initialValue: this.props.event ? this.props.event.price : null
          })(
            <InputNumber prefix={<span>$</span>} placeholder="Price" />
          )}
        </Form.Item>

        <Form.Item
          validateStatus={dateError ? 'error' : ''}
          help={dateError || ''}
        >
          {getFieldDecorator('date', {
            initialValue: this.props.event && this.props.event.date ? moment(this.props.event.date.toDate()) : null
          })(
            <DatePicker format={DATE_FORMAT}/>
          )}
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            disabled={ this.props.submitDisabled || hasErrors(getFieldsError())}
          >
            Save
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedEventForm = Form.create({name: 'horizontal_login', 
                                      onValuesChange: (props, values, allFieldsValues ) => {
                                        const { onValueChange } = props;
                                        onValueChange();
                                      }
                                    })(EventForm);

export default WrappedEventForm;