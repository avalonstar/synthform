import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withFirestore } from 'react-firestore';

import { madnessNotifier } from 'actions/special/madness';
import * as selectors from './selectors';

const propTypes = {
  children: PropTypes.func.isRequired,
  firestore: PropTypes.object.isRequired, // eslint-disable-line
  notifierPool: PropTypes.arrayOf(PropTypes.object).isRequired,
  addEventToNotifier: PropTypes.func.isRequired,
  deleteEventFromNotifier: PropTypes.func.isRequired
};

class MadnessProvider extends Component {
  state = {
    bits: {},
    data: [],
    snapshot: null
  };

  componentDidMount() {
    const collection = this.props.firestore
      .collection('specials')
      .doc('madness');

    collection
      .collection('events')
      .orderBy('timestamp', 'desc')
      .limit(20)
      .onSnapshot(snapshot => this.setData(snapshot));

    collection
      .collection('totals')
      .onSnapshot(snapshot => this.setBits(snapshot));
  }

  onComplete = () => {
    this.props.deleteEventFromNotifier();
  };

  setBits = snapshot => {
    const totals = {};
    snapshot.docs.forEach(doc => {
      totals[doc.id] = doc.data().bits;
    });
    this.setState({ bits: totals });
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
        if (change.type === 'added') {
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

MadnessProvider.propTypes = propTypes;

const mapStateToProps = state => ({
  notifierPool: selectors.getMadnessNotifications(state)
});

const mapDispatchToProps = dispatch => ({
  addEventToNotifier: event => dispatch(madnessNotifier.add(event)),
  deleteEventFromNotifier: () => dispatch(madnessNotifier.delete())
});

export default withFirestore(
  connect(mapStateToProps, mapDispatchToProps)(MadnessProvider)
);
