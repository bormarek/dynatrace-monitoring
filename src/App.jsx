import { useState, useEffect } from "react";

const NODES = {
  // Developer
  dev: { id: "dev", icon: "👨‍💻", label: "Developer", sub: "git push", x: 60, y: 60, color: "#e94560" },

  // Git
  git: { id: "git", icon: "🔀", label: "Git Repository", sub: "main branch", x: 280, y: 60, color: "#a78bfa" },

  // CI
  ci: { id: "ci", icon: "🏗️", label: "CI Pipeline", sub: "build & push image", x: 500, y: 60, color: "#a78bfa" },

  // Registry
  registry: { id: "registry", icon: "🐳", label: "Container Registry", sub: "image:sha256", x: 720, y: 60, color: "#a78bfa" },

  // ArgoCD components
  argoui: { id: "argoui", icon: "🌐", label: "ArgoCD UI / CLI", sub: "port 443", x: 60, y: 260, color: "#f97316" },
  dex: { id: "dex", icon: "🔐", label: "Dex (SSO)", sub: "OIDC / SAML", x: 60, y: 420, color: "#f97316" },
  apiserver: { id: "apiserver", icon: "⚡", label: "API Server", sub: "argocd-server", x: 280, y: 340, color: "#f97316" },
  reposerver: { id: "reposerver", icon: "📋", label: "Repo Server", sub: "helm template / kustomize", x: 500, y: 260, color: "#f97316" },
  redis: { id: "redis", icon: "💾", label: "Redis Cache", sub: "state cache", x: 500, y: 420, color: "#f97316" },
  appcontroller: { id: "appcontroller", icon: "🔄", label: "App Controller", sub: "reconciliation loop", x: 720, y: 340, color: "#f97316" },

  // K8s
  k8sapi: { id: "k8sapi", icon: "☸️", label: "K8s API Server", sub: "kube-apiserver", x: 960, y: 260, color: "#00b4d8" },
  ns1: { id: "ns1", icon: "📦", label: "namespace: prod", sub: "Deployment • Service", x: 900, y: 440, color: "#06d6a0" },
  ns2: { id: "ns2", icon: "📦", label: "namespace: staging", sub: "Deployment • Service", x: 1060, y: 440, color: "#ffd166" },
};

const EDGES = [
  { from: "dev", to: "git", label: "git push", color: "#e94560", animated: true },
  { from: "git", to: "ci", label: "webhook trigger", color: "#a78bfa", animated: true },
  { from: "ci", to: "registry", label: "docker push", color: "#a78bfa", animated: true },
  { from: "git", to: "reposerver", label: "git clone / poll", color: "#f97316", animated: true },
  { from: "reposerver", to: "redis", label: "cache manifests", color: "#f97316", animated: false },
  { from: "reposerver", to: "appcontroller", label: "rendered YAML", color: "#f97316", animated: true },
  { from: "appcontroller", to: "k8sapi", label: "kubectl apply", color: "#00b4d8", animated: true },
  { from: "k8sapi", to: "ns1", label: "deploy", color: "#06d6a0", animated: true },
  { from: "k8sapi", to: "ns2", label: "deploy", color: "#ffd166", animated: true },
  { from: "k8sapi", to: "appcontroller", label: "watch / informers", color: "#00b4d8", animated: false },
  { from: "argoui", to: "apiserver", label: "REST / gRPC", color: "#f97316", animated: false },
  { from: "dex", to: "apiserver", label: "OIDC token", color: "#f97316", animated: false },
  { from: "apiserver", to: "appcontroller", label: "sync trigger", color: "#f97316", animated: false },
  { from: "apiserver", to: "reposerver", label: "repo access", color: "#f97316", animated: false },
];

