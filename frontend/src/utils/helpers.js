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

// This function finds an HTML element that contains the specified text
// It checks if the element or its children have the text and returns the element. 
// If the element cannot be found, it throws an error
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
