import React from 'react';
import PropTypes from 'prop-types';
import { Form, FormControl, Button, Spinner, Alert } from 'react-bootstrap';
import { connect } from 'react-redux';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { compose } from 'recompose';
import styles from './styles';
import { validate, validateForm } from '../../utils/validation';
import { createExpense } from '../../store/actions/expense';
import { EXPENSE_CREATING } from '../../store/loadingTypes';

const categories = [
  'food',
  'grocery',
  'alcohol',
  'entertainment',
  'love',
  'life',
  'transit',
  'shopping',
  'coffee',
  'rent',
  'gift',
  'others',
];

const initialState = {
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
      value: 'others',
      valid: false,
      validationRules: [],
    },
  },
  errMsg: '',
  submitted: false,
};
class NewExpenseForm extends React.PureComponent {
  state = initialState;
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
  handleSubmitPress = async (event) => {
    event.preventDefault();
    this.setState({ submitted: true });
    try {
      const valid = validateForm(this.state.controls, ['title', 'total', 'paid', 'shouldPay']);
      if (valid) {
        const {
          controls: {
            title, total, paid, shouldPay, date, category,
          },
        } = this.state;
        await this.props.onCreateExpense({
          title: title.value,
          total: Number(total.value),
          paid: Number(paid.value),
          shouldPay: Number(shouldPay.value),
          date: new Date(date.value).getTime(),
          category: category.value,
        });
        this.setState(initialState);
      }
    } catch (e) {
      this.setState({ errMsg: e });
    }
  }
  render() {
    const {
      controls: {
        title, total, paid, shouldPay, category, date,
      },
      errMsg,
    } = this.state;
    const { isLoading } = this.props;
    return (
      <div style={styles.container}>
        <h4 style={styles.heading}>
          New Expense
        </h4>
        <Form.Group className="mb-3">
          {errMsg &&
            <Alert variant="danger">
              {errMsg}
            </Alert>
          }
          <Form.Label>Title</Form.Label>
          <FormControl
            placeholder="Title"
            onChange={this.handleInputChange('title')}
            value={title.value}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Total</Form.Label>
          <FormControl
            placeholder="Total"
            type="number"
            onChange={this.handleInputChange('total')}
            value={total.value}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>You paid</Form.Label>
          <FormControl
            placeholder="You paid"
            type="number"
            onChange={this.handleInputChange('paid')}
            value={paid.value}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>You should pay</Form.Label>
          <FormControl
            placeholder="You should pay"
            type="number"
            onChange={this.handleInputChange('shouldPay')}
            value={shouldPay.value}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Category</Form.Label>
          <Form.Control as="select" onChange={this.handleInputChange('category')} value={category.value}>
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </Form.Control>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Date</Form.Label>
          <DatePicker
            style={{ width: '100%' }}
            customInput={
              <FormControl />
            }
            selected={new Date(date.value)}
            value={date.value}
            onChange={event => this.handleInputChange('date')({ target: { value: moment(event).format('L') } })}
            placeholderText="Date"
          />
        </Form.Group>
        <Button variant="primary" block type="submit" onClick={this.handleSubmitPress}>
          {!isLoading && 'Submit'}
          {isLoading && <Spinner animation="border" role="status" size="sm" />}
        </Button>
      </div>
    );
  }
}

NewExpenseForm.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  onCreateExpense: PropTypes.func.isRequired,
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
