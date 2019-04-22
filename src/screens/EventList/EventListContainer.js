import React, {Component} from 'react';

import EventListDisplay from './EventListDisplay'


const sampleData = [
	{
		name: 'Test 1',
		location: 'Austin'
	},
	{
		name: 'Test 2',
		location: 'San Antonio'
	}

]

class EventsListContainer extends Component {
	render() {
		return (
			<EventListDisplay eventList={sampleData}/>
			)
	}
}

export default EventsListContainer