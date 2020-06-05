/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { Menu, Modal } from 'antd';

import { connect } from 'react-redux';
import LoginPage from '../../../../LoginPage/LoginPage';
import * as actions from '../../../../../store/actions/index';

import { withRouter } from 'react-router-dom';

function RightMenu(props) {
  const logoutHandler = () => {
    props.onLogout();
  };

  const [visible, setVisible] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = (e) => {
    setVisible(false);
  };
  // const CheckoutHandler = () => {
  //   console.log('something will be paid');
  // };
  if (!props.isAuthenticated) {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key='mail'>
          <div>
            <a type='primary' onClick={showModal} className='btn-modalcart'>
              Sign-in
            </a>
            <Modal
              className='modal-cover'
              title='Login-Account '
              visible={visible}
              onCancel={handleCancel}
            >
              <LoginPage />
            </Modal>
          </div>
        </Menu.Item>
        <Menu.Item key='app'>
          <a href='/register'>Signup</a>
        </Menu.Item>
      </Menu>
    );
  } else {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key='history'>
          <a href='/cart/:id'>Check out</a>
        </Menu.Item>

        <Menu.Item key='upload'>
          <a href='/product/upload'>Upload</a>
        </Menu.Item>

        {/* <Menu.Item key='cart' style={{ paddingBottom: 3 }}>
          <Badge count={user.userData && user.userData.cart.length}>
            <a href='/user/cart' style={{ marginRight: -22, color: '#667777' }}>
              <Icon
                type='shopping-cart'
                style={{ fontSize: 30, marginBottom: 3 }}
              />
            </a>
          </Badge>
        </Menu.Item> */}

        <Menu.Item key='logout' onClick={logoutHandler}>
          <a>Logout</a>
        </Menu.Item>
      </Menu>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogout: () => dispatch(actions.logout()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(RightMenu)
);
