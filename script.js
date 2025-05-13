document.addEventListener("DOMContentLoaded", function () {
    // Seleciona o cabeçalho e define sua altura para ajustar o scroll
    const header = document.querySelector("header");
    const headerHeight = header.offsetHeight + 20;

    // Seleciona os links de navegação e o menu responsivo
    const navLinks = document.querySelectorAll(".header_nav a, .header_menu_content a");
    const menuIcon = document.querySelector(".header_menu i"); // Ícone ☰
    const menuContent = document.querySelector(".header_menu_content");
    const closeIcon = document.querySelector(".header_menu_content i"); // Ícone x

    // Função para abrir o menu
    function abrirMenu(event) {
        menuContent.classList.add("active");
        menuIcon.style.display = "none"; // Esconde o ☰ quando abre o menu
        event.stopPropagation(); // Evita que o clique se propague
    }

    // Função para fechar o menu
    function fecharMenu() {
        menuContent.classList.remove("active");
        menuIcon.style.display = "block"; // Reexibe o barra quando fecha o menu
    }

    // Adiciona evento de clique no ícone barra para abrir o menu
    menuIcon.addEventListener("click", abrirMenu);

    // Adiciona evento de clique no x para fechar o menu
    closeIcon.addEventListener("click", fecharMenu);

    // Fecha o menu ao clicar fora dele
    document.addEventListener("click", function (event) {
        if (!menuContent.contains(event.target) && !menuIcon.contains(event.target)) {
            fecharMenu();
        }
    });

    // Adiciona evento de clique nos links do menu
    navLinks.forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault(); // Evita o comportamento padrão do link
            const targetElement = document.querySelector(this.getAttribute("href"));

            if (targetElement) {
                // Faz um scroll suave até a seção correspondente
                window.scrollTo({
                    top: targetElement.offsetTop - headerHeight,
                    behavior: "smooth"
                });
            }

            // Remove a classe 'active' de todos os links e adiciona no link atual
            navLinks.forEach(nav => nav.classList.remove("active"));
            this.classList.add("active");

            // Fecha o menu no mobile após o clique
            fecharMenu();
        });
    });

    // Animação de fade-in quando o elemento entra na tela
    const elementos = document.querySelectorAll(".fade-in-scroll");

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible"); // Adiciona classe para iniciar a animação
            }
        });
    }, { threshold: 0.2 }); // Define que a animação será acionada quando 20% do elemento estiver visível

    // Observa todos os elementos que possuem a classe 'fade-in-scroll'
    elementos.forEach(el => observer.observe(el));

        // Monitorar seções para destacar o link da navbar correspondente
        const sections = document.querySelectorAll("section[id]");

        const sectionObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const sectionId = entry.target.getAttribute("id");
                        navLinks.forEach(link => {
                            link.classList.toggle("active", link.getAttribute("href") === `#${sectionId}`);
                        });
                    }
                });
            },
            {
                root: null,
                rootMargin: `-${headerHeight}px 0px 0px 0px`, // compensa o cabeçalho fixo
                threshold: 0.6 // considera visível quando 60% da seção estiver aparecendo
            }
        );
    
        // Observa todas as seções
        sections.forEach(section => sectionObserver.observe(section));
    
});

