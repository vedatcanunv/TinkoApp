import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {SignUpScreen} from '../SignUpScreen.component';

describe('SignUpScreen Component', () => {
  const mockOnSignUp = jest.fn();
  const mockOnLoginPress = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const {toJSON} = render(
      <SignUpScreen onSignUp={mockOnSignUp} onLoginPress={mockOnLoginPress} />
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it('handles name input correctly', () => {
    const {getByPlaceholderText} = render(
      <SignUpScreen onSignUp={mockOnSignUp} onLoginPress={mockOnLoginPress} />
    );

    const nameInput = getByPlaceholderText('Ad Soyad');
    fireEvent.changeText(nameInput, 'Test User');

    expect(nameInput.props.value).toBe('Test User');
  });

  it('handles email input correctly', () => {
    const {getByPlaceholderText} = render(
      <SignUpScreen onSignUp={mockOnSignUp} onLoginPress={mockOnLoginPress} />
    );

    const emailInput = getByPlaceholderText('E-posta');
    fireEvent.changeText(emailInput, 'test@example.com');

    expect(emailInput.props.value).toBe('test@example.com');
  });

  it('handles password input correctly', () => {
    const {getByPlaceholderText} = render(
      <SignUpScreen onSignUp={mockOnSignUp} onLoginPress={mockOnLoginPress} />
    );

    const passwordInput = getByPlaceholderText('Parola');
    fireEvent.changeText(passwordInput, 'password123');

    expect(passwordInput.props.value).toBe('password123');
  });

  it('calls onSignUp with name, email, and password when sign up button is pressed', () => {
    const {getByPlaceholderText, getByText} = render(
      <SignUpScreen onSignUp={mockOnSignUp} onLoginPress={mockOnLoginPress} />
    );

    const nameInput = getByPlaceholderText('Ad Soyad');
    const emailInput = getByPlaceholderText('E-posta');
    const passwordInput = getByPlaceholderText('Parola');
    const signUpButton = getByText('Kayıt Ol');

    fireEvent.changeText(nameInput, 'Test User');
    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.changeText(passwordInput, 'password123');
    fireEvent.press(signUpButton);

    expect(mockOnSignUp).toHaveBeenCalledWith('Test User', 'test@example.com', 'password123');
  });

  it('calls onLoginPress when login button is pressed', () => {
    const {getByText} = render(
      <SignUpScreen onSignUp={mockOnSignUp} onLoginPress={mockOnLoginPress} />
    );

    const loginButton = getByText('Zaten hesabın var mı? Giriş yap');
    fireEvent.press(loginButton);

    expect(mockOnLoginPress).toHaveBeenCalled();
  });

  it('does not call onSignUp with invalid email', () => {
    const {getByPlaceholderText, getByText} = render(
      <SignUpScreen onSignUp={mockOnSignUp} onLoginPress={mockOnLoginPress} />
    );

    const nameInput = getByPlaceholderText('Ad Soyad');
    const emailInput = getByPlaceholderText('E-posta');
    const passwordInput = getByPlaceholderText('Parola');
    const signUpButton = getByText('Kayıt Ol');

    fireEvent.changeText(nameInput, 'Test User');
    fireEvent.changeText(emailInput, 'invalid-email');
    fireEvent.changeText(passwordInput, 'password123');
    fireEvent.press(signUpButton);

    expect(mockOnSignUp).not.toHaveBeenCalled();
  });

  it('does not call onSignUp with empty name', () => {
    const {getByPlaceholderText, getByText} = render(
      <SignUpScreen onSignUp={mockOnSignUp} onLoginPress={mockOnLoginPress} />
    );

    const emailInput = getByPlaceholderText('E-posta');
    const passwordInput = getByPlaceholderText('Parola');
    const signUpButton = getByText('Kayıt Ol');

    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.changeText(passwordInput, 'password123');
    fireEvent.press(signUpButton);

    expect(mockOnSignUp).not.toHaveBeenCalled();
  });

  it('shows error message with invalid input', () => {
    const {getByPlaceholderText, getByText, queryByText} = render(
      <SignUpScreen onSignUp={mockOnSignUp} onLoginPress={mockOnLoginPress} />
    );

    const nameInput = getByPlaceholderText('Ad Soyad');
    const emailInput = getByPlaceholderText('E-posta');
    const passwordInput = getByPlaceholderText('Parola');
    const signUpButton = getByText('Kayıt Ol');

    fireEvent.changeText(nameInput, 'Test');
    fireEvent.changeText(emailInput, 'invalid');
    fireEvent.changeText(passwordInput, '123');
    fireEvent.press(signUpButton);

    const errorMessage = queryByText(
      'Lütfen geçerli bir e-posta ve en az 6 karakterli bir parola girin.'
    );
    expect(errorMessage).toBeTruthy();
  });

  it('shows password validation error for short password', () => {
    const {getByPlaceholderText, getByText, queryByText} = render(
      <SignUpScreen onSignUp={mockOnSignUp} onLoginPress={mockOnLoginPress} />
    );

    const nameInput = getByPlaceholderText('Ad Soyad');
    const emailInput = getByPlaceholderText('E-posta');
    const passwordInput = getByPlaceholderText('Parola');
    const signUpButton = getByText('Kayıt Ol');

    fireEvent.changeText(nameInput, 'Test User');
    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.changeText(passwordInput, '123');
    fireEvent.press(signUpButton);

    const errorMessage = queryByText('Parola en az 6 karakter olmalıdır.');
    expect(errorMessage).toBeTruthy();
  });
});
