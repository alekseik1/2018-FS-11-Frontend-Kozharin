//import styles from './index.css';
import shadowStyles from './shadow.css';

const slotName = 'message-input';

const template = `
	<style>${shadowStyles.toString()}</style>
	<form id="main_form" class="message_container">
		<div class="result"></div>
		<form-input class="messages_input" name="message_text" placeholder="Введите сообщение" slot="message-input">
			<span slot="icon"><img src="../../static/ic_send_black_24dp.png"></span>
		</form-input>
	</form>
`;

const SUBMIT_EVENT = 'messageSumbit';

class MessageForm extends HTMLElement {
        constructor () {
        super();
        const shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.innerHTML = template;
        this.messageNumber = 0;
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
        this.addEventListener(SUBMIT_EVENT, (e) => {
            const args = e.detail;
            console.log(args.messageContent);
            const mes = this.createMessageDiv(args.messageContent.text, args.date, args.messageNumber, args.isOwn);
            this._elements.message.appendChild(mes);
            this.messageNumber++;
        });
    }

    /**
     * Создает div на сообщение
     * @param messageContent Содержимое, ДОЛЖНО иметь поле .text
     * @param date Объект Date
     * @param messageNumber Порядковый номер сообщения
     * @returns {HTMLElement} Объект сообщения
     */
    createMessageDiv(messageContent, date, messageNumber = 0, isOwn = true) {
        var parentDiv = document.createElement(`div`);
        if(isOwn)
            parentDiv.className = `messageBubbleOwn`;
        else
            parentDiv.className = `messageBubbleOther`;
        var messageDiv = document.createElement(`div`);
        if(isOwn)
            messageDiv.className = "own_messages";
        else
            messageDiv.className = "other_messages";
        messageDiv.innerText = messageContent.text;
        messageDiv.insertAdjacentHTML('beforeend',
            `<div class="sent_time"> ${date.getHours()}:${date.getMinutes()}</div>`);
        parentDiv.appendChild(messageDiv);
        return parentDiv;
    }

    _onSubmit (event) {
        var input_text = Array.from(this._elements.form.elements).map(
            el => el.value
        ).join(', ');
        var d = new Date();
        var messageContent = {};



        messageContent.text = input_text;
        // Для дебага: четные свои, нечетные -- чужие
        var isOwn = false;
        if (this.messageNumber % 2 === 0) {
            isOwn = true;
        }

        const submitEvent = new CustomEvent(SUBMIT_EVENT, {
            detail: {
                messageContent: {
                    text: messageContent
                },
                date: new Date(),
                messageNumber: this.messageNumber,
                isOwn: isOwn
            }
        });

        this.dispatchEvent(submitEvent);


        // alert(this._elements.form.value);
        this._elements.form.value = "";
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
