//import styles from './index.css';
import shadowStyles from './shadow.css';

const slotName = 'message-input';

const template = `
	<style>${shadowStyles.toString()}</style>
	<form id="main_form" class="message_container">
		<div class="result"></div>
		<form-input class="messages_input" name="message_text" placeholder="Введите сообщение" slot="message-input">
		    <button slot="icon" class="attachment_button" id="add_attachment"><img src="../../static/attachment.png" height="24dp"></button>
		    <input type="file" class="attachment_picker">
			<span slot="icon"><img src="../../static/ic_send_black_24dp.png"></span>
		</form-input>
	</form>
`;


class MessageForm extends HTMLElement {

    constructor () {
        super();
        const shadowRoot = this.attachShadow({mode: 'open'});
        this.SUBMIT_EVENT = 'messageSumbit';
        shadowRoot.innerHTML = template;
        // TODO: Их надо брать с бэкенда
        this.ownName = 'Алексей';
        this.companionName = 'Котэ';
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
        const attachment_button = this.shadowRoot.querySelector('.attachment_button');
        const attachment_picker = this.shadowRoot.querySelector('.attachment_picker');
        // В .messages_input есть shadowRoot, а там уже форма ввода сообщения
        const message_input = this.shadowRoot.querySelector('.messages_input')
            .shadowRoot.querySelector('.main_input_form');
        this._elements = {
            form: form,
            messages_container: message,
            attachment_button: attachment_button,
            attachment_picker: attachment_picker,
            message_input: message_input,
        };
    }
    newFilesUploaded(files)
    {
        for(const file of files) this.submitEvent.detail.messageContent.files.push(file);
    }

    _addMessageDiv(messageDiv) {
            this._elements.messages_container.appendChild(messageDiv);
            this.messageNumber++;
    }

    _initSubmitEvent() {
        // Этот event будет передаваться от метода к методу и заполняться
        // Потом он будет передан в _onSubmit и будет отправлено сообщение со всеми вложениями, текстом и т.п.
        this.submitEvent = new CustomEvent(this.SUBMIT_EVENT, {
            // NOTE: По такой форме надо делать event
            detail: {
                messageContent: {
                    files: [],
                    text: '',
                },
                number: 0,
                isOwn: true,
                time: new Date(),
                author: 'Me',
            }
        });
    }

    _addHandlers () {
        this._initSubmitEvent();
        this._elements.form.addEventListener('submit', this._onSubmit.bind(this));
        this._elements.form.addEventListener('keypress', this._onKeyPress.bind(this));
        //this._elements.inputSlot.addEventListener('slotchange', this._onSlotChange.bind(this));

        // Клик по кнопке вызывает клик по picker
        this._elements.attachment_button.addEventListener('click', (e) =>
            this._elements.attachment_picker.click(e));

        this._elements.attachment_picker.addEventListener('change',
                e => this.newFilesUploaded.bind(this)(e.path[0].files));

        this._elements.form.addEventListener('drop', (e) =>
        {
            this.newFilesUploaded(e.dataTransfer.files);
            console.log('`submitEvent` files changed:');
            console.log(this.submitEvent.detail.messageContent);
            e.preventDefault();
            e.stopPropagation();
        });
    }

    /**
     * Создает div на сообщение
     * @param messageContent Содержимое, ДОЛЖНО иметь поле .text
     * @param date Объект Date
     * @param messageNumber Порядковый номер сообщения
     * @param isOwn Свое ли сообщение
     * @param author Имя автора
     * @returns {HTMLElement} Объект сообщения
     */
    createMessageDiv(messageContent, date, messageNumber = 0, isOwn = true, author = 'Me') {
        // TODO: сделать лучше поддержку thumbnail для картинок
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

        // Обернем текст в отдельный div
        var textDiv = document.createElement('div');
        textDiv.innerText = messageContent.text;
        messageDiv.appendChild(textDiv);

        // Добавляем картинку, если она есть
        for(let f of messageContent.files) {
            const ValidImageTypes = ["image/gif", "image/jpeg", "image/png"];
            const fileType = f['type'];
            // Если картинка, добавим preview
            if(ValidImageTypes.includes(fileType)) {
                let reader = new FileReader();
                // Closure to capture the file information.
                reader.onload = (function(theFile) {
                    MessageForm._sendFileToServer(theFile);
                    return (e) => {
                        // Render thumbnail.
                        console.log(e.target);
                        const imageElement = document.createElement('img');
                        imageElement.src = e.target.result;
                        imageElement.setAttribute('height', '100px');
                        messageDiv.appendChild(imageElement);
                    };
                })(f);
                // Read in the image file as a data URL.
                reader.readAsDataURL(f);
            } else {
                // Это не картинка
                textDiv.innerText += `\n File: ${f.name}; createdAt: 
                    ${(new Date(f.lastModified)).toLocaleDateString()}`;
            }
        }

        // Добавим дату отправления сообщения
        messageDiv.insertAdjacentHTML('beforeend',
            `<div class="sent_time"> ${date.getHours()}:${date.getMinutes()}</div>`);

        // Кидаем окошко сообщения в отдельный div (это нужно для красоты)
        parentDiv.appendChild(messageDiv);
        return parentDiv;
    }

    static _sendFileToServer(file) {
        // Send file via Fetch API
        fetch('http://localhost:8081/message', {
            method: 'POST',
            body: {
                attach: file,
                formData: {

                }
            },
        }).then(
            response => response.json()
        ).then(success => console.log(success)
        ).catch(error => console.log(error));
    }

    /**
     * Сабмит кнопки ввода сообщения. Тут должно обрабатываться все: наличие файлов, наличие текста, имя автора
     * @param event Кастомный event "messageSent"
     * @returns {boolean}
     * @private
     */
    _onSubmit (event) {
        console.log('_onSubmit event is:');
        console.log(event);
        console.log('Custom submitEvent is:');
        console.log(this.submitEvent);
        // Заполним текст из submit-поля
        var input_text = Array.from(this._elements.form.elements).map(
            el => el.value
        ); input_text = input_text[input_text.length-1];
        this.submitEvent.detail.messageContent.text = input_text;
        var messageContent = this.submitEvent.detail.messageContent;
        // Выходим, если ничего не отправлено
        if (messageContent.text.length === 0 && messageContent.files.length === 0) {
            event.preventDefault();
            return false;
        }
        // Для дебага: четные свои, нечетные -- чужие
        var isOwn = false;
        if (this.messageNumber % 2 === 0) {
            isOwn = true;
            this.submitEvent.detail.author = this.ownName;
        } else {
            isOwn = false;
            this.submitEvent.detail.author = this.companionName;
        }
        // Добавляем информацию о сообщении
        this.submitEvent.detail.number = this.messageNumber;
        this.submitEvent.detail.isOwn = isOwn;
        this.submitEvent.detail.time = new Date();
        this.submitEvent.detail.author = this.ownName;

        // Отправим сообщение
        const messageDiv = this.createMessageDiv(
            this.submitEvent.detail.messageContent, this.submitEvent.detail.time,
            this.submitEvent.detail.number, this.submitEvent.detail.isOwn, this.submitEvent.detail.author);
        this._addMessageDiv(messageDiv);
        // Очистим submitEvent
        this._initSubmitEvent();

        this._elements.message_input.value = "";
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
