import { Timestamp } from "firebase/firestore";
import myContext from "./myContext";
import { toast } from 'react-toastify';
import { db } from "../../firebase/FireBase";
import { addDoc, collection, onSnapshot, query, orderBy, limit, deleteDoc, doc, setDoc,getDocs } from "firebase/firestore";

import React, { useEffect, useState } from 'react'

function MyState({ children }) {
    const [mode, setMode] = useState('light')
    const [loading, setLoading] = useState(false)

    const toggleMode = () => {
        if (mode === 'light') {
            setMode('dark')
            document.body.style.backgroundColor = 'rgb(17,24,39)'
        }
        else {
            setMode('light')
            document.body.style.backgroundColor = 'white'
        }


    }

    const [products, setproducts] = useState({
        title: null,
        price: null,
        imageurl: null,
        description: null,
        time: Timestamp.now(),
        date: new Date().toLocaleDateString(
            'en-US',
            {
                year: 'numeric',
                month: 'short',
                day: '2-digit',


            }
        )
    })

    const addproduct = async () => {
        if (products.title == null || products.price == null || products.imageurl == null || products.category == null || products.description == null) {
            return toast.error('Please fill all fields')
        }
        const productRef = collection(db, "products")
        setLoading(true)
        try {
            await addDoc(productRef, products)
            toast.success("Product Add successfully")
            setTimeout(() => {
                window.location.href = '/dashboard'
            }, 8000)
            getProducts()

            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
        setproducts("")
    }

    const [product, setProduct] = useState([])

    const getProducts = async () => {
        setLoading(true)
        try {
            const q = query(
                collection(db, "products"),
                orderBy("time"),
                // limit(5)
            );
            const data = onSnapshot(q, (QuerySnapshot) => {
                let productsArray = [];
                QuerySnapshot.forEach((doc) => {
                    productsArray.push({ ...doc.data(), id: doc.id });
                });
                setProduct(productsArray)
                setLoading(false);
            });
            return () => data;
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    const edithandle = (item) => {
        setproducts(item)
    }
    // update product
    const updateProduct = async (item) => {
        setLoading(true)
        try {
            await setDoc(doc(db, "products", products.id), products);
            toast.success("Product Updated successfully")
            getProducts();
            setLoading(false)
            toast.success("Product Updated successfully")
           setTimeout(() => {
               window.location.href = '/dashboard'
           },8000)
        } catch (error) {
            setLoading(false)
            console.log(error)
        }
        setproducts("")
    }

    const deleteProduct = async (item) => {

        try {
            setLoading(true)
            await deleteDoc(doc(db, "products", item.id));
            toast.success('Product Deleted successfully')
            setLoading(false)
            getProducts()
        } catch (error) {
            toast.success('Product Deleted Falied')
            setLoading(false)
        }
    }

    //Orders Get

    const [order, setOrder] = useState([]);

  const getOrderData = async () => {
    setLoading(true)
    try {
      const result = await getDocs(collection(db, "orders"))
      const ordersArray = [];
      result.forEach((doc) => {
        ordersArray.push(doc.data());
        
        
        
      });
      setOrder(ordersArray);
      console.log(ordersArray)
      setLoading(false);
      
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  //Get User Data

  const [user, setUser] = useState([]);

  const getUserData = async () => {
    setLoading(true)
    try {
      const result = await getDocs(collection(db, "users"))
      const usersArray = [];
      result.forEach((doc) => {
        usersArray.push(doc.data());
        setLoading(false)
      });
      setUser(usersArray);
      console.log(usersArray)
      setLoading(false);
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  const [searchkey, setSearchkey] = useState('')
  const [filterType, setFilterType] = useState('')
  const [filterPrice, setFilterPrice] = useState('')


    useEffect(() => {
        getProducts()
        getOrderData()
        getUserData()
    }, [])



    return (
        <myContext.Provider value={{ mode, toggleMode, loading, setLoading, addproduct, products, setproducts, product,setProduct, deleteProduct, edithandle, updateProduct, order, setOrder,user, setUser,searchkey, setSearchkey, filterType, setFilterType, filterPrice, setFilterPrice }}>
            {children}

        </myContext.Provider>
    )
}

export default MyState
