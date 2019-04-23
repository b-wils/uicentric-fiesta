import React, {Component} from 'react';

import EventForm from './EventForm'

class AddEventContainer extends Component {
	render() {
		return (
			<EventForm onSubmit={this.addEvent}/>
			)
	}

	addEvent(values) {
		console.log(values)
	}
}

export default AddEventContainer