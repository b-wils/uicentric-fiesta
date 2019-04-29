import React from "react";
import { Table, Divider } from "antd";
import { Link } from "react-router-dom";
import moment from "moment";
import styled from "styled-components";

const { Column } = Table;

const DATE_FORMAT = "MMM Do, YYYY";

const EventListDisplay = ({ eventList, onDelete }) => {
  // TODO the antd sorter functions don't handle undefined values well
  // Ideally we could have a sorter for each direction and guarantee undefined values at the end

  return (
    <div>
      <h1> Fiesta Events </h1>
      <Table dataSource={eventList} rowKey={"id"}>
        <Column
          title="Name"
          dataIndex="name"
          key="name"
          sorter={(a, b) =>
            ("" + a.name.toLowerCase()).localeCompare(b.name.toLowerCase())
          }
        />
        <Column
          title="Location"
          dataIndex="location"
          key="location"
          sorter={(a, b) =>
            ("" + a.location.toLowerCase()).localeCompare(
              b.location.toLowerCase()
            )
          }
        />

        <Column
          title="Price"
          dataIndex="price"
          key="price"
          sorter={(a, b) => (b.price ? b.price : 0) - (a.price ? a.price : 0)}
        />

        <Column
          title="Date"
          key="date"
          render={(text, record) => (
            <span>
              {record.date
                ? moment(record.date.toDate()).format(DATE_FORMAT)
                : undefined}
            </span>
          )}
          sorter={(a, b) =>
            (b.date ? b.date.toDate() : 0) - (a.date ? a.date.toDate() : 0)
          }
        />

        <Column
          title="Actions"
          key="action"
          render={(text, record) => (
            <ActionCell event={record} onDelete={onDelete} />
          )}
        />
      </Table>
    </div>
  );
};

const ActionCell = ({ event, onDelete }) => {
  return (
    <span>
      <Link to={`/event/${event.id}`}>Edit</Link>
      <Divider type="vertical" />
      <FakeLink onClick={() => onDelete(event.id)}>Delete</FakeLink>
    </span>
  );
};

const FakeLink = styled.span`
  cursor: pointer;
  color: #1890ff;
`;

export default EventListDisplay;
