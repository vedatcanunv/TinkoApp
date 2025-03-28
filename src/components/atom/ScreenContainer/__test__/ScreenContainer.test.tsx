import React from 'react';
import {render} from '@testing-library/react-native';
import {ScreenContainer} from '../ScreenContainer.component';
import {Text} from '../../Text';

describe('ScreenContainer Component', () => {
  it('renders correctly', () => {
    const {toJSON} = render(
      <ScreenContainer>
        <Text>Screen Content</Text>
      </ScreenContainer>
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders with custom style', () => {
    const customStyle = {backgroundColor: 'red', padding: 20};
    const {toJSON} = render(
      <ScreenContainer style={customStyle}>
        <Text>Screen Content</Text>
      </ScreenContainer>
    );
    expect(toJSON()).toMatchSnapshot('with custom style');
  });

  it('renders with withTabBarPadding prop', () => {
    const {toJSON: withPadding} = render(
      <ScreenContainer withTabBarPadding={true}>
        <Text>With Tab Bar Padding</Text>
      </ScreenContainer>
    );

    const {toJSON: withoutPadding} = render(
      <ScreenContainer withTabBarPadding={false}>
        <Text>Without Tab Bar Padding</Text>
      </ScreenContainer>
    );

    expect(withPadding()).toMatchSnapshot('with tab bar padding');
    expect(withoutPadding()).toMatchSnapshot('without tab bar padding');
  });
});
