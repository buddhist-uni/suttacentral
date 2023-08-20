import { LitElement, html, css } from 'lit';
import '@material/mwc-snackbar';

export class SCToasts extends LitElement {
  static styles = css`
    :host {
      display: block;
      position: absolute;
      z-index: 9999;
      --mdc-typography-body2-font-size: var(--sc-font-size-l);
      --mdc-typography-font-family: var(--sc-sans-font);
    }

    .toast {
      text-align: center;
      font-family: var(--sc-serif-font);
    }

    .success-toast {
      --mdc-snackbar-fill-color: var(--sc-toast-success-color);
    }

    .error-toast {
      --mdc-snackbar-fill-color: var(--sc-toast-error-color);
    }
  `;

  render() {
    return html`
      <mwc-snackbar id="error_toast" class="toast error-toast"></mwc-snackbar>
      <mwc-snackbar id="success_toast" class="toast success-toast"></mwc-snackbar>
      <mwc-snackbar id="info_toast" class="toast"></mwc-snackbar>
    `;
  }

  firstUpdated() {
    this.parentNode.addEventListener('show-sc-toast', e => {
      this._displayToast(e);
    });
  }

  _displayToast(e) {
    const toast = this._getToast(e.detail.toastType);
    toast.labelText = e.detail.message;
    toast.timeoutMs = e.detail.duration || 4000;
    requestAnimationFrame(() => {
      toast.show();
    });
  }

  _getToast(toastType) {
    const toastId = ['info', 'success', 'error'].includes(toastType)
      ? `${toastType}_toast`
      : 'info_toast';
    return this.shadowRoot.getElementById(toastId);
  }
}

customElements.define('sc-toasts', SCToasts);
