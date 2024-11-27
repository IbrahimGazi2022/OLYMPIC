import axios from "axios";
import DefaultLayout from "../components/DefaultLayout";
import { Form, Input, InputNumber, Button, message } from "antd";
import { API_URL } from "../utils/url.config";

const AddProducts = () => {
    const [form] = Form.useForm();

    const onFinish = async (values: any) => {
        try {
            await axios.post(`${API_URL}/add-products`, values);
            message.success("Product added successfully!");
            form.resetFields();
        } catch (error) {
            console.error("Error adding product:", error);
            message.error("Failed to add the product. Please try again!");
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        console.error("Failed:", errorInfo);
        message.error("Please correct the errors in the form!");
    };

    return (
        <DefaultLayout>
            <h1>Add Products</h1>
            <Form
                form={form}
                name="add_product_form"
                style={{ maxWidth: 600 }}
                layout="vertical"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    label="Product Name"
                    name="name"
                    rules={[
                        { required: true, message: "Please enter the product name!" },
                    ]}
                >
                    <Input placeholder="Enter product name" />
                </Form.Item>

                <Form.Item
                    label="Price"
                    name="price"
                    rules={[
                        { required: true, message: "Please enter the price!" },
                    ]}
                >
                    <InputNumber style={{ width: "100%" }} placeholder="Enter price" />
                </Form.Item>

                <Form.Item
                    label="Pack Size"
                    name="size"
                    rules={[
                        { required: true, message: "Please enter the pack size!" },
                    ]}
                >
                    <InputNumber addonAfter="gm" style={{ width: "100%" }} placeholder="Enter pack size" />
                </Form.Item>

                <Form.Item
                    label="Quantity"
                    name="qty"
                    rules={[
                        { required: true, message: "Please enter the quantity!" },
                    ]}
                >
                    <InputNumber style={{ width: "100%" }} placeholder="Enter quantity" />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" block>
                        Add Product
                    </Button>
                </Form.Item>
            </Form>
        </DefaultLayout>
    );
};

export default AddProducts;
