import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';

const propTypes = {
  id: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  emoteOnly: PropTypes.boolean,
  message: PropTypes.string,
  messageType: PropTypes.string
};

const defaultProps = {
  emoteOnly: false,
  message: '',
  messageType: 'chat'
};

class Message extends Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.id !== this.props.id;
  }

  render() {
    return (
      <Wrapper type={this.props.messageType}>
        <Actor>{this.props.displayName}</Actor>
        <Text
          dangerouslySetInnerHTML={{ __html: this.props.message }}
          emoteOnly={this.props.emoteOnly}
        />
      </Wrapper>
    );
  }
}

Message.propTypes = propTypes;
Message.defaultProps = defaultProps;

const Wrapper = styled.li`
  padding: 12px;
`;

const Actor = styled.div`
  color: #fff;
  font-family: ${props => props.theme.din};
`;

const Text = styled.div`
  color: #fff;
  font-family: ${props => props.theme.whitney};
  line-height: 24px;

  img {
    margin: -0.5rem 0;
    width: ${props => (props.emoteOnly ? 32 : 28)}px;

    vertical-align: middle;
  }
`;

export default Message;

// badges:{broadcaster: "1", partner: "1", subscriber: "24"}
// badgesRaw:"broadcaster/1,subscriber/24,partner/1"
// color:"#00B1CC"
// displayName:"Avalonstar"
// emoteOnly:true
// mod:false
// roomId:"38981465"
// subscriber:true
// timestamp:1528055327811
// tmiSentTs:"1528055327811"
// turbo:false
// userId:"38981465"
// username:"avalonstar"
