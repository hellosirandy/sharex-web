import React from 'react';
import PropTypes from 'prop-types';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import { compose } from 'recompose';
import styles from './styles';

class NewExpenseForm extends React.PureComponent {
  render() {
    return (
      <div style={styles.container}>
        <h3 style={styles.heading}>
          New Expense
        </h3>
        <InputGroup className="mb-3">
          <FormControl
            placeholder="Title"
          // onChange={this.handleInputChange('email')}
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <FormControl
            placeholder="Amount"
          // onChange={this.handleInputChange('email')}
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <FormControl
            placeholder="You paid"
          // onChange={this.handleInputChange('email')}
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <FormControl
            placeholder="You should pay"
          // onChange={this.handleInputChange('email')}
          />
        </InputGroup>
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
