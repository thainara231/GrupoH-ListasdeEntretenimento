document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("formLogin");
    const btnVerSenha = document.getElementById("btnVerSenhaLogin");
    const inputSenha = document.getElementById("senhaLogin");

    // Ver/Ocultar Senha
    if(btnVerSenha) {
        btnVerSenha.addEventListener("click", () => {
            const tipo = inputSenha.getAttribute("type") === "password" ? "text" : "password";
            inputSenha.setAttribute("type", tipo);
            btnVerSenha.querySelector("i").classList.toggle("fa-eye");
            btnVerSenha.querySelector("i").classList.toggle("fa-eye-slash");
        });
    }

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const emailDigitado = document.getElementById("emailLogin").value;
        const senhaDigitada = document.getElementById("senhaLogin").value;

        // Pega o usuário salvo no cadastro
        const usuarioSalvo = JSON.parse(localStorage.getItem('usuarioCadastrado'));

        if (usuarioSalvo && usuarioSalvo.email === emailDigitado && usuarioSalvo.senha === senhaDigitada) {
            
            // CORREÇÃO CRÍTICA: Salva a chave 'usuarioLogado'
            localStorage.setItem('usuarioLogado', usuarioSalvo.email);

            Swal.fire({
                icon: 'success',
                title: 'Sucesso!',
                text: 'Entrando no sistema...',
                background: '#1f1f1f',
                color: '#fff',
                timer: 1500,
                showConfirmButton: false
            }).then(() => {
                // CORREÇÃO CRÍTICA: Redireciona para paginaprincipal.html
                window.location.href = 'paginaprincipal.html';
            });

        } else {
            Swal.fire({
                icon: 'error',
                title: 'Erro',
                text: 'Email ou senha incorretos!',
                background: '#1f1f1f',
                color: '#fff'
            });
        }
    });
});