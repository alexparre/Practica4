class CustomArticle extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.loadArticle();
    }

    async loadArticle() {

        const urlParams = new URLSearchParams(window.location.search);
        const articleId = urlParams.get('id');

        if (!articleId) {
            this.innerHTML = `<p>Error: No se encontró el artículo.</p>`;
            return;
        }

        try {
            const response = await fetch(`https://news-foniuhqsba-uc.a.run.app/articles/${articleId}`);
            if (!response.ok) {
                throw new Error('Error al obtener el artículo');
            }
            const article = await response.json();
            this.renderArticle(article);
        } catch (error) {
            console.error('Error:', error);
            this.innerHTML = `<p>Error al cargar el artículo. Inténtelo nuevamente más tarde.</p>`;
        }
    }

    renderArticle(article) {
        this.innerHTML = `
            <h2>${article.headline}</h2>
            <p>Autor: ${article.author}</p>
            <div>${article.body}</div>
        `;
    }
}

customElements.define('custom-article', CustomArticle);
