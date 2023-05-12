import { StyledDefaultPage } from "./style";

function DefaultPage({ children, ...rest }) {
    return <StyledDefaultPage {...rest}>{children}</StyledDefaultPage>;
}

export default DefaultPage;
