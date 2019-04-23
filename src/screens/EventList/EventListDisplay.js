import React from 'react';
import { Table, Divider, } from 'antd';
import { Link } from "react-router-dom";

const { Column } = Table;

const EventListDisplay = ({eventList, onDelete}) => {
  return (
      <Table dataSource={eventList}  rowKey={'id'}>
      	 <Column
		      title="Name"
		      dataIndex="name"
		      key="name"
		    />
      	 <Column
		      title="Location"
		      dataIndex="location"
		      key="location"
		    />
      	 <Column
		      title="Actions"
		      key="action"
		      render={(text,record) => <ActionCell event={record} onDelete={onDelete}/>}
		    />
      </Table>
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