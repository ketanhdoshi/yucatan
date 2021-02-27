import React, { PropTypes } from 'react'
import { Link } from 'react-router-dom'
import s from '../scss/Home.scss'

const Home = () => (    
    <section className={s.home}>
        <Link to="/login">Login</Link>
        <p>Good Content 1</p>
        <p>Main Content 2</p>
        <p>Main Content 3</p>
        <p>Main Content 4</p>
        <p>Main Content 5</p>
        <p>Main Content</p>
        <p>Main Content</p>
        <p>Main Content</p>
        <p>Main Content</p>
    </section>
)

Home.propTypes = {
}

export default Home
