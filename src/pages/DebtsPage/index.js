import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { Container, Row, Col } from 'react-bootstrap';
import moment from 'moment';
import styles from './styles';
import NavBar from '../../components/NavBar';
import NewExpenseForm from '../../components/NewExpenseForm';
import DebtsTable from '../../components/DebtsTable';

class DebtsPage extends React.PureComponent {
  render() {
    const { expenseIds, expenseTable } = this.props;
    const expenses = expenseIds.map(id => ({
      ...expenseTable[id],
      date: moment.utc(expenseTable[id].createdAt).local().format('MM/DD/YYYY'),
      debt: expenseTable[id].paid - expenseTable[id].shouldPay,
    }));
    return (
      <React.Fragment>
        <NavBar />
        <Container fluid>
          <Row>
            <Col sm="3" style={styles.leftCol}>
              <NewExpenseForm />
            </Col>
            <Col>
              <DebtsTable expenses={expenses} />
            </Col>
          </Row>
        </Container>
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

export default compose(connect(mapStateToProps))(DebtsPage);
