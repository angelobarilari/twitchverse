import styled from "styled-components";

export const StyledMessage = styled.span`
    display: flex;
    justify-content: flex-start;
    margin-top: 2px;
    font-size: 13px;
`
export const ChatLine = styled.p`
    text-align: left;   
`

export const AuthorSpan = styled.span`
    color: ${(props) => props.color || "white"}
    font-weight: bold;
    height: fit-content;
`

