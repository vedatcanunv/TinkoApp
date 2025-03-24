import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { LoginScreen } from "../LoginScreen.component";

describe("LoginScreen Component", () => {
  const mockOnLogin = jest.fn();
  const mockOnSignUpPress = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly", () => {
    const { toJSON } = render(
      <LoginScreen onLogin={mockOnLogin} onSignUpPress={mockOnSignUpPress} />
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it("handles email input correctly", () => {
    const { getByPlaceholderText } = render(
      <LoginScreen onLogin={mockOnLogin} onSignUpPress={mockOnSignUpPress} />
    );

    const emailInput = getByPlaceholderText("E-posta");
    fireEvent.changeText(emailInput, "test@example.com");

    expect(emailInput.props.value).toBe("test@example.com");
  });

  it("handles password input correctly", () => {
    const { getByPlaceholderText } = render(
      <LoginScreen onLogin={mockOnLogin} onSignUpPress={mockOnSignUpPress} />
    );

    const passwordInput = getByPlaceholderText("Parola");
    fireEvent.changeText(passwordInput, "password123");

    expect(passwordInput.props.value).toBe("password123");
  });

  it("calls onLogin with email and password when login button is pressed", () => {
    const { getByPlaceholderText, getByText } = render(
      <LoginScreen onLogin={mockOnLogin} onSignUpPress={mockOnSignUpPress} />
    );

    const emailInput = getByPlaceholderText("E-posta");
    const passwordInput = getByPlaceholderText("Parola");
    const loginButton = getByText("Giriş Yap");

    fireEvent.changeText(emailInput, "test@example.com");
    fireEvent.changeText(passwordInput, "password123");
    fireEvent.press(loginButton);

    expect(mockOnLogin).toHaveBeenCalledWith("test@example.com", "password123");
  });

  it("calls onSignUpPress when sign up button is pressed", () => {
    const { getByText } = render(
      <LoginScreen onLogin={mockOnLogin} onSignUpPress={mockOnSignUpPress} />
    );

    const signUpButton = getByText("Hesabın yok mu? Kayıt ol");
    fireEvent.press(signUpButton);

    expect(mockOnSignUpPress).toHaveBeenCalled();
  });

  it("does not call onLogin with invalid email", () => {
    const { getByPlaceholderText, getByText } = render(
      <LoginScreen onLogin={mockOnLogin} onSignUpPress={mockOnSignUpPress} />
    );

    const emailInput = getByPlaceholderText("E-posta");
    const passwordInput = getByPlaceholderText("Parola");
    const loginButton = getByText("Giriş Yap");

    fireEvent.changeText(emailInput, "invalid-email");
    fireEvent.changeText(passwordInput, "password123");
    fireEvent.press(loginButton);

    expect(mockOnLogin).not.toHaveBeenCalled();
  });

  it("does not call onLogin with empty password", () => {
    const { getByPlaceholderText, getByText } = render(
      <LoginScreen onLogin={mockOnLogin} onSignUpPress={mockOnSignUpPress} />
    );

    const emailInput = getByPlaceholderText("E-posta");
    const loginButton = getByText("Giriş Yap");

    fireEvent.changeText(emailInput, "test@example.com");
    fireEvent.press(loginButton);

    expect(mockOnLogin).not.toHaveBeenCalled();
  });

  it("shows error message with invalid credentials", () => {
    const { getByPlaceholderText, getByText, queryByText } = render(
      <LoginScreen onLogin={mockOnLogin} onSignUpPress={mockOnSignUpPress} />
    );

    const emailInput = getByPlaceholderText("E-posta");
    const passwordInput = getByPlaceholderText("Parola");
    const loginButton = getByText("Giriş Yap");

    fireEvent.changeText(emailInput, "invalid");
    fireEvent.changeText(passwordInput, "123");
    fireEvent.press(loginButton);

    const errorMessage = queryByText("Geçersiz e-posta veya parola.");
    expect(errorMessage).toBeTruthy();
  });
});
