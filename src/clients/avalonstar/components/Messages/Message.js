import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';

const propTypes = {
  id: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  emoteOnly: PropTypes.bool,
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
        <Text
          dangerouslySetInnerHTML={{ __html: this.props.rawMessage }}
          emoteOnly={this.props.emoteOnly}
        />
        <Actor>{this.props.displayName}</Actor>
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
  font-size: 14px;
  font-weight: 700;
  padding: 6px 12px;
`;

const Text = styled.div`
  color: #fff;
  font-family: ${props => props.theme.din};
  line-height: 24px;
  padding: 10px 12px;

  box-shadow: 0 0 0 1px #fff;
  border-radius: 12px;

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