const DETAILS = {
  dev: {
    title: "Developer",
    desc: "Jedyna akcja dewelopera to git push. Nie ma bezpośredniego dostępu do klastra produkcyjnego. Wszystkie zmiany przechodzą przez Pull Request i code review. ArgoCD przejmuje odpowiedzialność za deployment po mergu do main.",
    tags: ["git push", "Pull Request", "No kubectl on prod", "GitOps"],
  },
  git: {
    title: "Git Repository",
    desc: "Jedyne źródło prawdy (Source of Truth). Przechowuje zarówno kod aplikacji jak i konfigurację K8s (Helm charts, Kustomize overlays, plain YAML). ArgoCD domyślnie odpytuje repo co 3 minuty lub natychmiast przez webhook.",
    tags: ["Source of Truth", "Webhook push", "3min poll", "Helm / Kustomize"],
  },
  ci: {
    title: "CI Pipeline",
    desc: "CI buduje obraz i wypycha do rejestru. W modelu GitOps CI może też automatycznie aktualizować tag obrazu w repo (np. zmiana image.tag w values.yaml i commit). ArgoCD Image Updater może to robić automatycznie bez ingerencji CI.",
    tags: ["docker build", "docker push", "values.yaml update", "Semantic versioning"],
  },
  registry: {
    title: "Container Registry",
    desc: "Rejestr przechowuje niezmienne obrazy. ArgoCD App Controller nie pobiera obrazów bezpośrednio — robi to kubelet na nodach. ArgoCD jedynie weryfikuje czy żądany tag istnieje. Zalecane: używać digest SHA256 zamiast tagów dla deterministycznych deploymentów.",
    tags: ["Immutable images", "SHA256 digest", "ECR / GCR / ACR", "Harbor"],
  },
  argoui: {
    title: "ArgoCD Web UI / CLI",
    desc: "Web UI dostępne na porcie 443 (argocd-server). Pokazuje drzewo zasobów aplikacji, status sync, logi, diff między stanem Git a klastrem. CLI (argocd) używane w CI/CD do triggerowania sync, tworzenia aplikacji, zarządzania sekretami przez argocd-vault-plugin.",
    tags: ["Port 443", "Resource tree", "Live diff", "argocd CLI"],
  },
  dex: {
    title: "Dex (SSO Broker)",
    desc: "Dex to OpenID Connect provider wbudowany w ArgoCD działający jako broker tożsamości. Federuje się z zewnętrznymi dostawcami: GitHub OAuth, Google, LDAP/AD, SAML 2.0. Użytkownik loguje się przez firmowe SSO, Dex wydaje token OIDC dla API Servera ArgoCD.",
    tags: ["OIDC broker", "GitHub OAuth", "LDAP / AD", "SAML 2.0"],
  },
  apiserver: {
    title: "ArgoCD API Server",
    desc: "Bezstanowy serwer REST/gRPC obsługujący Web UI, CLI i zewnętrzne systemy CI. Zarządza: autentykacją (weryfikuje tokeny z Dex), RBAC (Projects, AppProject CRD), zarządzaniem sekretami repozytoriów i klastrów. Może być skalowany poziomo.",
    tags: ["REST / gRPC", "RBAC", "AppProject CRD", "Horizontally scalable"],
  },
  reposerver: {
    title: "Repo Server",
    desc: "Bezstanowy serwer klonujący repozytoria Git i generujący manifesty K8s. Obsługuje: Helm (helm template), Kustomize, Jsonnet, plain YAML, custom plugins (argocd-vault-plugin do wstrzykiwania sekretów z Vault). Wyniki są cache'owane w Redis. Może być skalowany poziomo.",
    tags: ["helm template", "Kustomize", "argocd-vault-plugin", "Git clone cache"],
  },
  redis: {
    title: "Redis Cache",
    desc: "Cache przechowujący przetworzone manifesty i stan aplikacji. Bez Redis każde zapytanie do UI wymagałoby pełnego re-renderowania manifestów z Gita. W trybie HA (High Availability) ArgoCD używa Redis Sentinel lub Redis Cluster. Nie przechowuje danych krytycznych — można zresetować.",
    tags: ["Manifest cache", "App state cache", "Redis Sentinel (HA)", "Non-critical data"],
  },
  appcontroller: {
    title: "Application Controller",
    desc: "StatefulSet — serce ArgoCD. Jeden lub więcej shardów (dla dużych instalacji). Każdy shard zarządza podzbiorem klastrów. W pętli reconciliation porównuje desired state (Git) z live state (K8s API). Wykrywa drift i przy auto-sync=true automatycznie stosuje zmiany. Triggeruje hooki (PreSync, Sync, PostSync).",
    tags: ["StatefulSet", "Sharding (HA)", "Drift detection", "Sync hooks"],
  },
  k8sapi: {
    title: "Kubernetes API Server",
    desc: "App Controller komunikuje się z API serwerem każdego klastra (może zarządzać wieloma klastrami jednocześnie!). Dane dostępowe do zewnętrznych klastrów przechowywane są w Secretach ArgoCD. Komunikacja przez ServiceAccount z minimalnym RBAC lub zewnętrzny kubeconfig.",
    tags: ["Multi-cluster", "kubeconfig", "ServiceAccount RBAC", "watch / informers"],
  },
  ns1: {
    title: "Namespace: prod",
    desc: "Produkcyjne środowisko aplikacji. ArgoCD Application wskazuje na konkretny namespace i klaster. Możliwy podział: jedna aplikacja = jeden namespace, lub App of Apps pattern dla zarządzania wieloma aplikacjami przez jedną 'parent' aplikację. Namespace może być tworzony automatycznie przez ArgoCD.",
    tags: ["Production", "App of Apps", "Auto-create namespace", "Health checks"],
  },
  ns2: {
    title: "Namespace: staging",
    desc: "Środowisko staging / testowe. Typowy pattern: oddzielna ArgoCD Application z innymi values (mniej replik, tańszy storage). ApplicationSet generuje automatycznie aplikacje dla wielu środowisk z jednego szablonu — eliminuje kopiowanie konfiguracji.",
    tags: ["Staging", "ApplicationSet", "Different values", "Environment parity"],
  },
};

