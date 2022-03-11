import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useSearchParams, useLocation } from 'react-router-dom'
import { Row, Col, Form, Button } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { login } from '../actions/userActions'
import FormContainer from '../components/FormContainer'

function LoginPage({ }) {
    const navigate = useNavigate();
    const location = useLocation()
    let from = location.state?.from?.pathname || "/";
    const dispatch = useDispatch()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const userLogin = useSelector(state => state.userLogin)
    const { error, loading, userInfo } = userLogin

    useEffect(() => {
        if (userInfo) {
            navigate(from, { replace: true });
        }
    }, [userInfo])


    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
    }

    return (
        <FormContainer className="col-lg-5 center p-50 background-white b-r-6">
            <h1>Sign In</h1>
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
                <Form.Group className='form-group' controlId='email'>
                    <Form.Label className='sr-only'>Email</Form.Label>
                    <Form.Control
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
                        type='password'
                        placeholder='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                <Button type='submit' variant='primary'>Login</Button>
            </Form>
            <p className="small">Don't have an account yet? <Link
                to='/register'>
                Sign Up
            </Link>
            </p>
        </FormContainer>

    )
}

export default LoginPage;
