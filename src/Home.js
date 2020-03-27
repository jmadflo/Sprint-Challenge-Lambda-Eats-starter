import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
    return(
        <div className='home-page'>
            <h2>Order One of Our Amazing Pizzas Now!</h2>
            <Link to='/pizza'>
                <button>Order Pizza</button>
            </Link>
        </div>
    )
}

export default Home;