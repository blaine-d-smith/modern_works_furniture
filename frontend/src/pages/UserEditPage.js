import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams, useNavigate, Navigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { getUserDetails, updateUser } from '../actions/userActions'
import { USER_UPDATE_RESET } from '../constants/userConstants'


function UserEditPage({ }) {
    const userId = useParams().id
    let navigate = useNavigate()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)

    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    const { error, loading, user } = userDetails

    const userUpdate = useSelector(state => state.userUpdate)
    const { error: errorUpdate, loading: loadingUpdate, success: successUpdate } = userUpdate

    useEffect(() => {

        if (successUpdate) {
            dispatch({ type: USER_UPDATE_RESET })
            navigate('/admin/userlist')
        } else {
            if (!user.name || user._id !== Number(userId)) {
                dispatch(getUserDetails(userId))
            } else {
                setName(user.name)
                setEmail(user.email)
                setIsAdmin(user.isAdmin)
            }
        }
    }, [user, userId, successUpdate])


    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateUser({ _id: user._id, name, email, isAdmin }))
    }

    return (
        <div>
            <Link to='/admin/userlist'>
                Go Back
            </Link>
            <FormContainer>
                <h1>Edit User</h1>
                {loadingUpdate && <Loader />}
                {errorUpdate && <Message variant='danger'>{error}</Message>}
                {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message>
                    : (
                        <Form onSubmit={submitHandler}>
                            <Form.Group className='form-group' controlId='name'>
                                <Form.Label className='sr-only'>Name</Form.Label>
                                <Form.Control
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
                                    type='email'
                                    placeholder='Email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group className='form-group' controlId='isAdmin'>
                                <Form.Label className='sr-only'>Password</Form.Label>
                                <Form.Check
                                    type='checkbox'
                                    label='Is Admin'
                                    checked={isAdmin}
                                    onChange={(e) => setIsAdmin(e.target.checked)}
                                >
                                </Form.Check>
                            </Form.Group>
                            <Button type='update' variant='primary'>Update</Button>
                        </Form>
                    )}
            </FormContainer>
        </div>
    );
}

export default UserEditPage;
