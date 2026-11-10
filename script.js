/* ===== CONFIGURAÇÃO: troque estes valores ===== */
const CONFIG = {
    site: "",
    whatsapp: "17991118565",
    instagram: "https://instagram.com/",
    msg: "Olá! Vim pelo site da Next Tech e gostaria de um orçamento."
};
const wa = t => `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(t)}`;

if (CONFIG.site) {
    const l = document.createElement("link");
    l.rel = "canonical";
    l.href = CONFIG.site;
    document.head.appendChild(l);

    const o = document.createElement("meta");
    o.setAttribute("property", "og:url");
    o.content = CONFIG.site;
    document.head.appendChild(o);
}

/* ===== SERVIÇOS ===== */
const I = {
    site: '<path d="M3 5h18v12H3zM8 21h8M12 17v4"/>',
    lp: '<path d="M5 3h14v18H5zM9 8h6M9 12h6M9 16h3"/>',
    shop: '<path d="M4 7h16l-1.5 11h-13zM9 7a3 3 0 016 0"/>',
    fix: '<path d="M14.5 6.5a4 4 0 00-5 5L4 17l3 3 5.5-5.5a4 4 0 005-5l-2.5 2.5-2-2z"/>'
};

const SERVICES = [
    { i: "site", t: "Desenvolvimento de Sites", d: "Sites institucionais para apresentar sua empresa, seus serviços e diferenciais com profissionalismo.", a: "Site institucional" },
    { i: "lp", t: "Landing Pages", d: "Páginas estratégicas para campanhas, produtos, serviços e geração de oportunidades.", a: "Landing page" },
    { i: "shop", t: "Lojas Virtuais", d: "Criação e estruturação de lojas online para empreendedores que desejam vender pela internet.", a: "Loja virtual" },
    { i: "fix", t: "Diagnóstico e Manutenção", d: "Análise, correções, melhorias, atualizações e manutenção de sites e lojas virtuais existentes.", a: "Diagnóstico de site" }
];
document.getElementById("services").innerHTML = SERVICES.map(s => `<article class="card rv"><div class="ico"><svg viewBox="0 0 24 24" aria-hidden="true">${I[s.i]}</svg></div><h3>${s.t}</h3><p>${s.d}</p><a class="more" href="#contato" data-assunto="${s.a}">Saiba mais</a></article>`).join("");

/* ===== PROJETOS: adicione novos objetos aqui =====
   conceito: true  -> mostra o selo "Projeto conceitual"
   img: "..."      -> mostra a captura real; sem img, mostra o mockup desenhado
   mock: "..."     -> texto do mockup desenhado (se omitido, usa o nome)
   alt: "..."      -> descrição da imagem (opcional) */
const PROJECTS = [
    { n: "Alma Estética", mock: "Agende seu horário", c: "Landing Pages", d: "Landing page para um estúdio fictício de estética, com foco em agendamento.", conceito: true, url: "https://nexttech-studio.github.io/alma-estetica-landing-page/", img: "images/alma-estetica.webp" },
    { n: "Maria Heloisa - Designer de Cílios", mock: "Agende seu horário", c: "Landing Pages", d: "Landing page portfólio para designer de cílios, com foco em demonstração de trabalhos e agendamentos pelo WhatsApp.", conceito: false, url: "https://nexttech-studio.github.io/portfolio-maria-dc/", img: "images/portfolio_maria_heloisa.webp" },
    { n: "Contábil Prisma", mock: "Contabilidade clara", c: "Sites Institucionais", d: "Site institucional conceitual para escritório de contabilidade, com serviços e contato.", conceito: true, url: "#" }
];
const CATS = ["Todos", "Landing Pages", "Sites Institucionais", "E-commerce", "Redesign"];
const tabs = document.getElementById("tabs"), pg = document.getElementById("projects");

