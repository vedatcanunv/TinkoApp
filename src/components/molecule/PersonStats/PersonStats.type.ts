import {StyleProp, ViewStyle} from 'react-native';

export interface Person {
  id: string;
  name: string;
  contentCount: number;
  imageUrl?: string;
}

export interface PersonStatsProps {
  /** İstatistik başlığı (örn. "En Çok İzlenen Yönetmenler") */
  title: string;
  /** Kişilerin listesi */
  persons: Person[];
  /** İsteğe bağlı stil tanımlamaları */
  style?: StyleProp<ViewStyle>;
}
