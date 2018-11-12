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
        this._elements = {
            form: form,
            message: message,
            attachment_button: attachment_button,
            attachment_picker: attachment_picker
        };
    }

     static _handle_files_upload(files, main_form) {

         main_form = main_form.shadowRoot;
         var result_div = main_form.querySelector('.result');
         console.log("MAIN FORM:");
         console.log(main_form);
         console.log('result_div: ');
         console.log(result_div);
        for(var f of files) {
            var ValidImageTypes = ["image/gif", "image/jpeg", "image/png"];
            var fileType = f['type'];
            if(ValidImageTypes.includes(fileType)) {

                var reader = new FileReader();

                // Closure to capture the file information.
                reader.onload = (function(theFile) {
                    // Send file via Fetch API
                    fetch('http://localhost:8081/message', {
                        method: 'POST',
                        body: {
                            attach: theFile,
                            formData: {

                            }
                        },
                    }).then(
                        response => response.json()
                    ).then(success => console.log(success)
                    ).catch(error => console.log(error));
                    return function(e) {
                        // Render thumbnail.
                        console.log(e.target);
                        var messageDiv = MessageForm.createMessageDiv({
                            text: `Image; created at: ${(new Date(theFile.lastModified)).toLocaleDateString()}`,
                            image: e.target.result
                        }, new Date());
                        var result_div = main_form.querySelector('.result');
                        result_div.appendChild(messageDiv);
                    };
                })(f);

                // Read in the image file as a data URL.
                reader.readAsDataURL(f);


                // Это картинка!!
                //MessageForm.saveImage(file);
            } else {
                // Это не картинка
                var messageDiv = MessageForm.createMessageDiv({
                    text:
                        `File: ${f.name}; createdAt: ${(new Date(f.lastModified)).toLocaleDateString()}`
                }, new Date());
            }
            result_div.appendChild(messageDiv);
        }
    }

    newFilesUploaded(files)
    {
        for(const file of files) this.submitEvent.detail.messageContent.files.push(file);
        // MessageForm._handle_files_upload(files, this);
    }

    _addMessageDiv(messageDiv) {
            this._elements.message.appendChild(messageDiv);
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
     * @returns {HTMLElement} Объект сообщения
     */
    static createMessageDiv(messageContent, date, messageNumber = 0, isOwn = true) {
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
        if (messageContent.hasOwnProperty('image')) {
            const imageElement = document.createElement('img');
            imageElement.src = messageContent.image;
            imageElement.setAttribute('height', '100px');
            messageDiv.appendChild(imageElement);
        }
        messageDiv.insertAdjacentHTML('beforeend',
            `<div class="sent_time"> ${date.getHours()}:${date.getMinutes()}</div>`);
        parentDiv.appendChild(messageDiv);
        return parentDiv;
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
        const messageDiv = MessageForm.createMessageDiv(
            this.submitEvent.detail.messageContent, this.submitEvent.detail.time,
            this.submitEvent.detail.number, this.submitEvent.detail.isOwn);
        this._addMessageDiv(messageDiv);
        // Очистим submitEvent
        this._initSubmitEvent();

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
