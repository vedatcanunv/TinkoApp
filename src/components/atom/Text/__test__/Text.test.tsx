import React from 'react';
import {render} from '@testing-library/react-native';
import {Text} from '../Text.component';

describe('Text Component', () => {
  it('renders correctly with default props', () => {
    const {toJSON} = render(<Text>Test Text</Text>);
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders with different sizes', () => {
    const {toJSON: s} = render(<Text size="s">Small Text</Text>);
    const {toJSON: m} = render(<Text size="m">Medium Text</Text>);
    const {toJSON: l} = render(<Text size="l">Large Text</Text>);
    const {toJSON: xl} = render(<Text size="xl">XL Text</Text>);
    const {toJSON: xxl} = render(<Text size="xxl">XXL Text</Text>);
    const {toJSON: xxxl} = render(<Text size="xxxl">XXXL Text</Text>);
    const {toJSON: display} = render(<Text size="display">Display Text</Text>);

    expect(s()).toMatchSnapshot('s size');
    expect(m()).toMatchSnapshot('m size');
    expect(l()).toMatchSnapshot('l size');
    expect(xl()).toMatchSnapshot('xl size');
    expect(xxl()).toMatchSnapshot('xxl size');
    expect(xxxl()).toMatchSnapshot('xxxl size');
    expect(display()).toMatchSnapshot('display size');
  });

  it('renders with different weights', () => {
    const {toJSON: regular} = render(<Text weight="regular">Regular</Text>);
    const {toJSON: medium} = render(<Text weight="medium">Medium</Text>);
    const {toJSON: semibold} = render(<Text weight="semibold">Semi Bold</Text>);
    const {toJSON: bold} = render(<Text weight="bold">Bold</Text>);

    expect(regular()).toMatchSnapshot('regular weight');
    expect(medium()).toMatchSnapshot('medium weight');
    expect(semibold()).toMatchSnapshot('semibold weight');
    expect(bold()).toMatchSnapshot('bold weight');
  });

  it('renders with different colors', () => {
    const {toJSON: primary} = render(<Text color="primary">Primary</Text>);
    const {toJSON: secondary} = render(<Text color="secondary">Secondary</Text>);
    const {toJSON: white} = render(<Text color="white">White</Text>);
    const {toJSON: default_} = render(<Text color="default">Default</Text>);
    const {toJSON: danger} = render(<Text color="danger">Danger</Text>);

    expect(primary()).toMatchSnapshot('primary color');
    expect(secondary()).toMatchSnapshot('secondary color');
    expect(white()).toMatchSnapshot('white color');
    expect(default_()).toMatchSnapshot('default color');
    expect(danger()).toMatchSnapshot('danger color');
  });

  it('renders with custom style', () => {
    const {toJSON} = render(
      <Text style={{marginTop: 10, paddingHorizontal: 5}}>Custom Style Text</Text>
    );
    expect(toJSON()).toMatchSnapshot('custom style');
  });

  it('renders with text align', () => {
    const {toJSON: center} = render(<Text align="center">Center</Text>);
    const {toJSON: left} = render(<Text align="left">Left</Text>);
    const {toJSON: right} = render(<Text align="right">Right</Text>);

    expect(center()).toMatchSnapshot('center align');
    expect(left()).toMatchSnapshot('left align');
    expect(right()).toMatchSnapshot('right align');
  });
});
