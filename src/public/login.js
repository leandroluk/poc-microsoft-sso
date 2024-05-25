/**
 * @typedef {{
 *  input: HTMLInputElement,
 *  error: HTMLDivElement
 * }} Fieldset
 */

const form = document.getElementById('login');

/** @type {Record<string, Fieldset>} */
const fieldsets = {
  organization: {
    /** @type {HTMLInputElement} */
    input: document.getElementById('login-organization-input'),
    /** @type {HTMLDivElement} */
    error: document.getElementById('login-organization-error'),
  },
  username: {
    /** @type {HTMLInputElement} */
    input: document.getElementById('login-username-input'),
    /** @type {HTMLDivElement} */
    error: document.getElementById('login-username-error'),
  },
  password: {
    /** @type {HTMLInputElement} */
    input: document.getElementById('login-password-input'),
    /** @type {HTMLDivElement} */
    error: document.getElementById('login-password-error'),
  },
};

/** @type {Record<string, HTMLButtonElement>} */
const buttons = {
  password: document.getElementById('password-button'),
  openidMicrosoft: document.getElementById('openid-microsoft-button'),
};

const handlers = {
  /** @param {Fieldset} fieldset */
  validateRequired(fieldset) {
    if (!fieldset.input.value) {
      const error = new Error(`"${fieldset.input.name}" is required.`);
      fieldset.input.classList.add('error-input');
      fieldset.error.innerText = error.message;
      throw error;
    }
  },
  /** @param {Fieldset} fieldset */
  cleanError: fieldset => () => {
    fieldset.input.classList.remove('error-input');
    fieldset.error.innerText = '';
  },
};

for (const fieldset of Object.values(fieldsets)) {
  fieldset.input.addEventListener('change', handlers.cleanError(fieldset));
  fieldset.input.addEventListener('change', handlers.cleanError(fieldset));
}

buttons.password.addEventListener('click', async () => {
  try {
    handlers.validateRequired(fieldsets.organization);
    handlers.validateRequired(fieldsets.username);
    handlers.validateRequired(fieldsets.password);
    const query = [
      `organization=${fieldsets.organization.input.value}`,
      `username=${fieldsets.username.input.value}`,
      `password=${fieldsets.password.input.value}`,
    ].join('&');
    window.location.href = `/login/password?${query}`;
  } catch (error) {
    //
  }
});

buttons.openidMicrosoft.addEventListener('click', async () => {
  try {
    handlers.validateRequired(fieldsets.organization);
    const query = `organization=${fieldsets.organization.input.value}`;
    window.location.href = `/login/openid/microsoft?${query}`;
  } catch (error) {
    //
  }
});
