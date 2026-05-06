import { Link } from "react-router-dom";

function NavItem({ link, title, onClose }) {
    return (
        <li className="header-item">
            <Link to={link} onClick={onClose}>{title}</Link>
        </li>
    );
}

export default NavItem;
