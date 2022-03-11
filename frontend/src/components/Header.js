import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { useLocation, Navigate, useNavigate } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import SearchBox from './SearchBox'
import { logout } from '../actions/userActions'

function Header() {

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    const location = useLocation()
    const navigate = useNavigate()
    const [expanded, setExpanded] = useState(false);

    const dispatch = useDispatch()

    const logoutHandler = () => {
        dispatch(logout())
        navigate('/')

    }

    return (
        <header>
            <div className='header-inner'>
                <Navbar expanded={expanded} id='mainMenu' expand="xl" className='menu-dark navbar-dark'>
                    <Container className='header-container'>
                        <LinkContainer to='/'>
                            <Navbar.Brand className='mw-logo'>MW</Navbar.Brand>
                        </LinkContainer>

                        <Navbar.Toggle onClick={() => setExpanded(expanded ? false : "expanded")} />
                        <Navbar.Collapse>

                            <div className='search-navbar'>
                                <SearchBox />
                            </div>

                            <Nav className="nav-container">
                                <LinkContainer to='/'>
                                    <Nav.Link onClick={() => setExpanded(false)}>Home</Nav.Link>
                                </LinkContainer>
                                <LinkContainer to='/shop'>
                                    <Nav.Link onClick={() => setExpanded(false)}>Shop</Nav.Link>
                                </LinkContainer>

                                <LinkContainer to='/cart'>
                                    <Nav.Link onClick={() => setExpanded(false)}>Cart</Nav.Link>
                                </LinkContainer>
                                {userInfo ? (
                                    <NavDropdown title={userInfo.name} id='username'>
                                        <LinkContainer to='/profile'>
                                            <NavDropdown.Item onClick={() => setExpanded(false)}>Profile</NavDropdown.Item>
                                        </LinkContainer>

                                        <NavDropdown.Item onClick={() => {
                                            logoutHandler();
                                            setExpanded(false);
                                        }}>Logout</NavDropdown.Item>

                                    </NavDropdown>
                                ) : (
                                    <LinkContainer to='/login'>
                                        <Nav.Link onClick={() => setExpanded(false)}>Login</Nav.Link>
                                    </LinkContainer>
                                )}
                                {userInfo && userInfo.isAdmin && (
                                    <NavDropdown title='Admin' id='adminmenu'>
                                        <LinkContainer to='/admin/userlist'>
                                            <NavDropdown.Item onClick={() => setExpanded(false)}>Users</NavDropdown.Item>
                                        </LinkContainer>
                                        <LinkContainer to='/admin/productlist'>
                                            <NavDropdown.Item onClick={() => setExpanded(false)}>Products</NavDropdown.Item>
                                        </LinkContainer>
                                        <LinkContainer to='/admin/orderlist'>
                                            <NavDropdown.Item onClick={() => setExpanded(false)}>Orders</NavDropdown.Item>
                                        </LinkContainer>

                                    </NavDropdown>
                                )}
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>
        </header>

    )
}

export default Header
