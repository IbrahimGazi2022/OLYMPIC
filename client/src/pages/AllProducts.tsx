import axios from "axios"
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react"

import DefaultLayout from "../components/DefaultLayout"
import { API_URL } from '../utils/url.config';

// Define the type for your product data
interface Product {
  _id: string;
  name: string;
  price: number;
  size: string;
}

const AllProducts = () => {

  // Get All Products Function
  const [productsData, setProductsData] = useState([])
  const getAllProducts = async () => {
    try {
      const response = await axios.get(`${API_URL}/all-products`)
      setProductsData(response.data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getAllProducts()
  }, [])

  // Table Columns
  const columns: ColumnsType<Product> = [
    {
      title: 'S/N',
      render: (_: any, __: Product, index: number) => index + 1, // Serial number column
      key: "serial", // Unique key for this column
      width: 50,
      align: "center",
    },
    {
      title: ' Product Name',         // Column header
      dataIndex: 'name',     // Data property from the data source
      key: 'name',           // Unique identifier for this column
    },
    {
      title: 'Pack Size',
      dataIndex: 'size',
      key: 'size',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Quantity',
      dataIndex: 'qty',
      key: 'qty',
    }
  ];

  return (
    <DefaultLayout>
      <h1>Product Stock</h1>
      <Table
        dataSource={productsData}
        columns={columns}
        rowKey={(record) => record._id}
      />
    </DefaultLayout>
  )
}

export default AllProducts
