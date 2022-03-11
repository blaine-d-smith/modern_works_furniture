import { Link } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'

function ShopPage() {

    return (
        <div>
            <h1>Select Category</h1>
            <Row className='category-row'>
                <Col md={6}>
                    <div className='banner-container'>
                        <div className='banner-image'>
                            <img src='/images/categories/accent_chairs.jpg' alt='chairs' />
                        </div>
                        <div className='banner-text-container'>
                            <div className='banner-text-outer'>
                                <div className='banner-text-inner'>
                                    Chairs
                                </div>
                            </div>
                        </div>
                        <Link className='banner-link' state={{ category: "chairs" }} to={`/category`} ></Link>

                    </div>
                </Col>
                <Col md={6}>
                    <div className='banner-container'>
                        <div className='banner-image'>
                            <img src='/images/categories/lighting.jpg' alt='lighting' />
                        </div>
                        <div className='banner-text-container'>
                            <div className='banner-text-outer'>
                                <div className='banner-text-inner'>
                                    Lighting
                                </div>
                            </div>

                        </div>
                        <Link className='banner-link' state={{ category: "lighting" }} to={`/category`} ></Link>
                    </div>
                </Col>
            </Row>
            <Row className='category-row'>
                <Col md={6}>
                    <div className='banner-container'>
                        <div className='banner-image'>
                            <img src='/images/categories/sofas.jpeg' alt='sofas' />
                        </div>
                        <div className='banner-text-container'>
                            <div className='banner-text-outer'>
                                <div className='banner-text-inner'>
                                    Sofas
                                </div>
                            </div>

                        </div>
                        <Link className='banner-link' state={{ category: "sofas" }} to={`/category`} ></Link>
                    </div>
                </Col>
                <Col md={6}>
                    <div className='banner-container'>
                        <div className='banner-image'>
                            <img src='/images/categories/tables.jpeg' alt='tables' />
                        </div>
                        <div className='banner-text-container'>
                            <div className='banner-text-outer'>
                                <div className='banner-text-inner'>
                                    Tables
                                </div>
                            </div>
                        </div>
                        <Link className='banner-link' state={{ category: "tables" }} to={`/category`} ></Link>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default ShopPage

