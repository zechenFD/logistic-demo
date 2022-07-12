import React, { useState } from 'react';
import { Layout, Menu, Avatar, Dropdown, Button, notification, Badge, Drawer, Space } from 'antd';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    SolutionOutlined,
    LockOutlined,
    TranslationOutlined,
    PoweroffOutlined,
    AlertOutlined,
    UserOutlined
} from '@ant-design/icons';
import './index.less'

const LogisticHeader = (props) => {
    const { collapsed, headerEvent } = props;
    const [count, setCount] = useState(3);

    const handleClickEvent = (collapsed) => {
        headerEvent(!collapsed);
    }

    const widgetMenu = () => {
        return (
            <Menu>
                <Menu.Item>
                    <SolutionOutlined className="icon" />
                    profile
                </Menu.Item>
                <Menu.Item>
                    <LockOutlined className="icon" />
                    change password
                </Menu.Item>
                <Menu.Item>
                    <TranslationOutlined className="icon" />
                    change language
                </Menu.Item>
                <Menu.Item>
                    <PoweroffOutlined className="icon" />
                    sign out
                </Menu.Item>
            </Menu>
        )
    }

    const close = () => {
        console.log(
            'Notification was closed. Either the close button was clicked or duration time elapsed.',
        );
    };

    const openNotification = () => {
        const key = `open${Date.now()}`;

        const handleConfirmEvent = (key) => {
            setCount(count - 1);
            notification.close(key);
        }
        const btn = (
            <Button type="primary" size="small" onClick={() => handleConfirmEvent(key)}>
                Confirm
            </Button>
        );

        if (count > 0) {
            notification.open({
                message: 'Notification',
                description:
                    'A function will be be called after the notification is closed (automatically after the "duration" time of manually).',
                btn,
                key,
                onClose: close,
            });
        }
    };


    return (
        <Layout.Header>
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                className: 'trigger',
                onClick: () => handleClickEvent(collapsed)
            })}
            <Menu mode="horizontal">

                <Menu.Item>
                    <span className="avatar-item" onClick={openNotification}>
                        <Badge count={count}>
                            Notification

                        </Badge>
                    </span>
                </Menu.Item>

                <Menu.Item>
                    <Dropdown overlay={widgetMenu} trigger={['click']} className='logistic-dropdown'>
                        <Avatar title='User' icon={<UserOutlined />} />
                    </Dropdown>
                </Menu.Item>

            </Menu>


        </Layout.Header>
    )
}

export default LogisticHeader;