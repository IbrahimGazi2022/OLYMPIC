import { BarsOutlined, FormOutlined, HomeOutlined, PlusSquareFilled, ProductFilled } from '@ant-design/icons';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';

const MainMenu = ({ selectedKey }: { selectedKey: string }) => {
    return (
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
                    label: <Link to="/all-products">Product Stock</Link>,
                },
                {
                    key: '3',
                    icon: <PlusSquareFilled />,
                    label: <Link to="/add-products">Add Product</Link>,
                },
                {
                    key: '4',
                    icon: <FormOutlined />,
                    label: <Link to="/order-sheet">Order Sheet</Link>,
                },
                {
                    key: '5',
                    icon: <BarsOutlined />,
                    label: <Link to="/summary">Summary</Link>,
                },

            ]}
        />
    )
}

export default MainMenu
