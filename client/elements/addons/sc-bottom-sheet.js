import { LitElement, html, css } from 'lit';
import { icon } from '../../img/sc-icon';

export class SCBottomSheet extends LitElement {
  static properties = {
    currentDefine: { type: String },
    currentDefineDetail: { type: String },
    currentTarget: { type: Object },
    lookup: { type: Object },
    defineURL: { type: String },
  };

  static styles = css`
    :host {
      font-family: var(--sc-sans-font);

      position: fixed;
      z-index: 100;
      bottom: 0;

      width: 100%;
      margin: 0;

      background-color: var(--sc-secondary-background-color);
      box-shadow: var(--sc-shadow-elevation-2dp);

      display: none;
    }

    body,
    main,
    article,
    header,
    footer {
      display: flex;
    }

    header {
      position: relative;

      height: 32px;
      padding: 0 var(--sc-size-md);

      color: var(--sc-primary-background-color);
      background-color: var(--sc-secondary-text-color);

      justify-content: space-between;
      align-items: center;
    }

    header div {
      display: flex;
      flex-direction: row;

      align-items: center;
    }

    details {
      font-size: var(--sc-skolar-font-size-s);

      font-stretch: condensed;

      z-index: 1;

      max-width: 720px;

      color: var(--sc-primary-background-color);
      background-color: var(--sc-secondary-text-color);
    }

    details ul {
      margin-right: 1em;
    }

    details a {
      color: inherit;

      text-decoration: underline;
      text-decoration-color: var(--sc-primary-color-light);
      text-decoration-thickness: 0.15em;
      text-underline-offset: 0.06em;

      transition: all 200ms ease;
    }

    details a:hover {
      text-decoration-color: var(--sc-primary-color);
      text-decoration-thickness: 0.15em;
      text-underline-offset: 0.06em;

      background-color: var(--sc-primary-color-light-transparent);
    }

    details a:active {
      background-color: var(--sc-primary-color-light);
    }

    details a:visited {
      text-decoration-color: var(--sc-primary-color-dark);
    }

    summary {
      white-space: nowrap;
    }

    details > summary {
      position: relative;

      display: flex;

      padding: 2px 8px;

      list-style: none;

      cursor: pointer;
    }

    summary {
      list-style-type: none;
    }

    details .help-display-inner {
      position: absolute;
      z-index: 1000;
      right: 3vw;
      bottom: 48px;

      max-width: 720px;
      margin-left: 3vw;

      border-radius: 4px;
      background-color: var(--sc-secondary-text-color);
      box-shadow: var(--sc-shadow-elevation-8dp);
    }

    .bottom-sheet-icon-label {
      font-family: 'Skolar Sans PE Compressed', var(--sc-sans-font);
      font-weight: 500;

      margin-left: 4px;

      align-self: center;
    }

    header button {
      width: 100%;

      border: none;
      background: none;
    }

    #btnClose {
      font-size: var(--sc-skolar-font-size-s);

      font-stretch: condensed;
      display: flex;

      padding: 2px 8px;

      cursor: pointer;

      color: inherit;
    }

    .icon {
      fill: var(--sc-icon-color);
    }

    header > dfn {
      font-size: var(--sc-skolar-font-size-s);
      line-height: 1.333;

      padding: 0 var(--sc-size-sm);

      color: rgb(34, 33, 32);
      background-color: var(--sc-primary-color-light);
    }

    main {
      justify-content: center;
    }

    article {
      overflow-x: hidden;
      overflow-y: auto;

      box-sizing: border-box;
      width: 960px;
      height: 120px;
      margin: 0 3vw;
      padding: 0;
    }

    dl {
      font-size: var(--sc-skolar-font-size-s);

      margin: 0;
    }

    dd {
      display: grid;

      margin: 0;

      grid-row-start: 2;
      grid-auto-rows: min-content;
    }

    dd a {
      text-decoration: underline;
    }

    .entry a {
      font-weight: bold;

      display: inline-block;

      height: 100%;
      padding: 0 var(--sc-size-sm);

      color: rgb(34, 33, 32);
      background-color: var(--sc-primary-color-light);

      text-decoration-color: white;
      text-decoration-thickness: 0.15em;
      text-underline-offset: 0.06em;

      transition: all 200ms ease;
    }

    .entry a:hover {
      background-color: var(--sc-primary-accent-color-light);

      text-decoration-color: white;
      text-decoration-thickness: 0.15em;
      text-underline-offset: 0.06em;
    }

    .grammar {
      font-size: var(--sc-skolar-font-size-xs);

      font-style: italic;

      color: var(--sc-secondary-text-color);
    }

    .definition {
      margin: 0;
      padding: 0;

      counter-reset: definition-item-counter;

      grid-row: 1;
    }

    .definition li {
      line-height: 1.125;

      display: inline-flex;

      margin-right: 1em;
      margin-bottom: 4px;

      align-items: baseline;
      gap: 0.5em;
    }

    .definition li::before {
      font-size: var(--sc-skolar-font-size-xxs);
      font-weight: bold;

      display: inline-flex;

      width: 1em;
      height: 1em;

      content: ' ' counter(definition-item-counter) '';
      counter-increment: definition-item-counter;

      color: var(--sc-secondary-text-color);
      border: 2px solid var(--sc-icon-color);
      border-radius: 50%;

      justify-content: center;
      align-items: center;
      flex-shrink: 0;
    }

    .xr {
      font-size: var(--sc-skolar-font-size-xs);

      margin: 0;
      padding: 0;
    }

    .xr li {
      display: inline-flex;

      gap: 1em;
    }

    .xr a {
      color: var(--sc-secondary-text-color);

      text-decoration-color: var(--sc-primary-color);
    }

    .xr a:before {
      content: 'See: ';
    }

    .xr a:hover {
      color: var(--sc-primary-color);
    }

    footer {
      box-sizing: border-box;
      height: 48px;

      border-top: 1px solid rgba(0, 0, 0, 0.12);
    }

    footer div {
      position: relative;

      width: 50%;

      text-align: center;

      transition: background-color 200ms ease;
    }

    footer div:hover {
      background-color: var(--sc-tertiary-background-color);

      transition: background-color 200ms ease;
    }

    footer div:active {
      background-color: var(--sc-border-color);

      transition: background-color 200ms ease;
    }

    #next {
      border-left: 1px solid var(--sc-border-color);
    }

    footer button {
      font-size: 2em;

      width: 100%;
      height: 100%;
      padding-bottom: 10px;

      cursor: pointer;

      color: var(--sc-icon-color);
      border: none;
      outline: none;
      background: none;
    }

    #btnNext {
      border-left: 1px solid rgba(0, 0, 0, 0.14);
    }

    @keyframes bottomSheetShow {
      from {
        bottom: -200px;
      }

      to {
        bottom: 0;
      }
    }

    @keyframes bottomSheetHide {
      from {
        bottom: 0;
      }

      to {
        bottom: -200px;
      }
    }

    .lookup-next-previous {
      fill: var(--sc-icon-color);
    }

    ul {
      margin: 0px;
      padding: 0px;
      list-style-type: none;
    }
  `;

