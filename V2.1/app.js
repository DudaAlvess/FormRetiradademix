const STORAGE_KEY = "retiradaMixApp.v1";
const AUTH_KEY = "retiradaMixApp.authUser";

// ============================================================
// CADASTRE OS ACESSOS AQUI
// Para cada setor/pessoa, preencha:
// - name: nome do setor ou responsavel que aparece nas aprovacoes
// - email: email usado na tela de login
// - password: senha usada na tela de login
//
// Exemplo para adicionar outro setor:
// { name: "Financeiro", email: "financeiro@empresa.com", password: "senha123" }
// ============================================================
const LOGIN_USERS = [
  { name: "Maria Eduarda Luciano Alves", email: "ti2@agorasoumae.com.br", password: "2303" },
  { name: "Natanael Paulo Paião Andrade", email: "natanael@agorasoumae.com.br", password: "fogo834652" },
  { name: "Compras", email: "compras@empresa.com", password: "1234" },
  { name: "Qualidade", email: "qualidade@empresa.com", password: "1234" },
  { name: "Diretoria", email: "diretoria@empresa.com", password: "1234" },
  { name: "Planejamento", email: "planejamento@empresa.com", password: "1234" },
  { name: "Comercial", email: "comercial@empresa.com", password: "1234" },
  { name: "Logistica", email: "logistica@empresa.com", password: "1234" }
];

const demoProducts = [
  {
    productId: "SKU-1001",
    name: "Embalagem Stand Up 250g",
    stockQuantity: 1240,
    unitOfMeasure: "UN",
    color: "Branco",
    season: "Verao",
    status: "Ativo",
    category: "Embalagem"
  },
  {
    productId: "SKU-2040",
    name: "Tampa dosadora 38mm",
    stockQuantity: 820,
    unitOfMeasure: "UN",
    color: "Transparente",
    season: "Inverno",
    status: "Ativo",
    category: "Componente"
  },
  {
    productId: "SKU-3315",
    name: "Rotulo termoencolhivel 500ml",
    stockQuantity: 430,
    unitOfMeasure: "UN",
    color: "Azul",
    season: "Verao",
    status: "Em desenvolvimento",
    category: "Rotulo"
  },
  {
    productId: "SKU-8821",
    name: "Caixa master 12 unidades",
    stockQuantity: 96,
    unitOfMeasure: "CX",
    color: "Pardo",
    season: "Inverno",
    status: "Inativo",
    category: "Embalagem"
  }
];

const demoMaterials = [
  {
    materialId: "MP-EST-001",
    name: "Estampa Floral Areia",
    stockQuantity: 320,
    unitOfMeasure: "M",
    supplier: "Estamparia SP",
    monthlyConsumption: 78
  },
  {
    materialId: "MP-TEC-112",
    name: "Malha canelada off white",
    stockQuantity: 540,
    unitOfMeasure: "KG",
    supplier: "Têxtil Sul",
    monthlyConsumption: 120
  },
  {
    materialId: "MP-AVI-040",
    name: "Elastico amamentacao 12mm",
    stockQuantity: 1800,
    unitOfMeasure: "M",
    supplier: "Aviamentos Prime",
    monthlyConsumption: 260
  }
];

const demoRequests = [
  {
    id: "SOL-0001",
    createdAt: "2026-06-01",
    creator: "Maria",
    productId: "SKU-1001",
    reason: "Substituicao por nova embalagem homologada.",
    status: "Em Analise",
    approvers: [
      { name: "Maria", status: "Aprovado", date: "2026-06-01" },
      { name: "Compras", status: "Pendente", date: "" },
      { name: "Qualidade", status: "Pendente", date: "" }
    ],
    fields: {
      stockDisposalPlan: "Consumir estoque atual nos pedidos ja programados.",
      consumeInRef: "Pedidos de junho",
      refToConsume: "Carteira 06/2026",
      quantityToConsume: 900,
      surplusValue: 440,
      ocOpen: "Sim",
      ocNumber: "OC-78421",
      ocValue: 12800
    }
  },
  {
    id: "SOL-0002",
    createdAt: "2026-05-29",
    creator: "Planejamento",
    productId: "SKU-2040",
    reason: "Item duplicado no mix apos padronizacao de tampa.",
    status: "Aprovado",
    approvers: [
      { name: "Planejamento", status: "Aprovado", date: "2026-05-29" },
      { name: "Compras", status: "Aprovado", date: "2026-05-30" },
      { name: "Diretoria", status: "Aprovado", date: "2026-05-30" }
    ],
    fields: {
      stockDisposalPlan: "Enviar saldo para consumo controlado na linha B.",
      consumeInRef: "Producao regular",
      refToConsume: "Linha B",
      quantityToConsume: 820,
      surplusValue: 0,
      ocOpen: "Nao",
      ocNumber: "",
      ocValue: 0
    }
  },
  {
    id: "SOL-0003",
    createdAt: "2026-05-25",
    creator: "Comercial",
    productId: "SKU-8821",
    reason: "Retirada solicitada sem plano de consumo confirmado.",
    status: "Reprovado",
    approvers: [
      { name: "Comercial", status: "Aprovado", date: "2026-05-25" },
      { name: "Logistica", status: "Reprovado", date: "2026-05-26" }
    ],
    fields: {
      stockDisposalPlan: "Pendente de revisao.",
      consumeInRef: "",
      refToConsume: "",
      quantityToConsume: 0,
      surplusValue: 96,
      ocOpen: "Nao",
      ocNumber: "",
      ocValue: 0
    }
  }
];

let state = loadState();
let draftApprovers = [];

const routeTitles = {
  dashboard: "Dashboard",
  mix: "Mix de produtos",
  materias: "Mix de materia-prima",
  nova: "Criar solicitacao",
  abertas: "Solicitacoes em aberto",
  concluidas: "Solicitacoes concluidas"
};

