# TinkoApp

Modern React Native uygulaması için Atomic Design yapısında geliştirilmiş bir şablon projesidir.

## Performans İyileştirmeleri

Projede performans optimizasyonu için yapılan iyileştirmeler:

### Komponent Optimizasyonları

- **React.memo Kullanımı**: UI komponentleri gereksiz render'ları önlemek için `React.memo` ile sarmalanmıştır.

  ```tsx
  export const Button = memo(({} /* props */ : ButtonProps) => {
    // component logic
  });
  ```

- **useCallback Kullanımı**: Event handler fonksiyonları `useCallback` ile optimize edilmiştir.

  ```tsx
  const handlePress = useCallback(() => {
    // handler logic
  }, [dependencies]);
  ```

- **Stilizasyon İyileştirmeleri**: Template string yerine doğrudan referanslar kullanılmış, tip güvenliği sağlanmıştır.

  ```tsx
  // Öncesi:
  <Text style={[styles.text, styles[`${variant}Text`]]}>{title}</Text>

  // Sonrası:
  <Text style={[styles.text, getVariantTextStyle(variant)]}>{title}</Text>
  ```

### Merkezi Stil Sistemi

- **styleKit.ts**: Yazı tipi, aralık, köşe yuvarlaklığı ve gölge gibi stil tanımları merkezi bir dosyada toplanmıştır.

  ```tsx
  import { TYPOGRAPHY, SPACING, VISUAL } from "../../../helpers/styleKit";
  ```

- **Renk Sistemi**: Tüm renkler `colors.ts` içinde merkezi olarak yönetilmektedir.
  ```tsx
  import { COLORS } from "../../../helpers/colors";
  ```

### Performans Yardımcıları

- **usePerformanceMeasure**: Komponent performansını ölçmek için özel hook.

  ```tsx
  usePerformanceMeasure("HomeScreen");
  ```

- **runInBackground**: Ağır işlemleri UI thread'inden ayırmak için yardımcı fonksiyon.

  ```tsx
  runInBackground(
    () => heavyComputation(),
    (result) => setState(result)
  );
  ```

- **cleanupResources**: Bellek sızıntılarını önlemek için kaynakları temizleme fonksiyonu.
  ```tsx
  useEffect(() => {
    return () => cleanupResources([resource1, resource2]);
  }, []);
  ```

## Stil Standardizasyonu

### Atomic Design Yapısı

- **Atoms**: En temel UI komponentleri (Button, Input, Text)
- **Molecules**: Atomların birleşimi (Card, FormField)
- **Organisms**: Karmaşık UI grupları (Header, TabBar)
- **Templates**: Sayfa düzenleri
- **Pages/Screens**: Tam sayfalar

### Dosya Yapısı

Komponentler aşağıdaki dosya yapısını takip eder:

```
ComponentName/
  ├── ComponentName.component.tsx
  ├── ComponentName.style.ts
  ├── ComponentName.type.ts
  └── index.ts
```

## Kullanım Örnekleri

### Text Komponenti

```tsx
<Text size="m" weight="medium" color="primary">
  Merhaba Dünya
</Text>
```

### Button Komponenti

```tsx
<Button
  title="Giriş Yap"
  variant="primary"
  size="medium"
  onPress={handleLogin}
  iconLeft={<Icon name="login" />}
/>
```

### Input Komponenti

```tsx
<Input
  label="E-posta"
  placeholder="E-posta adresinizi girin"
  variant="outline"
  size="medium"
  leftIcon={<Icon name="email" />}
  error={errors.email}
  onChangeText={setEmail}
/>
```

## Geliştirme Kılavuzu

1. Yeni komponentler eklerken Atomic Design prensiplerini takip edin
2. Stil tanımlarında merkezi styleKit ve COLORS sistemini kullanın
3. Performans için React.memo ve uygun durumlarda useCallback/useMemo kullanın
4. Platform farklılıkları için performans.ts içindeki yardımcıları kullanın
