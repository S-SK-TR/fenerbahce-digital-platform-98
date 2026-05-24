---
name: ai-last-control-premium
description: Pipeline son aşaması — Deploy öncesi 30 maddelik kapsamlı kalite kontrol ve auto-fix rehberi
---

# 🛡️ AI Son Kontrol Skill — Premium Deploy Gate (v4)

> **Bu skill, pipeline'ın SON aşamasında çalıştırılır.**
> Build başarılı olduktan sonra, GitHub'a push etmeden ÖNCE bu kontrol listesi uygulanır.
> Her madde `BLOCKER`, `CRITICAL`, `WARNING` veya `INFO` seviyesindedir.
> `BLOCKER` seviyesindeki sorunlar çözülmeden proje deploy EDİLEMEZ.

---

## 🔴 BLOCKER Seviyesi — Deploy Edilemez (Boş Ekran / Runtime Crash)

### B1. Component Props Eksikliği (Undefined Crash)
**Kontrol**: Tüm route element'lerinde kullanılan bileşenlerin zorunlu prop'ları var mı?
```
KONTROL ADIMLARI:
1. App.tsx (veya Routes dosyası) içindeki tüm <Route element={<Component />} /> satırlarını bul
2. Her Component'in interface/type tanımını kontrol et
3. Zorunlu (optional olmayan) prop varsa ve Route'ta verilmemişse → BLOCKER

BEKLENEN:
- Ya Component'in tüm props'ları optional (?) olmalı
- Ya da Route'ta tüm zorunlu props geçilmeli
- Ya da Component varsayılan değerler (default props) kullanmalı

AUTO-FIX:
- Component'teki tüm interface prop'larına varsayılan değer ekle
- Veya props'ları optional (?) yap
- Veya Component içinde mock/demo data ile fallback tanımla
```

**ÖRNEK HATA**:
```tsx
// ❌ BLOCKER — studentCount zorunlu ama geçilmemiş
interface DashboardProps { studentCount: number; }
<Route path="/" element={<Dashboard />} />

// ✅ DÜZGÜN — varsayılan değer var
interface DashboardProps { studentCount?: number; }
// veya component içinde:
export function Dashboard({ studentCount = 0, ...}: DashboardProps) { ... }
```

---

### B2. public/ Klasörü ve PWA Asset'leri
**Kontrol**: PWA ikonları ve temel asset dosyaları fiziksel olarak mevcut mi?
```
ZORUNLU DOSYALAR:
├── public/
│   ├── favicon.ico              (veya favicon.svg)
│   ├── pwa-192x192.png
│   ├── pwa-512x512.png
│   └── apple-touch-icon.png

KONTROL ADIMLARI:
1. vite.config içindeki VitePWA manifest.icons dizisindeki dosya adlarını çıkar
2. Her dosyanın code_files listesinde veya public/ altında olduğunu doğrula
3. Eksik dosya varsa → BLOCKER

AUTO-FIX:
- Eksik ikon dosyalarını code_files listesine placeholder SVG/PNG olarak ekle
- En azından boş bir manifest.json oluştur
```

---

### B3. CSS Değişkeni Uyumsuzluğu (Görünmez UI)
**Kontrol**: Bileşenlerde kullanılan CSS custom property'leri (var(--xxx)) index.css'te tanımlı mı?
```
KONTROL ADIMLARI:
1. Tüm .tsx/.jsx dosyalarındaki var(--xxx) referanslarını topla
2. index.css'teki .dark { } ve .light { } bloklarında tanımlı değişkenleri topla
3. Kullanılan ama tanımlanmayan değişken varsa → BLOCKER

YAYGIN EKSİKLER:
- --bg-surface  (MobileBottomNav'da kullanılır ama tanımsız)
- --bg-sidebar  (Sidebar bileşenlerinde)
- --accent      (CTA butonlarında)

AUTO-FIX:
- Eksik değişkenleri index.css'e makul varsayılan değerlerle ekle:
  --bg-surface: rgba(15, 23, 42, 0.95);
  --bg-sidebar: rgba(15, 23, 42, 0.8);
  --accent: 217 91% 60%;
```

