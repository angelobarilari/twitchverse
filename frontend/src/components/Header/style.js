import styled from "styled-components"

export const StyledHeader = styled.header`
  width: 100%;
  height: 60px;
  position: sticky;
  top: ${props=> props.scroll === "up" ? "0" : "-60px"};
  transition: 0.2s;
  z-index: 1;

  display: flex;
  align-items: center;
  justify-content: center;

  box-shadow: 0px 0px 5px 1px var(--black);
  background-color: var(--grey-2);

  border-radius: 5px;

  #header-container {
    background-color: var(--grey-2);
    width: 80%;
    height: 100%;

    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`
