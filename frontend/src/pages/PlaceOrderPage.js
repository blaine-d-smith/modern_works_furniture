import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col, Image, Card, ListGroup } from 'react-bootstrap'
import CheckoutSteps from '../components/CheckoutSteps'
import Message from '../components/Message'
import { saveShippingAddress } from '../actions/cartActions'
import { createOrder } from '../actions/orderActions'
import { ORDER_CREATE_RESET } from '../constants/orderConstants'

function PlaceOrderPage({ }) {

    const orderCreate = useSelector(state => state.orderCreate)
    const { order, error, success } = orderCreate
    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)
    let navigate = useNavigate();

    cart.itemsPrice = cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)
    cart.shippingPrice = (cart.cartItems.length * 24.99).toFixed(2)
    cart.taxPrice = (cart.itemsPrice * (0.0625)).toFixed(2)
    cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)).toFixed(2)

    if (!cart.paymentMethod) {
        navigate('/payment')
    }

    useEffect(() => {
        if (success) {
            navigate(`/order/${order._id}`)
            dispatch({ type: ORDER_CREATE_RESET })
        }
    }, [success])

    const placeOrder = () => {
        dispatch(createOrder({
            orderItems: cart.cartItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentMethod,
            itemsPrice: cart.itemsPrice,
            shippingPrice: cart.shippingPrice,
            taxPrice: cart.taxPrice,
            totalPrice: cart.totalPrice,
        }))
    }

    return (
        <div>
            <CheckoutSteps step1 step2 step3 step4 />
            <Row>
                <Col md={4}>
                    <ListGroup.Item>
                        <h3>Shipping Address</h3>
                        <Row className='m0'>{cart.shippingAddress.address}</Row>
                        <Row>{cart.shippingAddress.city}, {cart.shippingAddress.state} {cart.shippingAddress.zipCode}</Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <h3>Payment Method</h3>
                        <Row className='m0'>{cart.paymentMethod}</Row>
                    </ListGroup.Item>
                    <div className='table-responsive order-total-table-container'>
                        <h3>Order Total</h3>
                        <table className='table'>
                            <tbody>
                                <tr>
                                    <td>Subtotal</td>
                                    <td className='text-right'>${cart.cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}</td>
                                </tr>
                                <tr>
                                    <td>Shipping</td>
                                    <td className='text-right'>
                                        ${cart.shippingPrice}
                                    </td>
                                </tr>
                                <tr>
                                    <td>Tax</td>
                                    <td className='text-right'>${cart.taxPrice}</td>
                                </tr>
                                <tr className='checkout-total'>
                                    <td>Total</td>
                                    <td className='text-right'>${cart.totalPrice}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    {error && <Message variant='danger'>{error}</Message>}
                    <ListGroup.Item>
                        <Button
                            type='button'
                            className='btn-blk submit-order-btn'
                            disabled={cart.cartItems === 0}
                            onClick={placeOrder}
                        >
                            Submit Order
                        </Button>
                    </ListGroup.Item>

                </Col>
                <Col md={8}>
                    <Row>
                        <ListGroup.Item>
                            <h3>Items</h3>
                            {cart.cartItems.length === 0 ? <Message variant='info'>
                                Cart is empty
                            </Message> : (
                                <ListGroup.Item variant='flush'>
                                    {cart.cartItems.map((item, index) => (
                                        <ListGroup.Item key={index} className='cart-items-checkout'>
                                            <Row>
                                                <Col md={2}>
                                                    <Image src={item.image} alt={item.name} className='product-thumbnail' />
                                                </Col>
                                                <Col md={4}>
                                                    <span className='product-name'>{item.name}</span>
                                                </Col>
                                                <Col md={2}>
                                                    <span className='product-price'>$ {item.price}</span>
                                                </Col>
                                                <Col md={2}>
                                                    <span className='product-qty'>{item.qty}</span>
                                                </Col>
                                                <Col md={2}>
                                                    <span className='product-subtotal'>
                                                        ${(item.qty * item.price).toFixed(2)}
                                                    </span>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup.Item>
                            )}
                        </ListGroup.Item>
                    </Row>
                </Col>
            </Row>
        </div>
    )
}

export default PlaceOrderPage;
