import styled from "styled-components";

export const StyledMessage = styled.span`
    display: flex;
    justify-content: flex-start;

    width: 100%
    margin-top: 5px;

    font-size: 13px;

    :hover {
        background: var(--grey-5);
        border-radius: 5px;
    }
`
export const ChatLine = styled.p`
    text-align: left;
    width: 100%;
    color: white; 
`

export const HourSpan = styled.span`
    color: var(--grey-6);
    height: fit-content;
    margin-right: 5px;
`

export const AuthorSpan = styled.span`
    color: ${(props) => props.color || "white"}
    font-weight: bold;
    height: fit-content;
`
