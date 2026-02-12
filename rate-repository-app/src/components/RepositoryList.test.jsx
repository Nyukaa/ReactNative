import { render, screen, within } from "@testing-library/react-native";
import { RepositoryListContainer } from "./RepositoryList";

describe("RepositoryList", () => {
  describe("RepositoryListContainer", () => {
    it("renders repository information correctly", () => {
      const repositories = {
        totalCount: 8,
        pageInfo: {
          hasNextPage: true,
          endCursor: "end",
          startCursor: "start",
        },
        edges: [
          {
            node: {
              id: "jaredpalmer.formik",
              fullName: "jaredpalmer/formik",
              description: "Build forms in React, without the tears",
              language: "TypeScript",
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl: "url",
            },
          },
          {
            node: {
              id: "async-library.react-async",
              fullName: "async-library/react-async",
              description: "Flexible promise-based React data loader",
              language: "JavaScript",
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl: "url",
            },
          },
        ],
      };

      render(<RepositoryListContainer repositories={repositories} />);

      const repositoryItems = screen.getAllByTestId("repositoryItem");

      expect(repositoryItems).toHaveLength(2);
      const [firstRepo, secondRepo] = repositoryItems;

      // First repository, use within to get elements within the first repository item
      expect(within(firstRepo).getByText("jaredpalmer/formik")).toBeDefined();
      expect(
        within(firstRepo).getByText("Build forms in React, without the tears")
      ).toBeDefined();
      expect(within(firstRepo).getByText("TypeScript")).toBeDefined();
      expect(within(firstRepo).getByText("21.9k")).toBeDefined();
      expect(within(firstRepo).getByText("1.6k")).toBeDefined();
      expect(within(firstRepo).getByText("88")).toBeDefined();
      expect(within(firstRepo).getByText("3")).toBeDefined();

      // Second repository
      expect(
        within(secondRepo).getByText("async-library/react-async")
      ).toBeDefined();
      expect(
        within(secondRepo).getByText("Flexible promise-based React data loader")
      ).toBeDefined();
      expect(within(secondRepo).getByText("JavaScript")).toBeDefined();
      expect(within(secondRepo).getByText("1.8k")).toBeDefined();
      expect(within(secondRepo).getByText("69")).toBeDefined();
      expect(within(secondRepo).getByText("72")).toBeDefined();
      expect(within(secondRepo).getByText("3")).toBeDefined();
    });
  });
});
