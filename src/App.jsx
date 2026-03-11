import { useState } from "react";

const data = {
  layers: [
    {
      id: "developer",
      label: "DEWELOPER / ZESPÓŁ",
      color: "#1a1a2e",
      accent: "#e94560",
      items: [
        { id: "dev1", icon: "💻", label: "Kod aplikacji", sub: "Dockerfile • .dockerignore • src/" },
        { id: "dev2", icon: "📦", label: "Helm Chart", sub: "Chart.yaml • values.yaml • templates/" },
        { id: "dev3", icon: "🔀", label: "Git Repository", sub: "GitHub • GitLab • Bitbucket" },
        { id: "dev4", icon: "🏗️", label: "CI Pipeline", sub: "GitHub Actions • GitLab CI • Jenkins" },
      ],
    },
    {
      id: "registry",
      label: "ARTEFAKTY — OBRAZY & CHARTY",
      color: "#16213e",
      accent: "#a78bfa",
      items: [
        { id: "reg1", icon: "🐳", label: "Container Registry", sub: "Docker Hub • ECR • ACR • GCR" },
        { id: "reg2", icon: "⛵", label: "Helm Chart Repository", sub: "Artifact Hub • Harbor • OCI registry" },
        { id: "reg3", icon: "🔒", label: "Image Scanning", sub: "Trivy • Snyk • Grype • Cosign" },
      ],
    },
    {
      id: "argocd",
      label: "ARGOCD — GITOPS CONTROLLER",
      color: "#0f3460",
      accent: "#f97316",
      items: [
        { id: "argo1", icon: "🔄", label: "Application Controller", sub: "Reconciliation loop • Sync status" },
        { id: "argo2", icon: "📋", label: "Repo Server", sub: "Git clone • Helm template • Kustomize" },
        { id: "argo3", icon: "🌐", label: "API Server", sub: "Web UI • CLI • RBAC • SSO (OIDC)" },
        { id: "argo4", icon: "🔔", label: "Notifications", sub: "Slack • Email • PagerDuty • Webhooks" },
        { id: "argo5", icon: "🖼️", label: "Image Updater", sub: "Auto-update obrazów w Git • semver" },
      ],
    },
    {
      id: "helm",
      label: "HELM — PACKAGE MANAGER DLA K8S",
      color: "#1b2838",
      accent: "#06d6a0",
      items: [
        { id: "helm1", icon: "📜", label: "Chart Templates", sub: "Go templates • Values • Helpers" },
        { id: "helm2", icon: "⚙️", label: "Values Override", sub: "values.yaml • -f custom.yaml • --set" },
        { id: "helm3", icon: "🔢", label: "Release Management", sub: "helm install • upgrade • rollback" },
        { id: "helm4", icon: "🔗", label: "Chart Dependencies", sub: "Chart.lock • helm dependency update" },
      ],
    },
    {
      id: "k8s-control",
      label: "KUBERNETES — CONTROL PLANE",
      color: "#0d1b2a",
      accent: "#00b4d8",
      items: [
        { id: "k8s1", icon: "🖥️", label: "API Server", sub: "kube-apiserver • REST • admission webhooks" },
        { id: "k8s2", icon: "💾", label: "etcd", sub: "Distributed KV store • stan klastra" },
        { id: "k8s3", icon: "📅", label: "Scheduler", sub: "Przydzielanie podów do nodów" },
        { id: "k8s4", icon: "🔁", label: "Controller Manager", sub: "ReplicaSet • Deployment • Job • HPA" },
        { id: "k8s5", icon: "☁️", label: "Cloud Controller", sub: "LB • PersistentVolume • Node lifecycle" },
      ],
    },
    {
      id: "k8s-worker",
      label: "KUBERNETES — WORKER NODES",
      color: "#0a1628",
      accent: "#ffd166",
      items: [
        { id: "wk1", icon: "🤖", label: "kubelet", sub: "Uruchamia pody • CRI • health checks" },
        { id: "wk2", icon: "🌐", label: "kube-proxy", sub: "iptables / IPVS • Service networking" },
        { id: "wk3", icon: "📦", label: "Pod / Container", sub: "Aplikacja • sidecar • init container" },
        { id: "wk4", icon: "🗄️", label: "Persistent Volume", sub: "PVC • StorageClass • CSI driver" },
        { id: "wk5", icon: "🔌", label: "CNI Plugin", sub: "Calico • Cilium • Flannel • Weave" },
      ],
    },
  ],
};

