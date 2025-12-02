const userLogado = localStorage.getItem("userLogado");
if (!userLogado) window.location.href = "login.html";

const usuarios = JSON.parse(localStorage.getItem("usuarios")) || {};
if (!usuarios[userLogado]) usuarios[userLogado] = { lista: [] };
const usuario = usuarios[userLogado];

const form = document.getElementById("formMedia");
const lista = document.getElementById("listaItens");
const logoutBtn = document.getElementById("logoutBtn");

function salvar() {
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
}

function atualizar() {
    lista.innerHTML = "";
    usuario.lista.forEach((item, i) => {
        const div = document.createElement("div");
        div.className = "item";
        div.innerHTML = `
            <h4>${item.titulo}</h4>
            <p>Categoria: ${item.categoria}</p>
            <p>Nota: ${item.nota}/10</p>
            <button data-id="${i}" class="excluir">Excluir</button>
        `;
        lista.appendChild(div);
    });
}

form.addEventListener("submit", e => {
    e.preventDefault();
    usuario.lista.push({
        titulo: titulo.value,
        categoria: categoria.value,
        nota: nota.value
    });
    salvar();
    atualizar();
    form.reset();
});

document.addEventListener("click", e => {
    if (e.target.classList.contains("excluir")) {
        const id = e.target.getAttribute("data-id");
        usuario.lista.splice(id, 1);
        salvar();
        atualizar();
    }
});

logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("userLogado");
    window.location.href = "login.html";
});

atualizar();

