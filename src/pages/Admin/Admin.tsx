import { Fragment } from 'react'
import { LeftMenu } from './LeftMenu/LeftMenu'
import { TopBar } from './TopBar/TopBar'
import { Route, Routes, BrowserRouter as Router, useRoutes } from 'react-router-dom'
import { Home }  from './Home/Home'
import { Users } from './Users/Users'
import { AddUser } from './Users/AddUser'

// const AppRoutes = () => {
//     const routes = [
//       { path: '/', element: <Home /> },
//       { path: '/users', element: <Users /> }
//     ];
  
//     const element = useRoutes(routes);
//     return element;
//   };

export const Admin = () => {

    return (
        <Fragment>
            <LeftMenu />
            {/* Content Wrapper */}
            <div id="content-wrapper" className="d-flex flex-column">
                {/* Main Content */}
                <div id="content">
                    <TopBar />
                    {/* Begin Page Content */}
                    <div className="container-fluid">
                            {/* <AppRoutes /> */}
                            <Routes>
                                <Route path='/' element={<Home />}/>
                                <Route path='/users' element={<Users />}/>
                                <Route path='/user-add' element={<AddUser />} />
                            </Routes>
                    </div>
                    {/* /.container-fluid */}
                </div>
                {/* End of Main Content */}
                {/* Footer */}
                <footer className="sticky-footer bg-white">
                    <div className="container my-auto">
                        <div className="copyright text-center my-auto">
                            <span>Copyright © Your Website 2021</span>
                        </div>
                    </div>
                </footer>
                {/* End of Footer */}
            </div>
            {/* End of Content Wrapper */}
        </Fragment>
    )
}
