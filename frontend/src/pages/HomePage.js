import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate'
import SearchBox from '../components/SearchBox'
import { listProducts } from '../actions/productActions'

function HomePage() {
    const dispatch = useDispatch()
    const productList = useSelector(state => state.productList)
    const { error, loading, products, page, pages } = productList
    let keyword = useLocation().search

    useEffect(() => {
        dispatch(listProducts(keyword))

    }, [dispatch, keyword])

    return (
        <div>
            <div className='search-main'>
                <SearchBox />
            </div>

            <h1>Latest Products</h1>

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
                        <Paginate page={page} pages={pages} keyword={keyword} />
                    </div>
            }

        </div>
    )
}

export default HomePage
