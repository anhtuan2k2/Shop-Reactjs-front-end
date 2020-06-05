import React, { useState, useEffect } from 'react';
import Paginations from './Pagination/Pagination';
import Axios from 'axios';
import { Menu } from 'antd';
import Posts from './Posts/Posts';
import './ListProduct.scss';

const ListProduct = (props) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(12);
  const [category, setCategory] = useState('food');

  useEffect(() => {
    fetchData(category);
  }, [category]);

  const fetchData = (ping) => {
    Axios.get(`http://localhost:5000/api/v1/products?category=${ping}`)
      .then((res) => {
        const dulieu = res.data.data.products;
        setPosts(dulieu);
        console.log(dulieu);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const handleClick = (e) => {
    setCategory(e.key);
  };

  const getidlocal = () => {
    const idc = localStorage.getItem('idcur');
    console.log(idc);
  };

  return (
    <div className='list_product'>
      <div className='sidebar'>
        <Menu
          onClick={handleClick}
          style={{ width: 256 }}
          defaultSelectedKeys={['1']}
          mode='inline'
        >
          <Menu.Item key='food' onClick={getidlocal}>
            Food
          </Menu.Item>
          <Menu.Item key='guitar'>Guitar</Menu.Item>
          <Menu.Item key='electric'>Phone</Menu.Item>
          <Menu.Item>something1</Menu.Item>
          <Menu.Item>something2</Menu.Item>
        </Menu>
      </div>

      <div className='list-item'>
        <Posts posts={currentPosts} loading={loading} />

        <Paginations
          postsPerPage={postsPerPage}
          totalPosts={posts.length}
          paginate={paginate}
        />
      </div>
    </div>
  );
};

export default ListProduct;
