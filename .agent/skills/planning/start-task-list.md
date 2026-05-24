# 🚀 Premium PWA Başlangıç Yol Haritası (start-task-list.md)

Bu doküman, analiz edilen tüm kaynak planları (`project_analysis_plan.md.resolved`, `proje-v2.md`, `implementation_planv2.md` ve `premium_ui_updates.md`) bir araya getirerek, **yeni veya devralınan bir projede başlangıçta yapılması gereken en küçük birim görevleri (atomic tasks)** adım adım listelemektedir.

Bu liste, AI ajanlarının context kaybetmeden adım adım çalışabilmesi için özel olarak hazırlanmıştır.

---

### 📦 Faz 1: Bağımlılıklar & Temizlik (Clean-up & Dependencies)

1. **Bağımlılık Yüklemesi**
   - *Görevin Amacı:* `npm install` komutunu çalıştırarak eksik paketleri yüklemek.
   - *Dosyalar:* `package.json`

2. **Kullanılmayan Paketlerin Kaldırılması**
   - *Görevin Amacı:* Projede kullanılmayan kütüphaneleri temizlemek.
   - *Aksiyon:* `@heroicons/react`, `@tanstack/react-query`, `@tanstack/react-table`, `date-fns` ve `workbox-*` paketlerini `npm uninstall` ile kaldırmak.
   - *Dosyalar:* `package.json`

3. **Tailwind Sürüm Çakışmasının Giderilmesi**
   - *Görevin Amacı:* Tailwind v3 kararlı sürümü ile v4 alpha/beta eklenti çakışmalarını çözmek.
   - *Aksiyon:* `@tailwindcss/vite` gibi uyumsuz derleyici eklentilerini temizleyip, projeyi kararlı postcss pipeline'ına çekmek.
   - *Dosyalar:* `package.json`, `vite.config.ts`

4. **PostCSS Çift Konfigürasyon Temizliği**
   - *Görevin Amacı:* Vite içerisindeki postcss tanımı ile bağımsız dosya çakışmasını çözmek.
   - *Aksiyon:* `vite.config.ts` içindeki `css.postcss` bloğunu silerek PostCSS işlemlerini tamamen `postcss.config.cjs` dosyasına bırakmak.
   - *Dosyalar:* `vite.config.ts`, `postcss.config.cjs`

5. **Eski PWA Dosyalarının Temizlenmesi**
   - *Görevin Amacı:* Vite PWA eklentisiyle çakışan eski/manuel dosyaları silmek.
   - *Aksiyon:* `public/manifest.json`, `public/manifest.webmanifest` ve `public/service-worker.js` (varsa) dosyalarını silmek.
   - *Dosyalar:* `public/` dizini

---

### 📂 Faz 2: Proje Hafızasının Kurulması (Project Memory)

6. **Hafıza Klasörünün Oluşturulması**
   - *Görevin Amacı:* AI ajanı için uzun vadeli hafıza ve yönlendirme klasörünü oluşturmak.
   - *Aksiyon:* Proje kök dizininde `project_memory/` klasörü açmak.

7. **Ürün Açıklaması Belgesi (`project_memory/product.md`)**
   - *Görevin Amacı:* Projenin ne olduğunu ve temel hedeflerini tanımlamak.
   - *Aksiyon:* Uygulamanın kapsamı, hedef kullanıcı grubu ve ana özelliklerini (offline çalışma, PWA özellikleri, vb.) içeren markdown dosyasını yazmak.

8. **Mimari Karar Belgesi (`project_memory/architecture.md`)**
   - *Görevin Amacı:* Proje teknoloji stack'ini ve veri akışını netleştirmek.
   - *Aksiyon:* Frontend (React+Vite+TS), State (Zustand), Styling (Tailwind), Caching ve Persistence katmanlarını tanımlamak.

9. **Kodlama Kuralları Belgesi (`project_memory/coding_rules.md`)**
   - *Görevin Amacı:* AI'ın kod yazarken uyması gereken sınırları belirlemek.
   - *Aksiyon:* TypeScript strict modu, dosya satır sınırları, component mimarisi, directory yapısı kurallarını buraya yazmak.

10. **Mimari Karar Günlüğü (`project_memory/decisions.md`)**
    - *Görevin Amacı:* Yapılan teknolojik seçimlerin nedenlerini loglamak.
    - *Aksiyon:* Zustand seçimi, PWA yapılandırması vb. kararların gerekçelerini tarihsel olarak listelemek.

11. **Görev Takip Dosyaları (`completed_tasks.md` ve `pending_tasks.md`)**
    - *Görevin Amacı:* Yapılan ve yapılacak işlerin kaydını tutmak.
    - *Aksiyon:* `project_memory/` altında bu iki dosyayı oluşturup başlangıç durumunu eklemek.

---

### 🔧 Faz 3: Kod & Stil Standartları (TS & CSS Baseline)

