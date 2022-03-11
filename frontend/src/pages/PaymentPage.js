import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Form, Button, Col } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { saveShippingAddress } from '../actions/cartActions'
import { savePaymentMethod } from '../actions/cartActions'

function PaymentPage({ }) {
    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart
    const dispatch = useDispatch()
    let navigate = useNavigate()

    const [paymentMethod, setPaymentMethod] = useState('PayPal')

    if (shippingAddress.address) {
        navigate('/shipping')
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        navigate('/placeorder')
    }

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3 />
            <h1 className='checkout-form-title'>Payment Method</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label as='legend' className='sr-only'>Select Method</Form.Label>
                    <Col>
                        <Form.Check
                            type='radio'
                            label='Credit Card or PayPal'
                            id='paypal'
                            name='paymentMethod'
                            checked
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        ></Form.Check>
                    </Col>
                </Form.Group>
                <Button className='checkout-steps-btn' type='submit' variant='primary'>Continue</Button>
            </Form>
        </FormContainer>
    )
}

export default PaymentPage;
