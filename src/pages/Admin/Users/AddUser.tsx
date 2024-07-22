import React, { ChangeEvent, FormEvent, Fragment, useState } from 'react'
import { Link } from 'react-router-dom';
import { UrlConstants } from '../../../constants';
import { useSelector } from 'react-redux';
import { AppDispatch, AppState } from '../../../store';
import { validateEmail } from '../../../helpers';
import { useDispatch } from 'react-redux';
import { IAddUserRequest } from '../../../store/users/types';
import { addUser } from '../../../store/users/actions';
import { useNavigate } from "react-router-dom";

export const AddUser = () => {

  // form có 4 phần tử nên đưa ra formInputs như dưới.
  const [formInputs, setFormInputs] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  });

  const [formSubmitted, setFormSubmitted] = useState(false);

  const { email, password, firstName, lastName } = formInputs;

  const loading = useSelector<AppState>((state) => state.users.loading);

  const dispatch: AppDispatch = useDispatch();

  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormInputs((inputs) => ({ ...inputs, [name]: value}));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormSubmitted(true);
    if (email && password && firstName && lastName) {
      const user: IAddUserRequest = {
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName
      }

      dispatch(addUser(user));
      navigate(UrlConstants.USERS_LIST);
    }
  };


  return (
    <Fragment>
      <h1 className='h3 mb-4 text-gray-800'>Thêm mới user</h1>
      <div className='card'>
        <div className='card-header'>Thông tin user</div>
        <div className='card-body'>
          <form onSubmit={handleSubmit}>
            <div className='form-group'>
              <label>Email</label>
              <input
                type='text'
                className={
                  'form-control ' +
                  (formSubmitted && (!email || !validateEmail(email))
                    ? 'is-invalid'
                    : '')
                }
                name='email'
                placeholder='name@example.com'
                onChange={handleChange}
              />
              {formSubmitted && !email && (
                <div className='invalid-feedback'>Email is required</div>
              )}
              {formSubmitted && !validateEmail(email) && (
                <div className='invalid-feedback'>Email is not valid</div>
              )}
            </div>
            <div className='form-group'>
              <label>Password</label>
              <input
                type='password'
                className={
                  'form-control ' +
                  (formSubmitted && !password ? 'is-invalid' : '')
                }
                name='password'
                onChange={handleChange}
              />
              {formSubmitted && !password && (
                <div className='invalid-feedback'>Password is required</div>
              )}
            </div>
            <div className='form-group'>
              <label>Tên</label>
              <input
                type='text'
                className={
                  'form-control ' +
                  (formSubmitted && !firstName ? 'is-invalid' : '')
                }
                name='firstName'
                onChange={handleChange}
              />
              {formSubmitted && !firstName && (
                <div className='invalid-feedback'>First name is required</div>
              )}
            </div>
            <div className='form-group'>
              <label>Họ</label>
              <input
                type='text'
                className={
                  'form-control ' +
                  (formSubmitted && !lastName ? 'is-invalid' : '')
                }
                name='lastName'
                onChange={handleChange}
              />
              {formSubmitted && !lastName && (
                <div className='invalid-feedback'>Last name is required</div>
              )}
            </div>

            <div className='form-group'>
              <button className='btn btn-primary' type='submit'>
                {loading ? <span className='spinner-border spinner-border-sm mr-1'></span> : null}
                Lưu
              </button>
              <Link className='btn btn-danger' to={UrlConstants.USERS_LIST}>
                Hủy
              </Link>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};
