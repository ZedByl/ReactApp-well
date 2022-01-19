import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Link } from "react-router-dom";

const NavProfile = () => {
    const { currentUser } = useAuth();
    const [isOpen, setOpen] = useState(false);
    const toggleMenu = () => {
        setOpen(prevState => !prevState);
    };
    return (
        <div className="dropdown">
            <div className="btn dropdown-toggle d-flex align-items-center" onClick={toggleMenu}>
                <div className="me-2">{currentUser.name}</div>
                <img src={currentUser.image}
                     className="img-responsive rounded-circle"
                     alt="avatar"
                     width="35"
                     height="35"
                />
            </div>
            <div className={"w-100 dropdown-menu" + (isOpen ? " show" : "")}>
                <Link to={`/users/${currentUser._id}`} className="dropdown-item">Profile</Link>
                <Link to="/logout" className="dropdown-item">LogOut</Link>
            </div>
        </div>
    );
};

export default NavProfile;
