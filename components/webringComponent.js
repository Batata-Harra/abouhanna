const DATA_FOR_WEBRING = `https://raw.githubusercontent.com/kevinabouhanna/batata-harra-webring/master/webring.json`;

const template = document.createElement("template");
template.innerHTML = `
<style>
.webring {
  padding: 1rem; 
  text-align: center;
  font: 100% system-ui, sans-serif;
}
.icon {
  font-size: 100px;
}

</style>

<div class="webring">
  <div id="copy">
    
  </div>
</div>`;

class WebRing extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    // e.g. https://batataharra.com
    const thisSite = this.getAttribute("site");

    fetch(DATA_FOR_WEBRING)
      .then((response) => response.json())
      .then((sites) => {
        // Find the current site in the data
        const matchedSiteIndex = sites.findIndex(
          (site) => site.url === thisSite
        );
        const matchedSite = sites[matchedSiteIndex];

        let prevSiteIndex = matchedSiteIndex - 1;
        if (prevSiteIndex === -1) prevSiteIndex = sites.length - 1;

        let nextSiteIndex = matchedSiteIndex + 1;
        if (nextSiteIndex > sites.length) nextSiteIndex = 0;

        const randomSiteIndex = this.getRandomInt(0, sites.length - 1);

        const cp = `       
          <p>
            <a href="${sites[prevSiteIndex].url}">Prev</a>
            <a href="https://kevinabouhanna.github.io/batata-harra-webring/">🥔</a>
            <a href="${sites[nextSiteIndex].url}">Next</a>
          </p>
        `;

        this.shadowRoot
          .querySelector("#copy")
          .insertAdjacentHTML("afterbegin", cp);
      });
  }

  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}

window.customElements.define("webring-css", WebRing);