const els = {
  pageTitle: document.getElementById("pageTitle"),
  navItems: [...document.querySelectorAll(".nav-item")],
  views: [...document.querySelectorAll(".view")],
  currentUser: document.getElementById("currentUser"),
  metricGrid: document.getElementById("metricGrid"),
  statusChart: document.getElementById("statusChart"),
  approvalQueue: document.getElementById("approvalQueue"),
  recentRows: document.getElementById("recentRows"),
  productRows: document.getElementById("productRows"),
  productForm: document.getElementById("productForm"),
  productSearch: document.getElementById("productSearch"),
  csvInput: document.getElementById("csvInput"),
  exportCsv: document.getElementById("exportCsv"),
  materialRows: document.getElementById("materialRows"),
  materialForm: document.getElementById("materialForm"),
  materialSearch: document.getElementById("materialSearch"),
  materialCsvInput: document.getElementById("materialCsvInput"),
  exportMaterialCsv: document.getElementById("exportMaterialCsv"),
  requestForm: document.getElementById("requestForm"),
  requestProduct: document.getElementById("requestProduct"),
  loginScreen: document.getElementById("loginScreen"),
  loginForm: document.getElementById("loginForm"),
  loginEmail: document.getElementById("loginEmail"),
  loginPassword: document.getElementById("loginPassword"),
  loginError: document.getElementById("loginError"),
  loginLogo: document.getElementById("loginLogo"),
  logoutButton: document.getElementById("logoutButton"),
  approverSelect: document.getElementById("approverSelect"),
  addApprover: document.getElementById("addApprover"),
  approverList: document.getElementById("approverList"),
  openCards: document.getElementById("openCards"),
  openSearch: document.getElementById("openSearch"),
  doneRows: document.getElementById("doneRows"),
  doneSearch: document.getElementById("doneSearch"),
  documentDialog: document.getElementById("documentDialog"),
  declarationPreview: document.getElementById("declarationPreview"),
  closeDialog: document.getElementById("closeDialog"),
  printDeclaration: document.getElementById("printDeclaration"),
  resetDemo: document.getElementById("resetDemo"),
  goCreate: document.getElementById("goCreate"),
  startTour: document.getElementById("startTour"),
  tourOverlay: document.getElementById("tourOverlay"),
  tourProgress: document.getElementById("tourProgress"),
  tourTitle: document.getElementById("tourTitle"),
  tourText: document.getElementById("tourText"),
  tourClose: document.getElementById("tourClose"),
  tourPrev: document.getElementById("tourPrev"),
  tourNext: document.getElementById("tourNext"),
  toast: document.getElementById("toast")
};

init();

function init() {
  bindEvents();
  hydrateCurrentUser();
  renderApproverOptions();
  renderAll();
  renderDraftApprovers();
  applyAuthState();
  routeTo(location.hash.replace("#", "") || "dashboard");
}

function bindEvents() {
  els.navItems.forEach((item) => {
    item.addEventListener("click", () => routeTo(item.dataset.route));
  });

  els.goCreate.addEventListener("click", () => routeTo("nova"));
  els.loginForm.addEventListener("submit", handleLogin);
  els.logoutButton.addEventListener("click", handleLogout);
  els.loginLogo.addEventListener("error", () => els.loginLogo.classList.add("is-missing"));
  els.loginLogo.addEventListener("load", () => els.loginLogo.classList.remove("is-missing"));

  els.resetDemo.addEventListener("click", () => {
    state = createDemoState();
    saveState();
    hydrateCurrentUser();
    renderAll();
    toast("Dados de demonstracao restaurados.");
  });

  els.currentUser.addEventListener("change", () => {
    const authUser = getAuthUser();
    if (authUser) {
      els.currentUser.value = authUser.name;
      return;
    }
    localStorage.setItem("retiradaMixApp.currentUser", els.currentUser.value);
    renderOpenRequests();
    renderDashboard();
  });

  els.productForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const product = Object.fromEntries(form.entries());
    product.productId = product.productId.trim();
    product.name = product.name.trim();
    product.stockQuantity = Number(product.stockQuantity || 0);

    if (state.products.some((item) => item.productId === product.productId)) {
      toast("Ja existe um produto com esse codigo.");
      return;
    }

    state.products.push(product);
    saveState();
    event.currentTarget.reset();
    renderAll();
    toast("Produto adicionado ao mix.");
  });

  els.productSearch.addEventListener("input", renderProducts);
  els.materialSearch.addEventListener("input", renderMaterials);
  els.openSearch.addEventListener("input", renderOpenRequests);
  els.doneSearch.addEventListener("input", renderCompletedRequests);
  els.csvInput.addEventListener("change", importMixFile);
  els.exportCsv.addEventListener("click", exportCsv);
  els.materialCsvInput.addEventListener("change", importMaterialFile);
  els.exportMaterialCsv.addEventListener("click", exportMaterialCsv);
  els.addApprover.addEventListener("click", addDraftApprover);
  els.approverSelect.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      addDraftApprover();
    }
  });
  els.approverList.addEventListener("click", (event) => {
    const button = event.target.closest("[data-remove-approver]");
    if (!button) return;
    draftApprovers = draftApprovers.filter((name) => name !== button.dataset.removeApprover);
    renderApproverOptions();
    renderDraftApprovers();
  });

  els.requestForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget).entries());
    const approverNames = uniqueNames([data.creator, ...draftApprovers]);
    if (!data.creator.trim()) {
      toast("Informe o solicitante.");
      return;
    }
    if (approverNames.length < 2) {
      toast("Adicione pelo menos um responsavel alem do solicitante.");
      return;
    }
    const request = {
      id: nextRequestId(),
      createdAt: today(),
      creator: data.creator.trim(),
      productId: data.productId,
      reason: data.reason.trim(),
      status: "Aberto",
      approvers: approverNames.map((name) => ({ name, status: "Pendente", date: "" })),
      fields: {
        stockDisposalPlan: data.stockDisposalPlan.trim(),
        consumeInRef: data.consumeInRef.trim(),
        refToConsume: data.refToConsume.trim(),
        quantityToConsume: Number(data.quantityToConsume || 0),
        surplusValue: Number(data.surplusValue || 0),
        ocOpen: data.ocOpen,
        ocNumber: data.ocNumber.trim(),
        ocValue: Number(data.ocValue || 0)
      }
    };

    state.requests.unshift(request);
    saveState();
    hydrateCurrentUser();
    renderAll();
    event.currentTarget.reset();
    draftApprovers = [];
    renderApproverOptions();
    renderDraftApprovers();
    toast("Solicitacao criada. Ela entrou na fila de aprovacoes.");
    routeTo("abertas");
  });

  els.closeDialog.addEventListener("click", () => els.documentDialog.close());
  els.printDeclaration.addEventListener("click", () => window.print());
  els.startTour.addEventListener("click", startTour);
  els.tourClose.addEventListener("click", closeTour);
  els.tourPrev.addEventListener("click", previousTourStep);
  els.tourNext.addEventListener("click", nextTourStep);

  els.materialForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const material = Object.fromEntries(form.entries());
    material.materialId = material.materialId.trim();
    material.name = material.name.trim();
    material.stockQuantity = Number(material.stockQuantity || 0);
    material.monthlyConsumption = Number(material.monthlyConsumption || 0);

    if (state.materials.some((item) => item.materialId === material.materialId)) {
      toast("Ja existe uma materia-prima com esse codigo.");
      return;
    }

    state.materials.push(material);
    saveState();
    event.currentTarget.reset();
    renderMaterials();
    renderDashboard();
    toast("Materia-prima adicionada ao mix.");
  });
}

