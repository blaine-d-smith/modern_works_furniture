import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { saveShippingAddress } from '../actions/cartActions'


function ShippingPage({ }) {
    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart
    const dispatch = useDispatch()
    let navigate = useNavigate();

    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [state, setState] = useState(shippingAddress.state)
    const [zipCode, setZipCode] = useState(shippingAddress.zipCode)

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveShippingAddress({ address, city, state, zipCode }))
        navigate('/payment')
    }

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 />
            <h1 className='checkout-form-title'>Shipping Address</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group className='form-group' controlId='address'>
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        value={address ? address : ''}
                        onChange={(e) => setAddress(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                <Form.Group className='form-group' controlId='city'>
                    <Form.Label>City</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        value={city ? city : ''}
                        onChange={(e) => setCity(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                <Form.Group className='form-group' controlId='state'>
                    <Form.Label>State</Form.Label>
                    <Form.Select aria-label="Select State"
                        required
                        value={state ? state : ''}
                        onChange={(e) => setState(e.target.value)}
                    >
                        <option value="">Select State</option>
                        <option value="AK">Alaska</option>
                        <option value="AL">Alabama</option>
                        <option value="AR">Arkansas</option>
                        <option value="AZ">Arizona</option>
                        <option value="CA">California</option>
                        <option value="CO">Colorado</option>
                        <option value="CT">Connecticut</option>
                        <option value="DC">District of Columbia</option>
                        <option value="DE">Delaware</option>
                        <option value="FL">Florida</option>
                        <option value="GA">Georgia</option>
                        <option value="HI">Hawaii</option>
                        <option value="IA">Iowa</option>
                        <option value="ID">Idaho</option>
                        <option value="IL">Illinois</option>
                        <option value="IN">Indiana</option>
                        <option value="KS">Kansas</option>
                        <option value="KY">Kentucky</option>
                        <option value="LA">Louisiana</option>
                        <option value="MA">Massachusetts</option>
                        <option value="MD">Maryland</option>
                        <option value="ME">Maine</option>
                        <option value="MI">Michigan</option>
                        <option value="MN">Minnesota</option>
                        <option value="MO">Missouri</option>
                        <option value="MS">Mississippi</option>
                        <option value="MT">Montana</option>
                        <option value="NC">North Carolina</option>
                        <option value="ND">North Dakota</option>
                        <option value="NE">Nebraska</option>
                        <option value="NH">New Hampshire</option>
                        <option value="NJ">New Jersey</option>
                        <option value="NM">New Mexico</option>
                        <option value="NV">Nevada</option>
                        <option value="NY">New York</option>
                        <option value="OH">Ohio</option>
                        <option value="OK">Oklahoma</option>
                        <option value="OR">Oregon</option>
                        <option value="PA">Pennsylvania</option>
                        <option value="PR">Puerto Rico</option>
                        <option value="RI">Rhode Island</option>
                        <option value="SC">South Carolina</option>
                        <option value="SD">South Dakota</option>
                        <option value="TN">Tennessee</option>
                        <option value="TX">Texas</option>
                        <option value="UT">Utah</option>
                        <option value="VA">Virginia</option>
                        <option value="VT">Vermont</option>
                        <option value="WA">Washington</option>
                        <option value="WI">Wisconsin</option>
                        <option value="WV">West Virginia</option>
                        <option value="WY">Wyoming</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group className='form-group' controlId='zipCode'>
                    <Form.Label>Zip Code</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        value={zipCode ? zipCode : ''}
                        onChange={(e) => setZipCode(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                <Button className='checkout-steps-btn' type='submit' variant='primary'>Continue</Button>
            </Form>
        </FormContainer>

    )
}

export default ShippingPage;
