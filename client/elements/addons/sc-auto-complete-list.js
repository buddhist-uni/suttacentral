import { html, css, LitElement } from 'lit';
import { create, search, insertMultiple } from '@orama/orama';
import '@material/web/textfield/filled-text-field';
import '@material/web/iconbutton/icon-button';

import { LitLocalized } from './sc-localization-mixin';
import { dispatchCustomEvent } from '../../utils/customEvent';
import { store } from '../../redux-store';
import { icon } from '../../img/sc-icon';
import { API_ROOT } from '../../constants';
import { reduxActions } from './sc-redux-actions';

const suttaDB = await create({
  schema: {
    uid: 'string',
    title: 'string',
  },
});

class SCAutoCompleteList extends LitLocalized(LitElement) {
  static styles = css`
    :host {
      font-size: var(--sc-font-size-md);

      position: absolute;
      z-index: 9999;
      top: var(--sc-size-sm);
      left: var(--sc-size-sm);

      display: none;

      width: calc(100% - var(--sc-size-sm) * 2);
      margin: auto;

      color: var(--sc-on-tertiary-primary-text-color);
      border-radius: var(--sc-mid-border-radius);
      background-color: var(--sc-tertiary-background-color);
      box-shadow: 0 0 0 2048px rgba(0, 0, 0, 0.8);

      --md-icon-button-icon-size: 24px;
      --md-sys-color-primary: var(--sc-primary-accent-color);
    }

    #instant_search_dialog {
      position: relative;

      padding: 8px;

      border-radius: var(--sc-mid-border-radius);
    }

    .ss-header {
      display: flex;

      padding: 0;

      justify-content: center;
      align-items: center;
    }

    md-filled-text-field {
      width: 100%;

      --md-sys-color-primary: var(--sc-primary-accent-color);
      --md-sys-color-on-primary: white;
      --md-filled-text-field-container-color: var(--sc-tertiary-background-color);
      --md-filled-text-field-focus-input-text-color: var(--sc-on-primary-primary-text-color);
      --md-filled-text-field-input-text-font: var(--sc-sans-font);
      --md-filled-text-field-input-text-size: var(--sc-size-md);
      --md-filled-text-field-input-text-color: var(--sc-on-primary-primary-text-color);
      --md-filled-text-field-hover-input-text-color: var(--sc-on-primary-primary-text-color);
    }

    .instant-search-list {
      overflow-y: auto;

      max-height: 90vh;
      padding: 0 4px;

      scrollbar-gutter: stable both-edges;
    }

    ::-webkit-scrollbar {
      width: 6px;
    }
    ::-webkit-scrollbar-button {
      width: 0;
      height: 0;
    }
    ::-webkit-scrollbar-thumb {
      border-radius: 6px;
      background: var(--sc-icon-color);
    }
    ::-webkit-scrollbar-thumb:hover {
      background: #87817a;
    }
    ::-webkit-scrollbar-thumb:active {
      background: #79746d;
    }
    ::-webkit-scrollbar-track {
      border-radius: 6px;
      background: var(--sc-border-color);
    }
    ::-webkit-scrollbar-corner {
      background: transparent;
    }

    ul {
      margin: 0;
      padding: 8px 0 4px;

      list-style: none;
    }

    li {
      position: relative;

      margin-bottom: 0;
    }

    .search-suggestion-link {
      display: flex;

      height: 24px;
      padding: 24px 12px 8px 16px;

      cursor: pointer;
      transition: var(--sc-link-transition);
      text-decoration: none;

      color: inherit;
      border-radius: 4px 4px 0 0;
      background-color: inherit;

      align-items: center;
      justify-content: space-between;
    }

    .search-suggestion-link:hover {
      background-color: rgba(0, 0, 0, 0.06);
    }

    .search-suggestion-link:active {
      background-color: var(--sc-primary-color-light);
    }

    .search-suggestion-link:focus {
      background-color: var(--sc-primary-color-light-transparent);
    }

    .instant-nav,
    .search-suggestion {
      display: flex;

      align-items: center;
      gap: 1rem;
    }

    .search-suggestion::before {
      position: absolute;
      top: 8px;

      display: block;

      content: 'Filter search to early Buddhist suttas';
    }

    .search-suggestion::before,
    .instant-nav-description-text {
      font-family: var(--sc-sans-font);
      font-size: var(--sc-font-size-xs);

      color: var(--sc-icon-color);
    }

    .search-suggestion-filter {
      font-family: monospace;
      font-size: var(--sc-font-size-s);

      position: relative;

      color: var(--sc-on-primary-secondary-text-color);
    }

    .search-suggestion-prompt {
      display: inline-flex;

      height: 40px;
    }

    .instant-nav-description-text {
      font-family: var(--sc-sans-font);
      font-size: var(--sc-font-size-xs);

      color: var(--sc-icon-color);

      display: none;

      margin: 16px 0 8px 16px;

      align-items: center;
    }

    .instant-nav-description-text .icon {
      width: 1em;
      height: 1em;
      margin: 0 0.25em 0 0.25em;
    }

    .instant-nav-link {
      display: flex;

      margin-bottom: 8px;
      padding: 8px 12px 8px 12px;

      cursor: pointer;
      transition: var(--sc-link-transition);
      text-decoration: none;

      color: var(--sc-on-primary-primary-text-color);
      border-radius: var(--sc-big-border-radius);
      background-color: var(--sc-primary-background-color);

      align-items: center;
      justify-content: space-between;
    }

    .instant-nav-link:hover {
      background-color: var(--sc-primary-color-light-transparent);
    }

    .instant-nav-link:active {
      background-color: var(--sc-primary-color-light);
    }

    .instant-nav-link:focus {
      background-color: var(--sc-primary-color-light-transparent);
    }

    .instant-nav-uid {
      font-size: var(--sc-font-size-s);

      color: var(--sc-on-primary-secondary-text-color);
    }

    .instant-nav-title {
      font-family: var(--sc-serif-font);

      align-self: self-end;
    }

    .instant-nav-prompt {
      display: inline-flex;
    }

    #openSearchTip {
      font-size: var(--sc-font-size-s);

      display: flex;

      padding: 8px 16px 8px 16px;

      color: var(--sc-on-tertiary-secondary-text-color);
      border-top: 1px solid var(--sc-border-color);

      align-items: center;
      justify-content: space-between;
      gap: 8px;
    }

    #opensearchtip-left {
      display: inline-flex;

      align-items: center;
    }

    ul li:last-child {
      margin-bottom: 0.5rem;
    }

    hr {
      display: none;

      margin: 0 0 8px;
    }

    li ~ hr,
    ul li:last-child + hr,
    li ~ .instant-nav-description-text {
      display: flex;
    }

    .icon {
      fill: var(--sc-icon-color);
    }

    md-icon {
      cursor: pointer;
    }
  `;

