import React from 'react';
import { Layout, Menu } from 'antd';
import styled from 'styled-components'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import "antd/dist/antd.css";

import EventListContainer from './screens/EventList/EventListContainer'
import AddEventContainer from './screens/Event/AddEventContainer'
import EditEventContainer from './screens/Event/EditEventContainer'

const {
  Header, Sider, Content,
} = Layout;

function App() {
  return (
    <Router>
      <Layout>
        <MyHeader>
          UICentric Fiesta Events
        </MyHeader>
        <Layout>
          <Sider>
            <Menu theme='dark'>
            
              <Menu.Item>
                <Link to='/'>Event List</Link>
              </Menu.Item>
              <Menu.Item>
                <Link to='/addevent'>Add Event</Link>
              </Menu.Item>
            </Menu>
          </Sider>
          <Content>
            
              <Route path="/" exact component={EventListContainer} />
              <Route path="/addevent" exact component={AddEventContainer} />
              <Route path="/event/:eventId" exact component={EditEventContainer} />
            
          </Content>
        </Layout>
      </Layout>
    </Router>

  );
}

const MyHeader = styled(Header) `
  color: white;
`

export default App;
