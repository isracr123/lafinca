import React, { useState } from 'react';
import axios from 'axios';


const Login = () => {

    const [user, setUser] = useState({
        email: "",
        password: ""
    });


    const handleChange = e => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value
        });
    };


    const login = () => {
        axios.post("http://192.168.1.175:4000/login", user)
            .then(res => {
                if (res.data.message === 'Entraste'){
                    alert('Entraste');
                    if (user.email === 'superadmin'){
                        window.location.href = 'http://192.168.1.175:3000/pos';
                    }else if (user.email === 'M1'){
                        window.location.href = 'http://192.168.1.175:3000/waiter/';
                    }else if (user.email === 'M2'){
                        window.location.href = 'http://192.168.1.175:3000/waiterTwo/';
                    }else if (user.email === 'M3'){
                        window.location.href = 'http://192.168.1.175:3000/waiterThree/';
                    }else if (user.email === 'cocina'){
                        window.location.href = 'http://192.168.1.175:3000/kitchen';
                    }else{
                        alert('Usuario no válido')
                    }
                }else{
                    alert('Usuario y contraseña incorrectos')
                }
            });
    }



  return (
    <div>
        <section className="h-screen">
            <div className="container px-6 py-12 h-full">
                <div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
                
                <div className="md:w-8/12 lg:w-5/12 lg:ml-20">
                    <div className="mb-6">
                        <input
                        type="text"
                        className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-yellow-600 focus:outline-none"
                        placeholder="Usuario"
                        name="email" 
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
                        name="password" 
                        defaultValue={user.password} 
                        onChange={handleChange}
                        autoComplete="on"
                        />
                    </div>
                    <button
                        type="submit"
                        className="inline-block px-7 py-3 bg-yellow-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-yellow-700 hover:shadow-lg focus:bg-yellow-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-yellow-800 active:shadow-lg transition duration-150 ease-in-out w-full"
                        data-mdb-ripple="true"
                        data-mdb-ripple-color="light"
                        onClick={login}
                    >
                        Entrar
                    </button>
                </div>
                </div>
            </div>
        </section>
    </div>
  )
}

export default Login