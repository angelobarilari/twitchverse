import { StyledBox } from "./style";

function Box({ children, ...rest }) {
    return <StyledBox {...rest}>{children}</StyledBox>;
}

export default Box;
