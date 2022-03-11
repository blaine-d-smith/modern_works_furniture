import React from 'react'
import { Container, Row } from 'react-bootstrap'

function FormContainer({ children }) {
    return (
        <Container>
            <Row>
                <div className="col-lg-6 center p-50 background-white b-r-6">
                    {children}
                </div>
            </Row>
        </Container>
    )
}

export default FormContainer;