12. **TypeScript Uzantı Dönüşümü (JS ➔ TS)**
    - *Görevin Amacı:* Projedeki eski `.js` uzantılı kaynak kodları TypeScript standartlarına geçirmek.
    - *Aksiyon:* `src/core/index.js`, `src/shared/constants/index.js`, `src/shared/utils/index.js` dosyalarını `.ts` olarak yeniden adlandırmak.

13. **JSX İçeren Store ve Hooks Uzantı Dönüşümü (TS ➔ TSX)**
    - *Görevin Amacı:* İçinde React bileşeni, Context veya Provider (JSX) barındıran dosyaların derleme hatası vermesini önlemek.
    - *Aksiyon:* Context/Provider içeren store ve hook dosyalarının uzantılarını `.tsx` olarak güncellemek (Örn: `store.ts` ➔ `store.tsx`).

14. **TypeScript Strict Modunun Aktif Edilmesi**
    - *Görevin Amacı:* Kod kalitesini artırıp runtime hatalarını build aşamasında yakalamak.
    - *Aksiyon:* `tsconfig.json` dosyasında `"strict": false` ifadesini `"strict": true` olarak değiştirmek.

15. **Vite Browser Ortam Değişkeni Düzeltmesi**
    - *Görevin Amacı:* Tarayıcıda çalışmayan Node.js kodlarını Vite standartlarına uyarlamak.
    - *Aksiyon:* Kod içindeki tüm `process.env.NODE_ENV` ifadelerini `import.meta.env.MODE` ile değiştirmek.

16. **Google Fonts CDN Bağlantısı**
    - *Görevin Amacı:* Premium tipografi için yazı tiplerini sisteme yüklemek.
    - *Aksiyon:* `index.html` içine `Outfit` (Başlıklar) ve `Inter` (Gövde) Google Fonts linklerini eklemek. CSS'deki lokal bozuk `@font-face` referanslarını kaldırmak.

17. **Tailwind Font Ailelerinin Tanımlanması**
    - *Görevin Amacı:* Yüklenen fontları CSS sınıflarıyla eşleştirmek.
    - *Aksiyon:* `tailwind.config.ts` (veya config dosyası) içerisine `fontFamily` altında `sans: ['Outfit', ...]` ve `body: ['Inter', ...]` tanımlamalarını yapmak.

18. **CSS Tema Değişkenleri (Light & Dark Mode)**
    - *Görevin Amacı:* Tema geçişleri için CSS renk değişkenlerini hazırlamak.
    - *Aksiyon:* `src/index.css` dosyası içinde `:root` ve `.dark` seçicileri altına `--background`, `--foreground`, `--primary`, `--glass-bg` ve `--glass-border` değişkenlerini tanımlamak.

19. **Glassmorphism & Mesh Gradient CSS Sınıfları**
    - *Görevin Amacı:* Tasarıma derinlik ve premium hava katmak.
    - *Aksiyon:* `src/index.css` içerisine `.glass-card` (backdrop-blur: 16px, border, box-shadow) ve `.fluid-blob` mesh animasyon sınıflarını eklemek.

---

### 🧠 Faz 4: Yönlendirme & State Kurulumu (Routing & State)

20. **Ortak Tip Tanımları (Shared Types)**
    - *Görevin Amacı:* Proje genelinde veri tutarlılığını sağlamak.
    - *Aksiyon:* `src/shared/types/index.ts` oluşturarak `Activity`, `Memory`, `Sunscreen`, `AppState` gibi tipleri tanımlamak.

21. **Merkezi Store & Context Yapısı (Zustand)**
    - *Görevin Amacı:* Bileşenlerin gereksiz render olmasını önleyen Context tabanlı store kurmak.
    - *Aksiyon:* `src/core/store/store.tsx` (veya `src/store/useAppStore.ts`) içinde `useRef` yardımıyla `StoreProvider` ve `useStore` selector yapısını oluşturmak.

22. **Zustand LocalStorage Entegrasyonu (Persist)**
    - *Görevin Amacı:* Kullanıcı verilerinin sayfa yenilendiğinde kalıcı olmasını sağlamak.
    - *Aksiyon:* Zustand store tanımına `persist` middleware'ini dahil etmek.

23. **AppShell İskelet Düzeni (Responsive Layout)**
    - *Görevin Amacı:* Mobil ve masaüstü için uygun navigasyon çerçevesini çizmek.
    - *Aksiyon:* `src/components/layout/AppShell.tsx` bileşenini oluşturmak; mobilde alt bar (bottom nav), masaüstünde sol dikey bar (sidebar) göstermek.

24. **Sayfa Geçiş Animasyonları (Framer Motion)**
    - *Görevin Amacı:* Sayfalar arası geçişlerde premium yumuşaklık sağlamak.
    - *Aksiyon:* `AppShell.tsx` içindeki `<Outlet />` veya children elementini Framer Motion `<AnimatePresence>` ve `<motion.div>` (`fade-up` efekti) ile sarmalamak.

