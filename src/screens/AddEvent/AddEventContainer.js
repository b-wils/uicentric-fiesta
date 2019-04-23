import React, {Component} from 'react';
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withFirebase } from 'react-redux-firebase'

import EventForm from './EventForm'

class AddEventContainer extends Component {

	static contextTypes = {
		store: PropTypes.object.isRequired
	}

	render() {
		return (
			<EventForm onSubmit={this.addEvent.bind(this)}/>
			)
	}

	addEvent(values) {
		const { firestore } = this.context.store
		firestore.add({collection: 'events'}, values)
	}
}

const mapStateToProps = (state, ownProps = {}) => {
  return {};
}

export default compose(
  	withFirebase, // or firebaseConnect()
	connect(mapStateToProps)
)(AddEventContainer)
