import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Col, Container } from 'react-bootstrap';
import { compose } from 'recompose';
import { PieChart, Pie, Tooltip, Cell, Label } from 'recharts';
import NavBar from '../../components/NavBar';
import ChartWrapper from '../../components/ChartWrapper';
import { colorTable } from '../../theme';

class HomePage extends React.PureComponent {
  render() {
    let data = {};
    let total = 0;
    this.props.expenseIds.forEach((id) => {
      const expense = this.props.expenseTable[id];
      total += expense.total;
      if (data[expense.category]) {
        data[expense.category] += expense.total;
      } else {
        data[expense.category] = expense.total;
      }
    });
    data = Object.keys(data).map(key => ({
      name: key,
      value: data[key],
    }));
    return (
      <React.Fragment>
        <NavBar />
        <Container style={{ margin: 0, padding: 15, maxWidth: 'unset' }}>
          <Row>
            <Col sm="4">
              <ChartWrapper title="Total expense">
                <PieChart width={300} height={300}>
                  <Pie
                    data={data}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={150}
                    innerRadius={120}
                    fill="#8884d8"
                    paddingAngle={3}
                    activeIndex="123"
                  >
                    <Label style={{ fontSize: 30 }} value={`$${total}`} position="center" />
                    {
                      data.map(entry => <Cell key={entry.name} fill={colorTable[entry.name]} />)
                    }
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ChartWrapper>
            </Col>
            <Col sm="4">
              <ChartWrapper title="Total expense">
                <PieChart width={300} height={300}>
                  <Pie
                    data={data}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={150}
                    innerRadius={120}
                    fill="#8884d8"
                    paddingAngle={3}
                    activeIndex="123"
                  >
                    <Label style={{ fontSize: 30 }} value={`$${total}`} position="center" />
                    {
                      data.map(entry => <Cell key={entry.name} fill={colorTable[entry.name]} />)
                    }
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ChartWrapper>
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}

HomePage.propTypes = {
  expenseIds: PropTypes.array.isRequired,
  expenseTable: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    expenseIds: state.expense.expenseIds,
    expenseTable: state.expense.expenseTable,
  };
};

export default compose(connect(mapStateToProps))(HomePage);
