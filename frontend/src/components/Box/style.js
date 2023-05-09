import styled from "styled-components";

export const StyledBox = styled.div`
    display: flex;

    min-width: ${(props) => props.minWidth || "100%"};
    max-width: ${(props) => props.maxWidth || "100%"};
    
    height: ${(props) => props.height || "100%"};
    margin: ${(props) => props.margin || "10px"};
    
    border-radius: 5px;

    background-color: ${(props) => props.background || "unset"};
    box-shadow: ${(props) => props.shadow || "0px 0px 5px 1px var(--black)"};
`
