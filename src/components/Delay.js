import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

const propTypes = {
  initial: PropTypes.number,
  children: React.PropTypes.node.isRequired
};

const defaultProps = {
  period: 0
};

class Delay extends Component {
  state = {
    value: this.props.initial
  };

  componentDidMount() {
    this.refresh(this.props);
  }

  componentWillReceiveProps(next) {
    this.refresh(next);
  }

  refresh(props) {
    let { value, period } = props;
    setTimeout(
      () =>
        this.setState({
          value
        }),
      period
    );
  }

  render() {
    return this.props.children(this.state.value);
  }
}

Delay.propTypes = propTypes;
Delay.defaultProps = defaultProps;

export default Delay;
