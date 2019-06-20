import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { Table } from 'react-bootstrap';
import moment from 'moment';
import styles from './styles';
import NavBar from '../../components/NavBar';
import { getExpense } from '../../store/actions/expense';

class DebtsPage extends React.PureComponent {
  constructor(props) {
    super(props);
    props.onGetExpense();
  }
  render() {
    const { expenseIds, expenseTable } = this.props;
    return (
      <React.Fragment>
        <NavBar />
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Title</th>
              <th>Time</th>
              <th>Debt</th>
            </tr>
          </thead>
          <tbody>
            {expenseIds.map((id) => {
              const expense = expenseTable[id];
              return (
                <tr key={id}>
                  <td>{expense.title}</td>
                  <td>{moment.utc(expense.date).local().format('MM/DD/YYYY')}</td>
                  <td>{expense.paid - expense.shouldPay}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </React.Fragment>
    );
  }
}

DebtsPage.propTypes = {
  expenseIds: PropTypes.array.isRequired,
  expenseTable: PropTypes.object.isRequired,
  onGetExpense: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    expenseIds: state.expense.expenseIds,
    expenseTable: state.expense.expenseTable,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetExpense: () => dispatch(getExpense()),
  };
};

export default compose(connect(mapStateToProps, mapDispatchToProps))(DebtsPage);
