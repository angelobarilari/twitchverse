import styled from "styled-components";

export const StyledButton = styled.button`
  border: none;
  
  height: ${props=>props.height || "fit-content"}
  width: ${props=>props.width || "auto"};

  padding: ${(props) => props.padding || "10px"};
  margin: ${(props) => props.margin || "auto"}
  border-radius: 5px;
  
  min-width: ${(props) => props.minWidth || "100%"};
  max-width: ${(props) => props.maxWidth || "100%"};
  
  color: ${(props) => props.color || "unset"};
  box-shadow: ${(props) => props.shadow || "0px 0px 6px 2px rgba(0, 0, 0, 0.25)"};
  background-color: ${(props) => props.background || "unset"};
  
  font-size: 14px;
  font-weight: 700;
  transition: 300ms;

  :hover{
    background: ${(props) => props.hover || "unset"};
  }
`
