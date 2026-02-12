import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { SignInContainer } from "./SignIn";

describe("SignInContainer", () => {
  it("calls onSubmit function with correct arguments when form is submitted", async () => {
    const mockOnSubmit = jest.fn();

    const { getByTestId } = render(<SignInContainer onSubmit={mockOnSubmit} />);

    fireEvent.changeText(getByTestId("usernameInput"), "kalle");
    fireEvent.changeText(getByTestId("passwordInput"), "password");

    fireEvent.press(getByTestId("submitButton"));

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledTimes(1);
      expect(mockOnSubmit.mock.calls[0][0]).toEqual({
        username: "kalle",
        password: "password",
      });
    });
  });
});
