import { StyledMessage, AuthorSpan, HourSpan, ChatLine } from "./style";

function Message({ author, text, timestamp, color, ...rest }) {
    const messageDate = new Date(timestamp);
    let messageHour = messageDate.getHours();
    let messageMinutes = messageDate.getMinutes();

    if (messageHour < 10) messageHour = `0${messageHour}`;

    if (messageMinutes < 10) messageMinutes = `0${messageMinutes}`;

    return (
        <StyledMessage>
            <ChatLine>
                <HourSpan>{`${messageHour}:${messageMinutes} `}</HourSpan>
                <AuthorSpan color={color}>{author}</AuthorSpan>: {text}
            </ChatLine>
        </StyledMessage>
    );
}

export default Message;
