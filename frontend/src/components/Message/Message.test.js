import { render, screen } from "@testing-library/react";
import { getMessageTimestamp, findElementByText } from "../../utils/helpers";
import Message from "../Message";

describe("Message Component", () => {
    const author = "Random user";
    const text = "Random string";
    const timestamp = new Date().toString();
    const color = "#000000";

    test("renders the correct author name", () => {
        render(
            <Message
                author={author}
                text={text}
                timestamp={timestamp}
                color={color}
            />
        );

        const authorName = screen.getByText(author);
        expect(authorName).toBeInTheDocument();
    });

    test("renders the correct message text", () => {
        render(
            <Message
                author={author}
                text={text}
                timestamp={timestamp}
                color={color}
            />
        );

        const messageText = findElementByText(text);
        expect(messageText).toBeInTheDocument();
    });

    test("renders the correct message timestamp", () => {
        render(
            <Message
                author={author}
                text={text}
                timestamp={timestamp}
                color={color}
            />
        );

        const messageTimestamp = screen.getByText(
            getMessageTimestamp(timestamp)
        );
        expect(messageTimestamp).toBeInTheDocument();
    });

    test("renders the author name in the correct color", () => {
        render(
            <Message
                author={author}
                text={text}
                timestamp={timestamp}
                color={color}
            />
        );

        const authorName = screen.getByText(author);

        expect(authorName).toHaveStyle(`color: ${color}`);
    });

    test("renders the message timestamp in the correct format", () => {
        render(
            <Message
                author={author}
                text={text}
                timestamp={timestamp}
                color={color}
            />
        );

        const messageTimestamp = screen.getByText(
            getMessageTimestamp(timestamp)
        );
        expect(messageTimestamp.textContent).toMatch(/\d{2}:\d{2}/);
    });
});
