import axios from "axios";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";

import DefaultLayout from "../components/DefaultLayout";

// Define the type for your product data
interface Product {
    _id: string;
    name: string;
    price: number;
    size: string;
    tp: number;
    qty: number;
    return: number;
    damage: number;
}

const Summary = () => {
    // Get All Products Function
    const [productsData, setProductsData] = useState<Product[]>([]);

    const getAllProducts = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/products/all-products");
            setProductsData(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAllProducts();
    }, []);

    // Table Columns
    const columns: ColumnsType<Product> = [
        {
            title: "S/N",
            render: (_: any, __: Product, index: number) => index + 1, // Serial number column
            key: "serial",
            width: 50,
            align: "center",
        },
        {
            title: "Product Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Pack Size",
            dataIndex: "size",
            key: "size",
        },
        {
            title: "Order Qty",
            dataIndex: "qty",
            key: "qty",
        },
        {
            title: "Return Qty",
            dataIndex: 'return',
            key: "return",
        },
        {
            title: "Damage Qty",
            key: "damage",
        },
        {
            title: "Sales Qty",
            key: "sales",
        },
        {
            title: "TP",
            dataIndex: "tp",
            key: "tp",
        },
        {
            title: "Total Value",
            key: "totalValue",
        },
    ];

    return (
        <DefaultLayout>
            <h1>All Products List</h1>
            <Table
                dataSource={productsData}
                columns={columns}
                pagination={false}
                rowKey={(record) => record._id}
                footer={() => (
                    <div className="table-footer">
                        Grand Total Value: 102
                    </div>
                )}
            />
        </DefaultLayout>
    );
};

export default Summary;
