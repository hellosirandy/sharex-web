import React from 'react';
import PropTypes from 'prop-types';
import { Jumbotron } from 'react-bootstrap';
import { ResponsiveContainer } from 'recharts';

const ChartWrapper = ({ children, title }) => {
  return (
    <Jumbotron>
      <h4 style={{ marginBottom: 40 }}>{title}</h4>
      <ResponsiveContainer width="100%" height={300}>
        {children}
      </ResponsiveContainer>
    </Jumbotron>
  );
};

ChartWrapper.defaultProps = {
  children: null,
  title: '',
};

ChartWrapper.propTypes = {
  children: PropTypes.element,
  title: PropTypes.string,
};

export default ChartWrapper;