function handleLogin(event) {
  event.preventDefault();
  const email = els.loginEmail.value.trim().toLowerCase();
  const password = els.loginPassword.value;
  const user = LOGIN_USERS.find((item) => item.email.toLowerCase() === email && item.password === password);

  if (!user) {
    els.loginError.textContent = "Email ou senha invalidos.";
    return;
  }

  localStorage.setItem(AUTH_KEY, JSON.stringify({ name: user.name, email: user.email }));
  els.loginForm.reset();
  els.loginError.textContent = "";
  applyAuthState();
  renderApproverOptions();
  renderAll();
  toast(`Bem-vindo, ${user.name}.`);
}

function handleLogout() {
  localStorage.removeItem(AUTH_KEY);
  els.currentUser.disabled = false;
  applyAuthState();
}

function getAuthUser() {
  try {
    return JSON.parse(localStorage.getItem(AUTH_KEY) || "null");
  } catch {
    return null;
  }
}

function applyAuthState() {
  const authUser = getAuthUser();
  document.body.classList.toggle("is-authenticated", Boolean(authUser));

  if (!authUser) {
    window.setTimeout(() => els.loginEmail.focus(), 50);
    return;
  }

  hydrateCurrentUser();
  els.currentUser.value = authUser.name;
  els.currentUser.disabled = true;
  const creatorInput = els.requestForm.querySelector("[name='creator']");
  if (creatorInput && !creatorInput.value) creatorInput.value = authUser.name;
  localStorage.setItem("retiradaMixApp.currentUser", authUser.name);
  renderApproverOptions();
  renderOpenRequests();
  renderDashboard();
}

function addDraftApprover() {
  const name = els.approverSelect.value.trim();
  if (!name) {
    toast("Selecione um responsavel cadastrado.");
    return;
  }
  if (draftApprovers.some((item) => normalize(item) === normalize(name))) {
    toast("Esse responsavel ja esta na lista.");
    els.approverSelect.value = "";
    return;
  }
  draftApprovers.push(name);
  els.approverSelect.value = "";
  renderApproverOptions();
  renderDraftApprovers();
}

function renderApproverOptions() {
  const selected = new Set(draftApprovers.map((name) => normalize(name)));
  const users = LOGIN_USERS
    .filter((user) => !selected.has(normalize(user.name)));

  els.approverSelect.innerHTML = [
    `<option value="">Selecione um login cadastrado</option>`,
    ...users.map((user) => `<option value="${escapeAttr(user.name)}">${escapeHtml(user.name)} - ${escapeHtml(user.email)}</option>`)
  ].join("");
}

function renderDraftApprovers() {
  els.approverList.innerHTML = draftApprovers.length
    ? draftApprovers.map((name) => `
      <div class="approver-chip">
        <span>${escapeHtml(name)}${approverEmailText(name)}</span>
        <button class="remove-approver" data-remove-approver="${escapeAttr(name)}" type="button" title="Remover ${escapeAttr(name)}">
          <span class="icon icon-close" aria-hidden="true"></span>
        </button>
      </div>
    `).join("")
    : `<div class="approver-empty">Selecione os logins responsaveis pela aprovacao</div>`;
}

function approverEmailText(name) {
  const user = LOGIN_USERS.find((item) => normalize(item.name) === normalize(name));
  return user ? ` <small>${escapeHtml(user.email)}</small>` : "";
}

function loadState() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return createDemoState();

  try {
    const parsed = JSON.parse(stored);
    if (!Array.isArray(parsed.products) || !Array.isArray(parsed.requests)) {
      return createDemoState();
    }
    return parsed;
  } catch {
    return createDemoState();
  }
}

