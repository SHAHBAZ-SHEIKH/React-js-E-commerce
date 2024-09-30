import React, { useContext, useEffect } from 'react'
import myContext from '../../context/data/myContext'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart,isItemAdded} from '../../redux/cartSlice'
import { toast } from 'react-toastify'
import Layout from '../../components/layout/Layout'
import Filter from '../../components/filter/Filter'

function AllProduct() {
    const context = useContext(myContext)
    const { mode, product,searchkey, setSearchkey, filterType, setFilterType, filterPrice, setFilterPrice} = context


    const dispatch = useDispatch()
    const cartItem = useSelector((state) => state.cart)
    console.log("cartItem",cartItem)

    const addCart = (product)=>{
        dispatch(addToCart(product))
        toast.success("Product Added successfully")
    }

    

    

   useEffect(()=>{
    localStorage.setItem('cartItem', JSON.stringify(cartItem))

   },[cartItem])



    return (
        <Layout>
            <Filter/>
            <section className="text-gray-600 body-font">
            <div className="container px-5 py-8 md:py-16 mx-auto">
                <div class="lg:w-1/2 w-full mb-6 lg:mb-10">
                    <h1 class="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900" style={{ color: mode === 'dark' ? 'white' : '' }}>Our Latest Collection</h1>
                    <div class="h-1 w-20 bg-pink-600 rounded"></div>
                </div>

                <div className="flex flex-wrap -m-4">
                    {
                        product.filter((item)=>item.title.toLowerCase().includes(searchkey.toLowerCase())).filter((item)=>item.category.toLowerCase().includes(filterType.toLowerCase())).filter((item)=>item.price.includes(filterPrice)).map((item,index) =>{
                            const { id, title, imageurl, price } = item
                            return (
                                <div onClick={()=> window.location.href = `/productinfo/${item.id}`} key={index} className="p-4 md:w-1/4  drop-shadow-lg " >
                                    <div className="h-full border-2 hover:shadow-gray-100 hover:shadow-2xl transition-shadow duration-300 ease-in-out    border-gray-200 border-opacity-60 rounded-2xl overflow-hidden" style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', color: mode === 'dark' ? 'white' : '', }} >
                                        <div className="flex justify-center cursor-pointer" >
                                            <img className=" rounded-2xl w-full h-80 p-2 hover:scale-110 transition-scale-110  duration-300 ease-in-out" src={imageurl} alt="blog" />
                                        </div>
                                        <div className="p-5 border-t-2">
                                            <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1" style={{ color: mode === 'dark' ? 'white' : '', }}>E-Commerce</h2>
                                            <h1 className="title-font text-lg font-medium text-gray-900 mb-3" style={{ color: mode === 'dark' ? 'white' : '', }}>{title}</h1>
                                            {/* <p className="leading-relaxed mb-3">{item.description.}</p> */}
                                            <p className="leading-relaxed mb-3" style={{ color: mode === 'dark' ? 'white' : '' }}>Rs:{price}</p>
                                            <div className=" flex justify-center">
                                                <button onClick={()=>addCart(item)} type="button" className="focus:outline-none text-white bg-pink-600 hover:bg-pink-700 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm w-full  py-2">
                                                    Add to cart
                                                </button>

                                            </div>
                                        </div>

                                    </div>
                                </div>
                            )
                        }






                        )
                    }
                </div>

            </div>
        </section >
        </Layout>

    )
}

export default AllProduct