  constructor() {
    super();
    this.currentDefine = '';
    this.currentDefineDetail = '';
    this.currentTarget = {};
    this.lookup = {};
    this.defineURL = '';
    this.chinesePunctuation = '，,!！?？;；:：（()）[]【 】。「」﹁﹂"、‧《》〈〉﹏—『』';
  }

  render() {
    return html`
      <div id="wrapper">
        <header>
          <dfn>${this.currentDefine}</dfn>
          <div>
            <details class="help-display">
              <summary>
                ${icon.help}
                <span class="bottom-sheet-icon-label">Help</span>
              </summary>
              <div class="help-display-inner">
                <ul>
                  <li>
                    Source:
                    <cite>New Concise Pali-English Dictionary</cite>, compiled by SuttaCentral from
                    Buddhadatta’s <cite>Concise Pali-English Dictionary</cite>, updated and
                    corrected from Margaret Cone’s <cite>Dictionary of Pali</cite>.
                  </li>
                  <li>Pali words are analyzed by machine and results are not always accurate.</li>
                  <li>Click on a head word to go to full dictionary entry.</li>
                  <li>
                    Navigate using keyboard.
                    <ul>
                      <li>
                        Next =
                        <kbd>Alt</kbd>
                        +
                        <kbd>n</kbd>
                      </li>
                      <li>
                        Back =
                        <kbd>Alt</kbd>
                        +
                        <kbd>b</kbd>
                      </li>
                    </ul>
                    If this doesn’t work for you, check the
                    <a
                      href="https://en.wikipedia.org/wiki/Access_key#Access_in_different_browsers"
                      target="_blank"
                    >
                      HTML access key for your browser
                    </a>
                    .
                  </li>
                </ul>
              </div>
            </details>
            <button id="btnClose" @click=${this.hide}>
              ${icon.cancel}
              <span class="bottom-sheet-icon-label">Close</span>
            </button>
          </div>
        </header>
        <main>
          <article>${this.currentDefineDetail}</article>
        </main>
        <footer>
          <div>
            <button accesskey="b" id="btnPrevious" @click=${this._previous}>
              ${icon.arrow_left}
            </button>
          </div>
          <div>
            <button accesskey="n" id="btnNext" @click=${this._next}>${icon.arrow_right}</button>
          </div>
        </footer>
      </div>
    `;
  }

