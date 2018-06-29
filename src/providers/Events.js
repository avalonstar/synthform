import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withFirestore } from 'react-firestore';

import { eventNotifier } from 'actions/events';
import * as selectors from './selectors';

/* eslint-disable react/forbid-prop-types */
const propTypes = {
  children: PropTypes.func.isRequired,
  firestore: PropTypes.object.isRequired,
  notifierPool: PropTypes.array.isRequired,
  addEventToNotifier: PropTypes.func.isRequired,
  deleteEventFromNotifier: PropTypes.func.isRequired
};
/* eslint-enable react/forbid-prop-types */

class EventProvider extends Component {
  state = {
    data: [],
    snapshot: null
  };

  componentDidMount() {
    this.props.firestore
      .collection('events')
      .orderBy('timestamp', 'desc')
      .limit(20)
      .onSnapshot(snapshot => this.setData(snapshot));
  }

  onComplete = () => {
    this.props.deleteEventFromNotifier();
  };

  setData = snapshot => {
    this.addEventToNotifier(snapshot);
    this.setState({
      data: snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })),
      snapshot
    });
  };

  addEventToNotifier = snapshot => {
    if (this.state.snapshot && !this.state.snapshot.isEqual(snapshot)) {
      snapshot.docChanges().forEach(change => {
        if (change.type === 'modified') {
          this.props.addEventToNotifier(change.doc.data());
        }
      });
    }
  };

  render() {
    return this.props.children(
      this.state,
      this.props.notifierPool,
      this.onComplete
    );
  }
}

EventProvider.propTypes = propTypes;

const mapStateToProps = state => ({
  notifierPool: selectors.getNotifications(state)
});

const mapDispatchToProps = dispatch => ({
  addEventToNotifier: event => dispatch(eventNotifier.add(event)),
  deleteEventFromNotifier: () => dispatch(eventNotifier.delete())
});

export default withFirestore(
  connect(mapStateToProps, mapDispatchToProps)(EventProvider)
);
