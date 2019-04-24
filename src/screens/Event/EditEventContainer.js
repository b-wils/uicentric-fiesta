import React, {Component} from 'react';
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withFirebase, isLoaded, isEmpty } from 'react-redux-firebase'

import EventForm from './EventForm'
import {getEventFromId, eventObjectSelector} from '../../redux/eventSelectors'

class EditEventContainer extends Component {

	state = {
		submitMessage: "",
		submitDisabled: true
	}

	static contextTypes = {
		store: PropTypes.object.isRequired
	}

	componentDidMount () {
		const { firestore } = this.context.store
		firestore.get({collection: 'events', doc: this.props.eventId})
	}

	render() {

		var {submitMessage} = this.state;

		if (!this.props.isLoaded) {
			return (<span> Loading... </span>)
		} else if (isEmpty(this.props.event)) {
			return (<span> Error: Couldn't find event </span>)
		} else {
			return (
				<div>
					<h1> Edit event </h1>
					<EventForm onSubmit={this.updateEvent.bind(this)}
							   event={this.props.event}
							   onValueChange={this.onValueChange.bind(this)}
							   submitDisabled={this.state.submitDisabled}
							   submitProcessing={this.state.submitProcessing} />
					{submitMessage && <span> {submitMessage} </span>}
				</div>
			)
		}		
	}


	// TODO Does it make sense to abstract this logic into the form?

	updateEvent(values) {

		const { firestore } = this.context.store

		this.setState({
				submitProcessing:true,
				submitDisabled: true
			})

		firestore.update({collection: 'events', doc: this.props.eventId}, values)
			.then(()=>{
				this.setState({
						submitMessage: "Event updated!", 
						submitDisabled:true,
						submitProcessing: false
					})
			})
			.catch((msg) => {
				// TODO should we disable our Submit button on error
				console.error(msg);
					this.setState({
						submitMessage: "Failed to update event", 
						submitDisabled:true,
						submitProcessing: false
					})
			})
	}

	onValueChange() {
		this.setState({
			submitDisabled: false,
			submitMessage: ""
		})
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
