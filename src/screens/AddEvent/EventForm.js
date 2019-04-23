import React from 'react';

import {
  Form, Input, Button
} from 'antd';

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
        this.props.onSubmit(values);
      }
    });
  }

  render() {
    const {
      getFieldDecorator, getFieldsError, getFieldError, isFieldTouched,
    } = this.props.form;

    // Only show error after a field is touched.
    const eventNameError = isFieldTouched('eventName') && getFieldError('eventName');
    const locationError = isFieldTouched('location') && getFieldError('location');

    return (
      <Form layout="inline" onSubmit={this.handleSubmit}>
        <Form.Item
          validateStatus={eventNameError ? 'error' : ''}
          help={eventNameError || ''}
        >
          {getFieldDecorator('eventName', {
            rules: [{ required: true, message: 'Please input an event name' }],
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
          })(
            <Input placeholder="Location" />
          )}
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            disabled={hasErrors(getFieldsError())}
          >
            Save
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedEventForm = Form.create({ name: 'horizontal_login' })(EventForm);


// const WrappedEventForm = Form.create({name: 'event_form'})(EventForm);

export default WrappedEventForm;