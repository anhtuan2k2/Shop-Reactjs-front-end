import React, { useState, useEffect } from 'react';
import './Posts.scss';
import { withRouter } from 'react-router-dom';
import { Col, Row } from 'antd';
import { Link } from 'react-router-dom';
const Posts = ({ posts, loading }) => {
  const [search, setSearch] = useState('');
  const [filterproduct, setFilterproduct] = useState([]);
  useEffect(() => {
    setFilterproduct(
      posts.filter((post) =>
        post.name.toLowerCase().includes(search.toLowerCase(), search.split(''))
      )
    );
  }, [search, posts]);
  if (loading) {
    return <h2>Loading...</h2>;
  }
  return (
    <div>
      <Row gutter={[16, 16]}>
        <div className='filter-feature'>
          <input
            type='text'
            placeholder='Tìm Kiếm Sản Phẩm'
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </Row>
      <Row gutter={[16, 16]}>
        {filterproduct.map((product, idx) => (
          <Col lg={6} md={8} xs={24} key={idx} className='col-pro'>
            <div className='card-item'>
              <Link className='img-pro' to={'/product/' + product.id}>
                <div className='image-product'>
                  <img
                    className='product-image'
                    src={product.imageCover}
                    alt='post'
                  />
                </div>
                <h2>{product.name}</h2>
              </Link>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default withRouter(Posts);
