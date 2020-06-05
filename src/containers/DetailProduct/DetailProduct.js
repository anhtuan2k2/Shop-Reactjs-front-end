import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Collapse, Spin, Space } from 'antd';
import Axios from 'axios';
import ModalCart from '../HomePage/Sections/ModelCart/ModeCart';
import Navbar from '../HomePage/Sections/Navbar/Navbar';
import './DetailProduct.scss';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../store/actions/cart';

const { Panel } = Collapse;
const DetailProduct = (props) => {
  // const cart = useSelector((state) => state.cart);// warning
  // const { cartItems } = cart;
  const [countqty, setCountqty] = useState(0);
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  let idpro = props.match.params.id;
  useEffect(() => {
    Axios.get(`http://localhost:5000/api/v1/products/${idpro}`)
      .then((res) => {
        let dulieu = res.data.data.product;
        setProduct(dulieu);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(props.match.params.id);

    return () => {
      //
    };
  }, [idpro]);

  function callback(key) {
    console.log(key);
  }

  let infoProduct = (
    <Space size='middle'>
      <Spin size='small' />
      <Spin />
      <Spin size='large' />
    </Space>
  );
  if (!loading) {
    infoProduct = (
      <div key={product.id}>
        <h4>Product-Name : {product.name}</h4>
        <h1>Category : {product.category}</h1>
        <Collapse defaultActiveKey={['1']} onChange={callback}>
          <Panel header={product.summary} key='1'>
            <p>{product.description}</p>
          </Panel>
        </Collapse>
        <ModalCart />
      </div>
    );
  }

  const handlerAddtoCart = () => {
    dispatch(addToCart(idpro, countqty));
  };
  const backtohome = () => {
    props.history.goBack();
  };

  return (
    <div>
      <Navbar />
      <div
        className='postPage'
        style={{ width: '80%', margin: '0 auto', padding: '3rem 4rem' }}
      >
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <h1>{product.name}</h1>
        </div>

        <br />

        <Row gutter={[16, 16]}>
          <Col lg={12} xs={24}>
            <div className='details-image'>
              <img src={product.imageCover} alt='product' />
            </div>
          </Col>
          <Col lg={12} xs={24}>
            <div className='product-info'>
              <h3>Product-Info</h3>
              {infoProduct},
              {/* <span className='product-price'>Price: ${product.price}</span>

            <p className='product-description'>
              Description :{product.description}
            </p> */}
            </div>
            <div className='product-counter'>
              <Button
                className='btn-success'
                type='primary'
                shape='circle'
                onClick={() => setCountqty(countqty - 1)}
              >
                --
              </Button>
              <Button className='btn-success' type='primary' shape='round'>
                {countqty}
              </Button>
              <Button
                className='btn-success'
                type='primary'
                shape='circle'
                onClick={() => setCountqty(countqty + 1)}
              >
                ++
              </Button>
            </div>
            <Button
              type='primary'
              shape='round'
              onClick={handlerAddtoCart}
              className='btn-success'
            >
              Add to cart
            </Button>
            <Button
              type='primary'
              shape='round'
              onClick={backtohome}
              className='btn-success'
            >
              Back
            </Button>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default DetailProduct;
