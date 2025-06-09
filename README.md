# SQL Öğrenme Rehberi

Modern ve interaktif SQL öğrenme platformu. Veri tabanı final sınavına hazırlık için kapsamlı görsel kılavuz.

## 🚀 Özellikler

### 🎯 Temel Özellikler

-   **İnteraktif SQL Sorgu Oluşturucu** - Tıklayarak SQL sorguları oluşturun
-   **Canlı Ses Dersleri** - Gelişmiş ses oynatıcı kontrolleri
-   **Veritabanı Şema Görüntüleyici** - Modal popup ile detaylı tablo yapıları
-   **Responsive Tasarım** - Mobil ve masaüstü uyumlu
-   **Font Awesome İkonları** - Modern ve profesyonel görünüm

### 🎮 İnteraktif Çalışma Alanı

-   **Drag & Click SQL Builder** - Komutları tıklayarak sorgu oluşturma
-   **Gerçek Zamanlı Önizleme** - SQL sorgunuzu anında görün
-   **Akıllı Sonuç Simülasyonu** - Gerçekçi veri sonuçları
-   **Klavye Kısayolları** - Hızlı erişim (Ctrl+Enter, Esc, Home)

### 🎧 Ses Dersleri

-   **Gelişmiş Oynatıcı Kontrolleri**
    -   Play/Pause/Stop
    -   10 saniye geri/ileri atlama
    -   Hız kontrolü (0.5x - 2x)
    -   Ses seviyesi ayarı
    -   İlerleme çubuğu
-   **Minimize Özelliği** - Küçük kare halinde minimize
-   **Otomatik Açık Menü** - Kolay erişim

### 🗃️ Veritabanı Şeması

-   **Modal Popup Görüntüleme** - Sayfayı uzatmadan açılır
-   **Detaylı Tablo Yapıları** - PRIMARY KEY, FOREIGN KEY gösterimi
-   **Örnek Veriler** - Her tablo için gerçek örnekler
-   **İlişki Açıklamaları** - JOIN işlemleri için rehber

## 📚 İçerik

### 🎯 Öğrenme Modülleri

1. **Temel Kavramlar** - SQL nedir, veritabanı temelleri
2. **CRUD İşlemleri** - Create, Read, Update, Delete
3. **SELECT & Filtreleme** - WHERE, LIKE, karşılaştırma operatörleri
4. **Aggregate Fonksiyonlar** - COUNT, AVG, MAX, MIN, SUM
5. **JOIN İşlemleri** - INNER, LEFT, RIGHT JOIN
6. **İleri Seviye** - Alt sorgular, Window Functions
7. **Sınav İpuçları** - Final sınavı hazırlık

### 🗄️ Veritabanı Şeması

-   **Öğrenciler Tablosu** - ID, Ad, Soyad, Yaş, Şehir, BölümID
-   **Dersler Tablosu** - DersID, DersAdı, Kredi, BölümID
-   **Notlar Tablosu** - NotID, ÖğrenciID, DersID, FinalNotu, VizeNotu
-   **Bölümler Tablosu** - BölümID, BölümAdı, FakülteAdı

## 🛠️ Teknolojiler

-   **HTML5** - Modern web standartları
-   **CSS3** - Responsive tasarım, animasyonlar, gradient'lar
-   **JavaScript (Vanilla)** - İnteraktif özellikler
-   **Font Awesome 6.0** - Modern ikon kütüphanesi
-   **Web Audio API** - Ses kontrolleri

## 📱 Responsive Tasarım

### Desktop (>768px)

-   Tam özellikli arayüz
-   Yan yana grid layoutlar
-   Geniş SQL komut alanları

### Tablet (768px)

-   Optimized navigation
-   Stacked content layouts
-   Touch-friendly controls

### Mobile (<480px)

-   Tek sütun düzen
-   Büyütülmüş butonlar
-   Optimize edilmiş ses kontrolleri

## 🎨 Özel Özellikler

### 🎵 Ses Sistemı

```javascript
// Ses kontrolleri
- playSuccessSound() - Başarı sesi
- playClickSound() - Tıklama efekti
- Audio Context API kullanımı
- Volume kontrolü (0-100%)
```

### 🖱️ İnteraktif SQL Builder

```javascript
// Komut ekleme/çıkarma
- toggleToken() - SQL komutları
- updateQueryDisplay() - Gerçek zamanlı güncelleme
- generateSampleResults() - Akıllı sonuç üretimi
```

### 🔄 Modal Sistemi

```javascript
// Şema görüntüleyici
- toggleSchemaViewer() - Modal açma/kapama
- Escape tuşu desteği
- Backdrop tıklama ile kapatma
```

## 📂 Dosya Yapısı

```
sql-ogrenme-rehberi/
├── index.html                 # Ana HTML dosyası
├── README.md                  # Bu dosya
├── SQL Öğrenci Veri Girişi İşlemleri.wav
├── SQL Öğrenci Veri Girişi İşlemleri (1).wav
└── assets/                    # (İsteğe bağlı)
    ├── css/
    ├── js/
    └── audio/
```

## 🎯 Kullanım

### 🎮 SQL Sorgu Oluşturma

1. "Veritabanı Şeması" butonuna tıklayarak tabloları inceleyin
2. SQL komutlarına tıklayarak sorgunuzu oluşturun
3. "Sorguyu Çalıştır" ile sonuçları görün
4. "Temizle" ile baştan başlayın

### 🎧 Ses Dersleri

1. Navigation'da "Ses Dersleri" menüsünü açın
2. İstediğiniz dersi seçin
3. Oynatıcı kontrollerini kullanın:
    - Play/Pause: ▶️⏸️
    - Atlama: ⏪⏩ (10 saniye)
    - Hız: 0.5x - 2x
    - Ses: 0-100%

### 📊 Aggregate Fonksiyonlar

1. Hazır fonksiyonları seçin
2. Özel fonksiyon oluşturun:
    - Fonksiyon türü seçin
    - Sütun adı girin
    - "Ekle" butonuna basın

## 🎓 Eğitim İçeriği

### 📖 Öğrenme Hedefleri

-   SQL temel kavramlarını anlama
-   CRUD işlemlerini öğrenme
-   JOIN kavramını kavrama
-   Aggregate fonksiyonları kullanma
-   Alt sorgu yazabilme
-   Final sınavına hazırlanma

### 🎯 Hedef Kitle

-   Bilgisayar Mühendisliği öğrencileri
-   Veritabanı dersi alanlar
-   SQL öğrenmek isteyenler
-   Final sınavına hazırlananlar

## 🤝 Katkıda Bulunma

1. **Fork** edin
2. **Feature branch** oluşturun
3. **Commit** yapın
4. **Push** edin
5. **Pull Request** açın

## 📜 Lisans

Bu proje eğitim amaçlı geliştirilmiştir.

## 📞 İletişim

Proje hakkında sorularınız için issue açabilirsiniz.

---
