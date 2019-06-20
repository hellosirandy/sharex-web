import React from 'react';
import PropTypes from 'prop-types';
import { Form, FormControl, Button } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { compose } from 'recompose';
import styles from './styles';

class NewExpenseForm extends React.PureComponent {
  handleDateChange = (event) => {
    console.log(event);
  };
  render() {
    return (
      <div style={styles.container}>
        <h4 style={styles.heading}>
          New Expense
        </h4>
        <Form.Group className="mb-3">
          <FormControl
            placeholder="Title"
          // onChange={this.handleInputChange('email')}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <FormControl
            placeholder="Total"
            type="number"
          // onChange={this.handleInputChange('email')}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <FormControl
            placeholder="You paid"
            type="number"
          // onChange={this.handleInputChange('email')}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <FormControl
            placeholder="You should pay"
            type="number"
          // onChange={this.handleInputChange('email')}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <FormControl
            placeholder="Category"
          // onChange={this.handleInputChange('email')}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <DatePicker
            style={{ width: '100%' }}
            customInput={
              <FormControl
                placeholder="Category"
              />
            }
            onChange={this.handleDateChange}
            placeholderText="Date"
          />
        </Form.Group>
        <Button variant="primary" block type="submit">
          Submit
        </Button>
      </div>
    );
  }
}

NewExpenseForm.propTypes = {
};

export default compose()(NewExpenseForm);