function createDemoState() {
  return {
    products: structuredClone(demoProducts),
    requests: structuredClone(demoRequests)
  };
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function routeTo(route) {
  const nextRoute = routeTitles[route] ? route : "dashboard";
  history.replaceState(null, "", "#" + nextRoute);
  els.pageTitle.textContent = routeTitles[nextRoute];
  els.navItems.forEach((item) => item.classList.toggle("active", item.dataset.route === nextRoute));
  els.views.forEach((view) => view.classList.toggle("active", view.id === `view-${nextRoute}`));
}

function renderAll() {
  renderDashboard();
  renderProducts();
  renderProductOptions();
  renderOpenRequests();
  renderCompletedRequests();
}

function hydrateCurrentUser() {
  const authUser = getAuthUser();
  const names = uniqueNames([
    "Maria",
    "Compras",
    "Qualidade",
    "Diretoria",
    "Planejamento",
    "Comercial",
    "Logistica",
    ...LOGIN_USERS.map((user) => user.name),
    ...state.requests.flatMap((request) => [request.creator, ...request.approvers.map((item) => item.name)])
  ]);
  const selected = authUser?.name || localStorage.getItem("retiradaMixApp.currentUser") || names[0] || "";
  els.currentUser.innerHTML = names.map((name) => `<option>${escapeHtml(name)}</option>`).join("");
  els.currentUser.value = names.includes(selected) ? selected : names[0];
  els.currentUser.disabled = Boolean(authUser);
}

function renderDashboard() {
  const open = state.requests.filter((request) => ["Aberto", "Em Analise"].includes(request.status)).length;
  const approved = state.requests.filter((request) => request.status === "Aprovado").length;
  const rejected = state.requests.filter((request) => request.status === "Reprovado").length;
  const completed = approved + rejected;
  const pendingApprovals = state.requests
    .flatMap((request) => request.approvers.filter((item) => item.status === "Pendente"))
    .length;

  const metrics = [
    { label: "Solicitacoes em aberto", value: open, note: `${pendingApprovals} aprovacao(oes) pendente(s)` },
    { label: "Solicitacoes concluidas", value: completed, note: `${approved} aprovada(s)` },
    { label: "Solicitacoes reprovadas", value: rejected, note: "Historico de recusas" },
    { label: "SKUs cadastrados", value: state.products.length, note: "Itens no mix atual" }
  ];

  els.metricGrid.innerHTML = metrics
    .map((metric) => `
      <article class="metric">
        <span>${metric.label}</span>
        <strong>${metric.value}</strong>
        <em>${metric.note}</em>
      </article>
    `)
    .join("");

  drawStatusChart({ open, completed, rejected, skus: state.products.length });
  renderApprovalQueue();
  renderRecentRows();
}

function drawStatusChart(values) {
  const canvas = els.statusChart;
  const ctx = canvas.getContext("2d");
  const width = canvas.width;
  const height = canvas.height;
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "#fffdfb";
  ctx.fillRect(0, 0, width, height);

  const items = [
    ["Em aberto", values.open, "#8d8178"],
    ["Concluidas", values.completed, "#806f54"],
    ["Reprovadas", values.rejected, "#a64b50"],
    ["SKUs", values.skus, "#c26e60"]
  ];
  const max = Math.max(1, ...items.map((item) => item[1]));
  const chartLeft = 54;
  const chartTop = 26;
  const chartBottom = 244;
  const chartWidth = width - chartLeft - 36;
  const barWidth = chartWidth / items.length - 28;

  ctx.strokeStyle = "#d8d2cb";
  ctx.lineWidth = 1;
  for (let i = 0; i <= 4; i++) {
    const y = chartBottom - ((chartBottom - chartTop) / 4) * i;
    ctx.beginPath();
    ctx.moveTo(chartLeft, y);
    ctx.lineTo(width - 24, y);
    ctx.stroke();
  }

  ctx.font = "13px Segoe UI, Arial";
  ctx.textAlign = "center";
  items.forEach(([label, value, color], index) => {
    const x = chartLeft + 20 + index * (barWidth + 28) + barWidth / 2;
    const barHeight = ((chartBottom - chartTop) * value) / max;
    const y = chartBottom - barHeight;
    ctx.fillStyle = color;
    ctx.fillRect(x - barWidth / 2, y, barWidth, barHeight);
    ctx.fillStyle = "#3a2f2c";
    ctx.font = "700 20px Segoe UI, Arial";
    ctx.fillText(value, x, y - 10);
    ctx.font = "13px Segoe UI, Arial";
    ctx.fillText(label, x, chartBottom + 26);
  });
}

function renderApprovalQueue() {
  const user = els.currentUser.value;
  const queue = state.requests
    .filter((request) => ["Aberto", "Em Analise"].includes(request.status))
    .filter((request) => request.approvers.some((item) => item.name === user && item.status === "Pendente"))
    .slice(0, 5);

  els.approvalQueue.innerHTML = queue.length
    ? queue.map((request) => {
        const product = findProduct(request.productId);
        return `
          <article class="queue-item">
            <strong>${escapeHtml(request.id)} - ${escapeHtml(product.name)}</strong>
            <span>${escapeHtml(user)} precisa aprovar esta solicitacao.</span>
          </article>
        `;
      }).join("")
    : `<p class="empty">Nenhuma aprovacao pendente para o usuario selecionado.</p>`;
}

function renderRecentRows() {
  const rows = [...state.requests]
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .slice(0, 6);

  els.recentRows.innerHTML = rows.map((request) => {
    const product = findProduct(request.productId);
    return `
      <tr>
        <td>${escapeHtml(request.id)}</td>
        <td>${escapeHtml(product.name)}</td>
        <td>${escapeHtml(request.creator)}</td>
        <td>${statusPill(request.status)}</td>
        <td>${formatDate(request.createdAt)}</td>
      </tr>
    `;
  }).join("");
}

function renderProducts() {
  const query = normalize(els.productSearch.value);
  const products = state.products.filter((product) => {
    const haystack = normalize(`${product.productId} ${product.name} ${product.color} ${product.category}`);
    return haystack.includes(query);
  });

  els.productRows.innerHTML = products.map((product) => `
    <tr>
      <td>${escapeHtml(product.productId)}</td>
      <td>${escapeHtml(product.name)}</td>
      <td>${number(product.stockQuantity)}</td>
      <td>${escapeHtml(product.unitOfMeasure)}</td>
      <td>${escapeHtml(product.color || "-")}</td>
      <td>${escapeHtml(product.season || "-")}</td>
      <td>${escapeHtml(product.status || "-")}</td>
      <td>${escapeHtml(product.category || "-")}</td>
    </tr>
  `).join("");
}

function renderProductOptions() {
  els.requestProduct.innerHTML = state.products.map((product) => `
    <option value="${escapeAttr(product.productId)}">${escapeHtml(product.productId)} - ${escapeHtml(product.name)}</option>
  `).join("");
}

function renderOpenRequests() {
  const query = normalize(els.openSearch.value);
  const openRequests = state.requests
    .filter((request) => ["Aberto", "Em Analise"].includes(request.status))
    .filter((request) => requestMatches(request, query));

  els.openCards.innerHTML = openRequests.length
    ? openRequests.map(openRequestCard).join("")
    : `<p class="empty">Nao ha solicitacoes em aberto com esse filtro.</p>`;

  els.openCards.querySelectorAll("[data-action]").forEach((button) => {
    button.addEventListener("click", () => handleRequestAction(button.dataset.action, button.dataset.id));
  });
}

function openRequestCard(request) {
  const product = findProduct(request.productId);
  const currentUserApproval = request.approvers.find((item) => item.name === els.currentUser.value);
  const canApprove = currentUserApproval && currentUserApproval.status === "Pendente";
  const approvedCount = request.approvers.filter((item) => item.status === "Aprovado").length;
  const statusClass = request.status === "Em Analise" ? "analysis" : "open";

  return `
    <article class="request-card ${statusClass}">
      <div class="card-title">
        <div>
          <strong>${escapeHtml(request.id)}</strong>
          <div>${escapeHtml(product.name)}</div>
        </div>
        ${statusPill(request.status)}
      </div>
      <div class="meta-list">
        <span>Produto Id: ${escapeHtml(request.productId)}</span>
        <span>Solicitante: ${escapeHtml(request.creator)}</span>
        <span>Criada em: ${formatDate(request.createdAt)}</span>
        <span>Aprovacoes: ${approvedCount}/${request.approvers.length}</span>
      </div>
      <p>${escapeHtml(request.reason)}</p>
      <div class="approval-list">
        ${request.approvers.map((approval) => `
          <div class="approval-row">
            <span>${escapeHtml(approval.name)}</span>
            ${statusPill(approval.status)}
          </div>
        `).join("")}
      </div>
      <div class="card-actions">
        <button class="secondary-button" data-action="doc" data-id="${escapeAttr(request.id)}" type="button">Ver declaracao</button>
        ${canApprove ? `<button class="primary-button" data-action="approve" data-id="${escapeAttr(request.id)}" type="button">Aprovar como ${escapeHtml(els.currentUser.value)}</button>` : ""}
        ${canApprove ? `<button class="ghost-button" data-action="reject" data-id="${escapeAttr(request.id)}" type="button">Reprovar</button>` : ""}
      </div>
    </article>
  `;
}

function renderCompletedRequests() {
  const query = normalize(els.doneSearch.value);
  const completed = state.requests
    .filter((request) => ["Aprovado", "Reprovado"].includes(request.status))
    .filter((request) => requestMatches(request, query));

  els.doneRows.innerHTML = completed.map((request) => {
    const product = findProduct(request.productId);
    const approvals = `${request.approvers.filter((item) => item.status === "Aprovado").length}/${request.approvers.length}`;
    return `
      <tr>
        <td>${escapeHtml(request.id)}</td>
        <td>${escapeHtml(product.name)}</td>
        <td>${escapeHtml(request.creator)}</td>
        <td>${statusPill(request.status)}</td>
        <td>${approvals}</td>
        <td>${formatDate(request.createdAt)}</td>
        <td><button class="secondary-button" data-action="doc" data-id="${escapeAttr(request.id)}" type="button">Abrir</button></td>
      </tr>
    `;
  }).join("");

  els.doneRows.querySelectorAll("[data-action='doc']").forEach((button) => {
    button.addEventListener("click", () => showDeclaration(button.dataset.id));
  });
}

function handleRequestAction(action, id) {
  if (action === "doc") {
    showDeclaration(id);
    return;
  }

  const request = state.requests.find((item) => item.id === id);
  if (!request) return;

  const approval = request.approvers.find((item) => item.name === els.currentUser.value);
  if (!approval || approval.status !== "Pendente") return;

  approval.status = action === "approve" ? "Aprovado" : "Reprovado";
  approval.date = today();

  if (action === "reject") {
    request.status = "Reprovado";
  } else if (request.approvers.every((item) => item.status === "Aprovado")) {
    request.status = "Aprovado";
  } else {
    request.status = "Em Analise";
  }

  saveState();
  renderAll();
  toast(action === "approve" ? "Aprovacao registrada." : "Solicitacao reprovada.");
}

function showDeclaration(id) {
  const request = state.requests.find((item) => item.id === id);
  if (!request) return;
  els.declarationPreview.innerHTML = renderDeclaration(request);
  els.documentDialog.showModal();
}

function renderDeclaration(request) {
  const product = findProduct(request.productId);
  const fields = request.fields;
  const rows = [
    ["Produto Id", request.productId],
    ["Quantidade em estoque", `${number(product.stockQuantity)} ${product.unitOfMeasure}`],
    ["Unidade de medida", product.unitOfMeasure],
    ["Cor", product.color || "-"],
    ["Estacao", product.season || "-"],
    ["Status", product.status || "-"],
    ["Categoria", product.category || "-"],
    ["Plano de descarte de estoque", fields.stockDisposalPlan],
    ["Consumo em referencia", fields.consumeInRef || "-"],
    ["Referencia para consumo", fields.refToConsume || "-"],
    ["Quantidade a ser consumida", number(fields.quantityToConsume)],
    ["Valor de sobra (surplus)", money(fields.surplusValue)],
    ["OC aberta", fields.ocOpen],
    ["Numero da OC", fields.ocNumber || "-"],
    ["Valor da OC", money(fields.ocValue)]
  ];

  return `
    <h2>Declaracao de Ciencia de Retirada de Mix</h2>
    <p>Eu, <strong>${escapeHtml(request.creator)}</strong>, declaro estar ciente e de acordo com o processo de retirada de mix referente ao Produto Id <strong>${escapeHtml(request.productId)}</strong>, conforme caracteristicas e condicoes descritas abaixo:</p>
    <dl>
      ${rows.map(([label, value]) => `<dt>${escapeHtml(label)}</dt><dd>${escapeHtml(String(value))}</dd>`).join("")}
    </dl>
    <h3>Assinaturas dos Responsaveis</h3>
    <div class="signature-grid">
      ${request.approvers.map((approval) => `
        <div class="signature">
          <strong>${escapeHtml(approval.name)}</strong><br>
          ${escapeHtml(approval.status)} ${approval.date ? `em ${formatDate(approval.date)}` : ""}
        </div>
      `).join("")}
    </div>
    <p><strong>Data da declaracao:</strong> ${formatDate(today())}</p>
  `;
}

async function importMixFile(event) {
  const file = event.target.files[0];
  if (!file) return;
  try {
    const imported = file.name.toLowerCase().endsWith(".xlsx")
      ? await parseXlsx(file)
      : await parseCsvFile(file);

    if (!imported.length) {
      toast("Arquivo sem linhas validas.");
      return;
    }
    const existing = new Set(state.products.map((product) => product.productId));
    const newProducts = imported.filter((product) => product.productId && !existing.has(product.productId));
    state.products.push(...newProducts);
    saveState();
    renderAll();
    toast(`${newProducts.length} produto(s) importado(s).`);
  } catch (error) {
    console.error(error);
    toast("Nao foi possivel importar o arquivo. Confira as colunas.");
  } finally {
    event.target.value = "";
  }
}

function parseCsvFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(parseCsv(String(reader.result || "")));
    reader.onerror = () => reject(reader.error);
    reader.readAsText(file, "utf-8");
  });
}

