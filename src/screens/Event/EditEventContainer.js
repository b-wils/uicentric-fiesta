import React, {Component} from 'react';
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withFirebase } from 'react-redux-firebase'

import EventForm from './EventForm'
import {getEventFromId} from '../../redux/eventSelectors'

class EditEventContainer extends Component {

	static contextTypes = {
		store: PropTypes.object.isRequired
	}

	componentDidMount () {
		const { firestore } = this.context.store
		firestore.get({collection: 'events', doc: this.props.eventId})
	}

	render() {
		if (this.props.event) {
			return (<EventForm onSubmit={this.updateEvent.bind(this)} event={this.props.event}/>)
		} else {
			return (<span> Loading... </span>)
		}		
	}

	updateEvent(values) {
		const { firestore } = this.context.store
		firestore.update({collection: 'events', doc: this.props.eventId}, values)
	}
}

const mapStateToProps = (state, ownProps) => {

	var id = ownProps.match.params.eventId;

	return {
		eventId: id,
		event: getEventFromId(state, id),
	};
}

export default compose(
  	withFirebase, // or firebaseConnect()
	connect(mapStateToProps)
)(EditEventContainer)
