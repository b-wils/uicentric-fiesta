import React from 'react';
import { Table, Divider, } from 'antd';
import { Link } from "react-router-dom";

const { Column } = Table;

const EventListDisplay = ({eventList, onDelete}) => {
  return (
  	  	<div>
  	  		<h1> Fiesta Events </h1>
			<Table dataSource={eventList}  rowKey={'id'}>
				 <Column
			      title="Name"
			      dataIndex="name"
			      key="name"
			      sorter={(a,b) => ('' + a.name.toLowerCase()).localeCompare(b.name.toLowerCase()) }
			    />
				 <Column
			      title="Location"
			      dataIndex="location"
			      key="location"
			      sorter={(a,b) => ('' + a.name.toLowerCase()).localeCompare(b.name.toLowerCase()) }
			    />
				 <Column
			      title="Actions"
			      key="action"
			      render={(text,record) => <ActionCell event={record} onDelete={onDelete}/>}
			    />
			</Table>
	    </div>
    )
}

const ActionCell = ({event, onDelete}) => {
	return (
	    <span>
	      <Link to={`/event/${event.id}`}>Edit</Link>
	      <Divider type="vertical" />
	      <span onClick={() => onDelete(event.id)}>Delete</span>
	    </span>
	)
}

export default EventListDisplay;