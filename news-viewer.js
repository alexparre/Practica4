class NewsViewer extends HTMLElement {
    constructor() {
        super();
        this.section = this.getAttribute("section");
        console.log({section:this.section});
    }

    connectedCallback() {
        this.loadArticles(this.section);
    }
    

    async loadArticles(section="") {
      
        try {
            // Construye la URL para la sección seleccionada
            const response = await fetch(`https://news-foniuhqsba-uc.a.run.app/${section}`);
            if (!response.ok) {
                throw new Error('Error al obtener los artículos');
            }
            const articles = await response.json();
            this.renderArticles(articles);
        } catch (error) {
            console.error('Error:', error.message);
            this.innerHTML = `<p>Error al cargar los artículos. Inténtelo nuevamente más tarde.</p>`;
        }
    }

    renderArticles(articles) {
        const template = document.getElementById('article-template');


        this.innerHTML = '';

        articles.forEach(article => {
            const articleContent = document.importNode(template.content, true);

            articleContent.querySelector('.title').textContent = article.headline;
            articleContent.querySelector('.author').textContent = `Autor: ${article.author}`;
            articleContent.querySelector('.section').textContent = article.section;
            articleContent.querySelector('.description').innerHTML = article.body.substring(0, 600) + '...';

     
            articleContent.querySelector('.article').addEventListener('click', () => {
                window.location.href = `article.html?id=${article.id}`;
            });

            this.appendChild(articleContent);
        });
    }
}

customElements.define('news-viewer', NewsViewer);


function loadSection(section) {
    document.querySelector('news-viewer').loadArticles(section);
    togglePopover(); 
  }