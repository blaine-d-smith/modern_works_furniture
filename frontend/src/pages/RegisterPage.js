import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams, Link, useParams, useNavigate, useLocation } from 'react-router-dom'
import { Row, Col, Form, Button } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { register } from '../actions/userActions'
import FormContainer from '../components/FormContainer'

function RegisterPage({ }) {
    const [searchParams, setSearchParams] = useSearchParams()
    let location = useLocation();
    const redirect = location.search ? location.search.split('=')[1] : '/'

    let navigate = useNavigate();
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    const dispatch = useDispatch()

    const userRegister = useSelector(state => state.userRegister)
    const { error, loading, userInfo } = userRegister

    useEffect(() => {
        if (userInfo) {
            navigate(redirect)
        }
    }, [userInfo, redirect])


    const submitHandler = (e) => {
        e.preventDefault()

        // Check if passwords match
        if (password != confirmPassword) {
            setMessage('Passwords do not match')
        } else {
            dispatch(register(name, email, password))
        }

    }

    return (
        <FormContainer>
            <h1>Registration Form</h1>
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
                <Form.Group className='form-group' controlId='name'>
                    <Form.Label className='sr-only'>Name</Form.Label>
                    <Form.Control
                        required
                        type='name'
                        placeholder='Name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group className='form-group' controlId='email'>
                    <Form.Label className='sr-only'>Email</Form.Label>
                    <Form.Control
                        required
                        type='email'
                        placeholder='Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group className='form-group' controlId='password'>
                    <Form.Label className='sr-only'>Password</Form.Label>
                    <Form.Control
                        required
                        type='password'
                        placeholder='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group className='form-group' controlId='passwordConfirm'>
                    <Form.Label className='sr-only'>Confirm Password</Form.Label>
                    <Form.Control
                        required
                        type='password'
                        placeholder='Confirm Password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary'>Register</Button>

            </Form>
            <p className="small">Already have an account? <Link
                to={redirect ? `/login?redirect=${redirect}` : '/login'}>
                Sign In
            </Link>
            </p>
        </FormContainer>
    );
}

export default RegisterPage;
