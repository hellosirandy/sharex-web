import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import { compose } from 'recompose';
import { PieChart, Pie, Tooltip, Cell, Label } from 'recharts';
import ChartWrapper from '../../components/ChartWrapper';
import { colorTable } from '../../theme';

class HomePage extends React.PureComponent {
  constructor(props) {
    super(props);
    let totalExpense = {};
    let yourExpense = {};
    let partnersExpense = {};
    let total = 0;
    let yourTotal = 0;
    let partnersTotal = 0;
    props.expenseIds.forEach((id) => {
      const expense = props.expenseTable[id];
      total += expense.total;
      if (totalExpense[expense.category]) {
        totalExpense[expense.category] += expense.total;
      } else {
        totalExpense[expense.category] = expense.total;
      }
      yourTotal += expense.shouldPay;
      if (yourExpense[expense.category]) {
        yourExpense[expense.category] += expense.shouldPay;
      } else {
        yourExpense[expense.category] = expense.shouldPay;
      }
      partnersTotal += (expense.total - expense.shouldPay);
      if (partnersExpense[expense.category]) {
        partnersExpense[expense.category] += (expense.total - expense.shouldPay);
      } else {
        partnersExpense[expense.category] = (expense.total - expense.shouldPay);
      }
    });
    totalExpense = Object.keys(totalExpense).map(key => ({
      name: key,
      value: totalExpense[key],
    }));
    yourExpense = Object.keys(yourExpense).map(key => ({
      name: key,
      value: yourExpense[key],
    }));
    partnersExpense = Object.keys(partnersExpense).map(key => ({
      name: key,
      value: partnersExpense[key],
    }));
    this.state = {
      totalExpense: {
        breakdown: totalExpense,
        sum: total,
      },
      yourExpense: {
        breakdown: yourExpense,
        sum: yourTotal,
      },
      partnersExpense: {
        breakdown: partnersExpense,
        sum: partnersTotal,
      },
    };
  }

  createPie = (breakdown, sum, title) => {
    return (
      <ChartWrapper title={title}>
        {((containerWidth) => {
          return (
            <PieChart width={100} height={100}>
              <Pie
                data={breakdown}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={containerWidth / 2}
                innerRadius={containerWidth / 2.5}
                fill="#8884d8"
                paddingAngle={3}
              >
                <Label style={{ fontSize: 30 }} value={`$${sum.toFixed(3)}`} position="center" />
                {
                  breakdown.map(entry =>
                    <Cell key={entry.name} fill={colorTable[entry.name]} />)
                }
              </Pie>
              <Tooltip />
            </PieChart>
          );
        })}
      </ChartWrapper>
    );
  }

  render() {
    const {
      totalExpense, yourExpense, partnersExpense,
    } = this.state;
    return (
      <Row>
        <Col sm="3">
          {this.createPie(totalExpense.breakdown, totalExpense.sum, 'Total Expense')}
        </Col>
        <Col sm="3">
          {this.createPie(yourExpense.breakdown, yourExpense.sum, `${this.props.couple.you.name}'s Expense`)}
        </Col>
        <Col sm="3">
          {this.createPie(partnersExpense.breakdown, partnersExpense.sum, `${this.props.couple.partner.name}'s Expense`)}
        </Col>
      </Row>
    );
  }
}

HomePage.propTypes = {
  expenseIds: PropTypes.array.isRequired,
  expenseTable: PropTypes.object.isRequired,
  couple: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    expenseIds: state.expense.expenseIds,
    expenseTable: state.expense.expenseTable,
    couple: state.couple.couple,
  };
};

export default compose(connect(mapStateToProps))(HomePage);
