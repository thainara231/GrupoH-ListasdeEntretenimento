document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("formCadastro");
    
    // --- Lógica simples de cadastro ---
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const nome = document.getElementById("nome").value;
        const email = document.getElementById("email").value;
        const senha = document.getElementById("senha").value;
        const confirma = document.getElementById("confirmaSenha").value;

        // Validação simples
        if (senha !== confirma) {
            Swal.fire({
                icon: 'error',
                title: 'Erro',
                text: 'As senhas não batem!',
                background: '#1e1e1e',
                color: '#fff'
            });
            return;
        }

        // SALVA APENAS UM USUÁRIO (Sobrescreve se já existir)
        const usuarioSimples = {
            nome: nome,
            email: email,
            senha: senha
        };

        // Salva no LocalStorage
        localStorage.setItem('usuarioCadastrado', JSON.stringify(usuarioSimples));

        Swal.fire({
            icon: 'success',
            title: 'Cadastrado!',
            text: 'Usuário criado com sucesso.',
            background: '#1e1e1e',
            color: '#fff',
            timer: 1500,
            showConfirmButton: false
        }).then(() => {
            window.location.href = 'login.html';
        });
    });

    // --- Lógica da Força da Senha (Visual apenas) ---
    const senhaInput = document.getElementById("senha");
    const barraForca = document.getElementById("barraForca");
    
    senhaInput.addEventListener("input", () => {
        const senha = senhaInput.value;
        let largura = 0;
        let cor = "bg-danger";

        if (senha.length > 3) largura = 30;
        if (senha.length > 6) { largura = 60; cor = "bg-warning"; }
        if (senha.length > 8) { largura = 100; cor = "bg-success"; }

        barraForca.style.width = largura + "%";
        barraForca.className = `progress-bar ${cor}`;
    });
});