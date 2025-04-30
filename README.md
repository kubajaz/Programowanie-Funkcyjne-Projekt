
# ChessEZ – Aplikacja edukacyjna do nauki szachów

Aplikacja webowa stworzona w ramach projektu semestralnego na przedmiot *Programowanie Funkcyjne*. MVP systemu do zarządzania pracami domowymi w klubie szachowym z LeaderBoardem, różnymi tematami kursów i nauką w formie grywalizacji wzorowanej na Duolingo.

## 🛠 Stack technologiczny

- **Next.js 15 (App Router)**
- **TypeScript (język funkcyjny)**
- **React (komponenty funkcyjne)**
- **Firebase (autentykacja) i dokumentowa baza danych**
- **TailwindCSS + Shadcn/UI**

---

## 📦 Struktura aplikacji

- `app/` – routing aplikacji oparty na App Routerze Next.js 15
- `components/` – komponenty UI (funkcyjne) i modalne
- `config/firebase.ts` – konfiguracja Firebase
- `context/` – kontekst autentykacji użytkownika
- `lib/db/` – funkcje dostępu do danych (funkcyjnie sparametryzowane)
- `store/` – hooki zarządzające lokalnym stanem UI
- `public/` – pliki statyczne (zdjęcia, pliki głosowe)

---

## 🔍 Specyfikacja działania (punktowo)

- ✅ **Funkcyjne komponenty React** – wszystkie komponenty są deklaratywne, czyste, bez klas.
- ✅ **TypeScript jako język funkcyjny** – typowanie funkcji, danych i hooków.
- ✅ **Routing oparty na App Router (Next.js 15)** – dynamiczne ścieżki jak `/lesson/[lessonId]` pozwalają ładować lekcje zależnie od URL.
- ✅ **Firebase Auth z logowaniem Google** – wykorzystanie funkcji `signInWithPopup` i `GoogleAuthProvider` do uwierzytelniania użytkowników.
- ✅ **Kontekst autentykacji (React Context)** – obsługuje globalny stan użytkownika zalogowanego, dostępny w całej aplikacji.
- ✅ **Hooki i efekty jako podejście funkcyjne** – `useEffect`, `useState`, `useKey`, `useMedia`, itp. stosowane do reaktywnego zarządzania zachowaniem aplikacji.
- ✅ **Responsywność** – aplikacja działa na urządzeniach mobilnych i desktop dzięki `useMedia`, `window.innerWidth` oraz Tailwind CSS.
- ✅ **Obsługa błędów i stanu aplikacji** – dynamiczne komponenty reagujące na status (`correct`, `wrong`, `completed`) jak np. w komponencie `Footer`.
- ✅ **Deklaratywne podejście** – UI wyrażony w JSX jako funkcje czystego renderowania.

---

## 📄 Przykład programowania funkcyjnego

Komponent `Footer` reaguje na status użytkownika (`correct`, `wrong`, `completed`) i dynamicznie renderuje UI oraz reaguje na zdarzenia, takie jak kliknięcie przycisku `Check`, `Retry` czy `Continue`. Całość napisana funkcyjnie bez klas, wykorzystując `useEffect`, `useState`, `useKey`.

---

## 🧠 Programowanie funkcyjne w praktyce

- Brak efektów ubocznych w funkcjach renderujących UI.
- Stosowanie **czystych funkcji** w warstwie logiki (np. w `lib/db/*.ts`).
- Minimalizacja stanu lokalnego (np. przez konteksty lub hooki).
- Kompozycja komponentów zamiast dziedziczenia.
- **Funkcje jako dane** – funkcje przekazywane jako propsy (`onCheck`, `onClose`, itp.)

---

## 🔐 Autentykacja (Firebase)

- Konfiguracja Firebase znajduje się w `config/firebase.ts`
- Użytkownik może zalogować się przez konto Google
- Dane użytkownika są przechowywane w kontekście `AuthContext`

---

## 📁 Przykładowy routing

- `/` – strona główna
- `/lesson/[lessonId]` – lekcja szachowa ładowana dynamicznie
- `/profile` – dane i postęp użytkownika

---

## 🚀 Uruchomienie aplikacji

```bash
npm install
npm run dev
```

---

## ♟️ Jak działa aplikacja?

- Aplikacja zawiera listę kursów szachowych.
- Kursy można obecnie dodawać i edytować z poziomu bazy danych **Firebase Firestore**.
- Każdy kurs zawiera **moduły**, a każdy moduł zawiera **lekcje**.
- Lekcja składa się z **challenge'u** z trzema możliwymi odpowiedziami: A, B lub C.
- Użytkownik wybiera kurs, a następnie rozwiązuje kolejne wyzwania w formie gry.
- Błędna odpowiedź skutkuje **utratą punktów życia**.
- Ukończenie lekcji nagradza użytkownika **punktami XP**, które wpływają na jego miejsce w **Leaderboardzie**.
- Z aplikacji mogą korzystać wyłącznie **zalogowani użytkownicy** (uwierzytelnianie przez Google z Firebase).

🔗 **Prototyp aplikacji online**: 👉 [https://chess-classes.vercel.app/](https://chess-classes.vercel.app/)

---

## 🔮 Potencjalny rozwój w przyszłości

- 🔹 Dodanie większej liczby kursów i lekcji.
- 🔹 Wprowadzenie możliwości uzupełniania punktów życia poprzez **mikropłatności** lub **subskrypcję**.
- 🔹 Dodanie **różnych typów zadań** (np. tekstowe, głosowe, manualne).
- 🔹 Utworzenie **panelu administratora** dla trenerów do zarządzania kursami i uczniami.
- 🔹 Przebudowa struktury aplikacji w celu **skalowalności** i umożliwienia działania dla wielu **klubów lub szkółek szachowych** i nie tylko.