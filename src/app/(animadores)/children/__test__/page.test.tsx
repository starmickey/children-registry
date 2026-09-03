import Page from "@/app/(animadores)/children/page";
import { render, screen } from "@testing-library/react";
import { redirect } from "next/navigation";
import { HtmlHTMLAttributes } from "react";

jest.mock("@/components/layout/header", () => ({
  __esModule: true,
  default: (props: HtmlHTMLAttributes<HTMLDivElement>) => (
    <div data-testid="header" {...props} />
  ),
}));

jest.mock("@/features/children/components/ChildrenClassroomFilters", () => ({
  ChildrenClassroomFilters: () => (
    <div data-testid="children-classroom-filters" />
  ),
}));

jest.mock("@/features/children/components/ChildrenList", () => ({
  __esModule: true,
  default: () => <div data-testid="children-list" />,
}));

jest.mock("@/features/children/components/ChildrenSearchInput", () => ({
  __esModule: true,
  default: () => <div data-testid="children-search-input" />,
}));

jest.mock(
  "@/features/children/components/ChildrenFetchAllRegisteredButton",
  () => ({
    __esModule: true,
    default: () => <div data-testid="children-fetch-all-registered-button" />,
  }),
);

jest.mock("@/features/children/services/getClassroomsByYear", () => ({
  getClassroomsByYear: jest.fn().mockResolvedValue([]),
}));

jest.mock("@/features/children/services/getRegisteredChildrenByYear", () => ({
  getRegisteredChildrenByYear: jest.fn().mockResolvedValue([]),
}));

jest.mock("next/navigation", () => ({
  redirect: jest.fn().mockImplementation((url) => {
    throw new Error(`NEXT_REDIRECT: ${url}`);
  }),
}));

describe("Main page tests", () => {
  it("displays base elements", async () => {
    const component = await Page({ searchParams: Promise.resolve({}) });
    render(component);

    expect(screen.getByTestId("children-search-input")).toBeInTheDocument();
    expect(
      screen.getByTestId("children-classroom-filters"),
    ).toBeInTheDocument();
    expect(screen.getByTestId("children-list")).toBeInTheDocument();
    expect(
      screen.queryByTestId("children-fetch-all-registered-button"),
    ).not.toBeInTheDocument();

    const registerLink = screen.getByRole("link", { name: /registrar niño/i });
    expect(registerLink).toBeInTheDocument();
    expect(registerLink.getAttribute("href")).toMatch(/\/children\/new$/);
  });

  it("redirects on invalid params", async () => {
    try {
      const component = await Page({
        searchParams: Promise.resolve({ y: "invalid" }),
      });
      render(component);
    } catch (error) {
      // Catch the redirect error to prevent the test from failing
    }

    expect(redirect).toHaveBeenCalledWith("/children");
  });

  it("shows the 'Fetch All Registered' button when a searchQuery is provided", async () => {
    const component = await Page({
      searchParams: Promise.resolve({ q: "search" }),
    });
    render(component);

    expect(
      screen.getByTestId("children-fetch-all-registered-button"),
    ).toBeInTheDocument();
  });

  it("shows dont show 'Fetch All Registered' button when a year is specified and a searchQuery is provided", async () => {
    const component = await Page({
      searchParams: Promise.resolve({ q: "search", ya: "true" }),
    });
    render(component);

    expect(
      screen.queryByTestId("children-fetch-all-registered-button"),
    ).not.toBeInTheDocument();
  });
});
