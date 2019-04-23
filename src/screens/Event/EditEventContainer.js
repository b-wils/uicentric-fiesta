import React, {Component} from 'react';
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withFirebase, isLoaded, isEmpty } from 'react-redux-firebase'

import EventForm from './EventForm'
import {getEventFromId, eventObjectSelector} from '../../redux/eventSelectors'

class EditEventContainer extends Component {

	static contextTypes = {
		store: PropTypes.object.isRequired
	}

	componentDidMount () {
		const { firestore } = this.context.store
		firestore.get({collection: 'events', doc: this.props.eventId})
	}

	render() {
		if (!this.props.isLoaded) {
			return (<span> Loading... </span>)
		} else if (isEmpty(this.props.event)) {
			return (<span> Error: Couldn't find event </span>)
		} else {
			return (<EventForm onSubmit={this.updateEvent.bind(this)} event={this.props.event}/>)
		}		
	}

	updateEvent(values) {
		const { firestore } = this.context.store
		firestore.update({collection: 'events', doc: this.props.eventId}, values)
	}
}

const mapStateToProps = (state, ownProps) => {

	var id = ownProps.match.params.eventId;
	var loaded = isLoaded(eventObjectSelector(state));

	return {
		eventId: id,
		event: loaded ? getEventFromId(state, id) : undefined,
		isLoaded: loaded
	};
}

export default compose(
  	withFirebase, // or firebaseConnect()
	connect(mapStateToProps)
)(EditEventContainer)
