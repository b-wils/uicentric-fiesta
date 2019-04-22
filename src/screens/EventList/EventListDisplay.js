import React from 'react';

import { Table, Divider, Tag } from 'antd';

const { Column, ColumnGroup } = Table;

const columns =[
	{
		title: 'Name',
		dataIndex: 'name',
		key: 'name'
	},
	{
		title: 'Location',
		dataIndex: 'location',
		key: 'location'
	},
]

const EventListDisplay = ({eventList}) => {

	console.log(eventList)

  return (
      <Table dataSource={eventList} columns={columns}>

      </Table>
    )
}


export default EventListDisplay;