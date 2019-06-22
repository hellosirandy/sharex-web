import React from 'react';
import { compose } from 'recompose';
import { Button, ButtonToolbar } from 'react-bootstrap';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';

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
  }
  handleRowSelected = (row) => {
    this.setState({ selected: row.id });
  }
  handleDeleteClick = () => {
    console.log(this.state.selected);
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
          <Button className="mr-2" variant="danger" size="sm" onClick={this.handleDeleteClick}>Delete</Button>
        </ButtonToolbar>
        <BootstrapTable keyField="id" columns={columns} data={this.props.expenses} selectRow={selectRow} />
      </React.Fragment>
    );
  }
}

DebtsTable.propTypes = {
};

export default compose()(DebtsTable);
