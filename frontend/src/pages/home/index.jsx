import { useContext } from "react"
import * as yup from 'yup'
import { useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup';
import { MessageDataContext } from '../../providers/messages'
import { StyledDefaultPage } from '../../components/DefaultPage/style'
import Header from '../../components/Header'
import Message from '../../components/Message'
import Button from '../../components/Button'
import Box from '../../components/Box'
import apiUrl from '../../services/api'
import "./style.css"

function Home() {
    const { messages, setMessages } = useContext(MessageDataContext)

    const messagesData = () => {
        apiUrl.get()
             .then(res => setMessages(messages.concat(res.data)))
             .catch(err => console.log(err))
    }

    const messagesByUsername = (formData) => {
        apiUrl.get(`${formData.username}/`)
            .then(res => setMessages(messages.concat(res.data.results)))
            .catch(err => console.log(err))
    }

    const requestMessagesByUsernameSchema = yup.object().shape({
        username: yup.string()
                     .required('Enter a username')
    })
    
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(requestMessagesByUsernameSchema)
    })

    return (
        <>  
            <Header />

            <StyledDefaultPage
                id="home-page">
                    
                <Box
                    id="search-box"
                    minWidth="500px"
                    maxWidth="30%"
                    height="fit-content%"
                    background="var(--grey-3)">

                    <form
                        onSubmit={handleSubmit(messagesByUsername)}>
                        
                        <div className="input-container">
                                <input 
                                    className="search-input"
                                    type="text"
                                    placeholder="Search messages by username"
                                    {...register("username")} />
                        </div>
                        
                        <Button 
                            id="submit-btn"
                            minWidth="20%"
                            height="80%"
                            background="var(--purple-1)" 
                            color="var(--white)" 
                            hover="var(--purple-2)"
                            type="submit">  
                            Search
                        </Button>
                    </form>
                    {errors.username?.message && 
                        <span className="error-message">
                            {errors.username.message}
                        </span>}
                </Box>

                <Box 
                    className="chat-box"
                    minWidth="400px"
                    maxWidth="30%"
                    height="fit-content%"
                    background="var(--grey-3)">

                    <Box
                        className="chat"   
                        minWidth="90%"
                        shadow="unset">

                        {messages?.map((message, index) => 
                            <Message 
                                author={message.author}
                                text={message.original_message}
                                timestamp={message.timestamp}
                                color={message.color}
                                key={index} />
                        )}
                    </Box>

                    <Button 
                        className="request-messages-btn"
                        children={"Load messages"}
                        minWidth="95%"
                        background="var(--purple-1)" 
                        color="var(--white)" 
                        hover="var(--purple-2)"
                        type="submit"
                        onClick={() => messagesData()} />
                </Box>

                <Box 
                    className="chat-box"
                    minWidth="400px"
                    maxWidth="30%"
                    height="fit-content%"
                    background="var(--grey-3)">

                    <Box
                        className="chat"   
                        minWidth="90%"
                        shadow="unset">

                        {messages?.map((message, index) => 
                            <Message 
                                author={message.author}
                                text={message.generated_verse}
                                timestamp={message.timestamp}
                                color={message.color}
                                key={index} />
                        )}
                    </Box>

                    <Button 
                        className="request-messages-btn"
                        children={"Load messages"}
                        minWidth="95%"
                        background="var(--purple-1)" 
                        color="var(--white)" 
                        hover="var(--purple-2)"
                        type="submit"
                        onClick={() => messagesData()} />
                </Box>
            </StyledDefaultPage>
        </>
    )
}

export default Home

