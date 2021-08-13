class Spotify extends HTMLElement {
    constructor() {
      super();
    }
    connectedCallback() {
      this.innerHTML = `
        <section class="spotify-currently-playing" >
          
        </section>
          `;
    }
  }
  
  customElements.define('spotify-component', Spotify);
  