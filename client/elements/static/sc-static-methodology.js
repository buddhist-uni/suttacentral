import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

import { layoutSimpleStyles } from '../styles/sc-layout-simple-styles';
import { typographyCommonStyles } from '../styles/sc-typography-common-styles';
import { typographyStaticStyles } from '../styles/sc-typography-static-styles';
import { SCStaticPage } from '../addons/sc-static-page';

class SCStaticMethodologyPage extends SCStaticPage {
  render() {
    return html`
      <style>
        ${layoutSimpleStyles}
        ${typographyCommonStyles}
        ${typographyStaticStyles}
      </style>
      <style>
        .author {
          font-variant-caps: small-caps;
          letter-spacing: var(--sc-caps-letter-spacing);
        }

        .byline {
          font-style: italic;
        }
      </style>
      <main>
        <article>
          <h1>${this.localize('methodology:1')}</h1>
          <nav class="contents">
            <ol>
              <li>${unsafeHTML(this.localize('methodology:2'))}</li>
              <li>${unsafeHTML(this.localize('methodology:3'))}</li>
              <li>${unsafeHTML(this.localize('methodology:4'))}</li>
              <li>${unsafeHTML(this.localize('methodology:5'))}</li>
              <li>${unsafeHTML(this.localize('methodology:6'))}</li>
              <li>${unsafeHTML(this.localize('methodology:7'))}</li>
            </ol>
          </nav>
          <h2 id="item1">${this.localize('methodology:8')}</h2>
          <p>${unsafeHTML(this.localize('methodology:9'))}</p>
          <blockquote>${unsafeHTML(this.localize('methodology:10'))}</blockquote>
          <p>${unsafeHTML(this.localize('methodology:11'))}</p>
          <p>${this.localize('methodology:12')}</p>
          <p>${unsafeHTML(this.localize('methodology:13'))}</p>
          <p>${this.localize('methodology:14')}</p>
          <h2 id="item2">${this.localize('methodology:15')}</h2>
          <p class="byline">${this.localize('methodology:16')}</p>
          <h3>${this.localize('methodology:17')}</h3>
          <p>${this.localize('methodology:18')}</p>
          <ul>
            <li>${unsafeHTML(this.localize('methodology:19'))}</li>
            <li>${unsafeHTML(this.localize('methodology:20'))}</li>
          </ul>
          <p>${this.localize('methodology:21')}</p>
          <p>${this.localize('methodology:22')}</p>
          <p>${this.localize('methodology:23')}</p>
          <ul>
            <li>${unsafeHTML(this.localize('methodology:24'))}</li>
            <li>${unsafeHTML(this.localize('methodology:25'))}</li>
            <li>${unsafeHTML(this.localize('methodology:26'))}</li>
            <li>${unsafeHTML(this.localize('methodology:27'))}</li>
          </ul>
          <p>${this.localize('methodology:28')}</p>
          <h3>${this.localize('methodology:29')}</h3>
          <p>${this.localize('methodology:30')}</p>
          <p>${this.localize('methodology:31')}</p>
          <h2 id="item3">${this.localize('methodology:32')}</h2>
          <p class="byline">${this.localize('methodology:33')}</p>
          <p>${this.localize('methodology:34')}</p>
          <p>${unsafeHTML(this.localize('methodology:35'))}</p>
          <p>${this.localize('methodology:36')}</p>
          <p>${unsafeHTML(this.localize('methodology:37'))}</p>
          <p>${unsafeHTML(this.localize('methodology:38'))}</p>
          <p>${this.localize('methodology:39')}</p>
          <p>${unsafeHTML(this.localize('methodology:40'))}</p>
          <p>${this.localize('methodology:41')}</p>
          <p>${this.localize('methodology:42')}</p>
          <p>${this.localize('methodology:43')}</p>
          <h2 id="item4">${this.localize('methodology:44')}</h2>
          <h3>${this.localize('methodology:45')}</h3>
          <p>${this.localize('methodology:46')}</p>
          <p>${this.localize('methodology:47')}</p>
          <p>${this.localize('methodology:48')}</p>
          <p>${this.localize('methodology:49')}</p>
          <p>${this.localize('methodology:50')}</p>
          <h3>${this.localize('methodology:51')}</h3>
          <p>${this.localize('methodology:52')}</p>
          <h3>${this.localize('methodology:53')}</h3>
          <p>${this.localize('methodology:54')}</p>
          <h3>${this.localize('methodology:55')}</h3>
          <p>${this.localize('methodology:56')}</p>
          <h3>${this.localize('methodology:57')}</h3>
          <p>${this.localize('methodology:58')}</p>
          <h2 id="item5">${this.localize('methodology:59')}</h2>
          <p>${this.localize('methodology:60')}</p>
          <p>${this.localize('methodology:61')}</p>
          <p>${this.localize('methodology:62')}</p>
          <h3>${this.localize('methodology:63')}</h3>
          <p>${this.localize('methodology:64')}</p>
          <h3>${this.localize('methodology:65')}</h3>
          <p>${this.localize('methodology:66')}</p>
          <p>${this.localize('methodology:67')}</p>
          <p>${unsafeHTML(this.localize('methodology:68'))}</p>
          <h3>${this.localize('methodology:69')}</h3>
          <p>${this.localize('methodology:70')}</p>
          <ul>
            <li>${this.localize('methodology:71')}</li>
            <li>${unsafeHTML(this.localize('methodology:72'))}</li>
            <li>${this.localize('methodology:73')}</li>
            <li>${this.localize('methodology:74')}</li>
            <li>${this.localize('methodology:75')}</li>
          </ul>
          <p>${unsafeHTML(this.localize('methodology:76'))}</p>
          <h2 id="item6">${this.localize('methodology:77')}</h2>
          <h3>${this.localize('methodology:78')}</h3>
          <p>${this.localize('methodology:79')}</p>
          <ul>
            <li>${unsafeHTML(this.localize('methodology:80'))}</li>
            <li>${unsafeHTML(this.localize('methodology:81'))}</li>
            <li>${unsafeHTML(this.localize('methodology:82'))}</li>
            <li>${unsafeHTML(this.localize('methodology:83'))}</li>
            <li>${unsafeHTML(this.localize('methodology:84'))}</li>
            <li>${unsafeHTML(this.localize('methodology:85'))}</li>
            <li>${unsafeHTML(this.localize('methodology:86'))}</li>
            <li>${unsafeHTML(this.localize('methodology:87'))}</li>
            <li>${unsafeHTML(this.localize('methodology:88'))}</li>
            <li>${unsafeHTML(this.localize('methodology:89'))}</li>
            <li>${unsafeHTML(this.localize('methodology:90'))}</li>
            <li>${unsafeHTML(this.localize('methodology:91'))}</li>
            <li>${unsafeHTML(this.localize('methodology:92'))}</li>
            <li>${unsafeHTML(this.localize('methodology:93'))}</li>
            <li>${unsafeHTML(this.localize('methodology:94'))}</li>
            <li>${unsafeHTML(this.localize('methodology:95'))}</li>
            <li>${unsafeHTML(this.localize('methodology:96'))}</li>
            <li>${unsafeHTML(this.localize('methodology:97'))}</li>
            <li>${unsafeHTML(this.localize('methodology:98'))}</li>
            <li>${unsafeHTML(this.localize('methodology:99'))}</li>
            <li>${unsafeHTML(this.localize('methodology:100'))}</li>
            <li>${unsafeHTML(this.localize('methodology:101'))}</li>
            <li>${unsafeHTML(this.localize('methodology:102'))}</li>
            <li>${unsafeHTML(this.localize('methodology:103'))}</li>
            <li>${unsafeHTML(this.localize('methodology:104'))}</li>
            <li>${unsafeHTML(this.localize('methodology:105'))}</li>
            <li>${unsafeHTML(this.localize('methodology:106'))}</li>
            <li>${unsafeHTML(this.localize('methodology:107'))}</li>
            <li>${unsafeHTML(this.localize('methodology:108'))}</li>
            <li>${unsafeHTML(this.localize('methodology:109'))}</li>
            <li>${unsafeHTML(this.localize('methodology:110'))}</li>
            <li>${unsafeHTML(this.localize('methodology:111'))}</li>
            <li>${unsafeHTML(this.localize('methodology:112'))}</li>
            <li>${unsafeHTML(this.localize('methodology:113'))}</li>
            <li>${unsafeHTML(this.localize('methodology:114'))}</li>
            <li>${unsafeHTML(this.localize('methodology:115'))}</li>
            <li>${unsafeHTML(this.localize('methodology:116'))}</li>
            <li>${unsafeHTML(this.localize('methodology:117'))}</li>
            <li>${unsafeHTML(this.localize('methodology:118'))}</li>
            <li>${unsafeHTML(this.localize('methodology:119'))}</li>
            <li>${unsafeHTML(this.localize('methodology:120'))}</li>
            <li>${unsafeHTML(this.localize('methodology:121'))}</li>
            <li>${unsafeHTML(this.localize('methodology:122'))}</li>
            <li>${unsafeHTML(this.localize('methodology:123'))}</li>
            <li>${unsafeHTML(this.localize('methodology:124'))}</li>
            <li>${unsafeHTML(this.localize('methodology:125'))}</li>
            <li>${unsafeHTML(this.localize('methodology:126'))}</li>
            <li>${unsafeHTML(this.localize('methodology:127'))}</li>
            <li>${unsafeHTML(this.localize('methodology:128'))}</li>
            <li>${unsafeHTML(this.localize('methodology:129'))}</li>
            <li>${unsafeHTML(this.localize('methodology:130'))}</li>
            <li>${unsafeHTML(this.localize('methodology:131'))}</li>
            <li>${unsafeHTML(this.localize('methodology:132'))}</li>
            <li>${unsafeHTML(this.localize('methodology:133'))}</li>
            <li>${unsafeHTML(this.localize('methodology:134'))}</li>
            <li>${unsafeHTML(this.localize('methodology:135'))}</li>
            <li>${unsafeHTML(this.localize('methodology:136'))}</li>
            <li>${unsafeHTML(this.localize('methodology:137'))}</li>
            <li>${unsafeHTML(this.localize('methodology:138'))}</li>
            <li>${unsafeHTML(this.localize('methodology:139'))}</li>
            <li>${unsafeHTML(this.localize('methodology:140'))}</li>
            <li>${unsafeHTML(this.localize('methodology:141'))}</li>
            <li>${unsafeHTML(this.localize('methodology:142'))}</li>
            <li>${unsafeHTML(this.localize('methodology:143'))}</li>
            <li>${unsafeHTML(this.localize('methodology:144'))}</li>
            <li>${unsafeHTML(this.localize('methodology:145'))}</li>
            <li>${unsafeHTML(this.localize('methodology:146'))}</li>
            <li>${unsafeHTML(this.localize('methodology:147'))}</li>
            <li>${unsafeHTML(this.localize('methodology:148'))}</li>
            <li>${unsafeHTML(this.localize('methodology:149'))}</li>
            <li>${unsafeHTML(this.localize('methodology:150'))}</li>
            <li>${unsafeHTML(this.localize('methodology:151'))}</li>
            <li>${unsafeHTML(this.localize('methodology:152'))}</li>
            <li>${unsafeHTML(this.localize('methodology:153'))}</li>
            <li>${unsafeHTML(this.localize('methodology:154'))}</li>
            <li>${unsafeHTML(this.localize('methodology:155'))}</li>
            <li>${unsafeHTML(this.localize('methodology:156'))}</li>
            <li>${unsafeHTML(this.localize('methodology:157'))}</li>
            <li>${unsafeHTML(this.localize('methodology:158'))}</li>
            <li>${unsafeHTML(this.localize('methodology:159'))}</li>
            <li>${unsafeHTML(this.localize('methodology:160'))}</li>
            <li>${unsafeHTML(this.localize('methodology:161'))}</li>
            <li>${unsafeHTML(this.localize('methodology:162'))}</li>
            <li>${unsafeHTML(this.localize('methodology:163'))}</li>
            <li>${unsafeHTML(this.localize('methodology:164'))}</li>
            <li>${unsafeHTML(this.localize('methodology:165'))}</li>
            <li>${unsafeHTML(this.localize('methodology:166'))}</li>
            <li>${unsafeHTML(this.localize('methodology:167'))}</li>
            <li>${unsafeHTML(this.localize('methodology:168'))}</li>
            <li>${unsafeHTML(this.localize('methodology:169'))}</li>
            <li>${unsafeHTML(this.localize('methodology:170'))}</li>
            <li>${unsafeHTML(this.localize('methodology:171'))}</li>
            <li>${unsafeHTML(this.localize('methodology:172'))}</li>
            <li>${unsafeHTML(this.localize('methodology:173'))}</li>
            <li>${unsafeHTML(this.localize('methodology:174'))}</li>
            <li>${unsafeHTML(this.localize('methodology:175'))}</li>
            <li>${unsafeHTML(this.localize('methodology:176'))}</li>
            <li>${unsafeHTML(this.localize('methodology:177'))}</li>
            <li>${unsafeHTML(this.localize('methodology:178'))}</li>
            <li>${unsafeHTML(this.localize('methodology:179'))}</li>
            <li>${unsafeHTML(this.localize('methodology:180'))}</li>
            <li>${unsafeHTML(this.localize('methodology:181'))}</li>
            <li>${unsafeHTML(this.localize('methodology:182'))}</li>
            <li>${unsafeHTML(this.localize('methodology:183'))}</li>
            <li>${unsafeHTML(this.localize('methodology:184'))}</li>
            <li>${unsafeHTML(this.localize('methodology:185'))}</li>
            <li>${unsafeHTML(this.localize('methodology:186'))}</li>
            <li>${unsafeHTML(this.localize('methodology:187'))}</li>
            <li>${unsafeHTML(this.localize('methodology:188'))}</li>
            <li>${unsafeHTML(this.localize('methodology:189'))}</li>
            <li>${unsafeHTML(this.localize('methodology:190'))}</li>
            <li>${unsafeHTML(this.localize('methodology:191'))}</li>
            <li>${unsafeHTML(this.localize('methodology:192'))}</li>
            <li>${unsafeHTML(this.localize('methodology:193'))}</li>
            <li>${unsafeHTML(this.localize('methodology:194'))}</li>
            <li>${unsafeHTML(this.localize('methodology:195'))}</li>
            <li>${unsafeHTML(this.localize('methodology:196'))}</li>
            <li>${unsafeHTML(this.localize('methodology:197'))}</li>
            <li>${unsafeHTML(this.localize('methodology:198'))}</li>
            <li>${unsafeHTML(this.localize('methodology:199'))}</li>
            <li>${unsafeHTML(this.localize('methodology:200'))}</li>
            <li>${unsafeHTML(this.localize('methodology:201'))}</li>
            <li>${unsafeHTML(this.localize('methodology:202'))}</li>
            <li>${unsafeHTML(this.localize('methodology:203'))}</li>
            <li>${unsafeHTML(this.localize('methodology:204'))}</li>
            <li>${unsafeHTML(this.localize('methodology:205'))}</li>
            <li>${unsafeHTML(this.localize('methodology:206'))}</li>
            <li>${unsafeHTML(this.localize('methodology:207'))}</li>
            <li>${unsafeHTML(this.localize('methodology:208'))}</li>
            <li>${unsafeHTML(this.localize('methodology:209'))}</li>
            <li>${unsafeHTML(this.localize('methodology:210'))}</li>
            <li>${unsafeHTML(this.localize('methodology:211'))}</li>
            <li>${unsafeHTML(this.localize('methodology:212'))}</li>
            <li>${unsafeHTML(this.localize('methodology:213'))}</li>
            <li>${unsafeHTML(this.localize('methodology:214'))}</li>
            <li>${unsafeHTML(this.localize('methodology:215'))}</li>
            <li>${unsafeHTML(this.localize('methodology:216'))}</li>
            <li>${unsafeHTML(this.localize('methodology:217'))}</li>
            <li>${unsafeHTML(this.localize('methodology:218'))}</li>
            <li>${unsafeHTML(this.localize('methodology:219'))}</li>
            <li>${unsafeHTML(this.localize('methodology:220'))}</li>
            <li>${unsafeHTML(this.localize('methodology:221'))}</li>
            <li>${unsafeHTML(this.localize('methodology:222'))}</li>
            <li>${unsafeHTML(this.localize('methodology:223'))}</li>
            <li>${unsafeHTML(this.localize('methodology:224'))}</li>
            <li>${unsafeHTML(this.localize('methodology:225'))}</li>
            <li>${unsafeHTML(this.localize('methodology:226'))}</li>
            <li>${unsafeHTML(this.localize('methodology:227'))}</li>
            <li>${unsafeHTML(this.localize('methodology:228'))}</li>
            <li>${unsafeHTML(this.localize('methodology:229'))}</li>
            <li>${unsafeHTML(this.localize('methodology:230'))}</li>
            <li>${unsafeHTML(this.localize('methodology:231'))}</li>
            <li>${unsafeHTML(this.localize('methodology:232'))}</li>
            <li>${unsafeHTML(this.localize('methodology:233'))}</li>
            <li>${unsafeHTML(this.localize('methodology:234'))}</li>
            <li>${unsafeHTML(this.localize('methodology:235'))}</li>
            <li>${unsafeHTML(this.localize('methodology:236'))}</li>
            <li>${unsafeHTML(this.localize('methodology:237'))}</li>
            <li>${unsafeHTML(this.localize('methodology:238'))}</li>
            <li>${unsafeHTML(this.localize('methodology:239'))}</li>
            <li>${unsafeHTML(this.localize('methodology:240'))}</li>
            <li>${unsafeHTML(this.localize('methodology:241'))}</li>
            <li>${unsafeHTML(this.localize('methodology:242'))}</li>
            <li>${unsafeHTML(this.localize('methodology:243'))}</li>
            <li>${unsafeHTML(this.localize('methodology:244'))}</li>
            <li>${unsafeHTML(this.localize('methodology:245'))}</li>
            <li>${unsafeHTML(this.localize('methodology:246'))}</li>
            <li>${unsafeHTML(this.localize('methodology:247'))}</li>
            <li>${unsafeHTML(this.localize('methodology:248'))}</li>
            <li>${unsafeHTML(this.localize('methodology:249'))}</li>
            <li>${unsafeHTML(this.localize('methodology:250'))}</li>
            <li>${unsafeHTML(this.localize('methodology:251'))}</li>
            <li>${unsafeHTML(this.localize('methodology:252'))}</li>
            <li>${unsafeHTML(this.localize('methodology:253'))}</li>
            <li>${unsafeHTML(this.localize('methodology:254'))}</li>
            <li>${unsafeHTML(this.localize('methodology:255'))}</li>
            <li>${unsafeHTML(this.localize('methodology:256'))}</li>
            <li>${unsafeHTML(this.localize('methodology:257'))}</li>
            <li>${unsafeHTML(this.localize('methodology:258'))}</li>
            <li>${unsafeHTML(this.localize('methodology:259'))}</li>
            <li>${unsafeHTML(this.localize('methodology:260'))}</li>
            <li>${unsafeHTML(this.localize('methodology:261'))}</li>
            <li>${unsafeHTML(this.localize('methodology:262'))}</li>
            <li>${unsafeHTML(this.localize('methodology:263'))}</li>
            <li>${unsafeHTML(this.localize('methodology:264'))}</li>
            <li>${unsafeHTML(this.localize('methodology:265'))}</li>
            <li>${unsafeHTML(this.localize('methodology:266'))}</li>
            <li>${unsafeHTML(this.localize('methodology:267'))}</li>
            <li>${unsafeHTML(this.localize('methodology:268'))}</li>
            <li>${unsafeHTML(this.localize('methodology:269'))}</li>
            <li>${unsafeHTML(this.localize('methodology:270'))}</li>
          </ul>
          <h3>${this.localize('methodology:271')}</h3>
          <ul>
            <li>${unsafeHTML(this.localize('methodology:272'))}</li>
            <li>${unsafeHTML(this.localize('methodology:273'))}</li>
            <li>${unsafeHTML(this.localize('methodology:274'))}</li>
            <li>${unsafeHTML(this.localize('methodology:275'))}</li>
            <li>${unsafeHTML(this.localize('methodology:276'))}</li>
            <li>${unsafeHTML(this.localize('methodology:277'))}</li>
            <li>${unsafeHTML(this.localize('methodology:278'))}</li>
            <li>${unsafeHTML(this.localize('methodology:279'))}</li>
            <li>${unsafeHTML(this.localize('methodology:280'))}</li>
            <li>${unsafeHTML(this.localize('methodology:281'))}</li>
            <li>${unsafeHTML(this.localize('methodology:282'))}</li>
            <li>${unsafeHTML(this.localize('methodology:283'))}</li>
            <li>${unsafeHTML(this.localize('methodology:284'))}</li>
            <li>${unsafeHTML(this.localize('methodology:285'))}</li>
            <li>${unsafeHTML(this.localize('methodology:286'))}</li>
            <li>${unsafeHTML(this.localize('methodology:287'))}</li>
            <li>${unsafeHTML(this.localize('methodology:288'))}</li>
            <li>${unsafeHTML(this.localize('methodology:289'))}</li>
            <li>${unsafeHTML(this.localize('methodology:290'))}</li>
            <li>${unsafeHTML(this.localize('methodology:291'))}</li>
            <li>${unsafeHTML(this.localize('methodology:292'))}</li>
            <li>${unsafeHTML(this.localize('methodology:293'))}</li>
            <li>${unsafeHTML(this.localize('methodology:294'))}</li>
          </ul>
          <h3>${this.localize('methodology:295')}</h3>
          <ul>
            <li>${unsafeHTML(this.localize('methodology:296'))}</li>
            <li>${unsafeHTML(this.localize('methodology:297'))}</li>
            <li>${unsafeHTML(this.localize('methodology:298'))}</li>
            <li>${unsafeHTML(this.localize('methodology:299'))}</li>
            <li>${unsafeHTML(this.localize('methodology:300'))}</li>
          </ul>
        </article>
      </main>
    `;
  }

  constructor() {
    super();
    this.localizedStringsPath = '/localization/elements/static_methodology-page';
  }
}

customElements.define('sc-static-methodology', SCStaticMethodologyPage);
