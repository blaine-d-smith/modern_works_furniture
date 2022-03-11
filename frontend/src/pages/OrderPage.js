import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { PayPalButton } from 'react-paypal-button-v2'
import { useSearchParams, Link, useParams, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col, Image, ListGroup } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getOrderDetails, payOrder, deliverOrder } from '../actions/orderActions'
import { ORDER_PAY_RESET, ORDER_DELIVER_RESET } from '../constants/orderConstants'

function OrderPage({ }) {
    const orderId = useParams().id
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [sdkReady, setSdkReady] = useState(false)

    const orderDetails = useSelector(state => state.orderDetails)
    const { order, error, loading } = orderDetails

    const orderPay = useSelector(state => state.orderPay)
    const { loading: loadingPay, success: successPay } = orderPay

    const orderDeliver = useSelector(state => state.orderDeliver)
    const { loading: loadingDeliver, success: successDeliver } = orderDeliver

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    if (!loading && !error) {
        order.itemsPrice = order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)
    }

    // PayPal Script
    const addPayPalScript = () => {
        const payPalClientId = 'AeDSp-r3cyxkyhlRPeP_PNRZ7G1QBpxTmy45bhFVS6jzn8YrVMJNEwsShzjLWjJ6qVI4aT4nsoVlmcRg'
        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = `https://www.paypal.com/sdk/js?client-id=${payPalClientId}&enable-funding=venmo&currency=USD`
        script.async = true
        script.onload = () => {
            setSdkReady(true)
        }
        document.body.appendChild(script)
    }

    useEffect(() => {
        if (!userInfo) {
            navigate('/login')
        }
        if (!order || successPay || order._id !== Number(orderId) || successDeliver) {
            dispatch({ type: ORDER_PAY_RESET })
            dispatch({ type: ORDER_DELIVER_RESET })
            dispatch(getOrderDetails(orderId))
        } else if (!order.isPaid) {
            if (!window.paypal) {
                addPayPalScript()
            } else {
                setSdkReady(true)
            }
        }
    }, [order, orderId, successPay, successDeliver])


    const successPaymentHandler = (paymentResult) => {
        dispatch(payOrder(orderId, paymentResult))
    }


    const deliverHandler = () => {
        dispatch(deliverOrder(order))
    }

    return loading ? (
        <Loader />
    ) : error ? (
        <Message variant='danger'>{error}</Message>
    ) : (
        <div>
            <Row>
                <h1>Order #: {order._id}</h1>
                <Col md={4}>
                    <ListGroup>
                        <ListGroup.Item>
                            <h3>Shipping Address</h3>
                            <Row className='m0'>{order.user.name}</Row>
                            <Row className='m0'>{order.shippingAddress.address}</Row>
                            <Row>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}</Row>
                            <Row>{order.user.email}</Row>
                            {order.isDelivered ? (
                                <Row>Delivered on {order.dateDelivered}</Row>
                            ) : (
                                <Message variant='warning'>In route</Message>
                            )}
                            {loadingDeliver && <Loader />}
                            {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                                <Button
                                    type='button'
                                    className='btn btn-block'
                                    onClick={deliverHandler}
                                >
                                    Mark Delivered
                                </Button>
                            )}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h3>Payment Method</h3>
                            <Row className='m0'>{order.paymentMethod}</Row>
                            {order.isPaid ? (
                                <Row>Paid on {order.datePaid}</Row>
                            ) : (
                                <Message variant='warning'>Not Paid</Message>
                            )}
                        </ListGroup.Item>

                        {/* Load PayPal buttons if order.isPaid is false */}
                        {!order.isPaid && (
                            <ListGroup.Item>
                                {loadingPay && <Loader />}
                                {!sdkReady ? (
                                    <Loader />
                                ) : (
                                    <PayPalButton
                                        amount={order.totalPrice}
                                        onSuccess={successPaymentHandler} />
                                )}
                            </ListGroup.Item>
                        )}
                    </ListGroup>


                    <div className='table-responsive order-total-table-container'>
                        <h3>Order Total</h3>
                        <table className='table'>
                            <tbody>
                                <tr>
                                    <td>Subtotal</td>
                                    <td className='text-right'>${order.orderItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}</td>
                                </tr>
                                <tr>
                                    <td>Shipping</td>
                                    <td className='text-right'>
                                        ${order.shippingPrice}
                                    </td>
                                </tr>
                                <tr>
                                    <td>Tax</td>
                                    <td className='text-right'>${order.taxPrice}</td>
                                </tr>
                                <tr className='checkout-total'>
                                    <td>Total</td>
                                    <td className='text-right'>${order.totalPrice}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                </Col>
                <Col md={8}>
                    <Row>
                        <ListGroup.Item>
                            <h3>Items</h3>
                            {order.orderItems.length === 0 ? <Message variant='info'>
                                No items in order
                            </Message> : (
                                <ListGroup.Item variant='flush'>
                                    {order.orderItems.map((item, index) => (
                                        <ListGroup.Item key={index} className='order-items-checkout'>
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

export default OrderPage;
