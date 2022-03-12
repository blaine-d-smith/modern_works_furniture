import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Row, Col, Image, Button, Form, ListGroup } from 'react-bootstrap'
import Rating from '../components/Rating'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listProductDetails, createProductReview } from '../actions/productActions'
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants'


function ProductPage({ }) {
    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

    const [qty, setQty] = useState(1)
    const [city, setCity] = useState(shippingAddress.city)
    const [state, setState] = useState(shippingAddress.state)
    const [rating, setRating] = useState(1)
    const [comment, setComment] = useState()

    const productId = useParams().id
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product } = productDetails

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const productReviewCreate = useSelector(state => state.productReviewCreate)
    const { loading: loadingProductReview, error: errorProductReview, success: successProductReview, } = productReviewCreate

    useEffect(() => {
        if (successProductReview) {
            setCity('')
            setState('')
            setRating(0)
            setComment('')
            dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
        }

        dispatch(listProductDetails(productId))
    }, [dispatch, productId, successProductReview])

    const addToCartHandler = () => {
        navigate(`/cart/${productId}?qty=${qty}`);
    };

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(createProductReview(
            productId, {
            city,
            state,
            rating,
            comment
        }
        ))
    }

    return (
        <div>
            {loading ?
                <Loader />
                : error
                    ? <Message variant='secondary'>{error}</Message>
                    : (
                        <div>
                            <Row className='m-b-40'>
                                <Col lg={5}>
                                    <Image src={product.image} alt={product.image} fluid />
                                </Col>
                                <Col lg={7}>
                                    <div className="product-description">
                                        <Link to={`/${product.category}`}><div className="product-category">{product.category}</div></Link>
                                        <div className="product-title">
                                            <h3>{product.name}</h3>
                                        </div>
                                        <div className="product-price"><ins>$ {product.price}</ins>
                                        </div>
                                        <div className="product-rate">
                                            <Rating value={product.rating} text={`${product.numReviews}`} color={'#ffc300'} />
                                        </div>
                                        <div className="seperator m-b-10"></div>
                                        <p>{product.description}</p>
                                        <div className="seperator m-t-20 m-b-10"></div>
                                    </div>

                                    {product.countInStock > 0 && (
                                        <Row>
                                            <Col lg={2} className='col-lr-padding'>
                                                <h5>Quantity</h5>
                                            </Col>
                                            <Col lg={2} className='col-lr-padding'>
                                                <Form.Control
                                                    as="select"
                                                    value={qty}
                                                    onChange={(e) => setQty(e.target.value)}
                                                >
                                                    {
                                                        [...Array(product.countInStock).keys()].map((x) => (
                                                            <option key={x + 1} value={x + 1}>
                                                                {x + 1}
                                                            </option>
                                                        ))
                                                    }
                                                </Form.Control>
                                            </Col>
                                            <Col lg={4} className='col-lr-padding'>
                                                <Button
                                                    onClick={addToCartHandler}
                                                    className='btn-primary add-to-cart-btn'
                                                    disabled={product.countInStock == 0}
                                                    type='button'>
                                                    Add to cart
                                                </Button>
                                            </Col>
                                        </Row>
                                    )}
                                </Col>
                            </Row>

                            <Row className='review-row-container'>
                                <Col>
                                    <h3>Ratings & Reviews</h3>
                                    {product.reviews.length === 0 && <Message variant='info'>No Reviews</Message>}
                                    <ListGroup>
                                        {product.reviews.map((review) => (
                                            <ListGroup.Item key={review._id}>
                                                <Row className='review-container'>
                                                    <Col md={2} className='review-col'>
                                                        <div className='review-inner-container name-location-container'>
                                                            <span className='review-name'>{review.name}</span>
                                                            <span className='review-location'>{review.city}, {review.state}</span>
                                                        </div>
                                                    </Col>
                                                    <Col md={10} className='review-col'>
                                                        <div className='review-inner-container'>
                                                            <span className='review-rating'><Rating value={review.rating} color='#f8e825' /></span>
                                                            <span className='review-date'>{review.dateCreated.substring(0, 10)}</span>
                                                        </div>
                                                        <div className='review-inner-container'>
                                                            <span className='review-comment'>{review.comment}</span>
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        ))}
                                        <ListGroup.Item>
                                            <h4>Write a review</h4>
                                            {loadingProductReview && <Loader />}
                                            {successProductReview && <Message variant='success'>Review Submitted</Message>}
                                            {errorProductReview && <Message variant='danger'>{errorProductReview}</Message>}

                                            {userInfo ? (
                                                <Form onSubmit={submitHandler}>
                                                    <Form.Group controlId='city'>
                                                        <Form.Label>City</Form.Label>
                                                        <Form.Control
                                                            required
                                                            type='text'
                                                            value={city}
                                                            onChange={(e) => setCity(e.target.value)}
                                                        ></Form.Control>
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
                                                    <Form.Group controlId='rating'>
                                                        <Form.Label>Rating</Form.Label>
                                                        <Form.Control
                                                            as='select'
                                                            value={rating}
                                                            onChange={(e) => setRating(e.target.value)}
                                                        >
                                                            <option value=''>Select...</option>
                                                            <option value='1'>1 - Poor</option>
                                                            <option value='2'>2 - Fair</option>
                                                            <option value='3'>3 - Good</option>
                                                            <option value='4'>4 - Very Good</option>
                                                            <option value='5'>5 - Excellent</option>
                                                        </Form.Control>
                                                    </Form.Group>

                                                    <Form.Group controlId='comment'>
                                                        <Form.Label>Review</Form.Label>
                                                        <Form.Control
                                                            required
                                                            as='textarea'
                                                            row='5'
                                                            value={comment}
                                                            onChange={(e) => setComment(e.target.value)}
                                                        ></Form.Control>
                                                    </Form.Group>

                                                    <Button
                                                        disabled={loadingProductReview}
                                                        className='review-btn'
                                                        type='submit'
                                                        variant='primary'
                                                    >
                                                        Submit
                                                    </Button>

                                                </Form>
                                            ) : (
                                                <Message variant='info'>Please <Link to='/login'>login</Link> to write a review</Message>
                                            )}
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Col>
                            </Row>
                        </div >
                    )
            }
        </div >
    )
}

export default ProductPage
