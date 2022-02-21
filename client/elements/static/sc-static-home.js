import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

import { SCStaticPage } from '../addons/sc-static-page';
import { API_ROOT } from '../../constants';
import '../navigation/sc-navigation-tipitaka';
import { icon } from '../../img/sc-icon';
import { staticHomeStyles } from '../styles/sc-static-home-styles';

class SCStaticHomePage extends SCStaticPage {
  static get properties() {
    return {
      randomEpigrah: { type: String },
      whyWeRead: { type: String },
    };
  }

  constructor() {
    super();
    this.localizedStringsPath = '/localization/elements/home';
  }

  firstUpdated() {
    this._getRandomQuote();
  }

  async _getRandomQuote() {
    const getRandomEl = arr => arr[Math.floor(Math.random() * arr.length)];

    const epigraphResponse = await (await fetch(`${API_ROOT}/epigraphs`)).json();
    this.randomEpigrah = getRandomEl(epigraphResponse);
    const whyReadResponse = await (await fetch(`${API_ROOT}/whyweread`)).json();
    this.whyWeRead = getRandomEl(whyReadResponse);
  }

  createRenderRoot() {
    return this;
  }

  render() {
    return html`
      <style>
        ${staticHomeStyles}
      </style>
      <main>
        <section class="tipitaka-section">
          <h2>${unsafeHTML(this.localize('home:1'))}</h2>
        </section>
        <sc-navigation-tipitaka></sc-navigation-tipitaka>

        <section class="top-two">
          <section class="video">
            <video
              title=${this.localize('home:2')}
              width="640"
              height="360"
              controls
              preload="none"
              poster="/img/home-page/video_overlay.jpg"
            >
              <source
                src="https://ia601508.us.archive.org/20/items/sutta-central-promo-2020-en.av-1/SuttaCentral_Promo-2020_en.av1.mp4"
                type="video/mp4"
              />
              <source
                src="https://ia601508.us.archive.org/12/items/sutta-central-promo-2020-en-vp-9/SuttaCentral_Promo-2020_en_VP9.webm"
                type="video/webm"
              />
              <source
                src="https://ia801504.us.archive.org/23/items/sutta-central-promo-2020-en-x-264/SuttaCentral_Promo-2020_en_x264.mp4"
                type="video/mp4"
              />
            </video>
          </section>
          <section class="plain" style="min-height: 134px">
            <p>${unsafeHTML(this.localize('home:3'))}</p>
            <p>${unsafeHTML(this.localize('home:4'))}</p>
          </section>
        </section>

        <section class="plain quotation">
          <h2>${unsafeHTML(this.localize('home:5'))}</h2>
          <blockquote>
            <span>${this.randomEpigrah ? this.randomEpigrah.epigraph : ''}</span>
          </blockquote>
          <a
            class="link-button quote-button ripple"
            href=${this.randomEpigrah ? `/${this.randomEpigrah.uid}` : ''}
          >
            ${unsafeHTML(this.localize('home:6'))}
          </a>
        </section>

        <section class="two-cards">
          <article>
            <figure>
              <picture>
                <source srcset="/img/home-page/pali1.avif" type="image/avif" />
                <img src="/img/home-page/pali1.jpg" alt="Pali manuscript" style="width:100%" />
              </picture>
              <figcaption>${unsafeHTML(this.localize('home:7'))}</figcaption>
            </figure>
            <div class="card-content">
              <div class="card-text">
                <h2>${unsafeHTML(this.localize('home:8'))}</h2>
                <p>${unsafeHTML(this.localize('home:9'))}</p>
              </div>
              <div class="card-actions">
                <a href="/introduction" class="link-button"
                  >${unsafeHTML(this.localize('home:10'))}</a
                >
              </div>
            </div>
          </article>

          <article>
            <figure>
              <picture>
                <source srcset="/img/home-page/koreana.avif" type="image/avif" />
                <img
                  src="/img/home-page/koreana.jpg"
                  alt="Chinese Buddhist woodblock"
                  style="width:100%"
                />
              </picture>
              <figcaption>${unsafeHTML(this.localize('home:11'))}</figcaption>
            </figure>
            <div class="card-content">
              <div class="card-text">
                <h2>${unsafeHTML(this.localize('home:12'))}</h2>
                <p>${unsafeHTML(this.localize('home:13'))}</p>
              </div>
              <div class="card-actions">
                <a href="/start" class="link-button">${unsafeHTML(this.localize('home:14'))}</a>
              </div>
            </div>
          </article>
        </section>

        <section class="sc-related">
          <div class="related-projects-heading">
            <h2>${unsafeHTML(this.localize('home:15'))}</h2>
          </div>
          <div class="sc-related-items-wrapper">
            <article class="card dark-accent">
              <a
                href="https://voice.suttacentral.net/scv/index.html#/sutta"
                target="_blank"
                rel="noopener"
                title=${this.localize('home:16')}
              >
                <header>
                  <span>${icon.speaker}</span>
                  <h3>
                    <span>SuttaCentral Voice</span>
                    <span class="sc-related-item-subtitle"
                      >${unsafeHTML(this.localize('home:17'))}</span
                    >
                  </h3>
                </header>
              </a>
              <div class="related-projects-content">
                <p>${unsafeHTML(this.localize('home:18'))}</p>
                <ul>
                  <li>${unsafeHTML(this.localize('home:19'))}</li>
                  <li>${unsafeHTML(this.localize('home:20'))}.</li>
                </ul>
              </div>
            </article>
            <article class="card secondary-accent">
              <a
                href="https://buddhanexus.net/"
                target="_blank"
                rel="noopener"
                title=${this.localize('home:21')}
              >
                <header>
                  <span>
                    <picture>
                      <source srcset="/img/home-page/buddhanexus_logo.avif" type="image/avif" />
                      <img src="/img/home-page/buddhanexus_logo.png" alt="Buddhanexus logo" />
                    </picture>
                  </span>
                  <h3>
                    <span>BuddhaNexus</span>
                    <span class="sc-related-item-subtitle"
                      >${unsafeHTML(this.localize('home:22'))}</span
                    >
                  </h3>
                </header>
              </a>
              <div class="related-projects-content">
                <p>${unsafeHTML(this.localize('home:23'))}</p>
              </div>
            </article>
            <article class="card primary-color">
              <a
                href="https://discourse.suttacentral.net/"
                target="_blank"
                rel="noopener"
                title=${this.localize('home:24')}
              >
                <header>
                  <span>${icon.people}</span>
                  <h3>
                    <span>Discuss & Discover</span>
                    <span class="sc-related-item-subtitle"
                      >${unsafeHTML(this.localize('home:25'))}</span
                    >
                  </h3>
                </header>
              </a>
              <div class="related-projects-content">
                <p>${unsafeHTML(this.localize('home:26'))}</p>
                <ul>
                  <li>${unsafeHTML(this.localize('home:27'))}</li>
                  <li>${unsafeHTML(this.localize('home:28'))}</li>
                  <li>${unsafeHTML(this.localize('home:29'))}</li>
                </ul>
              </div>
            </article>
            <article class="card primary-accent">
              <a
                href="https://bilara.suttacentral.net/"
                target="_blank"
                rel="noopener"
                title=${this.localize('home:30')}
              >
                <header>
                  <span>${icon.bilara}</span>
                  <h3>
                    <span>Bilara</span>
                    <span class="sc-related-item-subtitle"
                      >${unsafeHTML(this.localize('home:31'))}</span
                    >
                  </h3>
                </header>
              </a>
              <div class="related-projects-content">
                <p>${unsafeHTML(this.localize('home:32'))}</p>
              </div>
            </article>
          </div>
        </section>

        <section class="plain quotation">
          <h2>${unsafeHTML(this.localize('home:33'))}</h2>
          <blockquote>
            <span>${this.whyWeRead}</span>
          </blockquote>
          <a
            class="link-button quote-button"
            href="https://discourse.suttacentral.net/t/why-we-read-tell-us-why-you-read-suttas/6747"
          >
            ${unsafeHTML(this.localize('home:34'))}
          </a>
        </section>

        <section class="two-cards">
          <article>
            <figure>
              <picture>
                <source srcset="/img/home-page/pali6.avif" type="image/avif" />
                <img
                  src="/img/home-page/pali6.jpg"
                  alt="Pali manuscript from Myanmar"
                  style="width:100%"
                />
              </picture>
              <figcaption>${unsafeHTML(this.localize('home:35'))}</figcaption>
            </figure>
            <div class="card-content">
              <div class="card-text">
                <h2>${unsafeHTML(this.localize('home:36'))}</h2>
                <p>${unsafeHTML(this.localize('home:37'))}</p>
              </div>
              <div class="card-actions">
                <a href="/general-guide-sujato" class="link-button"
                  >${unsafeHTML(this.localize('home:38'))}</a
                >
              </div>
            </div>
          </article>

          <article>
            <figure>
              <picture>
                <source srcset="/img/home-page/bhikkhuni.avif" type="image/avif" />
                <img src="/img/home-page/bhikkhuni.jpg" alt="Pali manuscript" style="width:100%" />
              </picture>
              <figcaption>${unsafeHTML(this.localize('home:39'))}</figcaption>
            </figure>
            <div class="card-content">
              <div class="card-text">
                <h2>${unsafeHTML(this.localize('home:40'))}</h2>
                <p>${unsafeHTML(this.localize('home:41'))}</p>
              </div>
              <div class="card-actions">
                <a href="/subjects" class="link-button">${unsafeHTML(this.localize('home:42'))}</a>
              </div>
            </div>
          </article>
        </section>
      </main>
      <footer>
        <style>
          footer {
            background-color: var(--sc-tertiary-background-color);
            padding: 4em 4vw;
          }
          .footer-top {
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            flex-direction: row;
            justify-content: space-around;
            align-items: left;
            align-items: stretch;
            gap: 2em;
          }
          .footer-top div {
            flex: 1;
            min-width: 16em;
          }

          footer ul {
            padding: 0;
          }

          footer li {
            padding: 1em 0 0 0;

            list-style-type: none;
          }

          .footer-bottom {
            display: flex;
            flex-direction: row;
            justify-content: space-around;
            text-align: center;
          }

          .footer-bottom li {
            display: inline-block;
            padding: 1em 2em 0 2em;
          }
        </style>
        <section class="footer-top">
          <div class="first">
            <h2>Useful things</h2>
            <ul>
              <li>Introduction to SuttaCentral</li>
              <li>Getting started with reading suttas</li>
              <li>Discourses: conversations with the Buddha</li>
              <li>Reader’s Guides</li>
              <li>Indexes</li>
            </ul>
          </div>
          <div class="second">
            <h2>Technical information</h2>
            <ul>
              <li>Statistics for languages on SuttaCentral</li>
              <li>Sutta numbering systems</li>
              <li>Methodology for parallels</li>
              <li>Source code on Github</li>
            </ul>
          </div>
          <div class="third">
            <h2>Related projects</h2>
            <ul>
              <li>Discuss and Discover—SuttaCentral forum</li>
              <li>SuttaCentral Voice—listen to suttas</li>
              <li>BuddhaNexus—mapping suttas with AI</li>
              <li>
                Reading Faithfully—Devotional and contemplative sutta reading for the faithful
                disciple
              </li>
            </ul>
          </div>
        </section>
        <section class="footer-bottom">
          <ul>
            <li>Home</li>
            <li>Acknowledgements</li>
            <li>Licensing</li>
            <li>About</li>
          </ul>
        </section>
      </footer>
    `;
  }
}

customElements.define('sc-static-home', SCStaticHomePage);