---

### B4. CSS Format Uyumsuzluğu (hsl vs rgba)
**Kontrol**: tailwind.config'teki renk referansları ile CSS değişkenlerinin formatı eşleşiyor mu?
```
KONTROL ADIMLARI:
1. tailwind.config dosyasında hsl(var(--xxx)) kullanılan renkleri bul
2. index.css'te bu değişkenlerin değerlerini kontrol et
3. hsl() beklenen yerde rgba() veya hex tanımlıysa → BLOCKER

BEKLENEN FORMAT:
- tailwind.config: 'hsl(var(--border))'   →  index.css: --border: 220 14% 20%;
- tailwind.config: 'var(--border)'        →  index.css: --border: rgba(255,255,255,0.1);

AUTO-FIX:
- Tüm hsl(var(--xxx)) referanslarında: CSS değerini HSL formatına çevir
  Örn: rgba(255,255,255,0.1) → 0 0% 100% / 0.1
- VEYA tailwind.config'deki hsl() wrapper'ını kaldır ve var(--xxx) yap
```

---

## 🟡 CRITICAL Seviyesi — Fonksiyonellik Eksik

### C1. State Management (Zustand) Kurulumu
**Kontrol**: Merkezi state yönetimi var mı?
```
KONTROL ADIMLARI:
1. package.json'da "zustand" bağımlılığı var mı?
2. src/core/ veya src/store/ altında store dosyası var mı?
3. En az 1 bileşen useStore() veya create() ile store kullanıyor mu?

YOKSA:
- package.json'a "zustand": "^4.5.0" ekle
- src/core/store.ts oluştur (AppState + AppActions + persist middleware)
- Feature bileşenlerinde mock data yerine store'dan veri çek

MINIMUM STORE ŞABLONU:
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
interface AppState { theme: 'dark' | 'light'; /* ... */ }
interface AppActions { setTheme: (t: 'dark' | 'light') => void; }
export const useStore = create<AppState & AppActions>()(
  persist((set) => ({
    theme: 'dark',
    setTheme: (theme) => set({ theme }),
  }), { name: 'app-store' })
);
```

---

### C2. Desktop Navigasyon
**Kontrol**: Desktop görünümde (md+ breakpoint) kullanıcı sayfalar arası geçiş yapabiliyor mu?
```
KONTROL ADIMLARI:
1. AppShell/Navbar bileşeninde <NavLink> veya <Link> var mı?
2. Navbar'da navigasyon öğeleri md: veya lg: breakpoint'te görünüyor mu?
3. Veya sidebar bileşeni var mı?
4. "Buraya daha fazla navigasyon öğesi eklenebilir" gibi TODO yorumu varsa → CRITICAL

AUTO-FIX:
- AppShell navbar'ına tüm route'lar için NavLink ekle
- Desktop: Yatay navbar linkleri veya sidebar
- Mobil: Bottom navigation (MobileBottomNav) ile tutarlı olmalı
```

---

### C3. Grafik/Chart Placeholder'ları
**Kontrol**: "Grafik burada görüntülenecek" gibi placeholder metinler var mı?
```
KONTROL ADIMLARI:
1. Tüm .tsx dosyalarında "burada görüntülenecek", "placeholder", "coming soon" ara
2. Boş div'lerle doldurulmuş alan varsa → CRITICAL

AUTO-FIX:
- Gerçek chart kütüphanesi yoksa bile, CSS/SVG ile basit görsel gösterge oluştur:
  - Yüzde çubukları (progress bar)
  - Dot/spark grafikler (mini SVG)
  - Stat kartları ile sayısal veri gösterimi
- Tercihen package.json'a "recharts" ekle ve gerçek demo chart render et
```

---

