import { useSelector } from "react-redux";
import { Outlet, Link } from "react-router-dom";
import { store } from "./store";

const Navbar = () => {
    let token = useSelector((state) => state.account.token)
    if(localStorage.getItem("token") != null)
    {
        token = localStorage.getItem("token")
    }
    const accountLinks = []
    if(token === "")
    {
        accountLinks.push(
            <td key="noToken">
                <Link to="/registerOrLogin/login">Login</Link>
            </td>
        )
    }
    else
    {
        accountLinks.push(
            <td key="token">
                <Link to="/account">Account</Link>
            </td>
        )
        accountLinks.push(<td onClick={() => {store.dispatch({type: "SET_USER_TOKEN", token:""}); localStorage.removeItem("token")}}><Link to='/'>Logout</Link></td>)
    }
    return(
        <>
            
            <nav>
                <table>
                    <tbody>
                    <tr>
                        <td>
                            <b>Gardener's calendar</b>
                        </td>
                        <td width={20}></td>
                        <td>
                            <Link to="/">Calendar</Link>
                        </td>
                        <td>
                            <Link to="/preserves">Preserves</Link>
                        </td>
                        <td>
                            <Link to="/gardenpatches">Garden patches</Link>
                        </td>
                        <td>
                            <Link to="/plants">Plants</Link> 
                        </td>
                        <td>
                            <Link to="/sowedPlants">Sowed Plants</Link>
                        </td>
                        <td>
                            <Link to="/harvests">Harvests</Link>
                        </td>
                        {
                            accountLinks
                        }
                    </tr>
                    </tbody>
                </table>
                
            </nav>
            <Outlet />
        </>
    )
}

export default Navbar