function importCsv(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    const imported = parseCsv(String(reader.result || ""));
    if (!imported.length) {
      toast("CSV sem linhas validas.");
      return;
    }
    const existing = new Set(state.products.map((product) => product.productId));
    const newProducts = imported.filter((product) => product.productId && !existing.has(product.productId));
    state.products.push(...newProducts);
    saveState();
    renderAll();
    toast(`${newProducts.length} produto(s) importado(s).`);
    event.target.value = "";
  };
  reader.readAsText(file, "utf-8");
}

function parseCsv(text) {
  const lines = text.split(/\r?\n/).filter((line) => line.trim());
  if (!lines.length) return [];
  const rows = lines.map(splitCsvLine);
  const headers = rows.shift().map((item) => normalize(item));
  return rowsToProducts(headers, rows);
}

function rowsToProducts(headers, rows) {
  return rows.map((row) => {
    const item = {};
    headers.forEach((header, index) => {
      item[header] = row[index] || "";
    });
    return {
      productId: item["codigo"] || item["product id"] || item["produto id"] || item["sku"] || item["id"] || "",
      name: item["produto"] || item["componente"] || item["nome"] || item["descricao"] || "",
      stockQuantity: Number(item["estoque"] || item["stock quantity"] || item["quantidade em estoque"] || 0),
      unitOfMeasure: item["unidade"] || item["unit of measure"] || item["unidade de medida"] || "UN",
      color: item["cor"] || item["color"] || "",
      season: item["estacao"] || item["estação"] || item["season"] || "",
      status: item["status"] || item["situacao"] || item["situação"] || "",
      category: item["categoria"] || item["category"] || ""
    };
  }).filter((item) => item.productId && item.name);
}

