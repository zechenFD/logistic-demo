import { Link } from "react-router-dom";
import {
    ProjectOutlined,
    TeamOutlined,
    ForkOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import React from 'react';
import './index.css';

const LogisticSidebar = (props) => {
    const { collapsed } = props;

    return (
        <Layout.Sider trigger={null} collapsible collapsed={collapsed}>
            <div className="logo" />
            <Menu
                className='logistic-sidebar'
                theme='dark'
                mode="inline"
                defaultSelectedKeys={['1']}
            >
                <Menu.Item key="1">
                    <Link to='/'>
                        <ProjectOutlined />
                        Home
                    </Link>
                </Menu.Item>
                <Menu.Item key="2">
                    <Link to='/scheduling'>
                        <ProjectOutlined />
                        Scheduling
                    </Link>
                </Menu.Item>
                <Menu.Item key="3">
                    <Link to='/operations'>
                        <TeamOutlined />
                        Operations
                    </Link>
                </Menu.Item>
                <Menu.Item key="4">
                    <Link to='/routing'>
                        <ForkOutlined />
                        Routing
                    </Link>
                </Menu.Item>
            </Menu>


        </Layout.Sider>
    );
};

export default LogisticSidebar;