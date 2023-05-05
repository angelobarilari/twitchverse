import styled from "styled-components";

export const StyledButton = styled.button`
  border: none;
  padding: ${(props) => props.padding || "10px"};
  background-color: ${(props) => props.background || "unset"};
  color: ${(props) => props.color || "unset"};
  box-shadow: ${(props) => props.shadow || "0px 0px 6px 2px rgba(0, 0, 0, 0.25)"};
  border-radius: 10px;
  height: fit-content;
  width: ${props=>props.width || "auto"};
  font-size: 14px;
  font-weight: 700;
  transition: 300ms;

  :hover{
    background: var(--grey-4);
  }
`
