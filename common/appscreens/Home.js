import React, { PropTypes } from 'react'
import { Link } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button';

import s from '../scss/Home.scss'

const Home = () => (
    <Container>
        <Row>
            <Col>1 of 1
                <section className={s.home}>
                    <Link to="/login">Login</Link>
                    <Link to="/lte">LTE</Link>
                    <p>New Content 1</p>
                    <p>Main Content 2</p>
                    <p>Main Content 3</p>
                    <p>Main Content 4</p>
                    <p>Main Content 5</p>
                    <p>Main Content</p>
                    <p>Main Content</p>
                    <p>Main Content</p>
                    <p>Main Content</p>
                </section>
            </Col>
        </Row>
    </Container>
)

Home.propTypes = {
}

export default Home
