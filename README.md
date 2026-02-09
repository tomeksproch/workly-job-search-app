# 🚀 Workly.

**Workly** to nowoczesna aplikacja webowa zaprojektowana dla osób, które chcą przejąć pełną kontrolę nad procesem szukania pracy. Koniec z chaosem w arkuszach kalkulacyjnych – czas na wizualny system zarządzania karierą.

![Workly Hero Preview](public/hero-images/hero1.png)

## ✨ Główne Funkcje

* **System Kanban** – Zarządzaj aplikacjami poprzez intuicyjne kolumny: *Wishlist*, *Applied*, *Interview* oraz *Offer*.
* **Nowoczesny Landing Page** – Odświeżony interfejs wykorzystujący układ Bento Grid oraz luksusowe animacje wejścia.
* **Dynamiczne Zakładki** – Płynne przełączanie między widokami dashboardu z natychmiastowym podglądem interfejsu.
* **Pełna Responsywność** – Aplikacja działa płynnie na każdym urządzeniu, od smartfona po szerokie monitory.
* **Bezpieczna Autentykacja** – System logowania i rejestracji z dedykowanym menu użytkownika i awatarami.

## 🛠️ Stack Technologiczny

* **Frontend:** Next.js 15 (App Router), React, Tailwind CSS
* **UI Components:** Shadcn/UI, Lucide React (ikony)
* **Animacje:** Framer Motion
* **Backend & Auth:** Better-Auth, Next.js API Routes
* **Baza Danych:** MongoDB + Mongoose

## 🚀 Jak zacząć?

### 1. Klonowanie repozytorium
```bash
git clone [https://github.com/twoj-nick/workly.git](https://github.com/twoj-nick/workly.git)
cd workly
```

### 2. Instalacja zależności
```bash
npm install
```

### 3. Konfiguracja środowiska

Utwórz plik .env.local i uzupełnij go o swoje klucze:
Fragment kodu:
MONGODB_URI=twoj_link_do_mongodb
BETTER_AUTH_SECRET=twoj_sekret
BETTER_AUTH_URL=http://localhost:3000

### 4. Uruchomienie projektu
```bash
npm run dev
```

Aplikacja będzie dostępna pod adresem: http://localhost:3000
