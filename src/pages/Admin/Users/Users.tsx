import React, { ChangeEvent, Fragment, useEffect, useState } from 'react'
import { IUser, UsersState } from '../../../store/users/types'
import { useSelector } from 'react-redux'
import { AppDispatch, AppState } from '../../../store'
import { useDispatch } from 'react-redux'
import { loadUserPaging } from '../../../store/users/actions'
import { Pagination } from '../../../components'

export const Users = () => {

    const users: IUser[] = useSelector((state: AppState) => state.users.items);
    const totalItems = useSelector((state: AppState) => state.users.totalItems);
    const pageSize = useSelector((state: AppState) => state.users.pageSize);
    const [pageIndex, setPageIndex] = useState(1);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [showSearch, setShowSearch] = useState(true);

    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        dispatch(loadUserPaging(searchKeyword, pageIndex));
    }, [dispatch, pageIndex, searchKeyword]);

    const onPageChanged = (pageNumber: number) => {
        setPageIndex(pageNumber);
        dispatch(loadUserPaging(searchKeyword, pageNumber));
    }

    const userElements: JSX.Element[] = users.map((user) => {
        return (
            <tr key={`user_${user.id}`}>
                <td>{user.username}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
            </tr>
        );
    })

    const handleKeywordPress = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchKeyword(e.target.value);
    }

    const clearSearch = () => {
        setSearchKeyword('');
        dispatch(loadUserPaging('', 1))
    }

    return (
        <Fragment>
            <div>
                <h1 className="h3 mb-2 text-gray-800">List Users ...</h1>
                {showSearch && (
                    <div className='row mb-3'>
                        <div className='col-xl-12 col-md-12 mb-12'>
                            <div className='card'>
                                <h5 className='card-header'>Tìm kiếm</h5>
                                <div className='header-buttons'>
                                    <button
                                        className='btn btn-default'
                                        onClick={() => setShowSearch(false)}
                                    >
                                        Đóng
                                        <i className='fas fa-times'></i>
                                    </button>
                                </div>
                                <div className='card-body'>
                                    <form className='form-inline'>
                                        <div className='col-auto'>
                                            <input
                                                type='text'
                                                value={searchKeyword}
                                                onChange={handleKeywordPress}
                                                className='form-control'
                                                placeholder='Từ khoá'
                                            />
                                        </div>

                                        <button
                                            type='button'
                                            onClick={() =>
                                                dispatch(loadUserPaging(searchKeyword, pageIndex))
                                            }
                                            className='btn btn-primary my-1'
                                        >
                                            Tìm kiếm
                                        </button>
                                        <button
                                            type='button'
                                            onClick={() => clearSearch()}
                                            className='btn btn-default my-1'
                                        >
                                            Xoá
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {/* DataTales Example */}
                <div className="card shadow mb-4">
                    <div className="card-header py-3">
                        <h6 className="m-0 font-weight-bold text-primary">List Users</h6>
                    </div>
                    <div className='header-buttons'>
                        <button
                            type='button'
                            className='btn btn-link'
                            onClick={() => setShowSearch(true)}
                        >
                            Tìm kiếm
                        </button>
                    </div>
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table table-bordered" id="dataTable" width="100%" cellSpacing={0}>
                                <thead>
                                    <tr>
                                        <th>UserName</th>
                                        <th>FirstName</th>
                                        <th>LastName</th>
                                        <th>Email</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {userElements}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className='card-footer'>
                        <Pagination
                            totalItems={totalItems}
                            pageLimit={2}
                            pageSize={pageSize}
                            pageIndex={pageIndex}
                            onPageChanged={onPageChanged}
                        >

                        </Pagination>
                    </div>
                </div>
            </div>

        </Fragment>)
}
