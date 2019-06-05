import React from "react";
import ButtonAccept from "./_button_accept.jsx";
import ButtonBackSmall from "./_button_back_small.jsx";
import {Link} from 'react-router-dom';

class FormLogIn extends React.Component {

    constructor(props) {

        super(props);
        this.state = {
            email: "",
            password: ""
        }
    }

    handleEmailChange = (e) => {

        this.setState({
            email: e.target.value
        });
    }

    handlePasswordChange = (e) => {

        this.setState({
            password: e.target.value
        });
    }

    handleRepeatPasswordChange = (e) => {

        this.setState({
            repeatPassword: e.target.value
        });
    }

    logRegisteredUser = (e) => {

        if (this.state.email === "") {
            e.preventDefault();
            return alert("Fill email field.");
        }
        if (this.state.password === "") {
            e.preventDefault();
            return alert("Fill password field");
        }

        let user;

        if (localStorage.getItem("users")) {

            let actualUsers = JSON.parse(localStorage.getItem("users"));

            let userArr = actualUsers.filter((el) => {
                return el.email === this.state.email;
            });

            if (userArr.length === 0) {
                e.preventDefault();
                return alert(`There is no user registered with ${this.state.email} address`);
            }

            user = userArr[0];

            if (user.password !== this.state.password) {
                e.preventDefault();
                return alert("Wrong password");
            }

        } else {

            e.preventDefault();
            return alert(`There is no user registered with ${this.state.email} address`);
        }

        localStorage.setItem("activeUser", user.id);
    }

    render() {

        return(
            <form className="form">
                <div className="form__input-box">
                    <label className="form__label">Email</label>
                    <input
                        className="form__input"
                        type="email"
                        name="email"
                        value={ this.state.email }
                        onChange={ this.handleEmailChange }
                    />
                </div>
                <div className="form__input-box">
                    <label className="form__label">Password</label>
                    <input
                        className="form__input form__input--password"
                        type="password"
                        name="password"
                        value={ this.state.password }
                        onChange={ this.handlePasswordChange }
                    />
                </div>
                <div className="form__button-box form__button-box--flex">
                    <Link to="/cashapp/start">
                        <ButtonBackSmall text="BACK" />
                    </Link>
                    <Link to={ `/cashapp/user/${this.state.email}` } onClick={ this.logRegisteredUser }>
                        <ButtonAccept text="LOG IN" />
                    </Link>
                </div>
            </form>
        );
    }
}

export default FormLogIn;
