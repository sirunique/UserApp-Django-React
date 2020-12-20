import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { register } from '../../actions/auth';
import { createMessage } from '../../actions/messages';

export class Register extends Component {
  state = {
    username: '',
    email: '',
    password: '',
    password2: '',
  };

  static propTypes = {
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
  };

  onChange = (e) =>
    this.setState({
      [e.target.name]: e.target.value,
    });

  onSubmit = (e) => {
    e.preventDefault();
    const { username, email, password, password2 } = this.state;
    if (password !== password2) {
      this.props.createMessage({ passwordNotMatch: 'Password do not match' });
    } else {
      const newUser = {
        username,
        email,
        password,
      };
      this.props.register(newUser);
    }
  };

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to='/' />;
    }
    const { username, email, password, password2 } = this.state;
    return (
      <div className='col-md-6 m-auto'>
        <div className='card card-body mt-5'>
          <h2 className='text-center'>Register</h2>
          <form onSubmit={this.onSubmit}>
            <div className='form-group'>
              <label htmlFor='Username'>Username</label>
              <input
                type='text'
                name='username'
                id='username'
                className='form-control'
                onChange={this.onChange}
                value={username}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='Username'>Email</label>
              <input
                type='email'
                name='email'
                id='email'
                className='form-control'
                onChange={this.onChange}
                value={email}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='Username'>Password</label>
              <input
                type='password'
                name='password'
                id='password'
                className='form-control'
                onChange={this.onChange}
                value={password}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='Username'>Confirm Password</label>
              <input
                type='password'
                name='password2'
                id='password2'
                className='form-control'
                onChange={this.onChange}
                value={password2}
              />
            </div>
            <div className='form-group'>
              <button type='submit' className='btn btn-primary'>
                {' '}
                Register
              </button>
            </div>
            <p>
              ALready have an account ? <Link to='/login'>Login</Link>
            </p>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { register, createMessage })(Register);
