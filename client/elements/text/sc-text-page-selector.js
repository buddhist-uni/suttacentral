import { LitElement, html } from 'lit-element';

import './sc-text-bilara';
import './sc-text-legacy';
import './sc-text-stepper';
import './sc-text-image';
import '../addons/sc-error-icon';

import { store } from '../../redux-store';
import { LitLocalized } from '../addons/sc-localization-mixin';
import { API_ROOT } from '../../constants';

import { navIndex, RefreshNav } from '../navigation/sc-navigation-common';
import { dispatchCustomEvent } from '../../utils/customEvent';
/*
  This element makes a server request for a sutta text, dispatches it to the redux store and subsequently shows
  either the simple sutta text view or the segmented view.
*/

class SCTextPageSelector extends LitLocalized(LitElement) {
  render() {
    return html`
      <style>
        :host {
          display: flex;
          flex-direction: column;
        }

        .text-options {
          padding: var(--sc-size-lg);
        }

        .wrapper {
          min-height: calc(100vh - 336px);
          margin-bottom: 64px;
        }
      </style>

      <div class="wrapper">
        ${this.displaySimpleTextTemplate} ${this.displaySegmentedTextTemplate}
        ${this.displayErrorTemplate}
      </div>
      ${this.displayStepper}
      <sc-text-image id="sc_text_image"></sc-text-image>
      ${this._createMetaData(this.responseData, this.expansionReturns)}
    `;
  }

  get displayStepper() {
    return this._shouldDisplayStepper()
      ? html`
          <sc-text-stepper
            .next=${this.next}
            .previous=${this.previous}
            .lang="${this.langIsoCode}"
          ></sc-text-stepper>
        `
      : '';
  }

  get displayErrorTemplate() {
    return this._shouldDisplayError() && !this.isLoading
      ? html` <sc-error-icon type="${this.lastError.type || 'data-load-error'}"></sc-error-icon> `
      : '';
  }

  get displaySimpleTextTemplate() {
    return !this._shouldHideSimpleText()
      ? html`
          <sc-text-legacy
            id="simple_text"
            .sutta=${this.translatedSutta || this.rootSutta}
            .isLoading=${this.isLoading}
            .error=${this.lastError}
            ?hidden=${this._shouldHideSimpleText()}
          ></sc-text-legacy>
        `
      : '';
  }

  get displaySegmentedTextTemplate() {
    if (!this.responseData || !this.responseData.root_text) {
      return '';
    }
    return !this._shouldHideSegmentedText()
      ? html`
          <sc-text-bilara
            id="segmented_text"
            .rootSutta=${this.rootSutta}
            .bilaraRootSutta=${this.bilaraRootSutta}
            .markup="${this.suttaMarkup}"
            .translatedSutta=${this.translatedSutta}
            .bilaraTranslatedSutta=${this.bilaraTranslatedSutta}
            .suttaComment=${this.suttaComment}
            .suttaReference=${this.suttaReference}
            .suttaVariant=${this.suttaVariant}
            .suttaId=${this.suttaId}
          ></sc-text-bilara>
        `
      : '';
  }

