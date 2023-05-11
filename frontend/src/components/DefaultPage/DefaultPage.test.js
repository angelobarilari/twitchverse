import { render, screen } from "@testing-library/react";
import DefaultPage from "../DefaultPage";

test("renders DefaultPage", () => {
    render(
        <DefaultPage 
            data-testid="test-default-page" />);

    const defaultPageElement = screen.getByTestId("test-default-page");
    expect(defaultPageElement).toBeInTheDocument();
});

test("renders with props correctly", () => {
    render(
        <DefaultPage data-testid="test-default-page" className="test-class">
            Test children
        </DefaultPage>);

    const defaultPageElement = screen.getByTestId("test-default-page");
    expect(defaultPageElement).toHaveClass("test-class");
});
