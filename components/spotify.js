class Spotify extends HTMLElement {
    constructor() {
      super();
    }
    connectedCallback() {
      this.innerHTML = `
        <section class="currently-playing-section accent-bg" >
          
        </section>
          `;
    }
  }
  
  customElements.define('spotify-component', Spotify);
  