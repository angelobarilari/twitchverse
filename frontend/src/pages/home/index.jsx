import { useContext } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { MessageDataContext } from "../../providers/messages";
import Header from "../../components/Header";
import Message from "../../components/Message";
import Button from "../../components/Button";
import Box from "../../components/Box";
import apiUrl from "../../services/api";
import "./style.css";
import DefaultPage from "../../components/DefaultPage";

function Home() {
    const { messages, setMessages } = useContext(MessageDataContext);

    const messagesData = () => {
        apiUrl
            .get()
            .then((res) => setMessages(res.data))
            .catch((err) => console.log(err));
    };

    const getMessagesByUsername = (formData) => {
        apiUrl
            .get(`author/${formData.username}/`)
            .then((res) => setMessages(res.data))
            .catch((err) => console.log(err));
    };

    const requestMessagesByUsernameSchema = yup.object().shape({
        username: yup.string().required("Enter a username"),
    });

    const {
        register: usernameRegister,
        handleSubmit: usernameSubmit,
        formState: { errors: usernameErrors },
    } = useForm({
        resolver: yupResolver(requestMessagesByUsernameSchema),
    });

    const getMessagesByWord = (formData) => {
        apiUrl
            .get(`word/${formData.word}/`)
            .then((res) => setMessages(res.data))
            .catch((err) => console.log(err));
    };

    const requestMessagesBywordSchema = yup.object().shape({
        word: yup.string().required("Enter a word"),
    });

    const {
        register: wordRegister,
        handleSubmit: wordSubmit,
        formState: { errors: wordErrors },
    } = useForm({
        resolver: yupResolver(requestMessagesBywordSchema),
    });

    return (
        <>
            <Header />

            <DefaultPage id="home-page">
                <Box
                    id="search-box"
                    minWidth="500px"
                    maxWidth="30%"
                    height="fit-content%"
                    background="var(--grey-3)"
                >
                    <form onSubmit={usernameSubmit(getMessagesByUsername)}>
                        <div className="input-container">
                            <input
                                className="search-input"
                                type="text"
                                placeholder="Search messages by username"
                                {...usernameRegister("username")}
                            />
                        </div>

                        <Button
                            id="submit-btn"
                            minWidth="20%"
                            height="80%"
                            background="var(--purple-1)"
                            color="var(--white)"
                            hover="var(--purple-2)"
                            type="submit"
                        >
                            Search
                        </Button>
                    </form>
                    {usernameErrors.username?.message && (
                        <span className="error-message">
                            {errors.username.message}
                        </span>
                    )}

                    <form onSubmit={wordSubmit(getMessagesByWord)}>
                        <div className="input-container">
                            <input
                                className="search-input"
                                type="text"
                                placeholder="Search messages by word"
                                {...wordRegister("word")}
                            />
                        </div>

                        <Button
                            id="submit-btn"
                            minWidth="20%"
                            height="80%"
                            background="var(--purple-1)"
                            color="var(--white)"
                            hover="var(--purple-2)"
                            type="submit"
                        >
                            Search
                        </Button>
                    </form>
                    {wordErrors.word?.message && (
                        <span className="error-message">
                            {wordErrors.word.message}
                        </span>
                    )}

                    <form></form>
                </Box>

                <Box
                    className="chat-box"
                    minWidth="400px"
                    maxWidth="30%"
                    height="fit-content%"
                    background="var(--grey-3)"
                >
                    <Box className="chat" minWidth="90%" shadow="unset">
                        {messages?.map((message, index) => (
                            <Message
                                author={message.author}
                                text={message.original_message}
                                timestamp={message.created_at}
                                color={message.color}
                                key={index}
                            />
                        ))}
                    </Box>

                    <Button
                        className="request-messages-btn"
                        children={"Load messages"}
                        minWidth="95%"
                        background="var(--purple-1)"
                        color="var(--white)"
                        hover="var(--purple-2)"
                        type="submit"
                        onClick={() => messagesData()}
                    />
                </Box>

                <Box
                    className="chat-box"
                    minWidth="400px"
                    maxWidth="30%"
                    height="fit-content%"
                    background="var(--grey-3)"
                >
                    <Box className="chat" minWidth="90%" shadow="unset">
                        {messages?.map((message, index) => (
                            <Message
                                author={message.author}
                                text={message.generated_verse}
                                timestamp={message.created_at}
                                color={message.color}
                                key={index}
                            />
                        ))}
                    </Box>

                    <Button
                        className="request-messages-btn"
                        children={"Load messages"}
                        minWidth="95%"
                        background="var(--purple-1)"
                        color="var(--white)"
                        hover="var(--purple-2)"
                        type="submit"
                        onClick={() => messagesData()}
                    />
                </Box>
            </DefaultPage>
        </>
    );
}

export default Home;
