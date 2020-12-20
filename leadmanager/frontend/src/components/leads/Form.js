import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addLead } from '../../actions/leads';

export class Form extends Component {
  state = {
    name: '',
    email: '',
    message: '',
  };

  static propTypes = {
    addLead: PropTypes.func.isRequired,
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });
  onSubmit = (e) => {
    e.preventDefault();
    const { name, email, message } = this.state;
    const lead = { name, email, message };
    this.props.addLead(lead);
    this.setState({
      name: '',
      email: '',
      message: '',
    });
  };

  render() {
    const { name, email, message } = this.state;
    return (
      <div className='card card-body mt-4 mb-4'>
        <h2>Add Lead</h2>
        <form onSubmit={this.onSubmit}>
          <div className='form-group'>
            <label htmlFor='Name'>Name</label>
            <input
              type='text'
              name='name'
              id='name'
              className='form-control'
              onChange={this.onChange}
              value={name}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='Email'>Email</label>
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
            <label htmlFor='Message'>Message</label>
            <textarea
              name='message'
              type='text'
              id='message'
              cols='30'
              rows='10'
              className='form-control'
              onChange={this.onChange}
              value={message}
            ></textarea>
          </div>
          <div className='form-group'>
            <button type='submit' className='btn btn-primary'>
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default connect(null, { addLead })(Form);
