import { Link } from "react-router-dom";
import { StyledHeader } from "./style";

const Header = () => {

  return (
      <StyledHeader>

        <div id="header-container">
          <Link to="/" id="logo-container">
            <h1 id="logo">
              Twitch
            </h1>
          </Link>
        </div>
      </StyledHeader>
  );
};

export default Header;
