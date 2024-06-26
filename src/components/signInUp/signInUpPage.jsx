import React from 'react';

import { Outlet } from 'react-router-dom';

import logoImage from "../../assets/Logo.png";

export default function SignInUpPage() {
    return (
        <section className="background-map size-full-vertical-pagePercent flex-col-c-c">
            <div className="signInUpContainer flex-gap-50 flex-col-sb-left">
                <div className="logo">
                    <img src={logoImage} alt="logo"/>
                </div>

                <Outlet />
            </div>
        </section>
    );
}