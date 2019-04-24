import React, {Component} from 'react';
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withFirebase, isLoaded } from 'react-redux-firebase'

import EventListDisplay from './EventListDisplay'
import {getVisibleEvents, eventObjectSelector} from '../../redux/eventSelectors'

class EventsListContainer extends Component {

	static contextTypes = {
		store: PropTypes.object.isRequired
	}

	componentDidMount () {
		const { firestore } = this.context.store
		firestore.get('events')
			.catch((msg) => {
				console.error(msg);
				alert('Failed to load events')
			})
	}

	render() {

		// TODO need better loading detection, will get stale results if we go from "edit event" -> "event list"

		if (!this.props.loaded) {
			return (<span> Loading... </span>)
		} else {
			return (<EventListDisplay eventList={this.props.events} onDelete={this.deleteEvent.bind(this)}/>)
		}		
	}

	deleteEvent(id) {
		// TODO I'm not sure how soon event will be removed from redux
		// Should we have more UX indicators here?
		const { firestore } = this.context.store
		firestore.delete({collection: 'events', doc:id})
			.catch((msg) => {
				console.error(msg);
				alert('Failed to delete event')
			})
	}
}


const mapStateToProps = (state, ownProps) => {
	return {
		events: getVisibleEvents(state),
		loaded: isLoaded(eventObjectSelector(state))
	};
}

export default compose(
  	withFirebase, // or firebaseConnect()
	connect(mapStateToProps)
)(EventsListContainer)