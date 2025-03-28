import React from 'react';
import {View} from 'react-native';
import {Loading, Text, Error} from '../../../components/atom';
import {styles} from './StateView.style';
import {StateViewProps} from './StateView.type';

export const StateView: React.FC<StateViewProps> = ({
  loading,
  error,
  empty,
  emptyText = 'Görüntülenecek içerik bulunamadı.',
  loadingText = 'İçerik yükleniyor...',
  errorText,
  onRetry,
}) => {
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Loading size="large" color="primary" />
        <Text size="m" color="light" style={styles.loadingText}>
          {loadingText}
        </Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Error message={errorText || error} onRetry={onRetry} />
      </View>
    );
  }

  if (empty) {
    return (
      <View style={styles.emptyContainer}>
        <Text size="m" color="light" style={styles.emptyText}>
          {emptyText}
        </Text>
      </View>
    );
  }

  return null;
};