### C4. Error Boundary
**Kontrol**: React Error Boundary bileşeni tanımlı mı?
```
KONTROL ADIMLARI:
1. "ErrorBoundary" veya "error-boundary" içeren dosya var mı?
2. App.tsx'te ErrorBoundary wrapper kullanılıyor mu?

YOKSA:
- src/components/ui/ErrorBoundary.tsx oluştur
- App.tsx'te <ErrorBoundary> ile Routes'ı sar
- Kullanıcı dostu fallback UI göster (tekrar dene butonu ile)
```

---

### C5. 404 Not Found Sayfası
**Kontrol**: Tanımsız rotalarda ne gösteriliyor?
```
KONTROL ADIMLARI:
1. Routes içinde <Route path="*" element={...} /> var mı?
2. NotFound veya 404 bileşeni var mı?

YOKSA:
- <Route path="*" element={<NotFound />} /> ekle
- Premium tasarımlı 404 sayfası oluştur (geri dön butonu ile)
```

---

### C6. Profil/Settings Placeholder
**Kontrol**: Route'larda düz <div> ile tanımlanmış placeholder sayfalar var mı?
```
KONTROL ADIMLARI:
1. App.tsx'te element={<div>...</div>} şeklinde inline tanımlanan route var mı?
2. Varsa → CRITICAL

AUTO-FIX:
- Her route için ayrı bir bileşen dosyası oluştur
- En azından GlassCard içinde başlık + açıklama + "Yakında" badge göster
- Asla düz <div>text</div> bırakma
```

---

## 🟠 WARNING Seviyesi — Kod Kalitesi / Standart İhlali

### W1. TypeScript Strict Mode
**Kontrol**: tsconfig.json'da `"strict": true` mi?
```
KONTROL: tsconfig.json → compilerOptions.strict
BEKLENEN: true
MEVCUT RİSK: false ise tip güvenliği neredeyse yok demektir

AUTO-FIX:
- "strict": true yap
- noUnusedLocals: true
- noUnusedParameters: true
```

---

### W2. .js Dosyaları (TypeScript Kuralı İhlali)
**Kontrol**: src/ ve tests/ altında .js/.jsx uzantılı dosya var mı?
```
KONTROL ADIMLARI:
1. code_files listesinde src/*.js veya src/*.jsx dosyası ara
2. Bulunursa → WARNING

AUTO-FIX:
- .js → .ts veya .tsx olarak yeniden adlandır
- Tip bilgileri ekle (any yerine gerçek tipler)
- Import referanslarını güncelle
```

---

### W3. Boş Klasörler (Sadece .gitkeep)
**Kontrol**: src/ altında sadece .gitkeep içeren klasörler var mı?
```
KONTROL: src/shared/types/, src/config/, tests/e2e/ vb.
BEKLENEN: Her klasörde en az 1 gerçek dosya olmalı

AUTO-FIX:
- src/shared/types/index.ts → Temel tip tanımları (Student, Event, etc.)
- src/config/index.ts → Ortam bazlı konfigürasyon
- Gerçekten kullanılmayacak klasörleri kaldır
```

---

### W4. GlassCard Padding Tutarsızlığı
**Kontrol**: GlassCard bileşeni default padding tanımlıyor mu?
```
KONTROL:
1. GlassCard.tsx'te className'de p-4 veya p-6 gibi default padding var mı?
2. Farklı yerlerde farklı padding uygulanıyorsa → WARNING

AUTO-FIX:
- GlassCard'a default className içinde p-5 veya p-6 ekle
- Dışarıdan override edebilir bırak ama default olsun
```

---

### W5. Responsive Design Yetersizliği
**Kontrol**: Tablet breakpoint (sm→md arası) optimize edilmiş mi?
```
KONTROL ADIMLARI:
1. sm:, md:, lg:, xl: breakpoint kullanım oranını hesapla
2. Sadece 1 ve 2 kolon grid varsa, 3+ kolon asimetrik grid yoksa → WARNING

AUTO-FIX:
- BentoGrid'e col-span-2, row-span-2 gibi asimetrik hücreler ekle
- Dashboard'da hero kartı diğerlerinden büyük olmalı
```

