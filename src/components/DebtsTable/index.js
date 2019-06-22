import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { Button, ButtonToolbar, Modal } from 'react-bootstrap';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import { deleteExpense } from '../../store/actions/expense';

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
    console.log(this.state.selected);
    this.setState({ showDeleteModal: true });
  }
  handleModalClose = () => {
    this.setState({ showDeleteModal: false });
  }
  handleDeleteConfirmed = async () => {
    await this.props.onDeleteExpense(this.state.selected);
    this.handleModalClose();
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
        <ButtonToolbar style={{ paddingTop: 10, paddingBottom: 10 }}>
          <Button className="mr-2" variant="primary" size="sm">Edit</Button>
          <Button disabled={!this.state.selected} className="mr-2" variant="danger" size="sm" onClick={this.handleDeleteClick}>Delete</Button>
        </ButtonToolbar>
        <BootstrapTable keyField="id" columns={columns} data={this.props.expenses} selectRow={selectRow} />
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
};

const mapDispatchToProps = (dispatch) => {
  return {
    onDeleteExpense: id => dispatch(deleteExpense(id)),
  };
};

export default compose(connect(null, mapDispatchToProps))(DebtsTable);
