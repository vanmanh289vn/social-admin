import React, { ChangeEvent, FormEvent, Fragment, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { UrlConstants } from '../../../constants';
import { useSelector } from 'react-redux';
import { AppDispatch, AppState } from '../../../store';
import { validateEmail } from '../../../helpers';
import { useDispatch } from 'react-redux';
import { IUpdateUserRequest } from '../../../store/users/types';
import { getUserById, loadUserPaging, updateUser } from '../../../store/users/actions';
import { useNavigate } from "react-router-dom";

export const EditUser = () => {

  

  // update
  let { id }  = useParams<{ id: string }>();
  const dispatch: AppDispatch = useDispatch();
  const user = useSelector((state: AppState) => state.users.editUser);

  useEffect(() => {
    dispatch(getUserById(id ?? ''));
  }, [dispatch, id]);

  useEffect(() => {
    setFormInputs({
      email: user !== null ? user.email : '',
      firstName: user !== null ? user.firstName : '',
      lastName: user != null ? user.lastName : ''
    });
  }, [user])

  const [formInputs, setFormInputs] = useState({
    email: '',
    firstName: '',
    lastName: '',
  });

  const [formSubmitted, setFormSubmitted] = useState(false);

  const { email, firstName, lastName } = formInputs;

  const loading = useSelector<AppState>((state) => state.users.loading);

  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormInputs((inputs) => ({ ...inputs, [name]: value}));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormSubmitted(true);
    if (email && firstName && lastName) {
      const user: IUpdateUserRequest = {
        email: email,
        firstName: firstName,
        lastName: lastName
      }

      dispatch(updateUser(id ?? '', user));
      dispatch(loadUserPaging('', 1, 6))
      navigate(UrlConstants.USERS_LIST);
    }
  };


  return (
    <Fragment>
      <h1 className='h3 mb-4 text-gray-800'>Cập nhật user</h1>
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
                value={email}
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
              <label>Tên</label>
              <input
                type='text'
                className={
                  'form-control ' +
                  (formSubmitted && !firstName ? 'is-invalid' : '')
                }
                value={firstName}
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
                value={lastName}
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
