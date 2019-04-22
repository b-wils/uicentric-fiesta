import React from 'react';
import { Layout } from 'antd';
import styled from 'styled-components'

import "antd/dist/antd.css";

import EventListContainer from './screens/EventList/EventListContainer'

const {
  Header, Footer, Sider, Content,
} = Layout;

function App() {
  return (

    <Layout>
      <MyHeader>
        UICentric Fiesta Events
      </MyHeader>
      <Layout>
        <Sider>Sider</Sider>
        <Content>
          <EventListContainer />
        </Content>
      </Layout>
    </Layout>

  );
}


const MyHeader = styled(Header) `
  color: white;
`

export default App;
