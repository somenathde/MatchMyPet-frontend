import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'




const SignUp = () => {
    const [emailId, setEmailId] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setfirstName] = useState("");
    const [lastName, setlastName] = useState("");
    const [phone, setPhone] = useState("");
    const [role, setRole] = useState("user");
    const [address, setAddress] = useState("");
    const [petOwner, setPetOwner] = useState("No");
    const [message, setMessage] = useState("");
    const [errorMsg, setErrorMsg] = useState("");


    const navigate = useNavigate();
    const handleSignup = async () => {
        setMessage("");
        setErrorMsg("");
        try {
            const res = await axios.post(import.meta.env.VITE_SERVER_URL + "/auth/signup", { emailId, password, firstName, lastName, phone, role, address, petOwner });
            setMessage(res.data.message || "Signup successful!");
            setTimeout(() => navigate("/login"), 1500);
        } catch (error) {
            setErrorMsg(
                error.response?.data?.message || "Signup failed. Please try again."
            );
        }
    }
    return (
        
        <div className='min-h-screen flex items-center  mx-auto'>
            <div className="card bg-gray-400 text-shadow-gray-950 w-96 items-center">
                <div className="card-body">
                     { message && <p className="text-green-600 mb-2">{message}</p> }
            { errorMsg && <p className="text-red-600 mb-2">{errorMsg}</p> }
                    <h2 className="card-title">Login Page</h2>
                    <label className="label text-cyan-950">FirstName</label>
                    <input type="text" className="input" placeholder="FirstName" value={firstName} onChange={(e) => setfirstName(e.target.value)} />
                    <label className="label text-cyan-950">LastName</label>
                    <input type="text" className="input" placeholder="LastName" value={lastName} onChange={(e) => setlastName(e.target.value)} />
                    <label className="label text-cyan-950">Email</label>
                    <input type="email" className="input" placeholder="EmailId" value={emailId} onChange={(e) => setEmailId(e.target.value)} />
                    <label className="label text-cyan-950">Password</label>
                    <input type="password" className="input" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <label className="label text-cyan-950">Phone</label>
                    <input type="phone" className="input" placeholder="Phone No" value={phone} onChange={(e) => setPhone(e.target.value)} />
                    <label className="label text-cyan-950">Role</label>
                    <select className="select select-bordered w-full" value={role} onChange={(e) => setRole(e.target.value)}>
                        <option value="user">User</option>
                        <option value="shelter-user">Shelter User</option>
                    </select>
                    <label className="label text-cyan-950">Address</label>
                    <input type="text" className="input" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} />
                    <div className="select select-bordered w-full bg-none">
                        <label className="label text-cyan-950">Pet Owner?</label>
                        <input type="radio" className="radio radio-primary" checked={petOwner === "Yes"} onChange={() => setPetOwner("Yes")} />
                        <span className="label-text">Yes</span>
                        <input type="radio" className="radio radio-primary" checked={petOwner === "no"} onChange={() => setPetOwner("no")} />
                        <span className="label-text">No</span>
                    </div>
                    <div className="card-actions justify-end">
                        <button className="btn" onClick={handleSignup}>SignUp</button>
                    </div>
                    <button className="btn outline m-10 mb-1" onClick={() => navigate("/login")}>Already have Account! Login</button>
                </div>

            </div></div >
    )
}

export default SignUp