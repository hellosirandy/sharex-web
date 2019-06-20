import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { Table } from '@material-ui/core';
import styles from './styles';
import NavBar from '../../components/NavBar';
import { getExpense } from '../../store/actions/expense';

class DebtsPage extends React.PureComponent {
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Username</th>
            </tr>
          </thead>
          <tbody />
        </Table>
      </React.Fragment>
    );
  }
}

DebtsPage.propTypes = {
  expenseIds: PropTypes.array.isRequired,
  expenseTable: PropTypes.object.isRequired,
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
