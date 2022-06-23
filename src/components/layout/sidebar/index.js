import React from 'react';
import { Link, useLocation } from "react-router-dom";
import {
    HomeOutlined,
    ProjectOutlined,
    TeamOutlined,
    ForkOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import './index.less';

const menu = [{
    key: '1',
    path: '/'
}, {
    key: '2',
    path: '/scheduling'
}, {
    key: '3',
    path: '/operations'
}, {
    key: '4',
    path: '/routing'
}]

const LogisticSidebar = (props) => {
    const location = useLocation();
    const currentKey = menu.find(_item => location.pathname === _item.path).key;
    const { collapsed } = props;

    return (
        <Layout.Sider trigger={null} collapsible collapsed={collapsed}>
            <div className="logo" />
            <Menu
                className='logistic-sidebar'
                theme='dark'
                mode="inline"
                defaultSelectedKeys={[currentKey]}
            >
                <Menu.Item key="1">
                    <Link to='/'>
                        <HomeOutlined />
                        <span className="sidebar-text">Home</span>
                    </Link>
                </Menu.Item>

                <Menu.Item key="2">
                    <Link to='/scheduling'>
                        <ProjectOutlined />
                        <span className="sidebar-text">Scheduling</span>
                    </Link>
                </Menu.Item>

                <Menu.Item key="3">
                    <Link to='/operations'>
                        <TeamOutlined />
                        <span className="sidebar-text">Operations</span>
                    </Link>
                </Menu.Item>

                <Menu.Item key="4">
                    <Link to='/routing'>
                        <ForkOutlined />
                        <span className="sidebar-text">Routing</span>
                    </Link>
                </Menu.Item>
            </Menu>


        </Layout.Sider>
    );
};

export default LogisticSidebar;