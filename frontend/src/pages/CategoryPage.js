import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import Loader from '../components/Loader'
import Message from '../components/Message'
import SearchBox from '../components/SearchBox'
import { listCategoryProducts } from '../actions/productActions'

function CategoryPage() {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const location = useLocation()
    const { category } = location.state

    const productCategory = useSelector(state => state.productCategory)
    const { error, loading, products } = productCategory

    useEffect(() => {
        if (category) {
            dispatch(listCategoryProducts(category))
        } else {
            navigate('/')
        }
    }, [dispatch, category])

    return (
        <div>
            <div className='search-main'>
                <SearchBox />
            </div>

            <Row className='product-list-header'>
                <Col>
                    <h1 className='category-page-title'>{category}</h1>
                </Col>
                <Col className='text-right'>
                    <a href='/' className='btn my-3'>
                        Shop All Products
                    </a>
                </Col>

            </Row>

            {loading ? <Loader />
                : error ? <Message variant='secondary'>{error}</Message>
                    :
                    <div>
                        <Row>
                            {products.map(product => (
                                <Col key={product._id} sm={12} md={6} lg={4}>
                                    <Product product={product} />
                                </Col>
                            ))}
                        </Row>
                    </div>
            }

        </div>
    )
}

export default CategoryPage
