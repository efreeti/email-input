import {View} from "./View";
import {EmailString} from "../model/EmailString";
import {EmailStringList} from "../model/EmailStringList";
import {EmailStringListView} from "./EmailStringListView";
import './EmailsInputView.scss';

export class EmailsInputView extends View<EmailStringList> {
	private emailStringListView: EmailStringListView;
	private input: HTMLInputElement;


	constructor(ownerDocument: Document, model: EmailStringList) {
		super(ownerDocument, model);

		this.emailStringListView = new EmailStringListView(ownerDocument, model);
	}

	scrollToBottom() {
		this.html.scrollTop = this.html.scrollHeight;
	}

	private updateInputWidth() {
		if (this.input.value) {
			if (this.input.scrollWidth > this.input.offsetWidth) {
				this.input.style.width = this.input.scrollWidth + 'px';
			}
		} else {
			this.input.style.width = '';
		}
	}

	private addEmailsFromString(emailsString: string, resetInput: boolean) {
		const emails = EmailString.parseEmailStringsFromString(emailsString);

		if (emails.length > 0) {
			this.getModel().addEmails(emails);

			if (resetInput) {
				this.input.value = this.input.value.substr(emailsString.length).replace(/^\s+/, '');
				this.input.setSelectionRange(0, 0);

				this.updateInputWidth();
			}
		}
	}

	private handleInputBlurEvent() {
		this.addEmailsFromString(this.input.value, true);
	}

	private handleInputPasteEvent(event: ClipboardEvent) {
		this.addEmailsFromString(event.clipboardData.getData('text/plain'), false);
		this.scrollToBottom();

		event.preventDefault();
	}

	private handleInputKeyDownEvent(event: KeyboardEvent) {
		if (event.key === 'Enter') {
			this.addEmailsFromString(this.input.value, true);
		}
	}

	private handleInputKeyUpEvent(event: KeyboardEvent) {
		if (event.key === ',') {
			const lastComaIndex = this.input.value.lastIndexOf(',');

			if (lastComaIndex !== -1) {
				this.addEmailsFromString(this.input.value.substr(0, lastComaIndex + 1), true);
			}
		}
	}

	private handleInputTextInputEvent() {
		this.updateInputWidth();
	}

	private handleDragEvent(event: DragEvent) {
		if (event.dataTransfer.types.includes('text/plain')) {
			event.preventDefault();
		}
	}

	private handleDropEvent(event: DragEvent) {
		this.addEmailsFromString(event.dataTransfer.getData("text/plain"), false);
		this.scrollToBottom();
	}

	private handleClickEvent() {
		if (event.target === this.getHtml()) {
			this.input.focus();
		}
	}

	protected createHtml() {
		this.input = this.element({
			name: 'input',
			classes: ['emails-input__control'],
			listeners: {
				blur: () => this.handleInputBlurEvent(),
				paste: event => this.handleInputPasteEvent(event),
				keydown: event => this.handleInputKeyDownEvent(event),
				keyup: event => this.handleInputKeyUpEvent(event),
				input: () => this.handleInputTextInputEvent()
			}
		});

		return this.element({
			name: 'div',
			classes: ['emails-input'],
			children: [this.emailStringListView.create().getHtml(), this.input],
			listeners: {
				dragenter: event => this.handleDragEvent(event),
				dragover: event => this.handleDragEvent(event),
				drop: event => this.handleDropEvent(event),
				click: () => this.handleClickEvent()
			}
		});
	}
}