  static get properties() {
    return {
      responseData: { type: Object },
      lastError: { type: Object },
      author: { type: String },
      suttaId: { type: String },
      langIsoCode: { type: String },
      isSegmentedText: { type: Boolean },
      suttaplex: { type: Object },
      translatedSutta: { type: Object },
      rootSutta: { type: Object },
      bilaraRootSutta: { type: Object },
      bilaraTranslatedSutta: { type: Object },
      bilaraSuttaKeysOrder: { type: Array },
      suttaReference: { type: Object },
      suttaComment: { type: Object },
      suttaVariant: { type: Object },
      suttaMarkup: { type: String },
      markup: { type: String },
      bilaraSuttaMarkup: { type: String },
      localizedStringsPath: { type: String },
      authorUid: { type: String },
      authorShort: { type: String },
      next: { type: Object },
      previous: { type: Object },
      expansionReturns: { type: Array },
      showedLanguagePrompt: { type: Boolean },
      isLoading: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.localizedStringsPath = '/localization/elements/interface';
    this.showedLanguagePrompt = store.getState().showedLanguagePrompt;
    this.siteLanguage = store.getState().siteLanguage;
    this.isLoading = false;
    this.actions.changeLinearProgressActiveState(this.isLoading);
    this.langIsoCode = store.getState().currentRoute.params.langIsoCode;
    this.authorUid = store.getState().currentRoute.params.authorUid;
    this.suttaId = store.getState().currentRoute.params.suttaId;
    this.SuttaParallelsDisplayed = false;
  }

  firstUpdated() {
    this._refreshData(true);
  }

  _refreshData(forceRefresh) {
    this._paramChanged();
    this.refreshing = true;
    RefreshNav(this.suttaId, forceRefresh);
    this.refreshing = false;
  }

  get actions() {
    return {
      downloadSuttaText(text) {
        store.dispatch({
          type: 'DOWNLOAD_SUTTA_TEXT',
          text,
        });
      },
      changeToolbarTitle(title) {
        store.dispatch({
          type: 'CHANGE_TOOLBAR_TITLE',
          title,
        });
      },
      setShowedLanguagePrompt() {
        store.dispatch({
          type: 'SET_SHOWED_LANGUAGE_PROMPT',
          showedLanguagePrompt: true,
        });
      },
      setNavigation(navArray) {
        store.dispatch({
          type: 'SET_NAVIGATION',
          navigationArray: navArray,
        });
      },
      setCurrentNavPosition(position) {
        store.dispatch({
          type: 'CHANGE_CURRENT_NAV_POSITION_STATE',
          currentNavPosition: position,
        });
      },
      changeLinearProgressActiveState(active) {
        store.dispatch({
          type: 'CHANGE_LINEAR_PROGRESS_ACTIVE_STATE',
          linearProgressActive: active,
        });
      },
    };
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('show-image', e => {
      const scTextImageElement = this.shadowRoot.querySelector('#sc_text_image');
      if (scTextImageElement) {
        scTextImageElement.showImage(e.detail);
      }
    });
  }

  async _updateNav() {
    if (!this.responseData || this.refreshing) {
      return;
    }
    const navIndexesOfType = navIndex.get('sutta');
    this.navArray = store.getState().navigationArray;
    let suttaTitle = this.responseData.translation ? this.responseData.translation.title : '';
    if (!suttaTitle) {
      suttaTitle =
        this.responseData.suttaplex.translated_title || this.responseData.suttaplex.original_title;
    }
    suttaTitle = this.responseData.suttaplex.acronym || suttaTitle;
    if (suttaTitle && suttaTitle.includes('//')) {
      const acronyms = suttaTitle.split('//');
      if (acronyms.length === 2) {
        suttaTitle = acronyms[0];
      }
    }
    this.navArray[navIndexesOfType.index] = {
      title: suttaTitle,
      url: store.getState().currentRoute.path,
      type: navIndexesOfType.type,
      position: navIndexesOfType.position,
      groupId: this.responseData.root_text
        ? this.responseData.root_text?.uid
        : this.responseData.translation?.uid,
      groupName: this.responseData.root_text
        ? this.responseData.root_text?.title
        : this.responseData.translation?.title,
      navigationArrayLength: navIndexesOfType.navArrayLength,
    };

    this.actions.setNavigation(this.navArray);
    this.actions.setCurrentNavPosition(navIndexesOfType.position);
  }

  updated(changedProps) {
    super.updated(changedProps);
    if (changedProps.has('responseData')) {
      this._onResponse();
    }
  }

  _stateChanged(state) {
    super._stateChanged(state);
    if (
      state.currentRoute.params.langIsoCode !== this.langIsoCode &&
      state.currentRoute.params.langIsoCode
    ) {
      this.langIsoCode = state.currentRoute.params.langIsoCode;
      this._paramChanged();
    }
    if (
      state.currentRoute.params.authorUid !== this.authorUid &&
      state.currentRoute.params.authorUid
    ) {
      this.authorUid = state.currentRoute.params.authorUid;
      this._paramChanged();
    }
    if (state.currentRoute.params.suttaId !== this.suttaId && state.currentRoute.params.suttaId) {
      this.suttaId = state.currentRoute.params.suttaId;
      this._refreshData(false);
    }
    if (this.siteLanguage !== state.siteLanguage) {
      this.siteLanguage = state.siteLanguage;
      this._refreshData(true);
    }
  }

  languageLoaded() {
    if (this.langIsoCode !== 'en' && !this.showedLanguagePrompt) {
      this.actions.setShowedLanguagePrompt();
      this._showLanguagePromptToast();
    }
  }

  _onResponse() {
    if (!this.responseData) {
      return;
    }
    this.setProperties();
    this.actions.downloadSuttaText(this.responseData);
    if (!this.responseData.root_text && !this.responseData.translation) {
      this.lastError = {
        type: 'data-load-error',
      };
    } else {
      this.lastError = null;
    }
  }

  setProperties() {
    if (this.responseData) {
      this.isSegmentedText = !!this.responseData.segmented;
      this.suttaplex = this.responseData.suttaplex;
      this._bindDataToSCSuttaParallels(this.suttaId);
      this.translatedSutta = this.responseData.translation;
      this.rootSutta = this.responseData.root_text;
      if (!this.responseData.root_text && !this.responseData.translation) {
        this.showParallelsTopSheet();
        const bilaraRootText = this.responseData.bilara_root_text;
        dispatchCustomEvent(this, 'sc-navigate', {
          pathname: `/${bilaraRootText.uid}/${bilaraRootText.lang}/${bilaraRootText.author_uid}`,
        });
        return;
      }
      if (
        !this.responseData.translation &&
        this.responseData.root_text &&
        (this.langIsoCode !== 'pli' || this.langIsoCode !== 'lzh')
      ) {
        this.showParallelsTopSheet();
      }
      if (this.translatedSutta) {
        this.next = this.translatedSutta.next;
        this.previous = this.translatedSutta.previous;
      } else if (this.rootSutta) {
        this.next = this.rootSutta.next;
        this.previous = this.rootSutta.previous;
      }
    }

    if (this.next && !this.next.name) {
      this.next.name = this._transformId(this.next.uid, this.expansionReturns);
    }
    if (this.previous && !this.previous.name) {
      this.previous.name = this._transformId(this.previous.uid, this.expansionReturns);
    }

    this._getBilaraText();
    this._updateNav();
  }

  showParallelsTopSheet() {
    if (!this.SuttaParallelsDisplayed) {
      this.SuttaParallelsDisplayed = true;
      const scSiteLayout = document.querySelector('sc-site-layout');
      scSiteLayout?.shadowRoot.querySelector('#action_items')?.showParallelsTopSheet();
    }
  }

  _bindDataToSCSuttaParallels(uid) {
    const url = `${API_ROOT}/suttaplex/${uid}?language=${this.siteLanguage}`;
    fetch(url)
      .then(r => r.json())
      .then(suttaplex => {
        this.dispatchEvent(
          new CustomEvent('bind-data-to-sc-sutta-parallels', {
            detail: {
              suttaplexItem: suttaplex[0],
            },
            bubbles: true,
            composed: true,
          })
        );
      })
      .catch(e => console.error(e));
  }

  _getSuttaTextUrl() {
    if (this.authorUid) {
      return `${API_ROOT}/suttas/${this.suttaId}/${this.authorUid}?lang=${this.langIsoCode}&siteLanguage=${this.siteLanguage}`;
    }
    return `${API_ROOT}/suttas/${this.suttaId}?lang=${this.langIsoCode}&siteLanguage=${this.siteLanguage}`;
  }

  _getBilaraTextUrl() {
    if (this.authorUid) {
      return `${API_ROOT}/bilarasuttas/${this.suttaId}/${this.authorUid}?lang=${this.langIsoCode}`;
    }
    return `${API_ROOT}/bilarasuttas/${this.suttaId}?lang=${this.langIsoCode}`;
  }

  async _fetchSuttaText() {
    this.isLoading = true;
    this.actions.changeLinearProgressActiveState(this.isLoading);
    try {
      this.responseData = await (await fetch(this._getSuttaTextUrl())).json();
    } catch (error) {
      this.lastError = error;
    }
    this.isLoading = false;
    this.actions.changeLinearProgressActiveState(this.isLoading);
  }

  async _fetchBilaraText() {
    if (!this.suttaId) {
      return;
    }
    this.isLoading = true;
    this.actions.changeLinearProgressActiveState(this.isLoading);
    try {
      const bilaraData = await (await fetch(this._getBilaraTextUrl())).json();
      this.bilaraRootSutta = bilaraData.root_text;
      this.bilaraTranslatedSutta = bilaraData.translation_text;
      this.bilaraSuttaMarkup = bilaraData.html_text;
      this.bilaraSuttaKeysOrder = bilaraData.keys_order;
      this.suttaReference = bilaraData.reference_text;
      this.suttaComment = bilaraData.comment_text;
      this.suttaVariant = bilaraData.variant_text;
    } catch (error) {
      this.lastError = error;
    }
    this.isLoading = false;
    this.actions.changeLinearProgressActiveState(this.isLoading);
  }

  _getBilaraText() {
    this._generateMarkup();
  }

  async _generateMarkup() {
    await this._fetchBilaraText();
    if (!this.bilaraSuttaMarkup) {
      return;
    }

    let suttaMarkup = '';

    this.bilaraSuttaKeysOrder.forEach(key => {
      if (key !== '~') {
        const value = this.bilaraSuttaMarkup[key];
        if (value.includes('{}')) {
          suttaMarkup += value.replace(/{}/, `<span class="segment" id="${key}"></span>`);
        } else {
          suttaMarkup += value + `<span class="segment" id="${key}"></span>`;
        }
      } else {
        suttaMarkup += value;
      }
    });
    suttaMarkup = suttaMarkup.replace(/<article>/, '<article><header>');
    suttaMarkup = suttaMarkup.replace(/<\/h1><\/div>/, '</h1></div></header>');
    suttaMarkup = suttaMarkup.replace(/{}/g, '');
    this.suttaMarkup = suttaMarkup;
  }

  _getExpansionUrl() {
    return `${API_ROOT}/expansion`;
  }

  async _fetchExpansion() {
    this.isLoading = true;
    this.actions.changeLinearProgressActiveState(this.isLoading);
    try {
      this.expansionReturns = await (await fetch(this._getExpansionUrl())).json();
    } catch (error) {
      this.lastError = error;
    }
    this.isLoading = false;
    this.actions.changeLinearProgressActiveState(this.isLoading);
  }

  _paramChanged() {
    setTimeout(() => {
      if (!this.expansionReturns) {
        this._fetchExpansion();
      }
      this._fetchSuttaText();
    }, 50);
  }

  _shouldHideSimpleText() {
    return this.isSegmentedText === undefined || this.isSegmentedText || this.isLoading;
  }

  _shouldHideSegmentedText() {
    return this.isSegmentedText === undefined || !this.isSegmentedText || this.isLoading;
  }

  _shouldDisplayStepper() {
    return !this.isLoading && (this.next || this.previous);
  }

  _shouldDisplayError() {
    return this.lastError;
  }

  _createMetaData(responseData, expansionReturns) {
    if (!responseData || !responseData.translation) {
      return;
    }
    let description = this.localize('text:metaDescriptionText');
    if (responseData.suttaplex.blurb) {
      description = responseData.suttaplex.blurb;
    }
    let title = responseData.suttaplex ? responseData.suttaplex.original_title : '';
    if (!title) {
      title = responseData.root_text
        ? responseData.root_text.title
        : responseData.translation.title;
    }

    const rootTextAuthor = responseData.root_text ? responseData.root_text.author : '';
    const author = responseData.translation ? responseData.translation.author : rootTextAuthor;
    const acronym = responseData.suttaplex.acronym
      ? responseData.suttaplex.acronym.split(/\/\//)[0]
      : this._transformId(responseData.suttaplex.uid, expansionReturns);

    document.dispatchEvent(
      new CustomEvent('metadata', {
        detail: {
          pageTitle: `${acronym}: ${title}—${author}`,
          title: `${title}—${author}`,
          description: description,
          openGraphType: 'article', // To conform to the twitter cards and pinterest specification, "og:type" must be equal to ‘article’
          bubbles: true,
          composed: true,
        },
      })
    );

    if (!title) {
      title = this._transformId(this.suttaId, this.expansionReturns);
    }
    this.actions.changeToolbarTitle(`${title} — ${author}`);
  }

  _transformId(rootId, expansionReturns) {
    if (!rootId || !expansionReturns) {
      return '';
    }
    let scAcronym = '';
    const uidParts = rootId.split('-');
    let tail = '';
    try {
      uidParts.forEach(item => {
        if (!expansionReturns[0][item]) {
          const tailMatch = item.match(/\d+.*/g);
          if (tailMatch) tail = tailMatch[0] + '–';
          const itemMatch = item.match(/[a-z]*/g);
          if (itemMatch) item = itemMatch[0];
        }
        if (item && expansionReturns[0][item]) {
          scAcronym += `${expansionReturns[0][item][0]} ${tail}`;
        } else {
          scAcronym += tail;
        }
      });
      return scAcronym.replace(/–\s*$/, '');
    } catch (e) {
      console.error(e);
      return rootId;
    }
  }

  _showLanguagePromptToast() {
    this.dispatchEvent(
      new CustomEvent('show-sc-toast', {
        detail: {
          toastType: 'info',
          message: this.localize('text:languagePromptMessage'),
        },
        bubbles: true,
        composed: true,
      })
    );
  }
}

customElements.define('sc-text-page-selector', SCTextPageSelector);
