import React from 'react';
import {render} from '@testing-library/react-native';
import {PersonStats} from '../PersonStats.component';

const mockPersons = [
  {
    id: '1',
    name: 'Christopher Nolan',
    contentCount: 5,
  },
  {
    id: '2',
    name: 'Quentin Tarantino',
    contentCount: 3,
  },
];

describe('PersonStats', () => {
  it('bileşen doğru şekilde render edilmeli', () => {
    const {toJSON} = render(
      <PersonStats title="En Çok İzlenen Yönetmenler" persons={mockPersons} />
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it('özel stil ile render edilebilmeli', () => {
    const customStyle = {backgroundColor: 'red'};
    const {toJSON} = render(
      <PersonStats title="En Çok İzlenen Yönetmenler" persons={mockPersons} style={customStyle} />
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it('başlık ve kişi bilgileri doğru şekilde görüntülenmeli', () => {
    const {getByText} = render(
      <PersonStats title="En Çok İzlenen Yönetmenler" persons={mockPersons} />
    );

    expect(getByText('En Çok İzlenen Yönetmenler')).toBeTruthy();
    expect(getByText('Christopher Nolan')).toBeTruthy();
    expect(getByText('5 içerik')).toBeTruthy();
    expect(getByText('Quentin Tarantino')).toBeTruthy();
    expect(getByText('3 içerik')).toBeTruthy();
  });
});
