import React, { useEffect } from 'react'
import { useSearchParams, Link, useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import Message from '../components/Message'
import { addToCart, removeFromCart } from '../actions/cartActions'

function CartPage({ }) {
    const [searchParams] = useSearchParams()
    const qty = searchParams.get('qty')
    const productId = useParams().id
    let navigate = useNavigate();

    const dispatch = useDispatch();

    const cart = useSelector(state => state.cart)
    const { cartItems } = cart

    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, qty))
        }
    }, [dispatch, productId, qty])

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    }

    const checkoutHandler = () => {
        navigate('/shipping')
    }


    return (
        <Row>
            <Col md={12}>
                <h1>Cart</h1>
            </Col>
            <Col md={8}>
                {cartItems.length === 0 ? (
                    <Message variant='cart-empty'>
                        Your cart is currently empty. <Link to='/'>Return to shop</Link>
                    </Message>
                ) : (
                    <ListGroup variant='flush'>
                        {cartItems.map(item => (
                            <ListGroup.Item key={item.product} className='cart-items'>
                                <Row>

                                    <Col md={2}>
                                        <Image src={item.image} alt={item.name} className='product-thumbnail' />
                                    </Col>
                                    <Col md={4}>
                                        <Link to={`/product/${item.product}`} className='product-name'>{item.name}</Link>
                                    </Col>
                                    <Col md={2}>
                                        <span className='product-price'>$ {item.price}</span>
                                    </Col>
                                    <Col md={2}>
                                        <Form.Control
                                            as="select"
                                            value={item.qty}
                                            onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}
                                        >
                                            {
                                                [...Array(item.countInStock).keys()].map((x) => (
                                                    <option key={x + 1} value={x + 1}>
                                                        {x + 1}
                                                    </option>
                                                ))
                                            }
                                        </Form.Control>
                                    </Col>
                                    <Col md={2}>
                                        <Button
                                            type='button'
                                            variant='light'
                                            onClick={() => removeFromCartHandler(item.product)}
                                        >
                                            <i className='fas fa-trash'></i>
                                        </Button>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )}
            </Col>

            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <div className='cart-summary-row'>
                                <span className='cart-subtotal-left'>Subtotal</span>
                                <span className='cart-subtotal-right'>${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)} </span>
                            </div>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button
                                type='button'
                                className='checkout-btn button alt wc-forward'
                                disabled={cartItems.length === 0}
                                onClick={checkoutHandler}
                            >
                                Proceed to Checkout
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    )
}
export default CartPage
