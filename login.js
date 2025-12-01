document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("formLogin");
    const emailInput = document.getElementById("emailLogin");
    const senhaInput = document.getElementById("senhaLogin");
    const btnVerSenha = document.getElementById("btnVerSenhaLogin");

    // --- 1. Mostrar/Ocultar Senha (Olhinho) ---
    btnVerSenha.addEventListener("click", () => {
        const tipo = senhaInput.type === "password" ? "text" : "password";
        senhaInput.type = tipo;
        btnVerSenha.innerHTML = tipo === "password" ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-eye-slash"></i>';
    });

    // --- 2. Processar Login ---
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const emailDigitado = emailInput.value;
        const senhaDigitada = senhaInput.value;

        // Buscar usuários salvos no cadastro
        const usuarios = JSON.parse(localStorage.getItem('mediaVaultUsers')) || [];

        // Procurar usuário que tenha o mesmo email E a mesma senha
        const usuarioEncontrado = usuarios.find(u => u.email === emailDigitado && u.senha === senhaDigitada);

        if (usuarioEncontrado) {
            // SUCESSO!
            
            // Opcional: Salvar quem está logado para mostrar "Olá, Fulano" depois
            localStorage.setItem('usuarioLogado', JSON.stringify(usuarioEncontrado));

            Swal.fire({
                icon: 'success',
                title: `Olá, ${usuarioEncontrado.nome}!`,
                text: 'Login realizado com sucesso.',
                background: '#1e1e1e',
                color: '#fff',
                timer: 1500,
                showConfirmButton: false
            }).then(() => {
                // Redireciona para a página principal
                window.location.href = 'index.html';
            });

        } else {
            // ERRO!
            Swal.fire({
                icon: 'error',
                title: 'Acesso Negado',
                text: 'Email ou senha incorretos.',
                background: '#1e1e1e',
                color: '#fff'
            });
        }
    });
});