  static properties = {
    items: { type: Array },
    siteLanguage: { type: String },
    loadingData: { type: Boolean },
  };

  constructor() {
    super();
    this.items = [];
    this.priorityAuthors = new Map([
      ['en', 'sujato'],
      ['de', 'sabbamitta'],
      ['zh', 'zhuang'],
    ]);
    this.searchQuery = store.getState().searchQuery || '';
    this.siteLanguage = store.getState().siteLanguage;
    this.loadingData = false;
  }

  stateChanged(state) {
    super.stateChanged(state);
    if (this.siteLanguage !== state.siteLanguage) {
      this.siteLanguage = state.siteLanguage;
      this.#initInstantSearchData();
    }
  }

  async #initInstantSearchData() {
    try {
      this.loadingData = true;
      const { lastUpdatedDate } = store.getState().instantSearch;
      this.instant_search_data = store.getState().instantSearch?.data;
      if (lastUpdatedDate) {
        const lastUpdatedDateObj = new Date(lastUpdatedDate);
        const today = new Date();
        const diffTime = Math.abs(today - lastUpdatedDateObj);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        if (diffDays > 7) {
          await this.#fetchInstantSearchData();
        }
      }

      if (!this.instant_search_data || this.instant_search_data?.length === 0) {
        await this.#fetchInstantSearchData();
      }

      if (this.instant_search_data?.length > 0) {
        await insertMultiple(suttaDB, this.instant_search_data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      this.loadingData = false;
    }
  }

  async #fetchInstantSearchData() {
    const today = new Date();
    const { siteLanguage } = store.getState();
    this.instant_search_data = await (
      await fetch(`${API_ROOT}/possible_names/${siteLanguage}`)
    ).json();
    reduxActions.setInstantSearchLastUpdatedDate(today);
    reduxActions.setInstantSearchData(this.instant_search_data);
  }

