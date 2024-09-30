import React, { useEffect } from 'react'
import Layout from '../../components/layout/Layout'
import HeroSection from '../../components/heroSection/HeroSection'
import Filter from '../../components/filter/Filter'
import ProductCard from '../../components/productCard/ProductCard'
import Track from '../../components/track/Track'
import Testimonial from '../../components/testimonial/Testimonial'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, deleteFromCart } from '../../redux/cartSlice'

//import { Navigate } from 'react-router-dom'




function Home() {

    const dispatch = useDispatch()
    const cartItem = useSelector((state) => state.cart)

    console.log(cartItem)

    const addCart = () => {
        dispatch(addToCart("Shirt"))
    }

    const deleteCart = () => {
        dispatch(deleteFromCart("Shirt"))
    }

    //    let  user = JSON.parse(localStorage.getItem('user'))





    return (
        <Layout>
            <HeroSection />
            <Filter />
            <ProductCard />
            <Track />
            <Testimonial />
        </Layout>
    )
}

export default Home
