import { Link } from "react-router-dom";

import "./buttonSidebar.css";

const ButtonSidebar = (children) => {
    return (
        <Link className="button-to" to={children.href}>
            <button className="button-sidebar" onClick={() => {
                console.log(children.text)
            }}>
                <div className="button-context">
                    <img className="button-context-img" src={children.image} />
                    <p className="button-context-text">{children.text}</p>
                </div>
            </button>
        </Link>
    )
}

export default ButtonSidebar;