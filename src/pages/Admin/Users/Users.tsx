import React, { Fragment, useEffect, useState } from 'react'
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
    const [currentPage, setCurrentPage] = useState(1);
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        dispatch(loadUserPaging(currentPage));
    }, [dispatch, currentPage]);

    const onPageChanged = (pageNumber: number) => {
        setCurrentPage(pageNumber);
        dispatch(loadUserPaging(pageNumber));
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

    return (
        <Fragment>
            <div>
                <h1 className="h3 mb-2 text-gray-800">List Users ...</h1>
                {/* DataTales Example */}
                <div className="card shadow mb-4">
                    <div className="card-header py-3">
                        <h6 className="m-0 font-weight-bold text-primary">List Users</h6>
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
                            pageLimit={5}
                            pageSize={pageSize}
                            onPageChanged={onPageChanged}
                        >

                        </Pagination>
                    </div>
                </div>
            </div>

        </Fragment>)
}
