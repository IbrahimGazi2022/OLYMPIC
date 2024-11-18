import axios from "axios"
import { Table } from "antd";
import { useEffect, useState } from "react"

import DefaultLayout from "../components/DefaultLayout"

const AllProducts = () => {

  // Get All Products Function
  const [productsData, setProductsData] = useState([])
  const getAllProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/products/all-products')
      setProductsData(response.data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getAllProducts()
  }, [])

  // Table Columns
  const columns = [
    {
      title: 'S/N',
      render: (text, record, index) => index + 1, // Serial number column
      key: "serial", // Unique key for this column
      width: 50,
      align: "center",
    },
    {
      title: 'Name',         // Column header
      dataIndex: 'name',     // Data property from the data source
      key: 'name',           // Unique identifier for this column
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Size',
      dataIndex: 'size',
      key: 'price',
    },
  ];

  return (
    <DefaultLayout>
      <h1>All Products List</h1>
      <Table
        dataSource={productsData}
        columns={columns}
        rowKey={(record) => record._id}
      />
    </DefaultLayout>
  )
}

export default AllProducts
