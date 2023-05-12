import { getMessageTimestamp, findElementByText } from "./helpers";

describe("getMessageTimestamp function", () => {
    test("returns the correct timestamp string", () => {
        const timestamp = new Date("2023-05-10T14:30:00Z").getTime();
        const expectedTimeString = "11:30";

        const timeString = getMessageTimestamp(timestamp);

        expect(timeString).toBe(expectedTimeString);
    });
});

describe("findElementByText function", () => {
    test("should throw error if element not found", () => {
        const randomText = "Non-existent text";

        expect(() => {
            findElementByText(randomText);
        }).toThrow(`Could not find element with text: ${randomText}`);
    });

    test("should find element with text", () => {
        const text = "Random string";
        document.body.innerHTML = `<div>${text}</div>`;

        const element = findElementByText(text);

        expect(element).toBeDefined();
        expect(element.textContent).toBe(text);
    });
});
