import Header from "../../components/Header";
import DefaultPage from "../../components/DefaultPage";
import Button from "../../components/Button";
import Box from "../../components/Box";
import apiUrl from "../../services/api";
import React, { useState } from "react";
import axios from "axios";

function Test() {
    const [formData, setFormData] = useState({});

    const twitchConnection = () => {
        apiUrl
            .get(`twitch/authorize/`)
            .then((res) => {
                window.location.href = res.request.responseURL;
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <>
            <Header />

            <DefaultPage id="test-page">
                <Box
                    id="test-box"
                    minWidth="500px"
                    maxWidth="30%"
                    height="fit-content%"
                >
                    <Button
                        className="request-messages-btn"
                        children={"Connect with twitch"}
                        minWidth="95%"
                        background="var(--purple-1)"
                        color="var(--white)"
                        hover="var(--purple-2)"
                        type="button"
                        onClick={() => twitchConnection()}
                    />
                </Box>
            </DefaultPage>
        </>
    );
}

export default Test;
