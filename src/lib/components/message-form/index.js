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
        const attachment_button = this.shadowRoot.querySelector('.attachment_button');
        const attachment_picker = this.shadowRoot.querySelector('.attachment_picker');
        this._elements = {
            form: form,
            message: message,
            attachment_button: attachment_button,
            attachment_picker: attachment_picker
        };
    }

    selectFile(e) {
            console.log('Opening filepicker...');
            console.log(this);
            this._elements.attachment_picker.click(e);
            e.preventDefault();
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

    fileIsUploaded(e) {
            var files = this.files;
            MessageForm._handle_files_upload(files, e.detail.context);
            e.preventDefault();
    }

    _addMessageDiv(messageDiv) {
            this._elements.message.appendChild(messageDiv);
            this.messageNumber++;
    }



    fileIsDropped(e) {
            // КАК ТЕБЕ ТАКОЕ, ИЛОН МАСК?
        var files = e.detail.old_e.dataTransfer.files;
        var context = e.detail.context;
        console.log("ALL e");
        console.log(e);
        console.log('Files: ');
        console.log(files);

            MessageForm._handle_files_upload(files, context);
            e.preventDefault();
            e.stopPropagation();
    }

    _addHandlers () {
        this._elements.form.addEventListener('submit', this._onSubmit.bind(this));
        this._elements.form.addEventListener('keypress', this._onKeyPress.bind(this));
        //this._elements.inputSlot.addEventListener('slotchange', this._onSlotChange.bind(this));
        this.addEventListener(SUBMIT_EVENT, (e) => {
            const args = e.detail;
            console.log(args.messageContent);
            const mes = MessageForm.createMessageDiv(args.messageContent.text, args.date, args.messageNumber, args.isOwn);
            this._addMessageDiv(mes);

            var inputDiv = this._elements.form.querySelector('.messages_input').shadowRoot.querySelector('.main_input_form');
            inputDiv.value = '';
        });

        this.addEventListener("selectFile", this.selectFile);

        this._elements.attachment_button.addEventListener('click', () => this.dispatchEvent(new CustomEvent('selectFile')));
        var context = this;
        this._elements.attachment_picker.addEventListener('change', (e) =>
            {
                this._elements.attachment_picker.dispatchEvent(new CustomEvent('fileIsUploaded', {
                    detail: {
                        files: e.files,
                        context: context,
                        old_e: e
                    }
            }));
        });

        this._elements.attachment_picker.addEventListener('fileIsUploaded', this.fileIsUploaded);
        this.addEventListener('fileIsDropped', this.fileIsDropped);
        this._elements.form.addEventListener('drop', (e) => {this.dispatchEvent(new CustomEvent('fileIsDropped', {
            detail: {files: e.files, context: context, old_e: e}
        })
        );
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


    _onSubmit (event) {
        var input_text = Array.from(this._elements.form.elements).map(
            el => el.value
        ); input_text = input_text[input_text.length-1];
        var messageContent = {};



        messageContent.text = input_text;
        if (messageContent.text.length === 0) {
            event.preventDefault();
            return false;
        }
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