---

### W6. Dark/Light Mode Toggle Eksikliği
**Kontrol**: Kullanıcı tema değiştirebiliyor mu?
```
KONTROL ADIMLARI:
1. Theme toggle butonu/switch bileşeni var mı?
2. CSS'te .dark {} ve .light {} tanımlı mı?
3. Tanımlı ama toggle yoksa → WARNING

AUTO-FIX:
- Navbar'a theme toggle ikonu ekle (Sun/Moon)
- Store'da theme state'i tut
- document.documentElement.classList.toggle('dark') ile tema değiştir
```

---

### W7. Navbar Navigasyon Boşluğu
**Kontrol**: Navbar'da sadece logo/başlık var, link yok mu?
```
KONTROL: AppShell veya Navbar bileşeninde NavLink sayısı
BEKLENEN: En az 3 navigasyon linki (Ana Sayfa, Öğrenciler, Analiz vb.)

AUTO-FIX:
- MobileBottomNav'daki navItems dizisini navbar'da da kullan
- Desktop: flex row, Mobil: hidden (bottom nav kullanılıyor)
```

---

## 🔵 INFO Seviyesi — İyileştirme Fırsatları

### I1. Form Doğrulama (Zod + React Hook Form)
**Kontrol**: Form bileşeni varsa, doğrulama kütüphanesi kullanılıyor mu?
```
KONTROL: package.json'da "zod" ve "react-hook-form" var mı?
YOKSA: Gelecek iterasyonda eklenebilir, şimdilik INFO
```

### I2. Toast/Notification Sistemi
**Kontrol**: Kullanıcıya geri bildirim mekanizması var mı?
```
KONTROL: "sonner" veya "react-hot-toast" package.json'da var mı?
```

### I3. SEO Meta Tags (Open Graph + Twitter Card)
**Kontrol**: index.html'de OG/Twitter meta tag'leri var mı?
```
BEKLENEN META TAGLAR:
<meta property="og:title" content="..." />
<meta property="og:description" content="..." />
<meta property="og:image" content="..." />
<meta name="twitter:card" content="summary_large_image" />
```

### I4. Accessibility (ARIA)
**Kontrol**: Temel erişilebilirlik standartları karşılanıyor mu?
```
KONTROL:
- aria-label kullanımı
- role tanımları
- focus-visible stilleri
- skip-to-content linki
```

### I5. Loading/Skeleton States
**Kontrol**: Veri yüklenirken skeleton/loading göstergesi var mı?
```
YOKSA: Gelecek iterasyonda eklenebilir
```

### I6. Code Splitting (React.lazy)
**Kontrol**: Sayfa bileşenleri lazy import ediliyor mu?
```
BEKLENEN:
const Dashboard = React.lazy(() => import('./features/dashboard/Dashboard'));
<Suspense fallback={<Loading />}><Dashboard /></Suspense>
```

### I7. package-lock.json Varlığı
**Kontrol**: package-lock.json repo'da var mı?
```
YOKSA: Her deploy'da farklı versiyon çekilme riski var
Auto-fix: npm install çalıştırıldığında otomatik oluşur
```

### I8. robots.txt ve sitemap.xml
**Kontrol**: public/ altında robots.txt var mı?
```
YOKSA: SEO için gerekli, gelecek iterasyonda eklenebilir
```

### I9. Auth Sistemi (Login/Register)
**Kontrol**: Kimlik doğrulama altyapısı var mı?
```
KONTROL: Login bileşeni, AuthProvider/AuthGuard, protected routes
YOKSA: Gelecek iterasyonda eklenebilir (INFO, zorunlu değil)
```

### I10. Hardcoded Mock Data Temizliği
**Kontrol**: Bileşenlerde inline tanımlı mock diziler var mı?
```
KONTROL: const mockStudents = [...] gibi inline diziler
BEKLENEN: Mock data ayrı dosyada (src/data/ veya src/mocks/) veya store'dan gelmeli
```

