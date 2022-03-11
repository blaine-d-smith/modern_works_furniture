import { HashRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import ShippingPage from './pages/ShippingPage';
import PaymentPage from './pages/PaymentPage';
import PlaceOrderPage from './pages/PlaceOrderPage';
import OrderPage from './pages/OrderPage';
import UserListPage from './pages/UserListPage';
import UserEditPage from './pages/UserEditPage';
import ProductListPage from './pages/ProductListPage';
import ProductEditPage from './pages/ProductEditPage';
import OrderListPage from './pages/OrderListPage';
import CategoryPage from './pages/CategoryPage'


function App() {
  return (
    <Router>
      <Header />
      <main className='py-5'>
        <Container>
          <Routes>
            <Route exact path='/' element={<HomePage />} />
            <Route exact path='/shop' element={<ShopPage />} />
            <Route exact path='/category' element={<CategoryPage />} />
            <Route path='/product/:id' element={<ProductPage />} />
            <Route path='cart' element={<CartPage />} >
              <Route path=':id' element={<CartPage />} />
            </Route>

            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route
              path='/profile'
              element={
                <RequireAuth>
                  <ProfilePage />
                </RequireAuth>
              } />
            <Route
              path='/shipping'
              element={
                <RequireAuth>
                  <ShippingPage />
                </RequireAuth>
              } />
            <Route path='/payment' element={<PaymentPage />} />
            <Route path='/placeorder' element={<PlaceOrderPage />} />
            <Route path='/order/:id' element={<OrderPage />} />

            <Route path='/admin/userlist' element={<UserListPage />} />
            <Route path='/admin/user/:id/edit' element={<UserEditPage />} />

            <Route path='/admin/productlist' element={<ProductListPage />} />
            <Route path='/admin/product/:id/edit' element={<ProductEditPage />} />

            <Route path='/admin/orderlist' element={<OrderListPage />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;


function RequireAuth({ children }) {
  let location = useLocation();

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  if (!userInfo) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children

}