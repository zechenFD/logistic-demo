import React, { useState } from 'react';
import { Routes, Route } from "react-router-dom";

import { Layout } from 'antd';
import LogisticSidebar from '../components/layout/sidebar';
import LogisticHeader from '../components/layout/header';
import LogisticFooter from '../components/layout/footer';
import LogisticBreadcrumb from '../components/layout/breadcrumb';

import HomePage from '../containers/homePage';
import Routing from '../containers/routing';
import Scheduling from '../containers/scheduling';
import Operations from '../containers/operations';
import EmployeesPage from '../containers/employees/index';

import 'antd/dist/antd.less';
import './App.less'


const { Content } = Layout;

const App = () => {
    const [collapsed, setCollapsed] = useState(true);
    
    const handleHeaderEvent = (collaspedStatus) => {
        setCollapsed(collaspedStatus)
    }

    return (
        <Layout>
            <LogisticSidebar collapsed={collapsed} />

            <Layout className="site-layout">
                <LogisticHeader collapsed={collapsed} headerEvent={handleHeaderEvent} />

                {/* <LogisticBreadcrumb /> */}

                <Content className="site-layout-background">
                    <Routes>
                        <Route path="/logistic-demo" exact element={<HomePage />} />
                        <Route path="/scheduling" element={<Scheduling />} />
                        <Route path="/operations" element={<Operations />} />
                        <Route path="/routing" element={<Routing />} />
                        <Route path="/employees" element={<EmployeesPage />} />
                    </Routes>

                </Content>

                <LogisticFooter />
            </Layout>
        </Layout>
    )
}

export default App;