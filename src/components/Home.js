import React, { useState } from "react";
import '../css/home.css';
import Cart from "../components/cart"

export default function Home() {
    const [username, setUsername] = useState("");
    const [userData, setUserData] = useState(null);
    const [wrongUser, setWronguser] = useState("");

    function inputChangeHandler(e) {
        setUsername(e.target.value);
    }

    async function clickhandler(e) {
        e.preventDefault();

        // Fetch user data from Github API
        try {
            const response = await fetch(`https://api.github.com/users/${username}`);
            const data = await response.json();

            if (response.status === 200) {
                setUserData(data);
                setWronguser("");
                // console.log(data);
            } else {
                const info = "Invalid Username , Please Try Again !";
                setWronguser(info);
                console.error("Error fetching user data:", data.message);
            }
        } catch (error) {
            console.error("Network error:", error.message);
        }
    }

    return (
        <>
            <div className="main">
                <h1>Welcome to Github Id fetch Application</h1>
                <h2>{wrongUser}</h2>
                <div className="form">
                    <form onSubmit={clickhandler}>
                        <input type="text" value={username}
                            name='username'
                            placeholder="Enter Github Username"
                            onChange={inputChangeHandler}></input>
                        <br></br>
                        <button type="submit">Fetch</button>
                    </form>

                </div>
                <Cart value={userData} />
            </div>
        </>
    )
}

