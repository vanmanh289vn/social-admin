import React, { ChangeEvent, Fragment, ReactNode, useEffect, useState } from 'react'
import { IUser } from '../../../store/users/types'
import { useSelector } from 'react-redux'
import { AppDispatch, AppState } from '../../../store'
import { useDispatch } from 'react-redux'
import { deleteUsers, loadUserPaging } from '../../../store/users/actions'
import { Pagination } from '../../../components'
import { Link } from 'react-router-dom'
import { UrlConstants } from '../../../constants'
import swal from 'sweetalert'

export const Users = () => {

    const users: IUser[] = useSelector((state: AppState) => state.users.items);
    const totalItems = useSelector((state: AppState) => state.users.totalItems);
    // const pageSize = useSelector((state: AppState) => state.users.pageSize);
    const [pageIndex, setPageIndex] = useState(1);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [showSearch, setShowSearch] = useState(true);
    const [selectedItems, setSelectedItems] = useState<string[]>([]);

    // page size
    const [pageSize, setPageSize] = useState(6);
    const pageSizes = [3, 6, 9];

    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        dispatch(loadUserPaging(searchKeyword, pageIndex, pageSize));
    }, [dispatch, pageIndex, searchKeyword, pageSize]);

    const handleSelectRow = (id: string) => {
        let newSelectedItems = [...selectedItems];
        selectedItems.indexOf(id) !== -1 
        ? (newSelectedItems = selectedItems.filter((item) => item !== id)) 
        : newSelectedItems.push(id);

        setSelectedItems(newSelectedItems);
    };

    const handleDelete = () => {
        if (selectedItems) {
            swal({
                title: 'Xác nhận',
                text: 'Bạn có muốn xóa các bản ghi này không hả Kun?',
                icon: 'warning',
                buttons: ['Hủy', 'Xác nhận'],
                dangerMode: true,
            }).then((willDelete) => {
                if (willDelete) {
                    dispatch(deleteUsers(selectedItems));
                    setSelectedItems([]);
                }
            });
        }
    }

    const onPageChanged = (pageNumber: number) => {
        setPageIndex(pageNumber);
        dispatch(loadUserPaging(searchKeyword, pageNumber, pageSize));
    }

    const userElements: JSX.Element[] = users.map((user) => {
        return (
            <tr key={`user_${user.id}`}
            className={`table-row ${
                selectedItems.indexOf(user.id) !== -1 ? 'selected' : ''
            } `}
            onClick={() => handleSelectRow(user.id)}
            
            >
                <td>
                    <input 
                        type='checkbox'
                        value={`${user.id}`}
                        checked={selectedItems.indexOf(user.id) !== -1}
                        onChange={() => handleSelectRow(user.id)}
                    
                    />
                </td>
                <td>{user.username}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td><Link to={UrlConstants.USER_EDIT + user.id}>Edit</Link></td>
            </tr>
        );
    })

    const handleKeywordPress = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchKeyword(e.target.value);
    }

    const clearSearch = () => {
        setSearchKeyword('');
        dispatch(loadUserPaging('', 1, pageSize))
    }

    const handlePageSizeChange = (e: ChangeEvent<HTMLSelectElement>) => {
        let size: any = e.target.value;
        setPageSize(size as number);
        setPageIndex(1);

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
                                                dispatch(loadUserPaging(searchKeyword, pageIndex, pageSize))
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
                        <Link
                            to={UrlConstants.USER_ADD}
                            className='btn btn-outline-success btn-sm'
                        >
                            <span className='fa fa-plus'></span> Thêm mới
                        </Link>
                        {selectedItems.length > 0 && (
                            <Fragment>
                                <button
                                    className='btn btn-outline-danger btn-sm'
                                    onClick={handleDelete}
                                >
                                    <span className='fa fa-trash'></span> Xóa
                                </button>
                                <button
                                    className='btn btn-outline-primary btn-sm'
                                    onClick={() => setSelectedItems([])}
                                >
                                    <i className='fas fa-check'></i> Bỏ chọn
                                </button>
                            </Fragment>
                        )}
                    </div>
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table table-bordered" id="dataTable" width="100%" cellSpacing={0}>
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>UserName</th>
                                        <th>FirstName</th>
                                        <th>LastName</th>
                                        <th>Email</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {userElements}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className='card-footer'>

                        <div className='select-paging'>
                            <div className='select-size'>
                                <select
                                    className="custom-select"
                                    onChange={handlePageSizeChange}
                                    value={pageSize}>

                                    {pageSizes.map((size) => (
                                        <option key={size} value={size}>
                                            {size}
                                        </option>
                                    ))}

                                </select>
                            </div>

                            <div className='paging'>
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
                </div>
            </div>

        </Fragment>)
}
