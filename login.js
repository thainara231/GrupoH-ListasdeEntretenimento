document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("formLogin");

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const emailDigitado = document.getElementById("emailLogin").value;
        const senhaDigitada = document.getElementById("senhaLogin").value;

        // Pega o único usuário salvo
        const usuarioSalvo = JSON.parse(localStorage.getItem('usuarioCadastrado'));

        // Verifica se existe e se bate
        if (usuarioSalvo && 
            usuarioSalvo.email === emailDigitado && 
            usuarioSalvo.senha === senhaDigitada) {
            
            // Marca que está logado
            localStorage.setItem('estaLogado', 'sim');

            Swal.fire({
                icon: 'success',
                title: 'Entrou!',
                background: '#1e1e1e',
                color: '#fff',
                timer: 1000,
                showConfirmButton: false
            }).then(() => {
                window.location.href = 'index.html';
            });

        } else {
            Swal.fire({
                icon: 'error',
                title: 'Erro',
                text: 'Email ou senha incorretos.',
                background: '#1e1e1e',
                color: '#fff'
            });
        }
    });
});