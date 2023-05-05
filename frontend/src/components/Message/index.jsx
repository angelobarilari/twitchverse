import { 
    StyledMessage, 
    AuthorSpan, 
    ChatLine } from "./style";

function Message({ 
    author,
    original_message,
    generated_verse,
    timestamp,
    color,
    ...rest}) {

    return (
        <StyledMessage>
            <ChatLine>
                <AuthorSpan
                    color={color}> 
                    {author}
                </AuthorSpan>
                    
                : {original_message}
            </ChatLine>
        </StyledMessage>
    )
}

export default Message

