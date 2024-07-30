import React from 'react'
import { Button, DatePicker, Form,Input, Modal } from 'antd'

const AddExpense = ({isExpanse,CancelExpense,onFinish}) => {
    const[form]=Form.useForm();

    return (
      <Modal style={{fontWeight:"600"}} 
      title="Add expense" 
      footer={null} 
      open={isExpanse} 
      onCancel={CancelExpense}>
          <Form form={form} layout='vertical'
          onFinish={(values)=>{
              onFinish(values,"expense");
              form.resetFields();
          }}>
              <Form.Item style={{fontWeight:"600"}}
              label="Name" name="name"
              rules={[
                  {
                      required:true,
                      message:"Please input the name of transaction",
                  },
              ]}>
                <Input type="text" className="custom-input"/>
              </Form.Item>
              <Form.Item style={{fontWeight:"600"}}
              label="Amount" name="amount"
              rules={[
                  {
                      required:true,
                      message:"Please input the amount",
                  },
              ]}>
                <Input type="number" className="custom-input"/>
              </Form.Item>
              <Form.Item style={{fontWeight:"600"}}
              label="Date" name="date"
              rules={[
                  {
                      required:true,
                      message:"Please input the Date of transaction",
                  },
              ]}>
                <DatePicker classname="custom-input" format="YYYY-MM-DD"/>
              </Form.Item>
              <Form.Item style={{fontWeight:"600"}}
              label="Tag" name="tag"
              rules={[
                  {
                      required:true,
                      message:"Please input the purpose of transaction",
                  },
              ]}>
                <Input/>
              </Form.Item>
              <Button className='btn btn-blue' htmlType='submit' type='primary'>Add Expense</Button>
          </Form>
      </Modal>
    )
}

export default AddExpense