import {StyleProp, ViewStyle} from 'react-native';

export interface Person {
  /**
   * Kişi ID'si
   */
  id: string;

  /**
   * Kişi adı
   */
  name: string;

  /**
   * Kişinin içerik sayısı
   */
  contentCount: number;

  /**
   * Kişi fotoğraf URL'i
   */
  imageUrl?: string;
}

export interface PersonStatsProps {
  /**
   * İstatistik başlığı (örn. "En Çok İzlenen Yönetmenler")
   */
  title: string;

  /**
   * Kişilerin listesi
   */
  persons: Person[];

  /**
   * İsteğe bağlı stil tanımlamaları
   */
  style?: StyleProp<ViewStyle>;
}
