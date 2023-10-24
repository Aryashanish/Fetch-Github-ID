import { useEffect, useState } from "react"
import "../css/cart.css"

export default function Cart(props) {
    const [repos, setRepos] = useState([]);
    const userInfo = props.value;

    useEffect(() => {
        async function fetchRepos() {

            if (userInfo && userInfo.login) {
                // Fetch user data from Github API
                try {
                    const response = await fetch(`https://api.github.com/users/${userInfo.login}/repos`);
                    const data = await response.json();

                    if (response.status === 200) {
                        setRepos(data);
                        
                    } else {
                        console.error("Error fetching user data:", data.message);
                    }
                } catch (error) {
                    console.error("Network error:", error.message);
                }
            }
        }
        fetchRepos();
    },[userInfo]);

    return (
        <>
            <div className="cart-main">
                <h2>User Details Fetched</h2>
                <div className="info">
                    <h4>Username : {userInfo?.login}</h4>
                    <h4>Userid : {userInfo?.id}</h4>
                    <h4>Reposetory Count : {userInfo?.public_repos}</h4>
                    <div className="list">
                        <ul>
                            {
                                repos.map((repo) => {
                                    return <li key={repo.id}>{repo.name}</li>
                                })
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}