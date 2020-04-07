import React from "react";
import {Card, Form, Grid, Input, Select} from "antd";
import ReactInputMask from "react-input-mask";
import {Button} from "antd/es";

const {useBreakpoint} = Grid;

const {Option} = Select;

const states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming']

const formItemLayout = {
  labelCol: {
    xs: {span: 24},
    sm: {span: 8},
  },
  wrapperCol: {
    xs: {span: 24},
    sm: {span: 16},
  },
};

const requiredMessage = 'Required';

export const RequestForm: React.FC = () => {

  const screens = useBreakpoint();

  const npiValidatorRule = () => ({
    validator(rule: any, value: string) {

      const npiErrorMessage = 'Please enter a valid NPI Number';

      if (!value) {
        return Promise.resolve()
      }

      if (value.length !== 10 && value.length !== 15) {
        return Promise.reject(npiErrorMessage)
      }

      const digits = value.split('');
      const checkDigit = digits.pop() || '-1';

      let luhnSum = digits.reverse().reduce((acc, curr, index) => {

        const parsed = parseInt(curr);

        if (index % 2 === 1) {
          return acc + parsed;
        }

        const doubled = parsed * 2;

        if (doubled >= 10) {
          return acc + 1 + (doubled % 10);
        }

        return acc + doubled;
      }, 0);

      if (value.length === 10) {
        luhnSum += 24;
      }

      const luhnCheckDigit = (10 - (luhnSum % 10)) % 10;

      if (parseInt(checkDigit) !== luhnCheckDigit) {
        return Promise.reject(npiErrorMessage)
      }

      return Promise.resolve();
    },
  });

  const options = states.map(s => {
    return (
      <Option value={s}>{s}</Option>
    )
  });

  return (
    <Card
      title="Request Form"
      style={{width: screens.xs ? '' : '600px'}}
    >
      <Form
        {...formItemLayout}
        name="request"
        scrollToFirstError
      >
        <Form.Item
          label={screens.xs ? '' : ' '}
          colon={false}
          style={{fontWeight: 600, fontSize: '14px', marginBottom: '0'}}
        >
          Contact Information
        </Form.Item>
        <Form.Item
          name="firstName"
          label="First Name"
          rules={[
            {
              required: true,
              message: requiredMessage,
            },
          ]}
        >
          <Input
            placeholder="Russ"
          />
        </Form.Item>
        <Form.Item
          name="lastName"
          label="Last Name"
          rules={[
            {
              required: true,
              message: requiredMessage,
            },
          ]}
        >
          <Input
            placeholder="Thomas"
          />
        </Form.Item>
        <Form.Item
          name="phoneNumber"
          label="Telephone Number"
          rules={[
            {
              required: true,
              message: requiredMessage,
            },
          ]}
        >
          <ReactInputMask
            mask="(999) 999-9999"

          >
            {(inputProps: any) => <Input placeholder="(904) 470-4900"/>}
          </ReactInputMask>
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[
            {
              type: 'email',
              message: 'Please enter a valid email address',
            },
            {
              required: true,
              message: requiredMessage,
            },
          ]}
        >
          <Input
            placeholder="example@availity.com"
          />
        </Form.Item>
        <Form.Item
          label={screens.xs ? '' : ' '}
          colon={false}
          style={{fontWeight: 600, fontSize: '14px', marginBottom: '0'}}
        >
          Provider Identifier
        </Form.Item>
        <Form.Item
          name="npi"
          label="NPI Number"
          rules={[
            npiValidatorRule,
            {
              required: true,
              message: requiredMessage,
            },
          ]}
        >
          <Input
            placeholder="1234567893"
          />
        </Form.Item>
        <Form.Item
          label={screens.xs ? '' : ' '}
          colon={false}
          style={{fontWeight: 600, fontSize: '14px', marginBottom: '0'}}
        >
          Business Address
        </Form.Item>
        <Form.Item
          name="address1"
          label="Address 1"
          rules={[
            {
              required: true,
              message: requiredMessage,
            },
          ]}
        >
          <Input
            placeholder="5555 Gate Pkwy"
          />
        </Form.Item>
        <Form.Item
          name="address2"
          label="Address 2"
        >
          <Input
            placeholder="#110"
          />
        </Form.Item>
        <Form.Item
          label="City"
          name="city"
          required
          rules={[
            {
              required: true,
              message: requiredMessage,
            },
          ]}
        >
          <Input
            placeholder="Jacksonville"
          />
        </Form.Item>
        <Form.Item
          label="State"
          name="state"
          required
          rules={[
            {
              required: true,
              message: requiredMessage,
            },
          ]}
        >
          <Select
            placeholder="Florida"
          >
            {options}
          </Select>
        </Form.Item>
        <Form.Item
          label="Zip"
          name="zip"
          required
          rules={[
            {
              required: true,
              message: requiredMessage,
            },
          ]}
        >
          <Input
            placeholder="32256"
          />
        </Form.Item>
        <Form.Item
          label={screens.xs ? '' : ' '}
          colon={false}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Card>
  )
};
