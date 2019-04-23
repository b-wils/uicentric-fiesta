import React from 'react';
import { Table, Divider } from 'antd';
import { Link } from "react-router-dom";

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
	{
	  title: 'Action',
	  key: 'action',
	  render: (text, record) => (
	    <span>
	      <Link to={`/event/${record.id}`}>Edit</Link>
	      <Divider type="vertical" />
	      <a>Delete</a>
	    </span>
	  ),
	}
]

const EventListDisplay = ({eventList}) => {
  return (
      <Table dataSource={eventList} columns={columns} rowKey={'id'}>

      </Table>
    )
}


export default EventListDisplay;