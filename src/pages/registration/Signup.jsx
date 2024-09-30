import { Link } from 'react-router-dom'
import { useState, useContext } from 'react'
import myContext from '../../context/data/myContext'
import { toast } from 'react-toastify'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '../../firebase/FireBase'
import { collection, setDoc, doc, Timestamp,addDoc } from "firebase/firestore";
import Loader from '../../components/loader/Loader'



function Signup() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const context = useContext(myContext)
    const { loading, setLoading } = context



    const signupHandler = async (e) => {
        setLoading(true)
        e.preventDefault()
        console.log(name, email, password)
        if (!name || !email || !password) {
            setLoading(false)
            return toast.error('Please fill all the fields')

        }

        if (name.includes("@")) {
            setLoading(false)
            return toast.error('Please enter a valid name')


        }

        // if(password.length > 6 ){
        //     setLoading(false)
        //     return toast.error('Please enter a valid password')
        // }






        try {
            const users = await createUserWithEmailAndPassword(auth, email, password);

            // console.log(users)

            const user = {
                name: name,
                uid: users.user.uid,
                email: users.user.email,
                time: Timestamp.now()
            }
            const userRef = collection(db, "users")
            await addDoc(userRef, user);
            toast.success("Signup Succesfully")
            setName("");
            setEmail("");
            setPassword("");
            setLoading(false)

        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }




    return (
        <div className=' flex justify-center items-center h-screen'>
            {loading && <Loader />}
            <div className=' bg-gray-800 px-10 py-10 rounded-xl '>
                <div className="">
                    <h1 className='text-center text-white text-xl mb-4 font-bold'>Sign Up</h1>
                </div>

                <div>
                    <input type="text"
                        name='Shahbaz Ahmed'
                        value={name}
                        className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                        placeholder='Enter Name'
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div>
                    <input type="email"
                        name='email'
                        value={email}
                        className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                        placeholder='Email'
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <input
                        type="password"
                        value={password}
                        className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                        placeholder='Password'
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className=' flex justify-center mb-3'>
                    <button onClick={signupHandler}
                        className=' bg-yellow-500 w-full text-black font-bold  px-2 py-2 rounded-lg'>
                        Signup
                    </button>
                </div>
                <div>
                    <h2 className='text-white'>Have an account <Link className=' text-yellow-500 font-bold' to={'/login'}>Login</Link></h2>
                </div>
            </div>
        </div>
    )
}

export default Signup