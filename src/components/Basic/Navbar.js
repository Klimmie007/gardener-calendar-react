import { Outlet, Link } from "react-router-dom";

const Navbar = () => {
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
                            <Link to="/register">Register</Link>
                        </td>
                    </tr>
                    </tbody>
                </table>
                
            </nav>
            <Outlet />
        </>
    )
}

export default Navbar