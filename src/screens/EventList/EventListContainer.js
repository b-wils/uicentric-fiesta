import React, {Component} from 'react';
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withFirebase } from 'react-redux-firebase'

import EventListDisplay from './EventListDisplay'
import {getVisibleEvents} from '../../redux/eventSelectors'

class EventsListContainer extends Component {

	static contextTypes = {
		store: PropTypes.object.isRequired
	}

	componentDidMount () {
		const { firestore } = this.context.store
		firestore.get('events')
	}

	render() {
		return (
			<EventListDisplay eventList={this.props.events}/>
			)
	}
}


const mapStateToProps = (state, ownProps) => {
	return {
		events: getVisibleEvents(state)
	};
}

export default compose(
  	withFirebase, // or firebaseConnect()
	connect(mapStateToProps)
)(EventsListContainer)