/* Miniatura do card: imagem real se existir, senão o mockup desenhado */
const mockup = p => `<div class="thumb" aria-hidden="true"><div class="bar"><i></i><i></i><i></i></div><div class="mh" style="font-size:.8rem;max-width:70%">${p.mock || p.n}</div><div class="ms" style="width:60%"></div><div class="ms b" style="width:24%;height:12px"></div><div class="mrow" style="margin-top:auto"><div style="height:26px"></div><div style="height:26px"></div><div style="height:26px"></div></div></div>`;
const shot = p => `<div class="thumb shot"><img src="${p.img}" alt="${p.alt || "Captura de tela do projeto " + p.n}" width="1200" height="750" loading="lazy"></div>`;
const thumb = p => p.img ? shot(p) : mockup(p);

const external = url => url.startsWith("http") ? ' target="_blank" rel="noopener"' : "";

function renderProjects(cat) {
    tabs.innerHTML = CATS.map(c => `<button class="tab" aria-pressed="${c === cat}" data-c="${c}">${c}</button>`).join("");
    pg.innerHTML = PROJECTS.filter(p => cat === "Todos" || p.c === cat).map(p => `
        <article class="card proj">
            ${thumb(p)}
            <div class="body">
                <span class="cat">${p.c}</span>
                <h3>${p.n}</h3>
                ${p.conceito ? '<span class="tag">Projeto conceitual</span>' : ""}
                <p>${p.d}</p>
                <a class="btn btn-g" href="${p.url}"${external(p.url)}>Visualizar projeto</a>
            </div>
        </article>`).join("") || '<p class="lead">Nenhum projeto nesta categoria ainda.</p>';
}
tabs.addEventListener("click", e => {
    const b = e.target.closest("[data-c]");
    if (b) renderProjects(b.dataset.c);
});
renderProjects("Todos");

/* ===== COMPORTAMENTO ===== */
const hd = document.getElementById("top"), bg = document.getElementById("burger");
const fab = document.getElementById("fab");
const sc = () => {
    hd.classList.toggle("scrolled", scrollY > 24);
    fab.classList.toggle("on", scrollY > 500);
};
sc();
addEventListener("scroll", sc, { passive: true });

bg.addEventListener("click", () => {
    const o = hd.classList.toggle("open");
    bg.setAttribute("aria-expanded", o);
    bg.setAttribute("aria-label", o ? "Fechar menu" : "Abrir menu");
});
document.querySelectorAll("#mobile a").forEach(a => a.addEventListener("click", () => {
    hd.classList.remove("open");
    bg.setAttribute("aria-expanded", "false");
}));
document.addEventListener("click", e => {
    const a = e.target.closest("[data-assunto]");
    if (a) {
        const s = document.querySelector("select[name=assunto]");
        if (s) s.value = a.dataset.assunto;
    }
});
["wa-cta", "wa-foot", "fab"].forEach(id => document.getElementById(id).href = wa(CONFIG.msg));
document.querySelectorAll("header .btn-p,.hero .cta .btn-p").forEach(a => {
    a.href = wa("Olá! Gostaria de solicitar um orçamento.");
    a.target = "_blank";
    a.rel = "noopener";
});
document.getElementById("ig").href = CONFIG.instagram;
const io = "IntersectionObserver" in window ? new IntersectionObserver(es => es.forEach(x => {
    if (x.isIntersecting) {
        x.target.classList.add("in");
        io.unobserve(x.target);
    }
}), { threshold: .12 }) : null;
document.querySelectorAll(".rv").forEach(el => io ? io.observe(el) : el.classList.add("in"));

/* formulário: valida e abre o WhatsApp com a mensagem pronta */
document.getElementById("form").addEventListener("submit", e => {
    e.preventDefault(); const f = e.target, n = f.nome.value.trim(), m = f.msg.value.trim();
    f.querySelector("[data-e=nome]").textContent = n ? "" : "Informe seu nome.";
    f.nome.setAttribute("aria-invalid", !n);
    if (!n) {
        f.nome.focus();
        return;
    }
    const u = wa(`Olá! Sou ${n}. Quero um orçamento: ${f.assunto.value} (${f.situacao.value}).${m ? "\n" + m : ""}`);
    if (!window.open(u, "_blank", "noopener")) location.href = u;
});