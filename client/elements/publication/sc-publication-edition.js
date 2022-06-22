import { LitElement, html, css } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

import { LitLocalized } from '../addons/sc-localization-mixin';
import { setNavigation } from '../navigation/sc-navigation-common';
import { SCPublicationStyles } from '../styles/sc-publication-styles';
import { reduxActions } from '../addons/sc-redux-actions';
import { store } from '../../redux-store';
import { API_ROOT } from '../../constants';

class SCPublicationEdition extends LitLocalized(LitElement) {
  static get styles() {
    return css`
      ${SCPublicationStyles}
      :host {
        display: block;
      }
    `;
  }

  static get properties() {
    return {
      currentUid: { type: String },
      editionDetail: { type: Object },
      editionId: { type: String },
    };
  }

  constructor() {
    super();
    this.editionUid = store.getState().currentRoute.params.editionUid;
    this.collectionURL = new Map([
      ['dn', '/pitaka/sutta/long/dn'],
      ['mn', '/pitaka/sutta/middle/mn'],
      ['sn', '/pitaka/sutta/linked/sn'],
      ['an', '/pitaka/sutta/numbered/an'],
      ['dhp', '/dhp'],
      ['ud', '/pitaka/sutta/minor/kn/ud'],
      ['iti', '/pitaka/sutta/minor/kn/iti'],
      ['snp', '/pitaka/sutta/minor/kn/snp'],
      ['thag', '/pitaka/sutta/minor/kn/thag'],
      ['thig', '/pitaka/sutta/minor/kn/thig'],
      ['pli-tv-vi', '/pitaka/vinaya/pli-tv-vi'],
    ]);
    this._fetchAllEditions();
  }

  firstUpdated() {
    // this._updateNav();
  }

  updated(changedProps) {
    super.updated(changedProps);
    if (changedProps.has('editionId')) {
      if (this.editionId) {
        this._loadNewResult();
      }
    }
    this._updateNav();
  }

  async _loadNewResult() {
    await this._fetchEditionDetails();
    await this._fetchEditionInfo();
    await this._fetchCreatorBio();
    this.requestUpdate();
  }

  _updateNav() {
    if (!this.editionDetail || !this.editionDetail[0]) {
      return;
    }
    const navArray = store.getState().navigationArray;
    const currentPath = store.getState().currentRoute.path;
    navArray.length = 1;
    navArray.push({
      title: 'Publications editions',
      url: `/publication-editions`,
      type: 'PublicationPage',
    });
    navArray.push({
      title: `Publications-${this.editionDetail[0]?.translated_name || 'edition'}`,
      url: `${currentPath}`,
      type: 'PublicationPage',
    });
    setNavigation(navArray);
  }

  async _fetchEditionDetails() {
    try {
      this.editionDetail = await (
        await fetch(this._computePublicationEditionDetailsApiUrl())
      ).json();
      if (this.editionDetail && this.editionDetail.length !== 0) { 
        reduxActions.changeToolbarTitle(`Publications-${this.editionDetail[0].translated_name}`);
        //this._updateNav();
      }
    } catch (error) {
      console.log(error);
    }
  }

  // _computePublicationEditionDetailsApiUrl() {
  //   return `${API_ROOT}/publication/edition/${this.editionId}/${this.editionUid}`;
  // }

  _computePublicationEditionDetailsApiUrl() {
    return `${API_ROOT}/menu/${this.editionUid}`;
  }

  _computePublicationEditionInfoApiUrl() {
    return `${API_ROOT}/publication/edition/${this.editionId}`;
  }

  async _fetchAllEditions() {
    try {
      this.allEditions = await (await fetch(`${API_ROOT}/publication/editions`)).json();
      setTimeout(() => {
        if (!this.allEditions) {
          return;
        }
        this.editions = [];
        // eslint-disable-next-line no-restricted-syntax
        for (const edition of this.allEditions) {
          if (edition.edition_id.substring(0, 9) === 'pli-tv-vi') {
            edition.uid = 'pli-tv-vi';
          } else {
            // eslint-disable-next-line prefer-destructuring
            edition.uid = edition.edition_id.split('-')[0];
          }
        }
        this.editionId = this.allEditions.find(
          x => x.uid === this.editionUid && x.edition_id.includes('web')
        ).edition_id;
        if (this.editionId) {
          reduxActions.changeCurrentEditionId(this.editionId);
          this.requestUpdate();
        }
      }, 100);
    } catch (error) {
      console.log(error);
    }
  }

  async _fetchEditionInfo() {
    try {
      this.editionInfo = await (await fetch(this._computePublicationEditionInfoApiUrl())).json();
    } catch (error) {
      console.log(error);
    }
  }

