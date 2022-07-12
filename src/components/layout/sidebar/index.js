import React, { useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import {
    HomeOutlined,
    ProjectOutlined,
    TeamOutlined,
    ForkOutlined,
    EllipsisOutlined
} from '@ant-design/icons';
import { Layout, Menu, Button, Drawer, Space, List, Typography } from 'antd';
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
    const [visible, setVisible] = useState(false);

    const currentKey = menu.find(_item => location.pathname === _item.path)?.key;
    const { collapsed } = props;


    const showDrawer = () => {
        setVisible(true);
    };

    const onClose = () => {
        setVisible(false);
    };


    return (
        <Layout.Sider trigger={null} collapsible collapsed={collapsed}>
            <div className="logo" />
            <Menu
                className='logistic-sidebar'
                theme='dark'
                mode="inline"
                defaultSelectedKeys={[currentKey ? currentKey : '5']}
                selectedKeys={currentKey ? currentKey : '5'}
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


                <Menu.Item key="5">
                    <span onClick={showDrawer}>
                        <EllipsisOutlined />
                        <span className="sidebar-text">More</span>
                    </span>
                </Menu.Item>
            </Menu>

            <Drawer
                title="More..."
                placement={'left'}
                closable={false}
                onClose={onClose}
                visible={visible}
                key={'left, Button, Drawer'}
                extra={
                    <Space>
                        <Button onClick={onClose}>Back</Button>
                    </Space>
                }
            >
                <List>
                    <List.Item> <Link to='/samplePage' onClick={onClose}>Page 1</Link></List.Item>
                    <List.Item> <Link to='/samplePage' onClick={onClose}>Page 2</Link></List.Item>
                    <List.Item> <Link to='/samplePage' onClick={onClose}>Page 3</Link></List.Item>
                    <List.Item> <Link to='/samplePage' onClick={onClose}>Page 4</Link></List.Item>
                </List>

            </Drawer>


        </Layout.Sider>
    );
};

export default LogisticSidebar;