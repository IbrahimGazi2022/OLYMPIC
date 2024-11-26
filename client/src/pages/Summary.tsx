import axios from "axios";
import { InputNumber, Table } from "antd";
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

    // Load from API or `localStorage` on initial render
    useEffect(() => {
        const storedData = localStorage.getItem("productsData");
        if (storedData) {
            try {
                setProductsData(JSON.parse(storedData));
            } catch (error) {
                console.error("Failed to parse localStorage data:", error);
                getAllProducts();
            }
        } else {
            getAllProducts();
        }
    }, []);

    const getAllProducts = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/products/all-products");
            const initialData = response.data.map((product: Product) => ({
                ...product,
                return: 0,
                damage: 0,
            }));
            setProductsData(initialData);
            localStorage.setItem("productsData", JSON.stringify(initialData)); // Sync to localStorage
        } catch (error) {
            console.log("Failed to fetch products:", error);
        }
    };

    // Handle return and damage value change
    const handleValueChange = (field: "return" | "damage", value: number, record: Product) => {
        const updatedData = productsData.map((product) => {
            if (product._id === record._id) {
                return {
                    ...product,
                    [field]: value,
                };
            }
            return product;
        });
        setProductsData(updatedData);

        // Save updated data to localStorage
        localStorage.setItem("productsData", JSON.stringify(updatedData));
    };

    // Calculate Total Value for each product
    const calculateTotalValue = (product: Product) => {
        const sales = (product.qty || 0) - (product.return || 0) - (product.damage || 0);
        return sales * (product.tp || 0);
    };

    // Calculate Grand Total
    const grandTotalValue = productsData.reduce((total, product) => {
        return total + calculateTotalValue(product);
    }, 0);

    // Table Columns
    const columns: ColumnsType<Product> = [
        {
            title: "S/N",
            render: (_: any, __: Product, index: number) => index + 1,
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
            key: "return",
            render: (_: any, record: Product) => (
                <InputNumber
                    min={0}
                    value={record.return}
                    onChange={(value) => handleValueChange("return", value || 0, record)}
                />
            ),
        },
        {
            title: "Damage Qty",
            key: "damage",
            render: (_: any, record: Product) => (
                <InputNumber
                    min={0}
                    value={record.damage}
                    onChange={(value) => handleValueChange("damage", value || 0, record)}
                />
            ),
        },
        {
            title: "Sales Qty",
            key: "sales",
            render: (_: any, record: Product) => (
                record.qty - (record.return || 0) - (record.damage || 0)
            ),
        },
        {
            title: "TP",
            dataIndex: "tp",
            key: "tp",
        },
        {
            title: "Total Value",
            key: "totalValue",
            render: (_: any, record: Product) => calculateTotalValue(record).toFixed(2),
        },
    ];

    return (
        <DefaultLayout>
            <h1>Summary Page</h1>
            <Table
                dataSource={productsData}
                columns={columns}
                pagination={false}
                rowKey={(record) => record._id}
                footer={() => (
                    <div className="table-footer">
                        Grand Total Value: {grandTotalValue.toFixed(2)}
                    </div>
                )}
            />
        </DefaultLayout>
    );
};

export default Summary;