  firstUpdated() {
    this.shadowRoot.getElementById('search_input').focus();

    this.addEventListener('keydown', event => {
      const currentSelectedItem = this.shadowRoot.querySelector('.selected');
      if (!currentSelectedItem) {
        return;
      }

      if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp' && event.key !== 'Enter') {
        const scAutoCompleteInput = this.shadowRoot.querySelector('#search_input');
        scAutoCompleteInput?.focus();
      }
    });
  }

  updated(changedProps) {
    if (changedProps.has('loadingData') && !this.loadingData && suttaDB.data.docs.count !== 0) {
      this.searchQuery = this.shadowRoot.getElementById('search_input').value;
      this.#instantSearch();
    }
  }

  render() {
    return html`${this.#suggestionsTemplate()}`;
  }

  #gotoSearch(event, uid, searchQuery) {
    if (event.type === 'click' || event.key === 'Enter') {
      this.hide();
      const searchTerm = uid ? `${uid} ${searchQuery}` : searchQuery;
      const link = `/search?query=${searchTerm}`;
      dispatchCustomEvent(this, 'sc-navigate', { pathname: link });
    }
  }

  #generateSearchURL(uid, searchQuery) {
    const searchTerm = uid ? `${uid} ${searchQuery}` : searchQuery;
    return `/search?query=${searchTerm}`;
  }

  hide() {
    this.style.display = 'none';
  }

  #generateURL(item) {
    const siteLang = store.getState().siteLanguage;
    let link = `/${item.uid}`;
    if (item.nodeType === 'leaf' && this.priorityAuthors?.get(siteLang)) {
      link = `/${item.uid}/${siteLang}/${this.priorityAuthors.get(siteLang)}`;
    }
    return link;
  }

  #suggestionsTemplate() {
    return html`
      <div id="instant_search_dialog" class="search-suggestions">
        <div class="ss-header">${this.#headerTemplate()}</div>
        <div class="ss-list">${this.#searchResultListTemplate()}</div>
        <div class="ss-footer" id="openSearchTip">${this.#footerTemplate()}</div>
      </div>
    `;
  }

  #headerTemplate() {
    return html`
      <md-filled-text-field
        id="search_input"
        type="search"
        label="Search in all texts"
        @keyup=${e => this.#keyupHandler(e)}
        @keypress=${this.#keypressHandler}
      >
        <md-icon slot="trailingicon" @click=${this.#startSearch}> ${icon.search} </md-icon>
      </md-filled-text-field>
    `;
  }

  #searchResultListTemplate() {
    const filters = [{ uid: 'in:ebs', title: 'Early Buddhist Suttas' }];
    return html`
      <ul id="instant-search-items">
        ${this.searchQuery &&
        filters.map(
          item => html`
            <li>
              <a
                class="search-suggestion-link"
                href=${this.#generateSearchURL(item.uid, this.searchQuery)}
                @click=${e => this.#gotoSearch(e, item.uid, this.searchQuery)}
              >
                <span class="search-suggestion">
                  <span class="search-suggestion-filter">${item.uid}</span>
                  <span class="search-suggestion-query">${this.searchQuery}</span>
                </span>

                <span class="search-suggestion-prompt">${icon.search}</span>
                <md-ripple></md-ripple>
              </a>
            </li>
          `
        )}
        <hr />
        <div class="instant-nav-description-text">
          Go to ${icon.open_book} text or ${icon.network_node} collection
        </div>
        ${this.items.map(
          item =>
            html` <li @click=${this.hide}>
              <a class="instant-nav-link" href=${this.#generateURL(item)}>
                <span class="instant-nav">
                  ${item.nodeType === 'branch' ? icon.network_node : icon.open_book}
                  <span class="instant-nav-uid">${item.uid}</span>
                  <span class="instant-nav-title">${item.title}</span>
                </span>

                <span class="instant-nav-prompt">${icon.arrow_right}</span>
                <md-ripple></md-ripple>
              </a>
            </li>`
        )}
      </ul>
    `;
  }

  #footerTemplate() {
    return html`
      <span id="opensearchtip-left">
        <md-icon-button
          aria-label="Tips for search syntax"
          href="/search-filter"
          @click=${this.hide}
        >
          ${icon.info}
        </md-icon-button>
        <span>Tips for search syntax</span>
      </span>
      <sc-progress .active=${this.loadingData} .type=${'circular'}></sc-progress>
      <md-icon-button @click=${this.hide}>${icon.close}</md-icon-button>
    </div>
    `;
  }

  #keypressHandler({ key }) {
    if (key === 'Enter') {
      this.#startSearch();
    }
  }

  #startSearch() {
    const searchQuery = this.shadowRoot.getElementById('search_input').value;
    if (searchQuery) {
      this.hide();
      dispatchCustomEvent(this, 'sc-navigate', { pathname: `/search?query=${searchQuery}` });
    }
  }

  async #keyupHandler(e) {
    if (e.key === 'Enter') {
      return;
    }
    if (suttaDB.data.docs.count === 0) {
      this.#initInstantSearchData();
    }

    if (this.loadingData) {
      return;
    }

    this.searchQuery = e.target.value;
    await this.#instantSearch();
  }

  async #instantSearch() {
    if (this.searchQuery.length >= 2) {
      const searchResult = await search(suttaDB, {
        term: this.searchQuery,
        properties: '*',
        tolerance: 1,
        limit: 20,
      });

      const { hits } = searchResult;
      const copiedHits = JSON.parse(JSON.stringify(hits));

      this.items = [];
      for (const hit of copiedHits) {
        this.items.push(hit.document);
      }
      this.#mergedResultByUid();
    } else {
      this.items = [];
    }
  }

  #mergedResultByUid() {
    const result = Object.values(
      this.items.reduce((acc, curr) => {
        if (acc[curr.uid]) {
          if (acc[curr.uid].isRoot !== curr.isRoot) {
            acc[curr.uid].title += ` – ${curr.title}`;
          }
        } else {
          acc[curr.uid] = curr;
        }
        return acc;
      }, {})
    );

    this.items = result;
  }
}

customElements.define('sc-auto-complete-list', SCAutoCompleteList);
