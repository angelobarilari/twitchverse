import { screen } from "@testing-library/react";

// Returns a formatted string with the hour and minutes of a message
export const getMessageTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const timeString = date.toLocaleTimeString([], {
        timeZone: "America/Sao_Paulo",
        hour: "2-digit",
        minute: "2-digit",
    });

    return timeString;
};

export const findElementByText = (text) => {
    const element = screen.queryByText((content, element) => {
        const hasText = (node) => node.textContent === content;
        const nodeHasText = hasText(element);
        const childrenHaveText = Array.from(element.children).some((child) =>
            hasText(child)
        );

        return nodeHasText || childrenHaveText;
    }, text);

    if (!element.textContent)
        throw new Error(`Could not find element with text: ${text}`);

    return element;
};
