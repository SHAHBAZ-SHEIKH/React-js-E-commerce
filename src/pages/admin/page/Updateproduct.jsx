import React,{useContext} from 'react'
import myContext from '../../../context/data/myContext'

function Updateproduct() {
    const context = useContext(myContext)
    const { products,setproducts,updateProduct} = context

    return (
        <div>
            <div className=' flex justify-center items-center h-screen'>
                <div className=' bg-gray-800 px-10 py-10 rounded-xl '>
                    <div className="">
                        <h1 className='text-center text-white text-xl mb-4 font-bold'>Update Product</h1>
                    </div>
                    <div>
                        <input type="text"
                            name='price'
                            className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                            placeholder='Product price'
                            value={products.price}
                            onChange={(e) => setproducts({ ...products, price: e.target.value })}
                        />
                    </div>
                    <div>
                        <input type="text"
                            name='imageurl'
                            className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                            placeholder='Product imageUrl'
                            value={products.imageurl}
                            onChange={(e) => setproducts({ ...products, imageurl: e.target.value })}
                        />
                    </div>
                    <div>
                        <input type="text"
                            name='category'
                            className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                            placeholder='Product category'
                            value={products.category}
                            onChange={(e) => setproducts({ ...products, category: e.target.value })}
                        />
                    </div>
                    <div>
                       <textarea cols="30" rows="10" name='title'
                       value={products.description}
                       onChange={(e) => setproducts({ ...products, description: e.target.value })}
                            className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                            placeholder='Product description'>
                            

                       </textarea>
                    </div>
                    <div className=' flex justify-center mb-3'>
                        <button onClick={updateProduct}
                            className=' bg-yellow-500 w-full text-black font-bold  px-2 py-2 rounded-lg'>
                            Update Product
                        </button>
                    </div>
                 
                </div>
            </div>
        </div>
    )
}

export default Updateproduct