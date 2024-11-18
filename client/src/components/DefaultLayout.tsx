import { useState } from 'react';
import { HomeOutlined, MenuFoldOutlined, MenuUnfoldOutlined, PlusSquareFilled, ProductFilled, UserOutlined, } from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import { Link, useLocation } from 'react-router-dom';

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
                <Menu
                    theme="dark"
                    mode="inline"
                    selectedKeys={[selectedKey]} // 3 - Dynamically set selected key
                    items={[
                        {
                            key: '1',
                            icon: <HomeOutlined />,
                            label: <Link to="/">Home</Link>,
                        },
                        {
                            key: '2',
                            icon: <ProductFilled />,
                            label: <Link to="/all-products">Product</Link>,
                        },
                        {
                            key: '3',
                            icon: <PlusSquareFilled />,
                            label: <Link to="/all-products">Add Product</Link>,
                        },
                    ]}
                />
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