import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { Button, ButtonToolbar, Modal } from 'react-bootstrap';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import { deleteExpense, setUpdating } from '../../store/actions/expense';
import styles from './styles';

const columns = [{
  dataField: 'id',
  text: 'Id',
  hidden: true,
}, {
  dataField: 'title',
  text: 'Title',
}, {
  dataField: 'date',
  text: 'Date',
}, {
  dataField: 'category',
  text: 'Category',
}, {
  dataField: 'debt',
  text: 'Debt',
}];

class DebtsTable extends React.PureComponent {
  state = {
    selected: '',
    showDeleteModal: false,
  }
  handleRowSelected = (row) => {
    this.setState({ selected: row.id });
  }
  handleDeleteClick = () => {
    this.setState({ showDeleteModal: true });
  }
  handleModalClose = () => {
    this.setState({ showDeleteModal: false });
  }
  handleDeleteConfirmed = async () => {
    await this.props.onDeleteExpense(this.state.selected);
    this.handleModalClose();
  }
  handleEditClick = () => {
    this.props.onSetUpdating(this.state.selected);
  }
  render() {
    const selectRow = {
      mode: 'radio',
      headerColumnStyle: { width: 50, textAlign: 'center' },
      selectColumnStyle: { width: 50, textAlign: 'center' },
      onSelect: this.handleRowSelected,
    };
    return (
      <React.Fragment>
        <ButtonToolbar style={styles.toolBar}>
          <Button disabled={!this.state.selected} className="mr-2" variant="primary" size="sm" onClick={this.handleEditClick}>Edit</Button>
          <Button disabled={!this.state.selected} className="mr-2" variant="danger" size="sm" onClick={this.handleDeleteClick}>Delete</Button>
          <div style={styles.balanceWrapper}>
            <h5 style={styles.balanceText}>Your balance is {this.props.balance}</h5>
          </div>

        </ButtonToolbar>
        <div style={styles.table}>
          <BootstrapTable striped keyField="id" columns={columns} data={this.props.expenses} selectRow={selectRow} />
        </div>
        <Modal show={this.state.showDeleteModal} onHide={this.handleModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>Watch out!</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to delete this expense?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleModalClose}>
              Cancel
            </Button>
            <Button variant="danger" onClick={this.handleDeleteConfirmed}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </React.Fragment>
    );
  }
}

DebtsTable.propTypes = {
  expenses: PropTypes.array.isRequired,
  onDeleteExpense: PropTypes.func.isRequired,
  onSetUpdating: PropTypes.func.isRequired,
  balance: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => {
  return {
    balance: state.expense.balance,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onDeleteExpense: id => dispatch(deleteExpense(id)),
    onSetUpdating: id => dispatch(setUpdating(id)),
  };
};

export default compose(connect(mapStateToProps, mapDispatchToProps))(DebtsTable);
