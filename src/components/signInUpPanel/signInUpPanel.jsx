import { Link, Route, Router } from "react-router-dom"
import Authorization from "../authorization/authorization"
import logoImage from "../../assets/Logo.png"
import "./signInUpPanel.css"
import Registration from "../registration/registration";

function SignInUpPanel() {
    return (
        <div className="signInUpContainer container flex-gap-50 flex-col-sb-left">
            <Link to="/personalMaps" className="logo">
                <img src={logoImage} alt="logo"/>
            </Link>

            {/* <Authorization /> */}
            <Registration />
        </div>
    );
}

export default SignInUpPanel;