import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listProductDetails, updateProduct } from '../actions/productActions'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'


function ProductEditPage({ }) {
    const productId = useParams().id
    let navigate = useNavigate()

    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [description, setDescription] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [uploading, setUploading] = useState(false)

    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails)
    const { error, loading, product } = productDetails

    const productUpdate = useSelector(state => state.productUpdate)
    const { error: errorUpdate, loading: loadingUpdate, success: successUpdate } = productUpdate

    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: PRODUCT_UPDATE_RESET })
            navigate('/admin/productlist')
        } else {
            if (!product.name || product._id !== Number(productId)) {
                dispatch(listProductDetails(productId))
            } else {
                setName(product.name)
                setPrice(product.price)
                setImage(product.image)
                setBrand(product.brand)
                setCategory(product.category)
                setDescription(product.description)
                setCountInStock(product.countInStock)
                setUploading(product.uploading)
            }
        }
    }, [dispatch, product, productId, successUpdate])


    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateProduct({
            _id: productId,
            name,
            price,
            image,
            brand,
            category,
            countInStock,
            description
        }))
    }

    const uploadFileHandler = async (e) => {
        console.log('File Uploaded')
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image', file)
        formData.append('product_id', productId)

        setUploading(true)
        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
            const { data } = await axios.post('/api/products/upload/', formData, config)
            setImage(data)
            setUploading(false)

        } catch (error) {
            setUploading(false)
        }
    }

    return (
        <div>
            <Link to='/admin/productlist'>
                Go Back
            </Link>
            <FormContainer>
                <h1>Edit Product</h1>
                {loadingUpdate && <Loader />}
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}

                {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message>
                    : (
                        <Form onSubmit={submitHandler}>
                            <Form.Group className='form-group' controlId='name'>
                                <Form.Label className=''>Name</Form.Label>
                                <Form.Control
                                    type='name'
                                    placeholder='Name'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>
                            <Form.Group className='form-group' controlId='price'>
                                <Form.Label className=''>Price</Form.Label>
                                <Form.Control
                                    type='number'
                                    placeholder='Price'
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group className='form-group'>
                                <Form.Label className=''>Image</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Image'
                                    value={image}
                                    onChange={(e) => setImage(e.target.value)}
                                >
                                </Form.Control>
                                <Form.Control
                                    type='file'
                                    id='image-file'
                                    label='Choose Image'
                                    onChange={uploadFileHandler}
                                >
                                </Form.Control>
                                {uploading && <Loader />}
                            </Form.Group>


                            <Form.Group className='form-group' controlId='brand'>
                                <Form.Label className=''>Brand</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Brand'
                                    value={brand}
                                    onChange={(e) => setBrand(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group className='form-group' controlId='category'>
                                <Form.Label className=''>Category</Form.Label>
                                <Form.Select aria-label="Category"
                                    required
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                >
                                    <option value="">Select Category</option>
                                    <option value="Accent Chairs">Accent Chairs</option>
                                    <option value="Lighting">Lighting</option>
                                    <option value="Sofas">Sofas</option>
                                    <option value="Tables">Tables</option>
                                </Form.Select>
                            </Form.Group>

                            <Form.Group className='form-group' controlId='countinstock'>
                                <Form.Label className=''>Stock</Form.Label>
                                <Form.Control
                                    type='number'
                                    placeholder='Stock'
                                    value={countInStock}
                                    onChange={(e) => setCountInStock(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group className='form-group' controlId='description'>
                                <Form.Label className=''>Description</Form.Label>
                                <Form.Control
                                    type='text'
                                    as='textarea'
                                    rows={3}
                                    placeholder='Description'
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>

                            <Button type='update' variant='primary'>Update</Button>
                        </Form>
                    )}
            </FormContainer>
        </div>
    )
}

export default ProductEditPage
