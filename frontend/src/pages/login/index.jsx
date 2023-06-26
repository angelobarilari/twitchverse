import Header from "../../components/Header";
import DefaultPage from "../../components/DefaultPage";
import Button from "../../components/Button";
import Box from "../../components/Box";
import apiUrl from "../../services/api";
import React, { useState } from "react";
import "./style.css";
import twitch from "../../assets/twitch.svg";

function Login() {
    const twitchConnection = () => {
        apiUrl
            .get(`twitch/authorize/`)
            .then((res) => (window.location.href = res.request.responseURL))
            .catch((err) => console.log(err));
    };

    return (
        <>
            <Header />

            <DefaultPage className="dashboard-page">
                <Box
                    className="login-box"
                    minWidth="30%"
                    height="fit-content%"
                >
                    <div className="sign-text-box">
                        <h2>Sign into Twitchverse</h2>
                        <hr />
                    </div>

                    <Button
                        className="twitch-conn-btn"
                        minWidth="90%"
                        background="var(--purple-1)"
                        color="var(--white)"
                        hover="var(--purple-2)"
                        type="button"
                        onClick={() => twitchConnection()}
                    >
                        <img src={twitch} className="twitch-logo" />
                        Login with twitch
                    </Button>

                    <div className="terms-text-box">
                        <hr />
                        <small>
                            By signing in, you agree to our
                            <a href="_blank">Terms of Service</a>.
                        </small>
                    </div>
                </Box>
            </DefaultPage>
        </>
    );
}

export default Login;
