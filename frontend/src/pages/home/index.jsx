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

    const requestMessagesByWordSchema = yup.object().shape({
        word: yup.string().required("Enter a word"),
    });

    const {
        register: wordRegister,
        handleSubmit: wordSubmit,
        formState: { errors: wordErrors },
    } = useForm({
        resolver: yupResolver(requestMessagesByWordSchema),
    });

    const getMessagesByDateInterval = (formData) => {
        let { startDate, endDate } = formData;

        startDate = Math.floor(startDate / 1000);

        if (!endDate) endDate = Math.floor(Date.now() / 1000);

        apiUrl
            .get(`${startDate}/${endDate}/`)
            .then((res) => setMessages(res.data))
            .catch((err) => console.log(err));
    };

    function parseDateString(value, originalValue) {
        const parsedDate = Date.parse(originalValue);
        return Number.isNaN(parsedDate) ? null : new Date(parsedDate);
    }

    const requestMessagesByDateIntervalSchema = yup.object().shape({
        startDate: yup.date().transform(parseDateString).required(),

        // endDate: yup.date().transform(parseDateString)
    });

    const {
        register: dateIntervalRegister,
        handleSubmit: dateIntervalSubmit,
        formState: { errors: dateIntervalErrors },
    } = useForm({
        resolver: yupResolver(requestMessagesByDateIntervalSchema),
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
                            className="submit-btn"
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
                            className="submit-btn"
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

                    <form
                        className="date-interval-form"
                        onSubmit={dateIntervalSubmit(getMessagesByDateInterval)}
                    >
                        <div className="input-container">
                            <label
                                className="date-label"
                                htmlFor="start-time-interval"
                            >
                                Start time interval:
                                <input
                                    className="search-input"
                                    type="datetime-local"
                                    name="start-time-interval"
                                    {...dateIntervalRegister("startDate")}
                                />
                            </label>
                        </div>

                        <div className="input-container">
                            <label
                                className="date-label"
                                htmlFor="end-time-interval"
                            >
                                End time interval:
                                <input
                                    className="search-input"
                                    type="datetime-local"
                                    name="end-time-interval"
                                    {...dateIntervalRegister("endDate")}
                                />
                            </label>
                        </div>

                        <Button
                            className="submit-btn"
                            id="form-submit-btn"
                            minWidth="20%"
                            height="55%"
                            background="var(--purple-1)"
                            color="var(--white)"
                            hover="var(--purple-2)"
                            type="submit"
                        >
                            Search
                        </Button>
                    </form>
                    {dateIntervalErrors.startDate?.message && (
                        <span className="error-message">
                            {dateIntervalErrors.startDate.message}
                        </span>
                    )}
                    {dateIntervalErrors.endDate?.message && (
                        <span className="error-message">
                            {dateIntervalErrors.endDate.message}
                        </span>
                    )}
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
