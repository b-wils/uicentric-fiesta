import React, {Component} from 'react';
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withFirebase } from 'react-redux-firebase'

import EventForm from './EventForm'

class AddEventContainer extends Component {

	state = {
		submitMessage: "",
		submitDisabled: true,
		submitProcessing: false
	}

	static contextTypes = {
		store: PropTypes.object.isRequired
	}

	render() {

		var {submitMessage} = this.state;

		return (
			<div>
				<h1> Add a new event </h1>
				<EventForm onSubmit={this.addEvent.bind(this)} 
						   onValueChange={this.onValueChange.bind(this)}
						   submitDisabled={this.state.submitDisabled}
						   submitProcessing={this.state.submitProcessing} />

				{submitMessage && <span> {submitMessage} </span>}
			</div>
			)
	}


	// TODO Does it make sense to abstract this logic into the form?

	addEvent(values) {

		const { firestore } = this.context.store

		this.setState({
				submitProcessing:true,
				submitDisabled: true
			})

		firestore.add({collection: 'events'}, values)
			.then(()=>{

				// TODO What should our UX be after we add an event?
				// 1. Stay on add page and leave fields intact; good for bulk add (current)
				// 2. Stay on add page and clear fields
				// 3. Navigate to the edit page for created event

				this.setState({
						submitMessage: "Event added!", 
						submitDisabled:true,
						submitProcessing: false
					})
			})
			.catch((msg) => {
				// TODO should we disable our Submit button on error
				console.error(msg);
					this.setState({
						submitMessage: "Failed to add event", 
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

const mapStateToProps = (state, ownProps = {}) => {
  return {};
}

export default compose(
  	withFirebase, // or firebaseConnect()
	connect(mapStateToProps)
)(AddEventContainer)
