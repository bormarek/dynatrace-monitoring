import { useState } from "react";

const data = {
  layers: [
    {
      id: "business",
      label: "WARSTWA BIZNESOWA",
      color: "#1a1a2e",
      accent: "#e94560",
      items: [
        { id: "b1", icon: "👤", label: "Użytkownicy końcowi", sub: "Aplikacje web / mobile / IoT" },
        { id: "b2", icon: "📊", label: "Dashboardy Dynatrace", sub: "Davis AI • Alerting • Reports" },
        { id: "b3", icon: "🔔", label: "Alerty & Eskalacje", sub: "Email • PagerDuty • Slack • ServiceNow" },
        { id: "b4", icon: "📋", label: "SLO / SLA Reporting", sub: "Error budget • Compliance • Trendy" },
      ],
    },
    {
      id: "platform",
      label: "DYNATRACE PLATFORM (SaaS / Managed)",
      color: "#0f3460",
      accent: "#00b4d8",
      items: [
        { id: "p1", icon: "🧠", label: "Davis AI Engine", sub: "Automatyczny root cause analysis" },
        { id: "p2", icon: "🗺️", label: "SmartScape Topology", sub: "Auto-wykrywanie zależności 4D" },
        { id: "p3", icon: "📈", label: "Metrics & Traces", sub: "Full-stack observability / PurePath" },
        { id: "p4", icon: "📝", label: "Log Management (Grail)", sub: "Centralizacja logów • DQL" },
        { id: "p5", icon: "💬", label: "Davis CoPilot", sub: "AI asystent • Natural language queries" },
      ],
    },
    {
      id: "activegate",
      label: "ACTIVEGATE (On-premise / Cloud)",
      color: "#16213e",
      accent: "#06d6a0",
      items: [
        { id: "ag1", icon: "🔀", label: "Environment ActiveGate", sub: "Proxy • Routing • TLS termination" },
        { id: "ag2", icon: "🔌", label: "Extension Framework", sub: "JMX • SNMP • WMI • Custom plugins" },
        { id: "ag3", icon: "🔬", label: "Synthetic Execution", sub: "Browser & HTTP testy z prywatnych lokacji" },
        { id: "ag4", icon: "🔐", label: "Cluster ActiveGate", sub: "Managed deployment • HA load balancing" },
      ],
    },
    {
      id: "infra",
      label: "INFRASTRUKTURA MONITOROWANA",
      color: "#0d1b2a",
      accent: "#ffd166",
      items: [
        { id: "i1", icon: "☸️", label: "Kubernetes / OpenShift", sub: "OneAgent DaemonSet • Operator CRD" },
        { id: "i2", icon: "🐳", label: "Kontenery / Docker", sub: "Auto-instrumentacja procesów" },
        { id: "i3", icon: "☁️", label: "Azure / AWS / GCP", sub: "Cloud integrations • Native API" },
        { id: "i4", icon: "🖥️", label: "VM / Bare Metal", sub: "OneAgent host monitoring" },
        { id: "i5", icon: "🗄️", label: "Bazy Danych", sub: "PostgreSQL • Oracle • MySQL • MSSQL" },
        { id: "i6", icon: "🌐", label: "Sieci & Load Balancery", sub: "Network flows • F5 • Nginx • HAProxy" },
      ],
    },
    {
      id: "oneagent",
      label: "ONEAGENT — AUTOMATYCZNA INSTRUMENTACJA",
      color: "#1b2838",
      accent: "#ef476f",
      items: [
        { id: "oa1", icon: "⚡", label: "OneAgent Process", sub: "Auto-inject • Zero config • Self-updating" },
        { id: "oa2", icon: "📡", label: "Real User Monitoring", sub: "JavaScript agent w przeglądarce" },
        { id: "oa3", icon: "🔗", label: "Distributed Tracing", sub: "OpenTelemetry • W3C TraceContext • PurePath" },
        { id: "oa4", icon: "📦", label: "CodeModule (PaaS)", sub: "Lambda • Azure Functions • Fargate" },
      ],
    },
  ],
};

