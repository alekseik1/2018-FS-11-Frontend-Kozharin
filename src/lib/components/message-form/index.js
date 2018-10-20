//import styles from './index.css';
import shadowStyles from './shadow.css';

const slotName = 'message-input';

const template = `
	<style>${shadowStyles.toString()}</style>
	<form>
		<div class="result"></div>
		<form-input name="message_text" placeholder="Введите сообщение" slot="message-input">
			<span slot="icon"><img src="../../static/ic_send_black_24dp.png"></span>
		</form-input>
	</form>
`;

class MessageForm extends HTMLElement {
        constructor () {
        super();
        const shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.innerHTML = template;
        this._initElements();
        this._addHandlers();
    }

    static get observedAttributes() {
        return [
            "action",
            "method"
        ]
    }

    attributeChangedCallback(attrName, oldVal, newVal) {
        this._elements.form[attrName] = newVal;
    }

    _initElements () {
        var form = this.shadowRoot.querySelector('form');
        var message = this.shadowRoot.querySelector('.result');
        this._elements = {
            form: form,
            message: message
        };
    }

    _addHandlers () {
        this._elements.form.addEventListener('submit', this._onSubmit.bind(this));
        this._elements.form.addEventListener('keypress', this._onKeyPress.bind(this));
        //this._elements.inputSlot.addEventListener('slotchange', this._onSlotChange.bind(this));
    }

    _onSubmit (event) {
        this._elements.message.innerText = Array.from(this._elements.form.elements).map(
            el => el.value
        ).join(', ');
        var d = new Date();
        this._elements.message.insertAdjacentHTML('beforeend',
            `<div class="sent_time"> ${d.getHours()}:${d.getMinutes()}</div>`);
        event.preventDefault();
        return false;
    }

    _onKeyPress (event) {
        if (event.keyCode == 13) {
            this._elements.form.dispatchEvent(new Event('submit'));
        }
    }
}

customElements.define('message-form', MessageForm);