const details = {
  dev1: {
    title: "Kod aplikacji",
    desc: "Deweloper pisze kod i Dockerfile definiujący obraz kontenera. Dobry Dockerfile używa multi-stage build — osobny etap do kompilacji, minimalny obraz końcowy (distroless/alpine). Zmiana kodu trafia do gita i triggeruje pipeline CI.",
    tags: ["Dockerfile", "Multi-stage build", "distroless", ".dockerignore"],
  },
  dev2: {
    title: "Helm Chart",
    desc: "Helm Chart to paczka plików YAML opisujących zasoby Kubernetes. Chart.yaml zawiera metadane, values.yaml domyślne wartości, a katalog templates/ szablony Go. Jeden chart może obsługiwać wiele środowisk przez podmianę values.",
    tags: ["Chart.yaml", "values.yaml", "templates/", "Go templates"],
  },
  dev3: {
    title: "Git Repository",
    desc: "W GitOps Git jest jedynym źródłem prawdy (single source of truth). Każda zmiana infrastruktury lub konfiguracji aplikacji przechodzi przez Pull Request z code review. ArgoCD obserwuje repo i synchronizuje klaster ze stanem w gicie.",
    tags: ["Single source of truth", "Pull Request", "Code review", "Audit log"],
  },
  dev4: {
    title: "CI Pipeline",
    desc: "Pipeline CI odpowiada za: uruchomienie testów, zbudowanie obrazu Docker (docker build), otagowanie wersją (git SHA lub semver), skanowanie bezpieczeństwa i wypchnięcie do rejestru. CI NIE deployuje — to rola ArgoCD (rozdzielenie CI od CD).",
    tags: ["docker build", "docker push", "Tests", "CI/CD separation"],
  },
  reg1: {
    title: "Container Registry",
    desc: "Rejestr obrazów kontenerów przechowuje zbudowane obrazy z tagami. Dobre praktyki: immutable tags (nigdy nie nadpisuj :latest w produkcji), używaj SHA256 digest jako referencji w ArgoCD dla deterministycznych deploymentów.",
    tags: ["Immutable tags", "SHA256 digest", "ECR", "Harbor"],
  },
  reg2: {
    title: "Helm Chart Repository",
    desc: "Repozytorium chartów Helm — klasycznie serwer HTTP z plikiem index.yaml, lub nowoczesnie przez OCI registry (ten sam co obrazy Docker). Artifact Hub to publiczny katalog chartów. Harbor łączy rejestr obrazów i chartów w jednym.",
    tags: ["OCI registry", "index.yaml", "Artifact Hub", "Harbor"],
  },
  reg3: {
    title: "Image Scanning & Signing",
    desc: "Przed deploymentem obrazy powinny być skanowane pod kątem podatności CVE. Trivy i Grype analizują warstwy obrazu. Cosign (projekt Sigstore) umożliwia podpisywanie obrazów — ArgoCD może weryfikować podpisy przed deployem.",
    tags: ["CVE scanning", "Trivy", "Cosign", "Supply chain security"],
  },
  argo1: {
    title: "Application Controller",
    desc: "Serce ArgoCD — kontroler uruchomiony jako StatefulSet, który w pętli porównuje żądany stan (git) z aktualnym stanem klastra. Gdy wykryje drift (różnicę), może automatycznie zsynchronizować (auto-sync) lub tylko poinformować. Działa przez Kubernetes informers.",
    tags: ["Reconciliation loop", "Drift detection", "Auto-sync", "Self-healing"],
  },
  argo2: {
    title: "Repo Server",
    desc: "Bezstanowy serwer odpowiedzialny za klonowanie repozytoriów Git i generowanie manifestów. Obsługuje: plain YAML, Helm (helm template), Kustomize, Jsonnet. Przetwarza templates po stronie ArgoCD — do klastra trafiają gotowe manifesty YAML.",
    tags: ["helm template", "Kustomize", "Jsonnet", "Git clone"],
  },
  argo3: {
    title: "API Server",
    desc: "Udostępnia REST/gRPC API dla Web UI i CLI (argocd). Obsługuje autentykację przez SSO (OIDC/SAML — Dex jako broker) i RBAC na poziomie aplikacji i projektu. Projects w ArgoCD izolują zespoły i ograniczają do których klastrów/namespace'ów mają dostęp.",
    tags: ["Web UI", "argocd CLI", "OIDC/SAML", "RBAC Projects"],
  },
  argo4: {
    title: "ArgoCD Notifications",
    desc: "Osobny kontroler wysyłający powiadomienia o zdarzeniach: sync started/failed/succeeded, degraded application, health changed. Konfigurowane przez ConfigMap z triggerami i szablonami. Obsługuje Slack, email, Teams, PagerDuty, webhooks.",
    tags: ["Triggers", "Templates", "Slack", "Webhooks"],
  },
  argo5: {
    title: "Argo CD Image Updater",
    desc: "Narzędzie które monitoruje rejestr obrazów i automatycznie aktualizuje tag obrazu w repozytorium Git (write-back). Obsługuje strategie: latest, semver, digest. Commituje zmiany bezpośrednio do gita lub przez annotations na Application.",
    tags: ["Auto image update", "semver strategy", "Git write-back", "Registry polling"],
  },
  helm1: {
    title: "Chart Templates",
    desc: "Szablony używają Go template syntax z funkcjami Sprig. Plik _helpers.tpl zawiera reużywalne fragmenty (named templates). Typowy chart zawiera szablony dla: Deployment, Service, Ingress, ConfigMap, ServiceAccount, HPA. Funkcja `helm template` renderuje szablony lokalnie bez instalowania.",
    tags: ["Go templates", "Sprig functions", "_helpers.tpl", "helm template"],
  },
  helm2: {
    title: "Values Override",
    desc: "Hierarchia wartości w Helm: domyślne values.yaml w charcie → -f prod-values.yaml → --set key=value (najwyższy priorytet). W ArgoCD values przekazuje się przez spec.source.helm.values lub valuesObject. Nigdy nie commituj sekretów w values — używaj Sealed Secrets lub External Secrets.",
    tags: ["values.yaml", "-f override", "--set", "ArgoCD valuesObject"],
  },
  helm3: {
    title: "Release Management",
    desc: "Helm przechowuje historię releases jako Secrets w namespace klastra. helm upgrade --install to idiomatyczne polecenie (install jeśli nie istnieje, upgrade jeśli istnieje). helm rollback <release> <revision> cofa do poprzedniej wersji. helm history pokazuje pełną historię.",
    tags: ["helm upgrade --install", "helm rollback", "helm history", "Release secrets"],
  },
  helm4: {
    title: "Chart Dependencies",
    desc: "Chart może zależeć od innych chartów (np. aplikacja + PostgreSQL + Redis). Zależności definiuje się w Chart.yaml pod kluczem dependencies. helm dependency update pobiera je do charts/ i tworzy Chart.lock z dokładnymi wersjami. W ArgoCD multiple sources pozwala łączyć charty.",
    tags: ["dependencies", "Chart.lock", "helm dep update", "Subchart"],
  },
  k8s1: {
    title: "kube-apiserver",
    desc: "Jedyny punkt wejścia do klastra — wszystko (kubectl, kontrolery, kubelet) komunikuje się wyłącznie przez API server. Każde żądanie przechodzi przez: autentykację → autoryzację (RBAC) → admission webhooks (mutating → validating) → zapis do etcd. API jest deklaratywne i RESTful.",
    tags: ["RESTful API", "RBAC", "Admission webhooks", "etcd"],
  },
  k8s2: {
    title: "etcd",
    desc: "Rozproszony key-value store będący jedynym miejscem przechowywania stanu klastra. Wszystkie obiekty K8s (Pods, Services, Secrets...) żyją w etcd. W produkcji etcd wymaga osobnego klastra (3 lub 5 nodów) z regularnymi backupami — utrata etcd = utrata klastra.",
    tags: ["Raft consensus", "Backup critical", "KV store", "TLS everywhere"],
  },
  k8s3: {
    title: "kube-scheduler",
    desc: "Scheduler obserwuje nowo utworzone Pody bez przypisanego noda i wybiera dla nich najlepszy node. Uwzględnia: resource requests/limits, node affinity/anti-affinity, taints i tolerations, pod topology spread constraints. Można użyć custom scheduler dla specjalnych wymagań.",
    tags: ["Resource requests", "Affinity rules", "Taints/Tolerations", "Topology spread"],
  },
  k8s4: {
    title: "Controller Manager",
    desc: "Zbiór kontrolerów działających jako jedna binarka. Każdy kontroler obserwuje określony typ zasobu i zapewnia że rzeczywisty stan = żądany stan. Deployment Controller zarządza ReplicaSetami, ReplicaSet Controller zarządza Podami, Job Controller uruchamia jednorazowe zadania.",
    tags: ["Deployment", "ReplicaSet", "StatefulSet", "HorizontalPodAutoscaler"],
  },
  k8s5: {
    title: "Cloud Controller Manager",
    desc: "Integruje Kubernetes z API konkretnego dostawcy chmury. Odpowiada za: tworzenie LoadBalancerów (Service type: LoadBalancer), zarządzanie PersistentVolumes przez CSI, aktualizację statusu nodów (Node lifecycle). Oddzielony od core K8s — każdy cloud provider dostarcza własny.",
    tags: ["LoadBalancer", "CSI volumes", "Node lifecycle", "Cloud API"],
  },
  wk1: {
    title: "kubelet",
    desc: "Agent działający na każdym nodzie, odpowiedzialny za uruchamianie Podów. Dostaje PodSpec od API servera i zleca uruchomienie kontenerów przez Container Runtime Interface (CRI) — containerd lub CRI-O. Regularnie raportuje stan nodów i Podów z powrotem do API servera.",
    tags: ["CRI", "containerd", "PodSpec", "Health probes"],
  },
  wk2: {
    title: "kube-proxy",
    desc: "Implementuje Kubernetes Services — zapewnia że ruch do ClusterIP trafia do właściwego Poda. Zarządza regułami iptables lub IPVS na każdym nodzie. W nowoczesnych instalacjach z Cilium kube-proxy często jest zastępowany przez eBPF dla lepszej wydajności.",
    tags: ["iptables", "IPVS", "ClusterIP", "NodePort"],
  },
  wk3: {
    title: "Pod / Container",
    desc: "Pod to najmniejsza jednostka w K8s — jeden lub więcej kontenerów współdzielących network namespace i volumes. Sidecar pattern: główny kontener + pomocnicze (log shipper, service mesh proxy — Envoy/Istio). Init containers uruchamiają się przed głównym kontenerem (np. migracje DB).",
    tags: ["Sidecar pattern", "Init containers", "Shared network", "Resource limits"],
  },
  wk4: {
    title: "Persistent Volume",
    desc: "PersistentVolumeClaim (PVC) to żądanie aplikacji na storage. StorageClass definiuje typ i parametry (np. SSD, replikacja). CSI (Container Storage Interface) to standardowy driver łączący K8s z systemami storage: AWS EBS, Azure Disk, Ceph, NFS. StatefulSets automatycznie tworzą PVC per Pod.",
    tags: ["PVC", "StorageClass", "CSI driver", "StatefulSet volumes"],
  },
  wk5: {
    title: "CNI Plugin",
    desc: "Container Network Interface definiuje jak Pody komunikują się ze sobą i ze światem zewnętrznym. Calico oferuje NetworkPolicy i routing BGP. Cilium używa eBPF dla wysokiej wydajności i zaawansowanych polityk sieciowych. Flannel to prosta opcja dla mniejszych klastrów.",
    tags: ["NetworkPolicy", "eBPF (Cilium)", "Pod CIDR", "Calico"],
  },
};

