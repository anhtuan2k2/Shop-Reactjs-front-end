import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import './LoginPage.scss';

const LoginPage = (props) => {
  const submithandler = (val) => {
    console.log(val);
    props.onAuth(val.email, val.password);
  };
  const detailerror = props.error;
  if (props.error) {
    alert(detailerror);
  }

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email('Email is invalid')
          .required('Email is required'),
        password: Yup.string()
          .min(6, 'Password must be at least 6 characters')
          .required('Password is required'),
      })}
      onSubmit={submithandler}
      render={({ errors, status, touched }) => (
        <div className='login-page'>
          <Form className='login-form'>
            <h2>Welcome Our World</h2>
            <div className='form-group'>
              <Field
                placeholder='nhap email'
                name='email'
                type='text'
                className={
                  'form-control' +
                  (errors.email && touched.email ? ' is-invalid' : '')
                }
              />
              <ErrorMessage
                name='email'
                component='div'
                className='invalid-feedback'
              />
            </div>
            <div className='form-group'>
              <Field
                placeholder='your password'
                name='password'
                type='password'
                className={
                  'form-control' +
                  (errors.password && touched.password ? ' is-invalid' : '')
                }
              />
              <ErrorMessage
                name='password'
                component='div'
                className='invalid-feedback'
              />
            </div>

            <div className='form-group'>
              <button
                type='submit'
                className='btn btn-primary mr-2 btn-success btn-signup'
              >
                Login
              </button>
              <button type='reset' className='btn btn-secondary btn-signup'>
                Reset
              </button>
              {/* <p onClick={test}>dsads</p> */}
            </div>
          </Form>
        </div>
      )}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password) => dispatch(actions.auth(email, password)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
