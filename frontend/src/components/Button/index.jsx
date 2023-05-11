import { StyledButton } from "./style";

const Button = ({ children, ...rest }) => {
    return <StyledButton {...rest}>{children}</StyledButton>;
};

export default Button;