const gitopsFlow = [
  { icon: "👨‍💻", label: "git push\ndo repo", color: "#e94560" },
  { icon: "🏗️", label: "CI: build\n& push image", color: "#a78bfa" },
  { icon: "🔄", label: "ArgoCD\nwykrywa zmianę", color: "#f97316" },
  { icon: "⛵", label: "Helm template\nrenderuje YAML", color: "#06d6a0" },
  { icon: "✅", label: "kubectl apply\ndo klastra", color: "#00b4d8" },
  { icon: "📦", label: "Pody\nuruchomione", color: "#ffd166" },
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
          background: "linear-gradient(90deg, #00b4d8, #06d6a0, #f97316)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          fontSize: 26,
          fontWeight: 900,
          letterSpacing: 3,
          marginBottom: 4,
        }}>
          KUBERNETES · HELM · ARGOCD
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
                    {li === 0 && "git push → CI build → rejestr"}
                    {li === 1 && "ArgoCD pobiera obraz & chart"}
                    {li === 2 && "ArgoCD renderuje Helm templates"}
                    {li === 3 && "kubectl apply → API server"}
                    {li === 4 && "scheduler → kubelet → kontenery"}
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
              💡 GITOPS — KLUCZOWA ZASADA
            </div>
            <div style={{ fontSize: 11, color: "#94a3b8", lineHeight: 1.6 }}>
              <span style={{ color: "#06d6a0", fontWeight: 700 }}>Git</span> jest jedynym źródłem prawdy.
              Nikt nie robi <span style={{ color: "#e94560" }}>kubectl apply</span> ręcznie na produkcji.
              <br /><br />
              ArgoCD <span style={{ color: "#f97316", fontWeight: 700 }}>ciągle porównuje</span> stan klastra
              ze stanem w gicie i automatycznie naprawia drifty.
            </div>
          </div>

          {/* Przydatne komendy */}
          <div style={{
            marginTop: 16,
            background: "rgba(255,255,255,0.02)",
            border: "1px solid #1e293b",
            borderRadius: 10,
            padding: 14,
          }}>
            <div style={{ fontSize: 10, letterSpacing: 2, color: "#475569", marginBottom: 10 }}>
              PRZYDATNE KOMENDY
            </div>
            {[
              { cmd: "argocd app sync <name>", color: "#f97316" },
              { cmd: "argocd app get <name>", color: "#f97316" },
              { cmd: "helm upgrade --install", color: "#06d6a0" },
              { cmd: "helm diff upgrade", color: "#06d6a0" },
              { cmd: "kubectl rollout status", color: "#00b4d8" },
              { cmd: "kubectl get events -w", color: "#00b4d8" },
            ].map((c) => (
              <div key={c.cmd} style={{
                fontSize: 10,
                color: c.color,
                fontFamily: "monospace",
                padding: "3px 0",
                borderBottom: "1px solid #1e293b",
              }}>
                $ {c.cmd}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* GitOps flow */}
      <div style={{
        maxWidth: 1200,
        margin: "20px auto 0",
        padding: "16px",
        background: "rgba(255,255,255,0.02)",
        borderRadius: 10,
        border: "1px solid #1e293b",
      }}>
        <div style={{ fontSize: 10, letterSpacing: 2, color: "#475569", marginBottom: 12 }}>
          GITOPS DEPLOYMENT FLOW — OD KODU DO PRODUKCJI
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
          {gitopsFlow.map((step, i) => (
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
              {i < gitopsFlow.length - 1 && (
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
