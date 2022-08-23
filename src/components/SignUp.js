import React, { useState } from 'react';
import axios from "axios";

const SignUp = () => {

    //! Hooks
    const [user, setUser] = useState({
        email: "",
        password: "",
        confirmPassword: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value
        });
    }

    const register = () => {
        const { email, password, confirmPassword } = user;
        if (email && password && (password === confirmPassword)) {
            axios.post("http://192.168.0.10:4000/register", user).then(res => { console.log(res); });
        } else {
            alert("Completa todos los campos");
        }
    }



  return (
    <div>
        <section className="h-screen">
            <div className="container px-6 py-12 h-full">
                <div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
                
                <div className="md:w-8/12 lg:w-5/12 lg:ml-20">
                    <form>
                    <div className="mb-6">
                        <input
                        type="text"
                        className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-yellow-600 focus:outline-none"
                        placeholder="Usuario"
                        name='email'
                        defaultValue={user.email} 
                        onChange={handleChange} required
                        autoComplete="on"
                        />
                    </div>
                    <div className="mb-6">
                        <input
                        type="password"
                        className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-yellow-600 focus:outline-none"
                        placeholder="Contraseña"
                        defaultValue={user.password} 
                        onChange={handleChange} required
                        autoComplete="on"
                        name="password"
                        />
                    </div>
                    <div className="mb-6">
                        <input
                        type="password"
                        className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-yellow-600 focus:outline-none"
                        placeholder="Confirmar contraseña"
                        defaultValue={user.confirmPassword} 
                        onChange={handleChange}
                        required 
                        autoComplete="on"
                        name="confirmPassword"
                        />
                    </div>
                    <button
                        type="submit"
                        className="inline-block px-7 py-3 bg-yellow-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-yellow-700 hover:shadow-lg focus:bg-yellow-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-yellow-800 active:shadow-lg transition duration-150 ease-in-out w-full"
                        data-mdb-ripple="true"
                        data-mdb-ripple-color="light"
                        onClick={register}
                    >
                        Registrar
                    </button>
                    </form>
                </div>
                </div>
            </div>
        </section>
    </div>
  )
}

export default SignUp