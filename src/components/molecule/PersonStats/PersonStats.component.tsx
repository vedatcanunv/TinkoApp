import React from 'react';
import {View} from 'react-native';
import {Text} from '../../atom/Text';
import {styles} from './PersonStats.style';
import {PersonStatsProps} from './PersonStats.type';

export const PersonStats: React.FC<PersonStatsProps> = ({title, persons, style}) => {
  return (
    <View style={[styles.container, style]}>
      <Text size="xl" weight="bold" color="primary" style={styles.title}>
        {title}
      </Text>
      {persons.map(person => (
        <View key={person.id} style={styles.personItem}>
          <View style={styles.personImagePlaceholder}>
            <Text size="l" color="white">
              {person.name.charAt(0)}
            </Text>
          </View>
          <View style={styles.personInfo}>
            <Text size="m" color="light">
              {person.name}
            </Text>
            <Text size="s" color="light">
              {person.contentCount} içerik
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
};
