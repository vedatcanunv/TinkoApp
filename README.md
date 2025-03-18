# TinkoApp

Modern React Native uygulaması için Atomic Design yapısında geliştirilmiş bir projedir.

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
