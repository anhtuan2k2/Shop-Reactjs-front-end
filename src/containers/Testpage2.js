import React from 'react';

import { Row, Col } from 'antd';
import './Testpage2.scss';
const Testpage2 = (props) => {
  return (
    <div className='testpage2'>
      <div className=''>
        z
        <Row>
          <Col span={12}>col-12</Col>
          <Col span={12}>col-12</Col>
        </Row>
        <Row>
          <Col span={8}>col-8</Col>
          <Col span={8}>col-8</Col>
          <Col span={8}>col-8</Col>
        </Row>
        <Row justify='center'>
          <Col span={6}>1</Col>
          <Col span={6}>2-4</Col>
          <Col span={6}>3-4</Col>
          <Col span={6}>4-4</Col>
          <Col span={6}>5-4</Col>
        </Row>
      </div>
    </div>
  );
};

export default Testpage2;
