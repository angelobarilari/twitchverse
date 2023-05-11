import { render, screen } from "@testing-library/react";
import Message from ".";

// Returns a formatted string with the timestamp of a message
function getMessageTimestamp(timestamp) {
    const date = new Date(timestamp);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
}

// This function searches for an element on the screen that contains the given text. 
// If the element is found, it is returned. If not, an error is thrown.
function findElementByText(text) {
    const element = screen.queryByText((content, element) => {
        const hasText = (node) => node.textContent === content;
        const nodeHasText = hasText(element);
        const childrenDontHaveText = Array.from(element.children).every(
            (child) => !hasText(child)
        );

        return nodeHasText && childrenDontHaveText;
    }, text);

    if (!element) throw new Error(`Could not find element with text: ${text}`);

    return element;
}

describe("Message Component", () => {
    const author = "John";
    const text = "mystring";
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
