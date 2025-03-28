import {useRef, useEffect, useMemo} from 'react';
import {InteractionManager, Platform} from 'react-native';
import React, {lazy} from 'react';

/**
 * Performans ölçümü için kullanılabilecek bir hook.
 * Bileşen ilk render olduğunda ve unmount olduğunda geçen süreyi ölçer.
 *
 * @param componentName Ölçülecek bileşen adı
 */
export const usePerformanceMeasure = (componentName: string) => {
  const startTime = useRef(Date.now());
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    console.log(`[Performans] ${componentName} yükleniyor...`);
    return () => {
      if (isMounted.current) {
        const duration = Date.now() - startTime.current;
        console.log(`[Performans] ${componentName} unmount oldu. Süre: ${duration}ms`);
      }
    };
  }, [componentName]);
};

/**
 * Ağır işlemleri UI thread'ten ayırarak UI donmalarını engeller.
 *
 * @param task Çalıştırılacak ağır işlem
 * @param callback İşlem tamamlandığında çalışacak callback
 */
export const runInBackground = <T>(task: () => T, callback?: (result: T) => void) => {
  InteractionManager.runAfterInteractions(() => {
    const result = task();
    if (callback) {
      callback(result);
    }
  });
};

/**
 * İhtiyaç duyulmayan kaynakları temizleyen fonksiyon.
 * Bellek sızıntılarını önlemek için kullanılabilir.
 *
 * @param resources Temizlenecek kaynaklar
 */
export const cleanupResources = (resources: Array<any>) => {
  resources.forEach(resource => {
    if (resource && typeof resource.cleanup === 'function') {
      resource.cleanup();
    } else if (resource && typeof resource.release === 'function') {
      resource.release();
    } else if (resource && typeof resource.remove === 'function') {
      resource.remove();
    }
  });
};

/**
 * Platform özelliklerine göre optimal stil ve davranış değerlerini döndüren yardımcı
 */
export const getPlatformOptimalValues = () => {
  return {
    isIOS: Platform.OS === 'ios',
    isAndroid: Platform.OS === 'android',
    shadowStyle: Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
      default: {},
    }),
    animationOptimal: Platform.select({
      ios: true,
      android: false, // Android'de bazı animasyonlar performans sorunları yaratabilir
    }),
  };
};
