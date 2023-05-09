import Header from '../../components/Header'
import { StyledDefaultPage } from '../../components/DefaultPage/style'
import { MessageDataContext } from '../../providers/messages'
import { useContext } from "react"
import apiUrl from '../../services/api'
import Message from '../../components/Message'
import Button from '../../components/Button'
import Box from '../../components/Box'
import "./style.css"

function Home() {
    const { messages, setMessages } = useContext(MessageDataContext)

    const messagesData = () => {
        apiUrl.get()
             .then(res => {
                setMessages(messages.concat(res.data.results))
            })
             .catch(err => {
                console.log(err)
            })
    }
    
    return (
        <>  
            <Header />

            <StyledDefaultPage>
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