async function parseXlsx(file) {
  if (!("DecompressionStream" in window)) {
    throw new Error("Leitura de XLSX indisponivel neste navegador.");
  }

  const entries = await unzipEntries(await file.arrayBuffer());
  const sharedStrings = parseSharedStrings(await zipText(entries, "xl/sharedStrings.xml", true));
  const workbookXml = await zipText(entries, "xl/workbook.xml");
  const workbookRelsXml = await zipText(entries, "xl/_rels/workbook.xml.rels");
  const sheetPath = firstSheetPath(workbookXml, workbookRelsXml);
  const sheetXml = await zipText(entries, sheetPath);
  const rows = sheetRows(sheetXml, sharedStrings);
  if (!rows.length) return [];
  const headers = rows.shift().map((item) => normalize(item));
  return rowsToProducts(headers, rows);
}

async function unzipEntries(buffer) {
  const view = new DataView(buffer);
  const bytes = new Uint8Array(buffer);
  let eocd = -1;
  for (let index = bytes.length - 22; index >= 0; index -= 1) {
    if (view.getUint32(index, true) === 0x06054b50) {
      eocd = index;
      break;
    }
  }
  if (eocd < 0) throw new Error("Arquivo XLSX invalido.");

  const entryCount = view.getUint16(eocd + 10, true);
  let offset = view.getUint32(eocd + 16, true);
  const entries = new Map();

  for (let index = 0; index < entryCount; index += 1) {
    if (view.getUint32(offset, true) !== 0x02014b50) break;
    const method = view.getUint16(offset + 10, true);
    const compressedSize = view.getUint32(offset + 20, true);
    const nameLength = view.getUint16(offset + 28, true);
    const extraLength = view.getUint16(offset + 30, true);
    const commentLength = view.getUint16(offset + 32, true);
    const localOffset = view.getUint32(offset + 42, true);
    const name = textDecode(bytes.slice(offset + 46, offset + 46 + nameLength));

    const localNameLength = view.getUint16(localOffset + 26, true);
    const localExtraLength = view.getUint16(localOffset + 28, true);
    const dataOffset = localOffset + 30 + localNameLength + localExtraLength;
    entries.set(name.replaceAll("\\", "/"), {
      method,
      data: bytes.slice(dataOffset, dataOffset + compressedSize)
    });

    offset += 46 + nameLength + extraLength + commentLength;
  }

  return entries;
}

async function zipText(entries, path, optional = false) {
  const entry = entries.get(path);
  if (!entry) {
    if (optional) return "";
    throw new Error(`Entrada nao encontrada: ${path}`);
  }
  const data = entry.method === 0 ? entry.data : await inflateRaw(entry.data);
  return textDecode(data);
}