const details = {
  b1: {
    title: "Użytkownicy końcowi",
    desc: "Dynatrace śledzi doświadczenie użytkownika (UX) przez Real User Monitoring. Każda akcja w przeglądarce lub aplikacji mobilnej jest rejestrowana jako 'user session' z pełnym kontekstem backendu.",
    tags: ["RUM", "Session Replay", "Apdex Score", "Mobile RUM"],
  },
  b2: {
    title: "Dashboardy Dynatrace",
    desc: "Główny interfejs SaaS dostępny przez przeglądarkę. Davis AI automatycznie grupuje powiązane problemy i wskazuje root cause bez ręcznej analizy. Możliwość tworzenia custom dashboardów przez Davis CoPilot (opis w języku naturalnym).",
    tags: ["SaaS Console", "Davis AI", "Custom Dashboards", "DQL Notebooks"],
  },
  b3: {
    title: "Alerty & Eskalacje",
    desc: "Dynatrace wysyła powiadomienia przez wbudowane integracje: email, Slack, PagerDuty, ServiceNow, OpsGenie, Microsoft Teams. Można ustawiać profile alertów, tłumienie, eskalacje i on-call routing.",
    tags: ["Alerting Profiles", "Integrations", "On-call routing", "Auto-remediation"],
  },
  b4: {
    title: "SLO / SLA Reporting",
    desc: "Definiowanie Service Level Objectives bezpośrednio w Dynatrace. Monitoring error budget, burn rate alerting i automatyczne raporty compliance. Davis AI wskazuje jakie zdarzenia wpłynęły na SLO.",
    tags: ["SLO", "Error Budget", "Burn Rate", "Compliance"],
  },
  p1: {
    title: "Davis AI Engine",
    desc: "Kluczowa różnica Dynatrace vs inne narzędzia. Davis automatycznie koreluje tysiące zdarzeń, eliminuje false positives i wskazuje JEDNĄ przyczynę problemu zamiast setek alertów. Używa topologii Smartscape jako kontekstu przyczynowego — nie potrzebuje ręcznego trenowania modeli ML.",
    tags: ["Causation AI", "Anomaly Detection", "Auto Baseline", "Zero configuration"],
  },
  p2: {
    title: "SmartScape Topology",
    desc: "Automatyczna 4-wymiarowa mapa zależności całego środowiska: datacenter → hosty → procesy → usługi → aplikacje. Aktualizuje się w czasie rzeczywistym. Davis AI używa SmartScape do określenia wpływu anomalii na resztę środowiska.",
    tags: ["Auto-discovery", "4D Topology", "Real-time", "Dependency Map"],
  },
  p3: {
    title: "Metrics & Distributed Traces",
    desc: "PurePath to technologia Dynatrace śledząca każde żądanie end-to-end — od kliknięcia użytkownika przez wszystkie mikroserwisy aż do bazy danych. Pełna widoczność BEZ próbkowania (100% trace capture). Kompatybilny z OpenTelemetry.",
    tags: ["PurePath", "Full-stack", "OpenTelemetry", "OTLP ingest"],
  },
  p4: {
    title: "Log Management — Grail",
    desc: "Grail to data lakehouse nowej generacji łączący logi, metryki i traces w jednym storage. Dynatrace automatycznie koreluje logi z metrykami i trace'ami. DQL (Dynatrace Query Language) umożliwia zaawansowaną analizę bez limitu retencji.",
    tags: ["Grail", "DQL", "Log correlation", "Unlimited retention"],
  },
  p5: {
    title: "Davis CoPilot",
    desc: "Konwersacyjny asystent AI wbudowany w Dynatrace. Pozwala zadawać pytania po polsku lub angielsku, automatycznie generuje zapytania DQL, tworzy dashboardy z opisu, analizuje root cause i sugeruje rozwiązania. Oparty na LLM z kontekstem danych observability.",
    tags: ["Natural Language", "DQL Generation", "AI analysis", "Dashboard builder"],
  },
  ag1: {
    title: "Environment ActiveGate",
    desc: "Komponent instalowany w sieci klienta. Działa jako proxy między OneAgentami a chmurą Dynatrace. Szyfruje ruch (TLS termination), kompresuje dane, redukuje przepustowość i umożliwia pracę w środowiskach bez bezpośredniego dostępu do internetu.",
    tags: ["Proxy", "TLS termination", "Data routing", "Bandwidth reduction"],
  },
  ag2: {
    title: "Extension Framework",
    desc: "ActiveGate rozszerza możliwości zbierania danych: urządzenia sieciowe (SNMP v1/v2/v3), JMX dla aplikacji Java, WMI dla Windows, VMware vSphere, bazy danych przez JDBC, custom extensions pisane w Python lub Java.",
    tags: ["SNMP", "JMX", "WMI", "Custom extensions"],
  },
  ag3: {
    title: "Synthetic Monitoring",
    desc: "ActiveGate może wykonywać testy syntetyczne z prywatnych lokalizacji w sieci klienta. Browser monitors (Selenium/Puppeteer) i HTTP monitors sprawdzają dostępność i wydajność 24/7 zanim użytkownik zgłosi problem.",
    tags: ["Browser monitors", "HTTP monitors", "Private locations", "SLA probing"],
  },
  ag4: {
    title: "Cluster ActiveGate (Managed)",
    desc: "W wersji Dynatrace Managed (on-premise) Cluster ActiveGate zarządza połączeniami do klastra serwerów DT i rozdziela ruch między nodami. Zapewnia High Availability z automatycznym failover i load balancingiem.",
    tags: ["HA", "Load balancing", "Managed deployment", "Failover"],
  },
  i1: {
    title: "Kubernetes / OpenShift",
    desc: "OneAgent wdrażany jako DaemonSet — jeden pod na każdym nodzie klastra. Dynatrace Operator zarządza całym cyklem życia agenta przez CRD DynaKube. Automatycznie instrumentuje wszystkie kontenery bez zmian w Dockerfile. Widzi: nody, namespace, pody, deploymenty, HPA.",
    tags: ["DaemonSet", "DynaKube CRD", "Operator", "Webhook injection"],
  },
  i2: {
    title: "Kontenery / Docker",
    desc: "OneAgent injektuje się do każdego procesu uruchomionego w kontenerze. Automatycznie wykrywa język (Java, .NET, Node.js, Python, Go, PHP, Ruby) i instrumentuje kod bez rekompilacji. Zbiera container metadata: image, labels, restart count.",
    tags: ["Auto-inject", "Multi-language", "Container metadata", "Restart tracking"],
  },
  i3: {
    title: "Cloud Integrations",
    desc: "Dynatrace łączy się z API dostawców chmury: Azure Monitor, AWS CloudWatch, GCP Cloud Monitoring. Pobiera metryki infrastrukturalne i łączy z danymi OneAgenta dla pełnego kontekstu. Obsługuje też Azure DevOps, GitHub Actions dla deployment events.",
    tags: ["Azure Monitor", "CloudWatch", "GCP", "Deployment events"],
  },
  i4: {
    title: "VM / Bare Metal",
    desc: "Klasyczna instalacja OneAgenta na serwerze fizycznym lub VM (VMware, Hyper-V, KVM). Monitoruje: CPU, RAM, dysk, sieć, procesy, usługi systemowe. Automatycznie wykrywa technologie (Nginx, Apache, Tomcat, PostgreSQL etc.).",
    tags: ["Host monitoring", "Process groups", "Network flows", "Auto-discovery"],
  },
  i5: {
    title: "Bazy Danych",
    desc: "OneAgent automatycznie przechwytuje zapytania SQL bez agenta bazodanowego. Mierzy latency każdego zapytania, wykrywa wolne query, connection pool exhaustion, deadlocki. Widać dokładnie które zapytanie z którego serwisu zajęło zbyt długo i jaki był plan wykonania.",
    tags: ["Query capture", "Connection pools", "Slow queries", "Execution plans"],
  },
  i6: {
    title: "Sieci & Load Balancery",
    desc: "Dynatrace Network Monitoring zbiera flow data (NetFlow, sFlow, IPFIX) i koreluje z danymi procesów. Monitoring F5 BIG-IP, Nginx, HAProxy przez ActiveGate Extensions. Wykrywa anomalie w ruchu sieciowym, DNS latency, TCP retransmisje.",
    tags: ["NetFlow", "DNS monitoring", "F5 BIG-IP", "TCP analysis"],
  },
  oa1: {
    title: "OneAgent — serce systemu",
    desc: "Jeden plik instalacyjny na hosta. Automatycznie wykrywa i instrumentuje WSZYSTKIE procesy: aplikacje webowe, bazy danych, serwery web, kolejki wiadomości. Wysyła dane co 1 minutę do ActiveGate lub bezpośrednio do SaaS przez szyfrowane HTTPS :443. Narzut: < 1% CPU, ~150MB RAM.",
    tags: ["Zero-config", "Self-updating", "< 1% overhead", "Single installer"],
  },
  oa2: {
    title: "Real User Monitoring",
    desc: "Mały skrypt JavaScript (~20KB) wstrzykiwany automatycznie do stron web przez OneAgent na serwerze. Mierzy: Core Web Vitals, błędy JS, rage clicks, user journeys. Session Replay nagrywa całą sesję użytkownika. Wszystko korelowane z tracami backendu (E2E visibility).",
    tags: ["JS injection", "Session Replay", "Core Web Vitals", "E2E correlation"],
  },
  oa3: {
    title: "Distributed Tracing",
    desc: "Każde żądanie HTTP/gRPC/messaging dostaje unikalny trace ID propagowany przez wszystkie mikroserwisy (W3C TraceContext, B3). PurePath zbiera 100% żądań bez próbkowania. Dynatrace automatycznie instrumentuje: Spring, Express, Django, ASP.NET, Rails, Go net/http i dziesiątki innych frameworków.",
    tags: ["W3C TraceContext", "PurePath", "100% capture", "Auto-instrumentation"],
  },
  oa4: {
    title: "CodeModule (PaaS / Serverless)",
    desc: "Dla środowisk gdzie nie można zainstalować pełnego OneAgenta — lekki moduł dołączany do kontenera lub funkcji serverless. Obsługuje: AWS Lambda, Azure Functions, Google Cloud Run, AWS Fargate. Zapewnia tracing i podstawowe metryki bez DaemonSet.",
    tags: ["Lambda", "Azure Functions", "Fargate", "Cloud Run"],
  },
};

