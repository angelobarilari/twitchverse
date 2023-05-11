import { render, screen } from "@testing-library/react";
import Box from "../Box";

test("renders box correctly", () => {
    render(
        <Box>
            random text
        </Box>);

    const boxElement = screen.getByText(/random text/i);
    expect(boxElement).toBeInTheDocument();
    expect(boxElement.textContent).toBe("random text");
});

test("applies props correctly", () => {
    render(
        <Box 
            data-testid="test-box" 
            background="red" />);

    const boxElement = screen.getByTestId("test-box");
    expect(boxElement).toHaveStyle("background: red");
});