async function inflateRaw(data) {
  const stream = new Blob([data]).stream().pipeThrough(new DecompressionStream("deflate-raw"));
  return new Uint8Array(await new Response(stream).arrayBuffer());
}

function textDecode(bytes) {
  return new TextDecoder("utf-8").decode(bytes);
}

function parseSharedStrings(xml) {
  if (!xml) return [];
  const doc = new DOMParser().parseFromString(xml, "application/xml");
  return [...doc.getElementsByTagName("si")].map((node) => [...node.getElementsByTagName("t")]
    .map((textNode) => textNode.textContent || "")
    .join(""));
}

function firstSheetPath(workbookXml, relsXml) {
  const workbook = new DOMParser().parseFromString(workbookXml, "application/xml");
  const firstSheet = workbook.getElementsByTagName("sheet")[0];
  const relationId = firstSheet?.getAttribute("r:id") || firstSheet?.getAttribute("id");
  const rels = new DOMParser().parseFromString(relsXml, "application/xml");
  const rel = [...rels.getElementsByTagName("Relationship")].find((item) => item.getAttribute("Id") === relationId);
  const target = rel?.getAttribute("Target") || "worksheets/sheet1.xml";
  return target.startsWith("xl/") ? target : `xl/${target.replace(/^\/?xl\//, "")}`;
}

function sheetRows(sheetXml, sharedStrings) {
  const doc = new DOMParser().parseFromString(sheetXml, "application/xml");
  return [...doc.getElementsByTagName("row")].map((row) => {
    const values = [];
    [...row.getElementsByTagName("c")].forEach((cell) => {
      const ref = cell.getAttribute("r") || "";
      const columnIndex = columnToIndex(ref.replace(/\d/g, ""));
      values[columnIndex] = cellValue(cell, sharedStrings);
    });
    return values.map((value) => value || "");
  }).filter((row) => row.some(Boolean));
}

function cellValue(cell, sharedStrings) {
  const type = cell.getAttribute("t");
  if (type === "inlineStr") {
    return [...cell.getElementsByTagName("t")].map((item) => item.textContent || "").join("");
  }
  const value = cell.getElementsByTagName("v")[0]?.textContent || "";
  return type === "s" ? (sharedStrings[Number(value)] || "") : value;
}

function columnToIndex(column) {
  return [...column].reduce((total, char) => total * 26 + char.charCodeAt(0) - 64, 0) - 1;
}

function splitCsvLine(line) {
  const result = [];
  let current = "";
  let quoted = false;

  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];
    const next = line[index + 1];
    if (char === "\"" && next === "\"") {
      current += "\"";
      index += 1;
    } else if (char === "\"") {
      quoted = !quoted;
    } else if ((char === "," || char === ";") && !quoted) {
      result.push(current.trim());
      current = "";
    } else {
      current += char;
    }
  }
  result.push(current.trim());
  return result;
}

function exportCsv() {
  const header = ["codigo", "produto", "estoque", "unidade", "cor", "estacao", "status", "categoria"];
  const rows = state.products.map((product) => [
    product.productId,
    product.name,
    product.stockQuantity,
    product.unitOfMeasure,
    product.color,
    product.season,
    product.status,
    product.category
  ]);
  const csv = [header, ...rows].map((row) => row.map(csvCell).join(";")).join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "mix-produtos.csv";
  link.click();
  URL.revokeObjectURL(url);
}

