import { useState } from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined, } from '@ant-design/icons';
import { Button, Layout, theme } from 'antd';
import { useLocation } from 'react-router-dom';
import MainMenu from '../utils/MainMenu';

const { Header, Sider, Content } = Layout;

const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
    const [collapsed, setCollapsed] = useState(false);
    const location = useLocation(); // 1 -Get current location
    const { token: { colorBgContainer, borderRadiusLG }, } = theme.useToken();

    // 2 - Dynamically set the selected menu key based on current URL path
    let selectedKey = '';
    if (location.pathname === '/') {
        selectedKey = '1';
    } else if (location.pathname === '/all-products') {
        selectedKey = '2';
    } else if (location.pathname === '/add-products') {
        selectedKey = '3';
    } else if (location.pathname === '/order-sheet') {
        selectedKey = '4';
    } else if (location.pathname === '/summary') {
        selectedKey = '5';
    }

    return (
        <Layout>
            <Sider
                trigger={null}
                collapsible collapsed={collapsed}
                style={{ height: '100vh' }} // adjust height & padding
            >
                <div className="demo-logo-vertical" />
                {/* logo */}
                <div>
                    <h2 className='logo'>
                        <UserOutlined />{!collapsed && <h6>Ibrahim</h6>}
                    </h2>
                </div>
                {/* Main Menu */}
                <MainMenu selectedKey={selectedKey} />
            </Sider>
            <Layout>
                <Header style={{ padding: 0, background: colorBgContainer }}>
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />
                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    {children}
                </Content>
            </Layout>
        </Layout>
    );
};

export default DefaultLayout;