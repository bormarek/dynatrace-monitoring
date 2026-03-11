# Dynatrace Monitoring Architecture

Interaktywna wizualizacja infrastruktury monitoringu Dynatrace — klikalne warstwy architektury z opisami komponentów.

🌐 **Live demo:** https://bormarek.github.io/dynatrace-monitoring/

---

## Uruchomienie lokalne

**Wymagania:** Node.js 18+

```bash
# 1. Sklonuj repozytorium
git clone https://github.com/bormarek/dynatrace-monitoring.git
cd dynatrace-monitoring

# 2. Zainstaluj zależności
npm install

# 3. Uruchom serwer deweloperski
npm run dev
```

Strona będzie dostępna pod http://localhost:5173/

---

## Pozostałe komendy

```bash
npm run build    # zbuduj wersję produkcyjną (output: dist/)
npm run preview  # podgląd wersji produkcyjnej lokalnie
npm run deploy   # zbuduj i wypchnij na GitHub Pages
```

---

## Zawartość

Diagram podzielony na 5 warstw architektury Dynatrace:

| Warstwa | Opis |
|---|---|
| **Warstwa biznesowa** | Użytkownicy, dashboardy, alerty, SLO/SLA |
| **Dynatrace Platform** | Davis AI, SmartScape, Grail, CoPilot |
| **ActiveGate** | Proxy, rozszerzenia, synthetic monitoring |
| **Infrastruktura** | Kubernetes, kontenery, chmura, VM, bazy danych |
| **OneAgent** | Automatyczna instrumentacja, RUM, distributed tracing |

Kliknięcie dowolnego komponentu wyświetla szczegółowy opis i tagi techniczne.
