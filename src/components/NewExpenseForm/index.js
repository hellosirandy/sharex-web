import React from 'react';
import { Form, FormControl, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { compose } from 'recompose';
import styles from './styles';
import { validate } from '../../utils/validation';
import { createExpense } from '../../store/actions/expense';
import { EXPENSE_CREATING } from '../../store/loadingTypes';

class NewExpenseForm extends React.PureComponent {
  state = {
    controls: {
      title: {
        value: '',
        valid: false,
        validationRules: ['notEmpty'],
        errMsg: 'Title cannot be empty',
      },
      total: {
        value: 0,
        valid: true,
        validationRules: ['notEmpty', 'isNumber'],
        errMsg: 'Total must be given a number',
      },
      paid: {
        value: 0,
        valid: true,
        validationRules: ['notEmpty', 'isNumber'],
        errMsg: 'Paid must be given a number',
      },
      shouldPay: {
        value: 0,
        valid: true,
        validationRules: ['notEmpty', 'isNumber'],
        errMsg: 'Should pay must be given a number',
      },
      date: {
        value: moment(new Date().getTime()).format('L'),
        valid: true,
        validationRules: [],
      },
      category: {
        value: '',
        valid: false,
        validationRules: [],
      },
    },
    submitted: false,
  }
  handleInputChange = key => ({ target: { value } }) => {
    this.setState(prevState => ({
      ...prevState,
      controls: {
        ...prevState.controls,
        [key]: {
          ...prevState.controls[key],
          value,
          valid: validate(value, prevState.controls[key].validationRules),
        },
      },
    }));
  }
  render() {
    const {
      controls: {
        title, total, paid, shouldPay, category, date,
      },
    } = this.state;
    return (
      <div style={styles.container}>
        <h4 style={styles.heading}>
          New Expense
        </h4>
        <Form.Group className="mb-3">
          <FormControl
            placeholder="Title"
            onChange={this.handleInputChange('title')}
            value={title.value}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <FormControl
            placeholder="Total"
            type="number"
            onChange={this.handleInputChange('total')}
            value={total.value}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <FormControl
            placeholder="You paid"
            type="number"
            onChange={this.handleInputChange('paid')}
            value={paid.value}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <FormControl
            placeholder="You should pay"
            type="number"
            onChange={this.handleInputChange('shouldPay')}
            value={shouldPay.value}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <FormControl
            placeholder="Category"
            onChange={this.handleInputChange('category')}
            value={category.value}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <DatePicker
            style={{ width: '100%' }}
            customInput={
              <FormControl />
            }
            selected={new Date(date.value)}
            value={date.value}
            onChange={event => this.handleInputChange('date')(moment(event).format('L'))}
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

const mapStateToProps = (state) => {
  return {
    isLoading: Boolean(state.ui.isLoading[EXPENSE_CREATING]),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onCreateExpense: options => dispatch(createExpense(options)),
  };
};

export default compose(connect(mapStateToProps, mapDispatchToProps))(NewExpenseForm);