function csvCell(value) {
  const text = String(value ?? "");
  return /[;"\n]/.test(text) ? `"${text.replaceAll("\"", "\"\"")}"` : text;
}

function requestMatches(request, query) {
  if (!query) return true;
  const product = findProduct(request.productId);
  const haystack = normalize(`${request.id} ${request.creator} ${request.productId} ${product.name} ${request.status} ${request.reason}`);
  return haystack.includes(query);
}

function findProduct(productId) {
  return state.products.find((product) => product.productId === productId) || {
    productId,
    name: "Produto nao encontrado",
    stockQuantity: 0,
    unitOfMeasure: "-",
    color: "-",
    season: "-",
    status: "-",
    category: "-"
  };
}

function nextRequestId() {
  const max = state.requests.reduce((highest, request) => {
    const numberPart = Number(String(request.id).replace(/\D/g, ""));
    return Math.max(highest, numberPart || 0);
  }, 0);
  return `SOL-${String(max + 1).padStart(4, "0")}`;
}

function uniqueNames(names) {
  return [...new Set(names.map((name) => String(name || "").trim()).filter(Boolean))];
}

function today() {
  return new Date().toISOString().slice(0, 10);
}

function formatDate(value) {
  if (!value) return "-";
  const [year, month, day] = value.split("-");
  return `${day}/${month}/${year}`;
}

function number(value) {
  return Number(value || 0).toLocaleString("pt-BR");
}

function money(value) {
  return Number(value || 0).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function normalize(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function statusPill(status) {
  const classes = {
    "Aberto": "open",
    "Em Analise": "analysis",
    "Aprovado": "approved",
    "Reprovado": "rejected",
    "Pendente": "analysis"
  };
  return `<span class="pill ${classes[status] || "open"}">${escapeHtml(status)}</span>`;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function escapeAttr(value) {
  return escapeHtml(value);
}

// ── MATERIAS-PRIMAS ──────────────────────────────────────────────────────────

function renderMaterials() {
  const query = normalize(els.materialSearch.value);
  const materials = (state.materials || []).filter((m) => {
    const haystack = normalize(`${m.materialId} ${m.name} ${m.supplier}`);
    return haystack.includes(query);
  });

  els.materialRows.innerHTML = materials.map((m) => `
    <tr>
      <td>${escapeHtml(m.materialId)}</td>
      <td>${escapeHtml(m.name)}</td>
      <td>${number(m.stockQuantity)}</td>
      <td>${escapeHtml(m.unitOfMeasure)}</td>
      <td>${escapeHtml(m.supplier || "-")}</td>
      <td>${number(m.monthlyConsumption)}</td>
    </tr>
  `).join("");
}

async function importMaterialFile(event) {
  const file = event.target.files[0];
  if (!file) return;
  try {
    const imported = file.name.toLowerCase().endsWith(".xlsx")
      ? await parseXlsxMaterial(file)
      : await parseMaterialCsvFile(file);
    if (!imported.length) { toast("Arquivo sem linhas validas."); return; }
    if (!state.materials) state.materials = [];
    const existing = new Set(state.materials.map((m) => m.materialId));
    const newItems = imported.filter((m) => m.materialId && !existing.has(m.materialId));
    state.materials.push(...newItems);
    saveState();
    renderMaterials();
    renderDashboard();
    toast(`${newItems.length} materia(s)-prima importada(s).`);
  } catch (err) {
    console.error(err);
    toast("Nao foi possivel importar o arquivo.");
  } finally {
    event.target.value = "";
  }
}

function parseMaterialCsvFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(parseMaterialCsv(String(reader.result || "")));
    reader.onerror = () => reject(reader.error);
    reader.readAsText(file, "utf-8");
  });
}

function parseMaterialCsv(text) {
  const lines = text.split(/\r?\n/).filter((line) => line.trim());
  if (!lines.length) return [];
  const rows = lines.map(splitCsvLine);
  const headers = rows.shift().map((item) => normalize(item));
  return rows.map((row) => {
    const item = {};
    headers.forEach((header, index) => { item[header] = row[index] || ""; });
    return {
      materialId: item["codigo"] || item["id"] || item["material id"] || "",
      name: item["nome"] || item["materia-prima"] || item["estampa"] || item["descricao"] || "",
      stockQuantity: Number(item["estoque"] || item["quantidade"] || 0),
      unitOfMeasure: item["unidade"] || "UN",
      supplier: item["fornecedor"] || item["origem"] || "",
      monthlyConsumption: Number(item["consumo mensal"] || 0)
    };
  }).filter((item) => item.materialId && item.name);
}

async function parseXlsxMaterial(file) {
  if (!("DecompressionStream" in window)) throw new Error("XLSX indisponivel neste navegador.");
  const entries = await unzipEntries(await file.arrayBuffer());
  const sharedStrings = parseSharedStrings(await zipText(entries, "xl/sharedStrings.xml", true));
  const workbookXml = await zipText(entries, "xl/workbook.xml");
  const workbookRelsXml = await zipText(entries, "xl/_rels/workbook.xml.rels");
  const sheetPath = firstSheetPath(workbookXml, workbookRelsXml);
  const sheetXml = await zipText(entries, sheetPath);
  const rows = sheetRows(sheetXml, sharedStrings);
  if (!rows.length) return [];
  const headers = rows.shift().map((item) => normalize(item));
  return rows.map((row) => {
    const item = {};
    headers.forEach((header, index) => { item[header] = row[index] || ""; });
    return {
      materialId: item["codigo"] || item["id"] || "",
      name: item["nome"] || item["materia-prima"] || item["estampa"] || "",
      stockQuantity: Number(item["estoque"] || 0),
      unitOfMeasure: item["unidade"] || "UN",
      supplier: item["fornecedor"] || "",
      monthlyConsumption: Number(item["consumo mensal"] || 0)
    };
  }).filter((item) => item.materialId && item.name);
}

function exportMaterialCsv() {
  const header = ["codigo", "nome", "estoque", "unidade", "fornecedor", "consumo mensal"];
  const rows = (state.materials || []).map((m) => [
    m.materialId, m.name, m.stockQuantity, m.unitOfMeasure, m.supplier, m.monthlyConsumption
  ]);
  const csv = [header, ...rows].map((row) => row.map(csvCell).join(";")).join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "mix-materias-primas.csv";
  link.click();
  URL.revokeObjectURL(url);
}

// ── TOUR ─────────────────────────────────────────────────────────────────────

const tourSteps = [
  { title: "Dashboard", text: "Aqui voce ve um resumo geral: solicitacoes em aberto, concluidas, reprovadas e SKUs cadastrados." },
  { title: "Mix de produtos", text: "Cadastre ou importe os produtos do mix. Voce pode adicionar manualmente ou importar via Excel/CSV." },
  { title: "Mix de materia-prima", text: "Controle estampas, tecidos e outros insumos separados do mix de produtos acabados." },
  { title: "Criar solicitacao", text: "Abra uma solicitacao de retirada de mix informando o produto, motivo, responsaveis e campos da declaracao." },
  { title: "Solicitacoes em aberto", text: "Acompanhe e aprove solicitacoes pendentes. Cada responsavel precisa aprovar para concluir." },
  { title: "Solicitacoes concluidas", text: "Historico de solicitacoes aprovadas e reprovadas. Voce pode abrir a declaracao preenchida de cada uma." }
];

let currentTourStep = 0;

function startTour() {
  currentTourStep = 0;
  renderTourStep();
  els.tourOverlay.hidden = false;
}

function closeTour() {
  els.tourOverlay.hidden = true;
}

function previousTourStep() {
  if (currentTourStep > 0) {
    currentTourStep -= 1;
    renderTourStep();
  }
}

function nextTourStep() {
  if (currentTourStep < tourSteps.length - 1) {
    currentTourStep += 1;
    renderTourStep();
  } else {
    closeTour();
  }
}

function renderTourStep() {
  const step = tourSteps[currentTourStep];
  els.tourTitle.textContent = step.title;
  els.tourText.textContent = step.text;
  els.tourProgress.textContent = `${currentTourStep + 1} / ${tourSteps.length}`;
  els.tourPrev.disabled = currentTourStep === 0;
  els.tourNext.textContent = currentTourStep === tourSteps.length - 1 ? "Fechar" : "Proximo";
}

function toast(message) {
  els.toast.textContent = message;
  els.toast.classList.add("show");
  window.clearTimeout(toast.timer);
  toast.timer = window.setTimeout(() => els.toast.classList.remove("show"), 2600);
}