import React from 'react';
import { Layout } from 'antd';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined
} from '@ant-design/icons';
import './index.css'

const LogisticHeader = (props) => {
    const { collapsed, headerEvent } = props;

    const handleClickEvent = (collapsed) => {
        headerEvent(!collapsed);
    }

    return (
        <Layout.Header className="site-layout-background">
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                className: 'trigger',
                onClick: () => handleClickEvent(collapsed)
            })}
        </Layout.Header>
    )
}

export default LogisticHeader;