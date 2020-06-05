import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

import './RegisterForm.scss';
const RegisterForm = (props) => {
  return (
    <Formik
      initialValues={{
        // firstName: '',
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
      }}
      validationSchema={Yup.object().shape({
        // firstName: Yup.string().required('First Name is required'),
        name: Yup.string().required('Last Name is required'),
        email: Yup.string()
          .email('Email is invalid')
          .required('Email is required'),
        password: Yup.string()
          .min(6, 'Password must be at least 6 characters')
          .required('Password is required'),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref('password'), null], 'Passwords must match')
          .required('Confirm Password is required'),
      })}
      onSubmit={(fields) => {
        console.log(fields);
        props.onRegister(fields);
        alert('SUCCESS!! :-)\n\n' + JSON.stringify(fields, null, 4));
      }}
      render={({ errors, status, touched }) => (
        <div className='register'>
          <Form className='register-form'>
            <h2>Register-Form</h2>

            <div className='form-group'>
              <Field
                placeholder=' Name'
                name='name'
                type='text'
                className={
                  'form-control' +
                  (errors.name && touched.name ? ' is-invalid' : '')
                }
              />
              <ErrorMessage
                name='name'
                component='div'
                className='invalid-feedback'
              />
            </div>
            <div className='form-group'>
              <Field
                placeholder='Email'
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
                placeholder='Password'
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
              <Field
                placeholder='Confirm Password'
                name='confirmPassword'
                type='password'
                className={
                  'form-control' +
                  (errors.confirmPassword && touched.confirmPassword
                    ? ' is-invalid'
                    : '')
                }
              />
              <ErrorMessage
                name='confirmPassword'
                component='div'
                className='invalid-feedback'
              />
            </div>
            <div className='form-group'>
              <button type='submit' className='btn btn-primary mr-2 btn-signup'>
                Register
              </button>
              <button type='reset' className='btn btn-secondary btn-reset'>
                Reset
              </button>
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
    onRegister: (datasb) => dispatch(actions.register(datasb)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);
