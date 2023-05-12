import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Header from "../Header";

describe("Header component", () => {
    test("should render correctly", () => {
        render(
            <MemoryRouter>
                <Header data-testid="test-header">
                    <div data-testid="child">Child component</div>
                </Header>
            </MemoryRouter>
        );

        const header = screen.getByTestId("test-header");
        expect(header).toBeInTheDocument();
        expect(screen.queryByTestId("child")).toBeNull();
    });

    test("should render a logo", () => {
        render(
            <MemoryRouter>
                <Header />
            </MemoryRouter>
        );

        const logo = screen.getByRole("heading", { name: /Twitch/i });
        expect(logo).toBeInTheDocument();
    });

    test("should render a link to home page", () => {
        render(
            <MemoryRouter>
                <Header />
            </MemoryRouter>
        );

        const homeLink = screen.getByRole("link", { name: /Twitch/i });
        expect(homeLink).toHaveAttribute("href", "/");
    });
});