  hide() {
    this.style.animation = 'bottomSheetHide 200ms 1 ease-in normal forwards';
    setTimeout(() => {
      this.style.display = 'none';
    }, 100);
  }

  show() {
    this.style.display = 'block';
    this.style.animation = 'bottomSheetShow 200ms 1 ease-in normal forwards';
  }

  _previous() {
    const focusedWordId = this.currentTarget.id.slice(5);
    if (focusedWordId && parseInt(focusedWordId, 10) !== 0) {
      let previousWord = this.parentNode.querySelector(`#word_${parseInt(focusedWordId, 10) - 1}`);
      if (this.chinesePunctuation.includes(previousWord.textContent)) {
        previousWord = this.parentNode.querySelector(`#word_${parseInt(focusedWordId, 10) - 2}`);
      }
      if (previousWord) {
        this._setProperties(previousWord);
      }
    }
  }

  _next() {
    const focusedWordId = this.currentTarget.id.slice(5);
    if (focusedWordId) {
      let nextWord = this.parentNode.querySelector(`#word_${parseInt(focusedWordId, 10) + 1}`);
      if (this.chinesePunctuation.includes(nextWord.textContent)) {
        nextWord = this.parentNode.querySelector(`#word_${parseInt(focusedWordId, 10) + 2}`);
      }
      if (nextWord) {
        this._setProperties(nextWord);
      }
    }
  }

  _removeDefineFocusedClass() {
    this.parentNode.querySelectorAll('.spanFocused').forEach(dfElement => {
      dfElement.classList.remove('spanFocused');
    });
  }

  _setProperties(nextDefineElement) {
    this._removeDefineFocusedClass();
    let keyword = '';
    if (this.lookup.id === 'chinese_lookup') {
      keyword =
        this.getSentenceText() ||
        nextDefineElement.dataset.latin_text ||
        nextDefineElement.textContent;
    } else {
      keyword = nextDefineElement.dataset.latin_text || nextDefineElement.textContent;
    }
    this.currentDefine = keyword;
    const lookupResult = this.lookup.lookupWord(keyword);
    this.currentDefineDetail = lookupResult.html;
    nextDefineElement.classList.add('spanFocused');
    this.currentTarget = nextDefineElement;
  }

  getSentenceText() {
    const sentenceTexts = [];
    sentenceTexts.push(this.currentTarget.textContent);
    this.currentTarget.classList.add('spanFocused');
    let focusedWordId = this.currentTarget.id.slice(5);
    if (focusedWordId) {
      const backwardSteps = 3;
      const forwardSteps = 3;
      focusedWordId = parseInt(focusedWordId, 10);

      for (let i = focusedWordId - 1; i > focusedWordId - backwardSteps; i--) {
        const previousWord = this.currentTarget.parentNode.querySelector(
          `#word_${parseInt(i, 10)}`
        );
        if (previousWord) {
          if (!this.chinesePunctuation.includes(previousWord.textContent)) {
            sentenceTexts.unshift(previousWord.textContent);
            previousWord.classList.add('spanFocused');
          } else {
            break;
          }
        }
      }

      for (let i = focusedWordId + 1; i < focusedWordId + forwardSteps; i++) {
        const nextWord = this.currentTarget.parentNode.querySelector(`#word_${parseInt(i, 10)}`);
        if (nextWord) {
          if (!this.chinesePunctuation.includes(nextWord.textContent)) {
            sentenceTexts.push(nextWord.textContent);
            nextWord.classList.add('spanFocused');
          } else {
            break;
          }
        }
      }
    }

    return sentenceTexts?.join('');
  }

  updated(changedProps) {
    super.updated(changedProps);
    if (changedProps.has('currentDefineDetail')) {
      if (this.currentDefineDetail === '') {
        return;
      }
      const template = this.currentDefineDetail;
      const newDiv = document.createElement('div');
      newDiv.innerHTML = template;
      const defineAElement = newDiv.querySelector('div a');
      if (defineAElement) {
        this.defineURL = defineAElement.href;
      }
    }
  }
}

customElements.define('sc-bottom-sheet', SCBottomSheet);
