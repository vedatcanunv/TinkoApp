import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {Button} from '../Button.component';
import {Text} from '../../Text';

describe('Button Component', () => {
  it('renders correctly with title', () => {
    const {toJSON} = render(<Button title="Test Button" onPress={() => {}} />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders with custom content', () => {
    const {toJSON} = render(
      <Button title="Test Button" onPress={() => {}}>
        <Text>Custom Button Content</Text>
      </Button>
    );
    expect(toJSON()).toMatchSnapshot('with custom content');
  });

  it('calls onPress when pressed', () => {
    const onPressMock = jest.fn();
    const {getByText} = render(<Button title="Pressable Button" onPress={onPressMock} />);

    const button = getByText('Pressable Button');
    fireEvent.press(button);
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it('renders with different variants', () => {
    const {toJSON: primary} = render(
      <Button title="Primary" onPress={() => {}} variant="outline" />
    );
    const {toJSON: secondary} = render(
      <Button title="Secondary" onPress={() => {}} variant="filled" />
    );
    const {toJSON: outline} = render(
      <Button title="Outline" onPress={() => {}} variant="outline" />
    );
    const {toJSON: transparent} = render(
      <Button title="Transparent" onPress={() => {}} variant="filled" />
    );

    expect(primary()).toMatchSnapshot('primary variant');
    expect(secondary()).toMatchSnapshot('secondary variant');
    expect(outline()).toMatchSnapshot('outline variant');
    expect(transparent()).toMatchSnapshot('transparent variant');
  });

  it('renders with different sizes', () => {
    const {toJSON: small} = render(<Button title="Small" onPress={() => {}} size="small" />);
    const {toJSON: medium} = render(<Button title="Medium" onPress={() => {}} size="medium" />);
    const {toJSON: large} = render(<Button title="Large" onPress={() => {}} size="large" />);

    expect(small()).toMatchSnapshot('small size');
    expect(medium()).toMatchSnapshot('medium size');
    expect(large()).toMatchSnapshot('large size');
  });

  it('renders disabled state correctly', () => {
    const onPressMock = jest.fn();
    const {getByText, toJSON} = render(
      <Button title="Disabled Button" disabled onPress={onPressMock} />
    );

    const button = getByText('Disabled Button');
    fireEvent.press(button);
    expect(onPressMock).not.toHaveBeenCalled();
    expect(toJSON()).toMatchSnapshot('disabled button');
  });

  it('renders with custom style', () => {
    const {toJSON} = render(
      <Button
        title="Styled Button"
        onPress={() => {}}
        style={{marginHorizontal: 20, borderRadius: 10}}
      />
    );
    expect(toJSON()).toMatchSnapshot('with custom style');
  });

  it('renders with loading state', () => {
    const {toJSON} = render(<Button title="Loading Button" onPress={() => {}} loading />);
    expect(toJSON()).toMatchSnapshot('loading state');
  });
});