25. **Ana Sayfa Rotalarının Tanımlanması**
    - *Görevin Amacı:* Uygulamanın sayfalarını router'a bağlamak.
    - *Aksiyon:* `src/App.tsx` içinde `Routes` ve `Route` tanımlarını yaparak Dashboard, Planner, Memories, SunSafe ve Soundscapes rotalarını eklemek.

---

### 🎨 Faz 5: Premium UI Yardımcı Araçları (Premium Utilities)

26. **Dinamik Bento Grid Bileşeni**
    - *Görevin Amacı:* Gösterge panellerinde modern asimetrik yerleşim sağlamak.
    - *Aksiyon:* `BentoGrid.tsx` bileşenine `colSpan` ve `rowSpan` özelliklerini dinamik sınıflarla (`md:col-span-2` vb.) verebilme desteği eklemek.

27. **React Error Boundary Bileşeni**
    - *Görevin Amacı:* Uygulama çökmelerinde kullanıcının beyaz ekran görmesini engellemek.
    - *Aksiyon:* `src/components/ui/ErrorBoundary.tsx` oluşturmak ve uygulamayı root seviyesinde bununla sarmalamak.

28. **Premium 404 NotFound Sayfası**
    - *Görevin Amacı:* Hatalı yönlendirmelerde kullanıcı deneyimini korumak.
    - *Aksiyon:* `src/features/not-found/NotFound.tsx` bileşenini tasarlamak ve App.tsx'deki wildcard (`*`) rotaya bağlamak.

29. **Premium Toast Bildirim Sistemi**
    - *Görevin Amacı:* Kullanıcı etkileşimlerine anlık bildirimle geri dönüş sağlamak.
    - *Aksiyon:* `sonner` kütüphanesini projeye kurmak ve `<Toaster />` bileşenini uygulamaya dahil etmek.

30. **Loading Skeleton UI Bileşeni**
    - *Görevin Amacı:* Yükleme ekranlarında premium bekleme hissi vermek.
    - *Aksiyon:* `src/components/ui/Skeleton.tsx` oluşturarak yanıp sönen (pulse) animasyonlu yükleme blokları tasarlamak.

---

### 📱 Faz 6: PWA, SEO & Medya Yapılandırması

31. **VitePWA Manifest & Service Worker Ayarları**
    - *Görevin Amacı:* Uygulamanın offline çalışmasını ve yüklenebilir olmasını sağlamak.
    - *Aksiyon:* `vite.config.ts` içinde `VitePWA` eklentisini `registerType: 'autoUpdate'` ve doğru cache stratejileriyle yapılandırmak.

32. **PWA İkon Setinin Hazırlanması**
    - *Görevin Amacı:* Yüklenebilir uygulama için gerekli ikonları dizine eklemek.
    - *Aksiyon:* `public/` klasörüne `favicon.svg`, `pwa-192x192.png`, `pwa-512x512.png` ve `apple-touch-icon.png` dosyalarını yerleştirmek.

33. **SEO ve iOS Uyumlu Meta Etiketleri**
    - *Görevin Amacı:* Sosyal paylaşımlar ve mobil cihazlarda uygulamanın premium görünmesini sağlamak.
    - *Aksiyon:* `index.html` içerisine mobil uyumlu viewport etiketleri, Apple mobil web uygulaması meta tagleri ve OpenGraph etiketleri eklemek.

---

### 🧪 Faz 7: Test & Kalite Güvencesi (Testing & Quality)

34. **Vitest Test Konfigürasyonu**
    - *Görevin Amacı:* Testlerin düzgün çalışması için test ortamını tanımlamak.
    - *Aksiyon:* `vite.config.ts` dosyasına `test` (globals: true, environment: jsdom) ayarlarını eklemek.

35. **Jest Sözdizimi Dönüşümü**
    - *Görevin Amacı:* Jest ile yazılmış eski testleri Vitest formatına getirmek.
    - *Aksiyon:* `tests/` altındaki `.test.js` dosyalarını `.test.ts` yapmak ve `jest.fn()` / `jest.useFakeTimers()` kodlarını `vi.fn()` / `vi.useFakeTimers()` olarak güncellemek.

36. **Temel Bileşen Birim Testleri**
    - *Görevin Amacı:* Temel UI elemanlarının ve state store'unun hatasız çalıştığını otomasyonla doğrulamak.
    - *Aksiyon:* `GlassCard`, `BentoGrid` ve `AppStore` için basit Vitest birim testleri yazıp `npm run test` ile çalıştırmak.

---

*Bu başlangıç görev listesi (start-task-list.md), projenin otonom veya manuel geliştirme aşamalarında sırayla takip edilmelidir.*
