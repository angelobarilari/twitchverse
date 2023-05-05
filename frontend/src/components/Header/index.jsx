import { Link } from "react-router-dom";
import { StyledHeader } from "./style";
import { MessageDataContext } from '../../providers/messages'
import { useContext } from "react";
import Button from '../../components/Button'
import apiUrl from '../../services/api'

const Header = () => {
  const { messages, setMessages } = useContext(MessageDataContext)

  const messagesData = () => {
    apiUrl.get()
         .then(res => {
            console.log(res.data.results)
            setMessages(messages.concat(res.data))
        })
         .catch(err => {
            console.log(err)
        })
  }

  return (
      <StyledHeader>
        <div id="header-container">
          <Link to="/" id="logo-container">
            <h1 id="logo">
              Twitch
            </h1>
          </Link>
        </div>

        <Button 
          children={"Load messages"}
          background="var(--grey-3)" 
          color="var(--white)" 
          id="request-btn" 
          type="submit"
          onClick={() => messagesData()} />

      </StyledHeader>
  );
};

export default Header;
