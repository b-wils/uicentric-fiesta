import React from 'react';

import { Table } from 'antd';

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
  return (
      <Table dataSource={eventList} columns={columns} rowKey={'id'}>

      </Table>
    )
}


export default EventListDisplay;