const incidentFlow = [
  { icon: "👤", label: "Użytkownik\nzgłasza wolną\naplikację", color: "#e94560" },
  { icon: "⚡", label: "OneAgent\nzbiera metryki\ni traces", color: "#ef476f" },
  { icon: "🔀", label: "ActiveGate\nrouting\n+ szyfrowanie", color: "#06d6a0" },
  { icon: "🧠", label: "Davis AI\nroot cause\nanalysis", color: "#00b4d8" },
  { icon: "🔔", label: "Alert do\nteamu Ops\n(< 2 min)", color: "#ffd166" },
  { icon: "🔧", label: "Naprawa\nz pełnym\nkontekstem", color: "#06d6a0" },
];

export default function App() {
  const [selected, setSelected] = useState(null);
  const [hoveredLayer, setHoveredLayer] = useState(null);

  const detail = selected ? details[selected] : null;
  const allItems = data.layers.flatMap((l) => l.items);

  return (
    <div style={{
      fontFamily: "'JetBrains Mono', 'Courier New', monospace",
      background: "linear-gradient(135deg, #0a0a1a 0%, #0d1b2a 50%, #0a0a1a 100%)",
      minHeight: "100vh",
      padding: "24px",
      color: "#e2e8f0",
    }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 28 }}>
        <div style={{
          display: "inline-block",
          background: "linear-gradient(90deg, #00b4d8, #06d6a0)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          fontSize: 26,
          fontWeight: 900,
          letterSpacing: 3,
          marginBottom: 4,
        }}>
          DYNATRACE MONITORING ARCHITECTURE
        </div>
        <div style={{ color: "#64748b", fontSize: 12, letterSpacing: 2 }}>
          KLIKNIJ dowolny komponent aby zobaczyć szczegóły
        </div>
      </div>

      <div style={{ display: "flex", gap: 20, alignItems: "flex-start", maxWidth: 1200, margin: "0 auto" }}>

        {/* LEFT – diagram warstw */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 0 }}>
          {data.layers.map((layer, li) => (
            <div key={layer.id}>
              <div
                onMouseEnter={() => setHoveredLayer(layer.id)}
                onMouseLeave={() => setHoveredLayer(null)}
                style={{
                  border: `1px solid ${layer.accent}44`,
                  borderLeft: `3px solid ${layer.accent}`,
                  borderRadius:
                    li === 0 ? "10px 10px 0 0"
                    : li === data.layers.length - 1 ? "0 0 10px 10px"
                    : "0",
                  background: hoveredLayer === layer.id ? `${layer.color}dd` : `${layer.color}99`,
                  padding: "14px 16px",
                  transition: "all 0.2s",
                }}
              >
                <div style={{
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: 2,
                  color: layer.accent,
                  marginBottom: 10,
                  opacity: 0.9,
                }}>
                  {layer.label}
                </div>

                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {layer.items.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setSelected(selected === item.id ? null : item.id)}
                      style={{
                        background: selected === item.id
                          ? `${layer.accent}22`
                          : "rgba(255,255,255,0.04)",
                        border: `1px solid ${selected === item.id ? layer.accent : layer.accent + "44"}`,
                        borderRadius: 8,
                        padding: "10px 14px",
                        cursor: "pointer",
                        color: "#e2e8f0",
                        textAlign: "left",
                        transition: "all 0.15s",
                        minWidth: 140,
                        flex: "1 1 140px",
                        transform: selected === item.id ? "translateY(-1px)" : "none",
                        boxShadow: selected === item.id ? `0 4px 16px ${layer.accent}33` : "none",
                      }}
                    >
                      <div style={{ fontSize: 20, marginBottom: 4 }}>{item.icon}</div>
                      <div style={{
                        fontSize: 12,
                        fontWeight: 700,
                        color: selected === item.id ? layer.accent : "#e2e8f0",
                        marginBottom: 2,
                      }}>
                        {item.label}
                      </div>
                      <div style={{ fontSize: 10, color: "#64748b", lineHeight: 1.3 }}>{item.sub}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Strzałka między warstwami */}
              {li < data.layers.length - 1 && (
                <div style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: 28,
                  background: "linear-gradient(180deg, transparent, rgba(255,255,255,0.02), transparent)",
                  position: "relative",
                }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <div style={{ width: 1, height: 8, background: "linear-gradient(180deg, #334155, #00b4d8)" }} />
                    <div style={{ color: "#00b4d8", fontSize: 12, lineHeight: 1 }}>▼</div>
                  </div>
                  <div style={{
                    position: "absolute",
                    right: 80,
                    fontSize: 9,
                    color: "#475569",
                    letterSpacing: 1,
                    fontStyle: "italic",
                  }}>
                    {li === 0 && "dane UX → AI analiza"}
                    {li === 1 && "konfiguracja ← → zbieranie danych"}
                    {li === 2 && "routing & proxy"}
                    {li === 3 && "auto-instrumentacja procesów"}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* RIGHT – panel szczegółów */}
        <div style={{ width: 300, flexShrink: 0, position: "sticky", top: 24 }}>
          {detail ? (
            <div style={{
              background: "rgba(15,52,96,0.6)",
              border: "1px solid #00b4d844",
              borderTop: "3px solid #00b4d8",
              borderRadius: 10,
              padding: 18,
              animation: "fadeIn 0.2s ease",
            }}>
              <div style={{ fontSize: 22, marginBottom: 8 }}>
                {allItems.find((i) => i.id === selected)?.icon}
              </div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#00b4d8", marginBottom: 10 }}>
                {detail.title}
              </div>
              <div style={{ fontSize: 12, color: "#94a3b8", lineHeight: 1.6, marginBottom: 14 }}>
                {detail.desc}
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {detail.tags.map((tag) => (
                  <span key={tag} style={{
                    background: "rgba(0,180,216,0.12)",
                    border: "1px solid rgba(0,180,216,0.3)",
                    borderRadius: 4,
                    padding: "2px 8px",
                    fontSize: 10,
                    color: "#00b4d8",
                    letterSpacing: 0.5,
                  }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ) : (
            <div style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px dashed #334155",
              borderRadius: 10,
              padding: 18,
              textAlign: "center",
            }}>
              <div style={{ fontSize: 32, marginBottom: 10, opacity: 0.3 }}>👆</div>
              <div style={{ fontSize: 11, color: "#475569", lineHeight: 1.6 }}>
                Kliknij dowolny komponent na diagramie aby zobaczyć opis i tagi techniczne
              </div>
            </div>
          )}

          {/* Legenda */}
          <div style={{
            marginTop: 16,
            background: "rgba(255,255,255,0.02)",
            border: "1px solid #1e293b",
            borderRadius: 10,
            padding: 14,
          }}>
            <div style={{ fontSize: 10, letterSpacing: 2, color: "#475569", marginBottom: 10 }}>
              LEGENDA WARSTW
            </div>
            {data.layers.map((l) => (
              <div key={l.id} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                <div style={{ width: 10, height: 10, borderRadius: 2, background: l.accent, flexShrink: 0 }} />
                <div style={{ fontSize: 10, color: "#64748b" }}>{l.label}</div>
              </div>
            ))}
          </div>

          {/* Kluczowa różnica */}
          <div style={{
            marginTop: 16,
            background: "rgba(6,214,160,0.05)",
            border: "1px solid rgba(6,214,160,0.2)",
            borderRadius: 10,
            padding: 14,
          }}>
            <div style={{ fontSize: 10, letterSpacing: 2, color: "#06d6a0", marginBottom: 8 }}>
              💡 KLUCZOWA RÓŻNICA
            </div>
            <div style={{ fontSize: 11, color: "#94a3b8", lineHeight: 1.6 }}>
              <span style={{ color: "#06d6a0", fontWeight: 700 }}>Davis AI</span> automatycznie
              koreluje zdarzenia i wskazuje{" "}
              <span style={{ color: "#ffd166" }}>jedną przyczynę</span> zamiast setek alertów.
              <br /><br />
              Prometheus wymaga ręcznego konfigurowania reguł. Dynatrace robi to samo{" "}
              <span style={{ color: "#06d6a0" }}>automatycznie</span>.
            </div>
          </div>

          {/* Statystyki */}
          <div style={{
            marginTop: 16,
            background: "rgba(255,255,255,0.02)",
            border: "1px solid #1e293b",
            borderRadius: 10,
            padding: 14,
          }}>
            <div style={{ fontSize: 10, letterSpacing: 2, color: "#475569", marginBottom: 10 }}>
              DYNATRACE W LICZBACH
            </div>
            {[
              { val: "100%", label: "trace capture (bez próbkowania)", color: "#00b4d8" },
              { val: "< 1%", label: "narzut CPU OneAgenta", color: "#06d6a0" },
              { val: "~2min", label: "średni czas do wykrycia problemu", color: "#ffd166" },
              { val: "600+", label: "automatycznie wykrywanych technologii", color: "#ef476f" },
            ].map((s) => (
              <div key={s.label} style={{ display: "flex", gap: 8, marginBottom: 8, alignItems: "baseline" }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: s.color, flexShrink: 0, minWidth: 52 }}>
                  {s.val}
                </div>
                <div style={{ fontSize: 10, color: "#64748b", lineHeight: 1.4 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Przepływ incydentu */}
      <div style={{
        maxWidth: 1200,
        margin: "20px auto 0",
        padding: "16px",
        background: "rgba(255,255,255,0.02)",
        borderRadius: 10,
        border: "1px solid #1e293b",
      }}>
        <div style={{ fontSize: 10, letterSpacing: 2, color: "#475569", marginBottom: 12 }}>
          PRZEPŁYW DANYCH — TYPOWY INCYDENT
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
          {incidentFlow.map((step, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{
                background: `${step.color}11`,
                border: `1px solid ${step.color}44`,
                borderRadius: 8,
                padding: "8px 12px",
                textAlign: "center",
                minWidth: 95,
              }}>
                <div style={{ fontSize: 18 }}>{step.icon}</div>
                <div style={{
                  fontSize: 9,
                  color: step.color,
                  marginTop: 4,
                  whiteSpace: "pre-line",
                  lineHeight: 1.4,
                }}>
                  {step.label}
                </div>
              </div>
              {i < incidentFlow.length - 1 && (
                <div style={{ color: "#334155", fontSize: 14 }}>→</div>
              )}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        button:hover {
          transform: translateY(-2px) !important;
          box-shadow: 0 6px 20px rgba(0,180,216,0.2) !important;
          border-color: rgba(0,180,216,0.6) !important;
        }
      `}</style>
    </div>
  );
}
