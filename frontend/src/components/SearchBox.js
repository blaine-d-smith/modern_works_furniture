import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router-dom'

function SearchBox() {
    const [keyword, setKeyword] = useState('')
    const [expanded, setExpanded] = useState(false);
    const navigate = useNavigate();
    const location = useLocation()

    const submitHandler = (e) => {
        e.preventDefault()
        if (keyword) {
            navigate(`/?keyword=${keyword.trim()}&page=1`)
        } else {
            navigate(location.pathname)
        }
    }

    return (
        <Form onSubmit={submitHandler} className='search-form'>
            <Form.Control
                className='search-box'
                type='text'
                name='q'
                onChange={(e) => setKeyword(e.target.value)}
            ></Form.Control>
            <Button
                onClick={() => setExpanded(false)}
                className='search-btn'
                type='submit'
                variant='outline-success'>
                Search
            </Button>

        </Form>
    )
}

export default SearchBox