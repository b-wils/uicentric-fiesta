import React from "react";
import { Layout, Menu } from "antd";
import styled from "styled-components";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import "antd/dist/antd.css";

import EventListContainer from "./screens/EventList/EventListContainer";
import AddEventContainer from "./screens/Event/AddEventContainer";
import EditEventContainer from "./screens/Event/EditEventContainer";

const { Header, Sider, Content } = Layout;

function App() {
  return (
    <Router>
      <Layout>
        <Header>
          <SiteTitle> UICentric Fiesta Event Manager </SiteTitle>
        </Header>
        <Layout>
          <MySider>
            <Menu theme="dark">
              <Menu.Item>
                <Link to="/">Event List</Link>
              </Menu.Item>
              <Menu.Item>
                <Link to="/addevent">Add Event</Link>
              </Menu.Item>
            </Menu>
          </MySider>
          <MyContent>
            <Route path="/" exact component={EventListContainer} />
            <Route path="/addevent" exact component={AddEventContainer} />
            <Route
              path="/event/:eventId"
              exact
              component={EditEventContainer}
            />
          </MyContent>
        </Layout>
      </Layout>
    </Router>
  );
}

const SiteTitle = styled.h1`
  color: white;
`;

const MySider = styled(Sider)`
  height: 100vh;
`;

const MyContent = styled(Content)`
  padding: 20px;
`;

export default App;