const APP_STATES = [
  { label: "Synced", color: "#06d6a0", icon: "✅", desc: "Stan klastra = stan w Git" },
  { label: "OutOfSync", color: "#ffd166", icon: "⚠️", desc: "Wykryto drift — klaster różni się od Git" },
  { label: "Progressing", color: "#00b4d8", icon: "🔄", desc: "Sync w toku — zasoby są aktualizowane" },
  { label: "Degraded", color: "#e94560", icon: "❌", desc: "Aplikacja nie działa poprawnie (crashloop, etc.)" },
  { label: "Suspended", color: "#94a3b8", icon: "⏸️", desc: "Auto-sync wyłączony ręcznie" },
  { label: "Unknown", color: "#475569", icon: "❓", desc: "Brak danych o stanie aplikacji" },
];

const W = 1200;
const H = 560;
const NODE_W = 160;
const NODE_H = 70;

function getMidpoint(a, b) {
  return { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
}

function EdgeLine({ edge, tick }) {
  const from = NODES[edge.from];
  const to = NODES[edge.to];
  const fx = from.x + NODE_W / 2;
  const fy = from.y + NODE_H / 2;
  const tx = to.x + NODE_W / 2;
  const ty = to.y + NODE_H / 2;

  const mid = getMidpoint({ x: fx, y: fy }, { x: tx, y: ty });
  const dx = tx - fx;
  const dy = ty - fy;
  const len = Math.sqrt(dx * dx + dy * dy);
  const ux = dx / len;
  const uy = dy / len;

  // shorten ends so they don't overlap node
  const pad = 38;
  const x1 = fx + ux * pad;
  const y1 = fy + uy * pad;
  const x2 = tx - ux * pad;
  const y2 = ty - uy * pad;

  // dash offset for animation
  const dashOffset = edge.animated ? -(tick % 24) * 2 : 0;

  return (
    <g>
      <line
        x1={x1} y1={y1} x2={x2} y2={y2}
        stroke={edge.color}
        strokeWidth={edge.animated ? 1.5 : 1}
        strokeOpacity={edge.animated ? 0.7 : 0.3}
        strokeDasharray={edge.animated ? "8 6" : "none"}
        strokeDashoffset={dashOffset}
        markerEnd={`url(#arrow-${edge.color.replace("#", "")})`}
      />
      {edge.label && (
        <text
          x={mid.x} y={mid.y - 6}
          textAnchor="middle"
          fontSize="9"
          fill={edge.color}
          opacity="0.7"
          fontFamily="monospace"
        >
          {edge.label}
        </text>
      )}
    </g>
  );
}

function NodeBox({ node, selected, onClick }) {
  const isSelected = selected === node.id;
  return (
    <g
      transform={`translate(${node.x}, ${node.y})`}
      onClick={() => onClick(node.id)}
      style={{ cursor: "pointer" }}
    >
      <rect
        width={NODE_W} height={NODE_H}
        rx="8" ry="8"
        fill={isSelected ? `${node.color}22` : "rgba(13,21,32,0.95)"}
        stroke={isSelected ? node.color : `${node.color}55`}
        strokeWidth={isSelected ? 2 : 1}
        filter={isSelected ? `drop-shadow(0 0 8px ${node.color}66)` : "none"}
      />
      <text x="12" y="22" fontSize="18" fontFamily="monospace">{node.icon}</text>
      <text
        x="12" y="42"
        fontSize="11" fontWeight="700"
        fill={isSelected ? node.color : "#e2e8f0"}
        fontFamily="monospace"
      >
        {node.label}
      </text>
      <text
        x="12" y="57"
        fontSize="9"
        fill="#64748b"
        fontFamily="monospace"
      >
        {node.sub}
      </text>
    </g>
  );
}

export default function App() {
  const [selected, setSelected] = useState(null);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 80);
    return () => clearInterval(id);
  }, []);

  const detail = selected ? DETAILS[selected] : null;
  const node = selected ? NODES[selected] : null;

  // collect unique arrow colors for defs
  const arrowColors = [...new Set(EDGES.map(e => e.color))];

  return (
    <div style={{
      fontFamily: "'JetBrains Mono', 'Courier New', monospace",
      background: "linear-gradient(135deg, #0a0a1a 0%, #0d1b2a 50%, #0a0a1a 100%)",
      minHeight: "100vh",
      padding: "24px",
      color: "#e2e8f0",
    }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <div style={{
          display: "inline-block",
          background: "linear-gradient(90deg, #f97316, #ffd166)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          fontSize: 24,
          fontWeight: 900,
          letterSpacing: 3,
          marginBottom: 4,
        }}>
          ARGOCD — GITOPS ARCHITECTURE
        </div>
        <div style={{ color: "#64748b", fontSize: 11, letterSpacing: 2 }}>
          KLIKNIJ węzeł aby zobaczyć szczegóły
        </div>
      </div>

      <div style={{ display: "flex", gap: 20, alignItems: "flex-start", maxWidth: 1400, margin: "0 auto" }}>

        {/* GRAPH */}
        <div style={{
          flex: 1,
          background: "rgba(255,255,255,0.02)",
          border: "1px solid #1e293b",
          borderRadius: 12,
          overflow: "hidden",
        }}>
          <svg
            viewBox={`0 0 ${W} ${H}`}
            width="100%"
            style={{ display: "block" }}
          >
            <defs>
              {arrowColors.map(color => (
                <marker
                  key={color}
                  id={`arrow-${color.replace("#", "")}`}
                  markerWidth="8" markerHeight="8"
                  refX="6" refY="3"
                  orient="auto"
                >
                  <path d="M0,0 L0,6 L8,3 z" fill={color} opacity="0.7" />
                </marker>
              ))}
            </defs>

            {/* Background zone labels */}
            {/* Developer zone */}
            <rect x="10" y="10" width="870" height="130" rx="8"
              fill="none" stroke="#e9456022" strokeWidth="1" strokeDasharray="4 4" />
            <text x="20" y="26" fontSize="9" fill="#e9456044" fontFamily="monospace" letterSpacing="2">
              DEVELOPER WORKFLOW
            </text>

            {/* ArgoCD zone */}
            <rect x="10" y="210" width="870" height="270" rx="8"
              fill="#f9731608" stroke="#f9731633" strokeWidth="1" strokeDasharray="4 4" />
            <text x="20" y="228" fontSize="9" fill="#f9731688" fontFamily="monospace" letterSpacing="2">
              ARGOCD (namespace: argocd)
            </text>

            {/* K8s zone */}
            <rect x="900" y="210" width="290" height="270" rx="8"
              fill="#00b4d808" stroke="#00b4d833" strokeWidth="1" strokeDasharray="4 4" />
            <text x="910" y="228" fontSize="9" fill="#00b4d888" fontFamily="monospace" letterSpacing="2">
              KUBERNETES CLUSTER
            </text>

            {/* Edges */}
            {EDGES.map((edge, i) => (
              <EdgeLine key={i} edge={edge} tick={tick} />
            ))}

            {/* Nodes */}
            {Object.values(NODES).map(node => (
              <NodeBox
                key={node.id}
                node={node}
                selected={selected}
                onClick={(id) => setSelected(selected === id ? null : id)}
              />
            ))}
          </svg>

          {/* App states legend */}
          <div style={{
            borderTop: "1px solid #1e293b",
            padding: "12px 16px",
            display: "flex",
            gap: "16px",
            flexWrap: "wrap",
            alignItems: "center",
          }}>
            <div style={{ fontSize: 9, color: "#475569", letterSpacing: 2, marginRight: 4 }}>
              STATUSY APLIKACJI:
            </div>
            {APP_STATES.map(s => (
              <div key={s.label} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <span style={{ fontSize: 12 }}>{s.icon}</span>
                <span style={{ fontSize: 10, color: s.color, fontWeight: 700 }}>{s.label}</span>
                <span style={{ fontSize: 9, color: "#475569" }}>— {s.desc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div style={{ width: 280, flexShrink: 0 }}>
          {detail ? (
            <div style={{
              background: "rgba(15,52,96,0.6)",
              border: `1px solid ${node.color}44`,
              borderTop: `3px solid ${node.color}`,
              borderRadius: 10,
              padding: 18,
              animation: "fadeIn 0.2s ease",
            }}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>{node.icon}</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: node.color, marginBottom: 10 }}>
                {detail.title}
              </div>
              <div style={{ fontSize: 12, color: "#94a3b8", lineHeight: 1.7, marginBottom: 14 }}>
                {detail.desc}
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {detail.tags.map(tag => (
                  <span key={tag} style={{
                    background: `${node.color}18`,
                    border: `1px solid ${node.color}44`,
                    borderRadius: 4,
                    padding: "2px 8px",
                    fontSize: 10,
                    color: node.color,
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
                Kliknij węzeł na grafie aby zobaczyć szczegółowy opis komponentu
              </div>
            </div>
          )}

          {/* Sync flow */}
          <div style={{
            marginTop: 16,
            background: "rgba(249,115,22,0.05)",
            border: "1px solid rgba(249,115,22,0.2)",
            borderRadius: 10,
            padding: 14,
          }}>
            <div style={{ fontSize: 10, letterSpacing: 2, color: "#f97316", marginBottom: 10 }}>
              🔄 RECONCILIATION LOOP
            </div>
            {[
              { step: "1", text: "App Controller pobiera desired state z Redis (cache Git)", color: "#f97316" },
              { step: "2", text: "Odpytuje K8s API o live state zasobów", color: "#00b4d8" },
              { step: "3", text: "Porównuje — jeśli różnica → OutOfSync", color: "#ffd166" },
              { step: "4", text: "Jeśli auto-sync=true: generuje patch i wysyła do K8s API", color: "#06d6a0" },
              { step: "5", text: "Monitoruje Health checks → Synced lub Degraded", color: "#06d6a0" },
            ].map(s => (
              <div key={s.step} style={{ display: "flex", gap: 10, marginBottom: 8, alignItems: "flex-start" }}>
                <div style={{
                  width: 18, height: 18, borderRadius: "50%",
                  background: `${s.color}22`, border: `1px solid ${s.color}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 9, color: s.color, flexShrink: 0, fontWeight: 700,
                }}>
                  {s.step}
                </div>
                <div style={{ fontSize: 10, color: "#94a3b8", lineHeight: 1.5 }}>{s.text}</div>
              </div>
            ))}
          </div>

          {/* Key commands */}
          <div style={{
            marginTop: 16,
            background: "rgba(255,255,255,0.02)",
            border: "1px solid #1e293b",
            borderRadius: 10,
            padding: 14,
          }}>
            <div style={{ fontSize: 10, letterSpacing: 2, color: "#475569", marginBottom: 10 }}>
              KOMENDY ARGOCD CLI
            </div>
            {[
              { cmd: "argocd app list", color: "#f97316" },
              { cmd: "argocd app get <app>", color: "#f97316" },
              { cmd: "argocd app sync <app>", color: "#06d6a0" },
              { cmd: "argocd app rollback <app>", color: "#ffd166" },
              { cmd: "argocd app diff <app>", color: "#00b4d8" },
              { cmd: "argocd app logs <app>", color: "#00b4d8" },
            ].map(c => (
              <div key={c.cmd} style={{
                fontSize: 10, color: c.color,
                padding: "4px 0", borderBottom: "1px solid #1e293b",
              }}>
                $ {c.cmd}
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-4px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
