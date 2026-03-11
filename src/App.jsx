import { useState, useEffect } from 'react'
import './App.css'

const TABS = [
  { id: 'architecture', label: '🏗️ Architektura' },
  { id: 'components', label: '🔧 Komponenty' },
  { id: 'metrics', label: '📊 Metryki' },
  { id: 'dataflow', label: '🔄 Przepływ danych' },
  { id: 'ai', label: '🤖 Davis AI' },
]

function ArchitectureView() {
  return (
    <div className="arch-grid">
      <div>
        <h2 className="section-title">Architektura Infrastruktury Dynatrace</h2>
        <p className="section-subtitle">
          Dynatrace to platforma observability oparta na AI, która zbiera dane z całego środowiska —
          od hostów i kontenerów, przez aplikacje, aż po usługi chmurowe. Dane przepływają od
          agentów przez ActiveGate do klastra Dynatrace.
        </p>
      </div>

      <div className="card">
        <div className="card-header">
          <span className="card-icon">🔄</span>
          <h2>Przepływ danych w czasie rzeczywistym</h2>
        </div>
        <div className="arch-flow">
          <div className="arch-layer">
            <div className="layer-label">Warstwa zbierania</div>
            <div className="layer-box teal">
              <div className="box-icon">🖥️</div>
              <div className="box-title">OneAgent</div>
              <div className="box-sub">Host, kontener, proces</div>
            </div>
            <div className="layer-box teal">
              <div className="box-icon">☁️</div>
              <div className="box-title">Cloud Integrations</div>
              <div className="box-sub">AWS, Azure, GCP</div>
            </div>
            <div className="layer-box teal">
              <div className="box-icon">📡</div>
              <div className="box-title">API Ingest</div>
              <div className="box-sub">Metryki, logi, traces</div>
            </div>
          </div>

          <div className="arch-arrow">→</div>

          <div className="arch-layer">
            <div className="layer-label">Warstwa pośrednicząca</div>
            <div className="layer-box green">
              <div className="box-icon">🔀</div>
              <div className="box-title">ActiveGate</div>
              <div className="box-sub">Routing i agregacja</div>
            </div>
            <div className="layer-box green">
              <div className="box-icon">🔒</div>
              <div className="box-title">Environment AG</div>
              <div className="box-sub">Proxy dla sieci prywatnych</div>
            </div>
          </div>

          <div className="arch-arrow">→</div>

          <div className="arch-layer">
            <div className="layer-label">Platforma Dynatrace</div>
            <div className="layer-box purple">
              <div className="box-icon">🧠</div>
              <div className="box-title">Davis AI Engine</div>
              <div className="box-sub">Analiza przyczynowa</div>
            </div>
            <div className="layer-box purple">
              <div className="box-icon">💾</div>
              <div className="box-title">Grail Data Lakehouse</div>
              <div className="box-sub">Nieograniczone przechowywanie</div>
            </div>
          </div>

          <div className="arch-arrow">→</div>

          <div className="arch-layer">
            <div className="layer-label">Warstwa prezentacji</div>
            <div className="layer-box orange">
              <div className="box-icon">📋</div>
              <div className="box-title">Dashboards</div>
              <div className="box-sub">Wizualizacja i raporty</div>
            </div>
            <div className="layer-box orange">
              <div className="box-icon">🔔</div>
              <div className="box-title">Alerting</div>
              <div className="box-sub">Powiadomienia i integracje</div>
            </div>
            <div className="layer-box orange">
              <div className="box-icon">🤖</div>
              <div className="box-title">Auto-Remediation</div>
              <div className="box-sub">Automatyczna naprawa</div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: '16px', overflow: 'hidden', borderRadius: '4px' }}>
          <div className="data-stream" />
        </div>
      </div>

      <div className="desc-grid">
        <div className="desc-item">
          <div className="desc-item-header">
            <span className="desc-badge badge-teal">OneAgent</span>
          </div>
          <h3>Automatyczne instrumentowanie</h3>
          <p>Jeden agent instalowany na hoście automatycznie odkrywa i monitoruje wszystkie procesy, usługi i zależności bez dodatkowej konfiguracji.</p>
          <ul>
            <li>Pełne instrumentowanie kodu (bytecode injection)</li>
            <li>Odkrywanie topologii w czasie rzeczywistym</li>
            <li>Monitoring procesów, JVM, .NET CLR</li>
            <li>Automatyczna detekcja technologii</li>
          </ul>
        </div>
        <div className="desc-item">
          <div className="desc-item-header">
            <span className="desc-badge badge-green">ActiveGate</span>
          </div>
          <h3>Brama komunikacyjna</h3>
          <p>ActiveGate pełni rolę proxy i aggregatora danych. Umożliwia bezpieczną komunikację z Dynatrace z sieci prywatnych i redukuje ilość połączeń wychodzących.</p>
          <ul>
            <li>Kompresja i szyfrowanie danych</li>
            <li>Wsparcie dla JMX, SNMP, WMI</li>
            <li>Synthetic monitoring execution</li>
            <li>Rozszerzenia i pluginy</li>
          </ul>
        </div>
        <div className="desc-item">
          <div className="desc-item-header">
            <span className="desc-badge badge-purple">Grail</span>
          </div>
          <h3>Data Lakehouse nowej generacji</h3>
          <p>Grail to platforma do przechowywania i analizy danych observability, łącząca zalety data lake i data warehouse z możliwościami DQL (Dynatrace Query Language).</p>
          <ul>
            <li>Unified storage: metryki, logi, traces, eventy</li>
            <li>Nieograniczona retencja danych</li>
            <li>Analityka w czasie rzeczywistym i historyczna</li>
            <li>DQL — potężny język zapytań</li>
          </ul>
        </div>
        <div className="desc-item">
          <div className="desc-item-header">
            <span className="desc-badge badge-orange">Smartscape</span>
          </div>
          <h3>Mapa topologii 4D</h3>
          <p>Smartscape to dynamiczna mapa zależności między wszystkimi bytami w środowisku — od hostów i procesów przez usługi do aplikacji i użytkowników końcowych.</p>
          <ul>
            <li>Automatyczna detekcja zależności</li>
            <li>Perspektywa: host → proces → usługa → aplikacja</li>
            <li>Historia zmian topologii</li>
            <li>Kontekst dla anomalii Davis AI</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

