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
    // const message = [
    //     {   
    //         author: "DarionPK",
    //         original_message: "another random message, big text message, big big",
    //         generated_verse: "another generated verse",
    //         timestamp: "2023-05-04T23:50:36.894000Z",
    //         color: "#00FF7F"
    //     },
    //     {   
    //         author: "DarionPK",
    //         original_message: "random message, random message, random message, random message, random message, random message, random message, random message, ",
    //         generated_verse: "random generated verse",
    //         timestamp: "2023-05-05T23:50:36.894000Z",
    //         color: "#00FF7F"
    //     },

    // ]

    const messagesData = () => {
        apiUrl.get()
             .then(res => {
                console.log(res.data.results)
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
                    id="chat-box"
                    minWidth="400px"
                    maxWidth="30%"
                    height="fit-content%"
                    background="var(--grey-3)">

                    <Box
                        id="chat"   
                        minWidth="90%"
                        shadow="unset">
                        
                        {messages?.map((message, index) => 
                            <Message 
                                author={message.author}
                                original_message={message.original_message}
                                generated_verse={message.generated_verse}
                                timestamp={message.timestamp}
                                color={message.color}
                                background="aqua"
                                key={index} />
                        )}
                    </Box>

                    <Button 
                        id="request-messages-btn"
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

