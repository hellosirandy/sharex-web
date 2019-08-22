import React from 'react';
import PropTypes from 'prop-types';
import { Jumbotron } from 'react-bootstrap';
import { ResponsiveContainer } from 'recharts';

class ChartWrapper extends React.PureComponent {
  constructor(props) {
    super(props);
    this.container = React.createRef();
    this.state = {
      containerWidth: 0,
    };
  }
  componentDidMount() {
    this.setState({ containerWidth: this.container.current.offsetWidth });
  }
  render() {
    const { containerWidth } = this.state;
    return (
      <Jumbotron style={{ padding: 30 }}>
        <div ref={this.container}>
          <h4 style={{ marginBottom: 40 }}>{this.props.title}</h4>
          <ResponsiveContainer width="100%" height={containerWidth}>
            {containerWidth > 0 && this.props.children(this.state.containerWidth)}
          </ResponsiveContainer>
        </div>

      </Jumbotron>
    );
  }
}

ChartWrapper.defaultProps = {
  children: null,
  title: '',
};

ChartWrapper.propTypes = {
  children: PropTypes.func,
  title: PropTypes.string,
};

export default ChartWrapper;