function ComponentsView() {
  const components = [
    {
      icon: '🖥️',
      name: 'OneAgent',
      badge: 'badge-teal',
      badgeLabel: 'Agent',
      description: 'Lekki agent instalowany na każdym hoście (Linux, Windows, AIX). Automatycznie instrumentuje kod aplikacji i zbiera dane bez restartu procesów.',
      details: [
        'Instalacja: curl -O <url> && sudo /bin/sh dynatrace-install.sh',
        'Tryb: Full-stack, Infrastructure, PaaS, K8s',
        'Protokół: HTTPS/443 do ActiveGate lub bezpośrednio do SaaS',
        'Narzut CPU: < 1%, RAM: ~150MB',
      ],
    },
    {
      icon: '🔀',
      name: 'ActiveGate',
      badge: 'badge-green',
      badgeLabel: 'Gateway',
      description: 'Serwer pośredniczący między agentami/źródłami a klastrem Dynatrace. Wymagany dla sieci prywatnych, monitoring syntetyczny i rozszerzenia.',
      details: [
        'Typy: Environment ActiveGate, Cluster ActiveGate (Managed)',
        'Protokół: gRPC, HTTP/2',
        'Możliwości: JMX, SNMP, WMI, VMware, SQL',
        'Wysoka dostępność: load balancing między AG',
      ],
    },
    {
      icon: '⚙️',
      name: 'Dynatrace Operator',
      badge: 'badge-purple',
      badgeLabel: 'Kubernetes',
      description: 'Operator Kubernetes automatyzujący wdrożenie i zarządzanie OneAgent oraz ActiveGate w klastrach K8s i OpenShift.',
      details: [
        'CRD: DynaKube — jeden CR rządzi wszystkim',
        'Tryby: ClassicFullStack, CloudNativeFullStack, AppOnly',
        'Automatyczna aktualizacja agentów',
        'Webhook injection dla podów',
      ],
    },
    {
      icon: '📡',
      name: 'OpenTelemetry Integration',
      badge: 'badge-yellow',
      badgeLabel: 'OTel',
      description: 'Dynatrace wspiera OpenTelemetry natively — przesyłaj traces, metryki i logi przez OTLP endpoint bezpośrednio do Grail.',
      details: [
        'OTLP endpoint: https://<env>.live.dynatrace.com/api/v2/otlp',
        'Wsparcie: gRPC i HTTP/Protobuf',
        'Auto-enrichment: dodaje DT context do span-ów',
        'Integracja z Davis AI przez trace context',
      ],
    },
    {
      icon: '🔬',
      name: 'Synthetic Monitoring',
      badge: 'badge-orange',
      badgeLabel: 'Synthetic',
      description: 'Proaktywne monitorowanie dostępności i wydajności z ponad 90 lokalizacji na całym świecie lub z prywatnych lokalizacji przez ActiveGate.',
      details: [
        'Browser monitor: Selenium/Puppeteer skrypty',
        'HTTP monitor: REST API, strony www',
        'Prywatne lokalizacje: ActiveGate Synthetic',
        'SLA reporting i alerty dostępności',
      ],
    },
    {
      icon: '🔐',
      name: 'Access i Security',
      badge: 'badge-purple',
      badgeLabel: 'Security',
      description: 'Wielopoziomowa kontrola dostępu oparta na IAM, grupach zarządzania i zasadach RBAC zintegrowanych z dostawcami tożsamości.',
      details: [
        'SSO: SAML 2.0, OIDC',
        'RBAC: Role na poziomie środowiska i konta',
        'API Tokens: scoped, rotatable, monitorowane',
        'Audit log: wszystkie akcje użytkowników',
      ],
    },
  ]

  return (
    <div>
      <h2 className="section-title">Komponenty Dynatrace</h2>
      <p className="section-subtitle">
        Pełny ekosystem komponentów budujących platformę observability — od agentów zbierających dane
        przez bramy komunikacyjne aż po mechanizmy bezpieczeństwa i integracje z ekosystemem cloud-native.
      </p>
      <div className="desc-grid">
        {components.map(c => (
          <div key={c.name} className="desc-item">
            <div className="desc-item-header">
              <span style={{ fontSize: '20px' }}>{c.icon}</span>
              <span className={`desc-badge ${c.badge}`}>{c.badgeLabel}</span>
              <h3>{c.name}</h3>
            </div>
            <p style={{ marginBottom: '10px' }}>{c.description}</p>
            <ul>
              {c.details.map(d => <li key={d}>{d}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

function MetricsView() {
  const [bars, setBars] = useState(false)
  useEffect(() => { setTimeout(() => setBars(true), 200) }, [])

  const serviceMetrics = [
    { label: 'web-frontend', value: 95, color: 'bar-green' },
    { label: 'api-gateway', value: 87, color: 'bar-teal' },
    { label: 'auth-service', value: 72, color: 'bar-teal' },
    { label: 'payment-svc', value: 45, color: 'bar-orange' },
    { label: 'db-postgres', value: 91, color: 'bar-green' },
    { label: 'cache-redis', value: 98, color: 'bar-green' },
  ]

  const infraMetrics = [
    { label: 'Hosty online', value: '247/250', color: 'green', trend: '↑ 3 nowe', trendClass: 'trend-up' },
    { label: 'CPU avg', value: '34%', color: '', trend: '↓ 2% vs wcześniej', trendClass: 'trend-up' },
    { label: 'Memory avg', value: '61%', color: 'yellow', trend: '↑ 5% vs wcześniej', trendClass: 'trend-down' },
    { label: 'Kontenery', value: '1.2K', color: 'purple', trend: '↑ 48 nowych', trendClass: 'trend-up' },
    { label: 'Problemy', value: '3', color: 'orange', trend: '↓ było 7', trendClass: 'trend-up' },
    { label: 'Req/min', value: '84K', color: '', trend: '↑ 12% wzrost', trendClass: 'trend-up' },
  ]

  return (
    <div>
      <h2 className="section-title">Metryki Środowiska</h2>
      <p className="section-subtitle">
        Przykładowy widok metryk infrastruktury i usług zbieranych przez Dynatrace.
        W rzeczywistym środowisku dane są aktualizowane co 1 minutę (metryki) lub w czasie rzeczywistym (traces/logi).
      </p>

      <div className="metrics-grid">
        {infraMetrics.map(m => (
          <div key={m.label} className="metric-card">
            <div className={`metric-value ${m.color}`}>{m.value}</div>
            <div className="metric-label">{m.label}</div>
            <div className={`metric-trend ${m.trendClass}`}>{m.trend}</div>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="card-header">
          <span className="card-icon">📊</span>
          <h2>Dostępność usług (Apdex score)</h2>
        </div>
        <div className="chart-container">
          {serviceMetrics.map(m => (
            <div key={m.label} className="chart-row">
              <div className="chart-label">
                <span className="status-dot" style={{
                  background: m.value > 80 ? '#00d4aa' : m.value > 60 ? '#fbbf24' : '#ff6b35'
                }} />
                {m.label}
              </div>
              <div className="chart-bar-bg">
                <div
                  className={`chart-bar-fill ${m.color}`}
                  style={{ width: bars ? `${m.value}%` : '0%' }}
                />
              </div>
              <div className="chart-value">{m.value}%</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginTop: '24px' }} className="card">
        <div className="card-header">
          <span className="card-icon">🔔</span>
          <h2>Aktywne problemy (Davis AI)</h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {[
            { title: 'Wzrost czasu odpowiedzi — payment-service', impact: 'Wpływ na 234 użytkowników', time: '18 min temu', color: '#ff6b35' },
            { title: 'Zwiększone zużycie pamięci — node-cluster-3', impact: '3 hosty dotknięte', time: '45 min temu', color: '#fbbf24' },
            { title: 'Anomalia CPU — api-gateway pod(x2)', impact: 'Potencjalny bottleneck', time: '1h 12 min temu', color: '#fbbf24' },
          ].map(p => (
            <div key={p.title} style={{
              background: '#0d1520', border: `1px solid ${p.color}40`,
              borderLeft: `3px solid ${p.color}`, borderRadius: '8px', padding: '14px 16px',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            }}>
              <div>
                <div style={{ fontSize: '14px', fontWeight: 600, color: '#e0e6f0', marginBottom: '4px' }}>{p.title}</div>
                <div style={{ fontSize: '12px', color: '#8a9ab5' }}>{p.impact}</div>
              </div>
              <div style={{ fontSize: '11px', color: '#8a9ab5', flexShrink: 0, marginLeft: '16px' }}>{p.time}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function DataFlowView() {
  const flows = [
    {
      title: 'Full-Stack Trace (APM)',
      description: 'Śledzenie żądania HTTP od przeglądarki przez backend do bazy danych',
      color: 'teal',
      steps: [
        'Użytkownik wysyła request do aplikacji webowej',
        'RUM agent rejestruje event w przeglądarce',
        'OneAgent przechwytuje wywołanie na serwerze web',
        'Trace context propagowany przez mikroserwisy (W3C TraceContext)',
        'OneAgent instrumentuje wywołania SQL i zewnętrzne API',
        'Span-y wysyłane przez ActiveGate do Dynatrace',
        'Davis AI analizuje trace i buduje Service Flow',
      ],
    },
    {
      title: 'Log Analytics Pipeline',
      description: 'Ingestion i analiza logów z różnych źródeł',
      color: 'green',
      steps: [
        'OneAgent auto-wykrywa logi aplikacji (stdout, pliki)',
        'Log Monitoring 2.0: enrichment o DT metadane',
        'Streaming do Grail przez OTLP lub Log API',
        'Parsowanie: JSON, CSV, regex patterns',
        'Indeksowanie w Grail z pełnym kontekstem infrastruktury',
        'DQL: fetch logs | filter ...  | summarize count()',
        'Korelacja z metrykami i problemami Davis AI',
      ],
    },
    {
      title: 'Infrastructure Monitoring',
      description: 'Zbieranie metryk hostów, kontenerów i usług chmurowych',
      color: 'purple',
      steps: [
        'OneAgent zbiera metryki co 1 min (hosty, procesy)',
        'Kubernetes API: metryki podów, node, workloads',
        'Cloud integrations: CloudWatch, Azure Monitor, GCP Monitoring',
        'Metryki wysyłane przez gRPC do ActiveGate',
        'Agregacja i kompresja w ActiveGate',
        'Przechowywanie w Grail z metadanymi Smartscape',
        'Anomaly detection: Davis AI uczy się baseline',
      ],
    },
    {
      title: 'Real User Monitoring (RUM)',
      description: 'Monitoring doświadczenia prawdziwych użytkowników',
      color: 'teal',
      steps: [
        'JavaScript tag wstrzykiwany automatycznie przez OneAgent',
        'Browser agent zbiera: load time, kliknięcia, błędy JS',
        'Session Replay: zapis pełnej sesji użytkownika',
        'Dane wysyłane do beacon endpoint Dynatrace',
        'Geolokalizacja, ISP, typ urządzenia — automatycznie',
        'Korelacja z server-side trace (E2E tracing)',
        'Apdex scoring: Satisfied / Tolerating / Frustrated',
      ],
    },
  ]

  const stepColors = { teal: 'teal', green: 'green', purple: 'purple' }

  return (
    <div>
      <h2 className="section-title">Przepływy Danych</h2>
      <p className="section-subtitle">
        Szczegółowe kroki przepływu danych dla kluczowych typów monitoringu w Dynatrace —
        od punktu zbierania danych aż do ich analizy i prezentacji.
      </p>
      <div className="flow-container">
        {flows.map(f => (
          <div key={f.title} className="flow-item">
            <h3>{f.title}</h3>
            <p>{f.description}</p>
            <div className="flow-steps">
              {f.steps.map((s, i) => (
                <div key={i} className="flow-step">
                  <div className={`step-num ${stepColors[f.color]}`}>{i + 1}</div>
                  <div className="step-text">{s}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function AIView() {
  const features = [
    {
      icon: '🧠',
      name: 'Davis AI — Causation Engine',
      description: 'Davis nie tylko wykrywa anomalie — automatycznie identyfikuje przyczynę źródłową (root cause) problemu, analizując relacje topologiczne z Smartscape i dane historyczne.',
      tags: ['Root Cause Analysis', 'Causal AI', 'Topology-aware', 'No ML training needed'],
    },
    {
      icon: '🔮',
      name: 'Predictive AI',
      description: 'Na podstawie historycznych wzorców Davis AI przewiduje potencjalne problemy zanim się pojawią — np. wyczerpanie dysku, przeciążenie CPU czy degradacja usługi.',
      tags: ['Forecasting', 'Capacity Planning', 'Anomaly Prediction', 'Baselines'],
    },
    {
      icon: '💬',
      name: 'Davis CoPilot',
      description: 'Konwersacyjny asystent AI w Dynatrace — pozwala zadawać pytania w języku naturalnym, generować zapytania DQL, analizować problemy i tworzyć dashboardy opisem.',
      tags: ['Natural Language', 'DQL Generation', 'Problem Analysis', 'Dashboard Builder'],
    },
    {
      icon: '🔍',
      name: 'Anomaly Detection',
      description: 'Automatyczne wykrywanie anomalii bez konfigurowania progów alertów. Davis uczy się normalnego zachowania każdej usługi i alarmuje tylko o prawdziwych problemach.',
      tags: ['Auto-baselining', 'Seasonal patterns', 'Multi-dimensional', 'Low false positives'],
    },
    {
      icon: '🗺️',
      name: 'Service Level Objectives',
      description: 'Definiowanie i monitorowanie SLO bezpośrednio w Dynatrace — od availability po latency i error rate, z burn rate alerting i raportowaniem budżetu błędów.',
      tags: ['SLO/SLA', 'Error Budget', 'Burn Rate', 'Compliance Reports'],
    },
    {
      icon: '⚡',
      name: 'Auto-Remediation',
      description: 'Integracja z systemami workflow (ServiceNow, PagerDuty, Ansible) umożliwia automatyczne podejmowanie działań naprawczych triggered przez problemy wykryte przez Davis.',
      tags: ['Ansible', 'ServiceNow', 'Webhooks', 'Auto-scaling triggers'],
    },
  ]

  return (
    <div>
      <h2 className="section-title">Davis AI — Mózg Dynatrace</h2>
      <p className="section-subtitle">
        Davis AI to silnik sztucznej inteligencji Dynatrace, który przetwarza miliardy zdarzeń dziennie,
        automatycznie koreluje anomalie, identyfikuje przyczyny źródłowe i proponuje rozwiązania —
        bez konieczności manualnej konfiguracji reguł czy modeli ML.
      </p>

      <div style={{ marginBottom: '24px' }} className="card">
        <div className="card-header">
          <span className="card-icon">🎯</span>
          <h2>Jak Davis AI analizuje problem</h2>
        </div>
        <div style={{ display: 'flex', gap: '0', alignItems: 'center', overflowX: 'auto', paddingBottom: '8px' }}>
          {[
            { label: 'Anomalia wykryta', sub: 'Odchylenie od baseline', icon: '📈' },
            null,
            { label: 'Kontekst topologii', sub: 'Smartscape: zależności', icon: '🗺️' },
            null,
            { label: 'Korelacja zdarzeń', sub: 'Deployment, config change', icon: '🔗' },
            null,
            { label: 'Root Cause', sub: 'Jedna przyczyna, wiele objawów', icon: '🎯' },
            null,
            { label: 'Problem ticket', sub: 'Grupuje powiązane alerty', icon: '🎫' },
          ].map((s, i) => (
            s === null
              ? <div key={i} style={{ color: '#00b9f1', fontSize: '24px', padding: '0 8px', flexShrink: 0 }}>→</div>
              : <div key={i} style={{
                  background: '#0d1520', border: '1px solid #1e2d40', borderRadius: '8px',
                  padding: '14px 16px', textAlign: 'center', minWidth: '120px', flexShrink: 0,
                }}>
                  <div style={{ fontSize: '24px', marginBottom: '6px' }}>{s.icon}</div>
                  <div style={{ fontSize: '12px', fontWeight: 600, color: '#e0e6f0', marginBottom: '2px' }}>{s.label}</div>
                  <div style={{ fontSize: '11px', color: '#8a9ab5' }}>{s.sub}</div>
                </div>
          ))}
        </div>
      </div>

      <div className="ai-grid">
        {features.map(f => (
          <div key={f.name} className="ai-card">
            <div className="ai-card-header">
              <span className="ai-icon">{f.icon}</span>
              <h3>{f.name}</h3>
            </div>
            <p>{f.description}</p>
            <div className="ai-features">
              {f.tags.map(t => <span key={t} className="ai-tag">{t}</span>)}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const VIEWS = {
  architecture: ArchitectureView,
  components: ComponentsView,
  metrics: MetricsView,
  dataflow: DataFlowView,
  ai: AIView,
}

export default function App() {
  const [activeTab, setActiveTab] = useState('architecture')
  const ActiveView = VIEWS[activeTab]

  return (
    <div className="app">
      <header className="header">
        <div className="header-logo">
          <div className="logo-icon">📡</div>
          <h1>Dynatrace Monitoring</h1>
        </div>
        <div className="header-badge">INFRASTRUKTURA MONITORINGU</div>
      </header>

      <nav className="nav">
        {TABS.map(t => (
          <button
            key={t.id}
            className={`nav-btn ${activeTab === t.id ? 'active' : ''}`}
            onClick={() => setActiveTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </nav>

      <main className="main">
        <ActiveView />
      </main>
    </div>
  )
}