  async _fetchCreatorBio() {
    try {
      this.creatorBio = await (await fetch(`${API_ROOT}/creator_bio`)).json();
      for (const creator of this.creatorBio) {
        if (this.editionId.includes(creator.creator_uid)) {
          this.creatorInfo = creator;
          break;
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    if (!this.editionDetail || this.editionDetail.length === 0 || !this.editionInfo || !this.creatorInfo) {
      return html``;
    }
    return html`
      <header></header>
      <main>
        <article>
          <header class="page-header">
            <h1>${this.editionDetail[0].translated_name}</h1>
            <p class="subtitle">A translation of the ${this.editionDetail[0].root_name}</p>
            <p class="author">${this.editionInfo.publication.creator_name}</p>
          </header>
          <figure class="book-pic">
            <img src="/img/publication-pages/bibliotheca.jpg" alt="" width="300" height="300" />
            <figcaption></figcaption>
          </figure>
          <nav class="toc">
            <ol>
              <li><a href="#translation">This translation</a></li>
              <li><a href="#heading2">The ${this.editionDetail[0].root_name}</a></li>
              <li><a href="#heading3">The Author</a></li>
              <li><a href="#heading4">Available editions</a></li>
              <li><a href="#heading5">Publication details</a></li>
            </ol>
          </nav>
          <section class="description">
            <h2><a id="translation">This translation</a></h2>

            <p>
              This translation was part of a project to translate the four Pali Nikāyas with the
              following aims:
            </p>
            <ul>
              <li>plain, approachable English;</li>
              <li>consistent terminology;</li>
              <li>accurate rendition of the Pali;</li>
              <li>free of copyright.</li>
            </ul>
            <p>It was made during 2016–2018 while Bhikkhu Sujato was staying in Qimei, Tawian.</p>
            <h2><a id="heading2">The ${this.editionDetail[0].root_name}</a></h2>
            <p class="blurb">${this.editionDetail[0].blurb}</p>
            <h2><a id="heading3">The Author</a></h2>
            <figure class="author-pic">
              <img
                src="/img/publication-pages/${this.creatorInfo.creator_uid}.jpg"
                alt=${this.creatorInfo.creator_uid}
                width="300"
                height="300"
              />
              <!-- <figcaption>Bhikkhu Sujato at Lokanta Vihara, 2019</figcaption> -->
            </figure>
            ${unsafeHTML(this.creatorInfo.creator_biography)}
          </section>
          <section>
            <h2><a id="heading4">Available editions</a></h2>
            <table>
              <caption></caption>
              <tr>
                <th>Type</th>
                <th>Date</th>
                <th>Publisher</th>
                <th></th>
              </tr>
              <tr>
                <td class="web">Web</td>
                <td>2018</td>
                <td>SuttaCentral</td>
                <td><a href=${this.collectionURL.get(
                  this.editionUid
                )} class='internal'>Read on SuttaCentral</a></td>
              </tr>
              <tr>
                <td class='book'>Book, softcover</td>
                <td>2018</td>
                <td>SuttaCentral</td>
                <td><a href='https://github.com/suttacentral/editions' class='external'>Print on demand</a></td>
              </tr>
              <tr>
                <td class='book'>Book, hardback</td>
                <td>2018</td>
                <td>SuttaCentral</td>
                <td><a href='https://github.com/suttacentral/editions' class='external'>Print on demand</a></td>
              </tr>
              <tr>
                <td class='epub'>Epub</td>
                <td>2018</td>
                <td>SuttaCentral</td>
                <td><a href='https://github.com/suttacentral/editions' class='download'>Download</a></td>
              </tr>
              <tr>
                <td class='pdf'>Pdf</td>
                <td>2018</td>
                <td>SuttaCentral</td>
                <td><a href='https://github.com/suttacentral/editions' class='download'>Download</a></td>
              </tr>
            </table>
          </section>

          <section>
            <h2><a id="heading5">Publication details</a></h2>
            <dl class="publication">
              <dt class="publication_number">SuttaCentral publication number</dt>
              <dd>${this.editionInfo.publication.publication_number}</dd>
              <dt class="source_url">Source</dt>
              <dd>${this.editionInfo.publication.source_url}</dd>
              <dt class="text_uid">Text ID</dt>
              <dd>${this.editionInfo.publication.text_uid.toUpperCase()}</dd>
              <dt class="publication_status">Publication Status</dt>
              <dd>${this.editionInfo.publication.publication_status}</dd>
              <dt class="license">License</dt>
              <dd>
                <p>${this.editionInfo.publication.license_statement}</p>
                <a rel="license" href="${this.editionInfo.publication.license_url}">
                  <p
                    xmlns:dct="https://purl.org/dc/terms/" xmlns:vcard="https://www.w3.org/2001/vcard-rdf/3.0#"
                      <img src='/img/publication-pages/cc-zero.svg' alt='CC0' /><span><strong>CC0 1.0 Universal (CC0 1.0) Public Domain Dedication.
                      </strong><br>To the extent possible under law, <span property='dct:title'>${this.editionInfo.publication.creator_name}</span> has
                      waived all copyright and related or neighboring rights to <span property='dct:title'>Numbered
                        Discourses</span>. This work is published from: <span property='vcard:Country' datatype='dct:ISO3166' content='AU' about='https://suttacentral.net/${this.editionUid}'> Australia</span>.</span>
                  </p>
                </a>
                </a>
              </dd>
            </dl>
          </section>
        </article>
      </main>
      <!-- <footer>
        <a class='prev'></a>
        <a class='next' href='preface.html'>Preface</a>
      </footer> -->
    `;
  }
}

customElements.define('sc-publication-edition', SCPublicationEdition);