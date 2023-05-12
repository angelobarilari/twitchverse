import { render, screen } from "@testing-library/react";
import Button from "../Button";

describe("Button component", () => {
    test("renders button correctly", () => {
        render(<Button>random text</Button>);

        const buttonElement = screen.getByText(/random text/i);
        expect(buttonElement).toBeInTheDocument();
        expect(buttonElement.textContent).toBe("random text");
    });

    test("applies props correctly", () => {
        render(<Button data-testid="test-button" background="red" />);

        const boxElement = screen.getByTestId("test-button");
        expect(boxElement).toHaveStyle("background: red");
    });
});
