import React from 'react'
import { Card } from 'react-bootstrap'
import Rating from './Rating'
import { Link } from 'react-router-dom'

function Product({ product }) {
    return (
        <Card className="product mb-3">
            <Link to={`/product/${product._id}`}>
                <Card.Img src={product.image} />
            </Link>

            <Card.Body>
                <Card.Text as="div">
                    <div className="product-category">
                        {product.category}
                    </div>
                </Card.Text>
                <Link to={`/product/${product._id}`}>
                    <Card.Title as="div">
                        <div className="product-title">
                            {product.name}
                        </div>
                    </Card.Title>
                </Link>
                <Card.Text as="div">
                    <div className="my-3">
                        <Rating value={product.rating} text={`${product.numReviews}`} color={'#ffc300'} />
                    </div>
                </Card.Text>
                <Card.Text as="h3">
                    ${product.price}
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default Product