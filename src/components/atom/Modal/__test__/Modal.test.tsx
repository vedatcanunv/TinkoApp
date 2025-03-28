import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {Modal} from '../Modal.component';
import {Text} from '../../Text';

describe('Modal Component', () => {
  it('renders correctly when visible', () => {
    const {toJSON} = render(
      <Modal visible onClose={jest.fn()}>
        <Text>Modal Content</Text>
      </Modal>
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it('does not render when not visible', () => {
    const {toJSON} = render(
      <Modal visible={false} onClose={jest.fn()}>
        <Text>Modal Content</Text>
      </Modal>
    );
    // Modal görünür olmadığında null döner
    expect(toJSON()).toBeNull();
  });

  it('calls onClose when close button is pressed', () => {
    const onCloseMock = jest.fn();
    const {getByTestId} = render(
      <Modal visible onClose={onCloseMock}>
        <Text>Modal Content</Text>
      </Modal>
    );

    // Not: Modal bileşeninde close button için testID eklenmesi gerekiyor
    fireEvent.press(getByTestId('modal-close-button'));
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it('renders with custom height', () => {
    const {toJSON} = render(
      <Modal visible onClose={jest.fn()} height={80}>
        <Text>Modal Content</Text>
      </Modal>
    );
    expect(toJSON()).toMatchSnapshot('with 80% height');
  });

  it('renders with custom styles', () => {
    const customStyle = {backgroundColor: 'rgba(0,0,0,0.8)'};
    const {toJSON} = render(
      <Modal visible onClose={jest.fn()} style={customStyle}>
        <Text>Modal Content</Text>
      </Modal>
    );
    expect(toJSON()).toMatchSnapshot('with custom style');
  });
});
