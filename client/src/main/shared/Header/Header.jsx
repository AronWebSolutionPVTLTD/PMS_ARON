import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

const Header = ({ connected, handleClick }) => {

    let navigate = useNavigate()
    const [headerSettings, setHeaderSettings] = useState({});
    const initialState = {
        input: '',
    };
    const [activity, setActivity] = useState(initialState);
    const logout = () => {
        handleClick(false)
        localStorage.clear()
        navigate("/login")
    }


    const print = () => {
        navigate("/result/" + activity.input)
    }

    const handleInputChange = event => {
        const { name, value } = event.target;
        setActivity({ ...activity, [name]: value });
    };

    const search = (event) => {
        if (event.keyCode === 13) {
            navigate("/result/" + activity.input)
        }
    }





    return (
        <div id="right-panel" className="right-panel" style={{ display: (connected ? 'block' : 'none') }}>
            <header id="header" className="header">
                <div className="top-left">
                    <div className="navbar-header">
                        {headerSettings.showLogo == 1 &&
                            <a className="navbar-brand" href="./"><img src="images/logo.png" alt="Logo" /></a>
                        }
                        <a className="navbar-brand hidden" href="./"><img src="images/logo2.png" alt="Logo" /></a>
                        <a id="menuToggle" className="menutoggle"><i className="fa fa-bars"></i></a>
                    </div>
                </div>
                <div className="top-right">
                    <div className="header-menu">
                        <div className="header-left">
                            {headerSettings.enbaleSearchBar == 1 &&
                                <button className="search-trigger"><i className="fa fa-search"></i></button>
                            }
                            <div className="form-inline">
                                <form className="search-form">
                                    <input onChange={handleInputChange} name="input" value={activity.input} onKeyDown={(e) => search(e)} className="form-control mr-sm-2" type="text" placeholder="Search ..." aria-label="Search" />
                                    <button onClick={print} className="search-close" type="submit"><i className="fa fa-close"></i></button>
                                </form>
                            </div>



                        </div>

                        <div className="user-area dropdown float-right">
                            <a href="#" className="dropdown-toggle active" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <img className="user-avatar rounded-circle" src="images/admin.png" alt="User Avatar" />
                            </a>

                            <div className="user-menu dropdown-menu">

                                <Link to="/" onClick={logout} className="nav-link" href="#"><i className="fa fa-power-off"></i>Log out</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    );
}


export default Header;