### I11. Test Coverage Yeterliliği
**Kontrol**: Test dosyaları tüm feature'ları kapsıyor mu?
```
KONTROL:
- tests/features/ altında her feature için test dosyası var mı?
- Dashboard bileşeni için test var mı?
- Test dosyalarında assertion kalitesi (sadece render mı, gerçek interaction mı?)
```

### I12. Console.log Temizliği
**Kontrol**: Üretim kodunda console.log kalmış mı?
```
KONTROL: src/ altındaki tüm dosyalarda console.log/console.warn ara
BEKLENEN: Logger utility kullanılmalı veya hiç olmamalı
```

---

## 📋 Pipeline Entegrasyon Talimatı

### Bu Skill Nasıl Kullanılır?

```
PIPELINE AKIŞI:
  1. Plan → Kod Üret → Code Preparer
  2. Premium Review Loop (visual_enhancer / fix)
  3. Build Validation (npm install + npm run build)
  4. ✨ SON KONTROL (BU SKILL) ← Burası
  5. GitHub Push

SON KONTROL ÇALIŞMA SIRASI:
  1. Tüm BLOCKER maddelerini kontrol et
     → Herhangi biri FAIL ise: fix agent'a gönder, düzeltilmeden devam etme
  2. Tüm CRITICAL maddeleri kontrol et
     → FAIL olanları fix agent'a gönder (en az 1 tur düzeltme dene)
  3. WARNING ve INFO maddeleri logla (isteğe bağlı fix)
  4. Sonuç raporu oluştur ve AI_PREMIUM_REVIEW.md'ye ekle
```

### Programatik Kontrol Fonksiyonu Taslağı

```python
def run_last_control(code_files: list[dict]) -> dict:
    """
    Pipeline son kontrol geçidi.
    Döndürür: {
        "can_deploy": bool,          # BLOCKER yoksa True
        "blockers": list[str],       # B1, B2, B3, B4
        "criticals": list[str],      # C1-C6
        "warnings": list[str],       # W1-W7
        "info": list[str],           # I1-I12
        "auto_fix_instructions": str  # Fix agent'a gönderilecek prompt
    }
    """
    results = {"blockers": [], "criticals": [], "warnings": [], "info": []}

    file_map = {f["filename"]: f.get("content", "") for f in code_files}

    # ── B1: Component Props ──
    app_tsx = file_map.get("src/App.tsx", "")
    # Route element'lerindeki component'ları ve prop'larını kontrol et
    # ... (regex ile parse)

    # ── B2: public/ assets ──
    required_assets = ["pwa-192x192.png", "pwa-512x512.png", "favicon.ico"]
    for asset in required_assets:
        found = any(f"public/{asset}" in fname for fname in file_map.keys())
        if not found:
            results["blockers"].append(f"B2: {asset} eksik")

    # ── B3: CSS değişkenleri ──
    # var(--xxx) referanslarını topla, index.css ile karşılaştır
    # ...

    # ── Sonuç ──
    results["can_deploy"] = len(results["blockers"]) == 0
    return results
```

---

## 🎯 Özet Karar Matrisi

| Seviye | Sayı | Deploy Etkisi | İşlem |
|--------|:---:|---------------|-------|
| 🔴 BLOCKER | 4 | **Engeller** | Çözülmeden deploy YOK |
| 🟡 CRITICAL | 6 | Fonksiyonel kayıp | En az 1 tur fix denemesi |
| 🟠 WARNING | 7 | Kalite düşüklüğü | Logla, mümkünse düzelt |
| 🔵 INFO | 12 | İyileştirme | Gelecek iterasyona bırakılabilir |

> **Altın Kural**: BLOCKER olmayan bir proje deploy edilebilir. CRITICAL'ler fix denenmiş olmalı ama çözülemezse yine deploy edilir (shipping over perfection). WARNING ve INFO gelecek task'lara bırakılır.
