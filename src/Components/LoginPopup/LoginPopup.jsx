import React, { useContext, useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../Context/StoreContext'
import axios from 'axios'
import toast from 'react-hot-toast'

const LoginPopup = ({ setShowLogin }) => {

    const { url, setToken, setUser } = useContext(StoreContext)
    const [currState, setCurrState] = useState("Login")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    })

    const onChangeHandler = (event) => {
        const name = event.target.name
        const value = event.target.value
        setData(data => ({ ...data, [name]: value }))
    }

    const onLogin = async (event) => {
        event.preventDefault()
        if (isSubmitting) return

        let newUrl = url
        if (currState === "Login") {
            newUrl += "/api/user/login"
        } else {
            newUrl += "/api/user/register"
        }

        try {
            setIsSubmitting(true)
            const response = await axios.post(newUrl, data)

            if (response.data.success) {
                setToken(response.data.token)
                setUser(response.data.user)
                localStorage.setItem("token", response.data.token)
                localStorage.setItem("user", JSON.stringify(response.data.user))
                setShowLogin(false)
                toast.success(response.data.message)
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.error("Auth error:", error)
            toast.error("Something went wrong. Please try again.")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className='login-popup'>
            <form onSubmit={onLogin} className="login-popup-container" aria-busy={isSubmitting}>
                <div className="login-popup-title">
                    <h2>{currState}</h2>
                    <img onClick={() => !isSubmitting && setShowLogin(false)} src={assets.cross_icon} alt="" />
                </div>
                <div className="login-popup-inputs">
                    {currState === "Login" ? <></> :
                        <input
                            name='name'
                            onChange={onChangeHandler}
                            value={data.name}
                            type="text"
                            placeholder='Your name'
                            disabled={isSubmitting}
                            required
                        />
                    }
                    <input
                        name='email'
                        onChange={onChangeHandler}
                        value={data.email}
                        type="email"
                        placeholder='Your email'
                        disabled={isSubmitting}
                        required
                    />
                    <input
                        name='password'
                        onChange={onChangeHandler}
                        value={data.password}
                        type="password"
                        placeholder='Password'
                        disabled={isSubmitting}
                        required
                    />
                </div>
                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting
                        ? (currState === "Sign Up" ? "Creating account..." : "Logging in...")
                        : (currState === "Sign Up" ? "Create Account" : "Login")}
                </button>
                <div className="login-popup-condition">
                    <input style={{ marginTop: 5 }} type="checkbox" disabled={isSubmitting} required />
                    <p>By continuing, i agree to the terms of use & privacy policy.</p>
                </div>
                {currState === "Login"
                    ? <p>Create a new account? <span onClick={() => !isSubmitting && setCurrState("Sign Up")}>Click here</span></p>
                    : <p>Already have an account?<span onClick={() => !isSubmitting && setCurrState("Login")}>Login here</span></p>}


            </form>
        </div>
    )
}

export default LoginPopup
