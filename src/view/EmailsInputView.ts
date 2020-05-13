import {detectInputScrollWidthSupport} from "@/view/support";
import {View} from '@/view/View';
import {EmailString} from '@/model/EmailString';
import {EmailStringList} from '@/model/EmailStringList';
import {EmailStringListView} from '@/view/EmailStringListView';
import '@/view/EmailsInputView.scss';

const inputScrollWidthSupported = detectInputScrollWidthSupport(document);

function getClipboardData(event: ClipboardEvent) {
	if (event.clipboardData) {
		return event.clipboardData.getData('text/plain');
	} else {
		return (window as any).clipboardData.getData('Text');
	}
}

function getDropData(event: DragEvent) {
	try {
		return event.dataTransfer.getData('Text') || event.dataTransfer.getData('text/plain');
	} catch (error) {
		// IE can throw exception for 'text/plain' according to stack overflow
		return '';
	}
}

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
		if (!inputScrollWidthSupported) {
			this.input.size = this.input.value.length || 1;
		} else {
			this.input.style.width = '';

			if (this.input.value) {
				this.input.style.width = this.input.scrollWidth + 'px';
			}
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
		this.addEmailsFromString(getClipboardData(event), false);
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
		event.preventDefault();
	}

	private handleDropEvent(event: DragEvent) {
		this.addEmailsFromString(getDropData(event), false);
		this.scrollToBottom();

		event.preventDefault();
	}

	private handleClickEvent() {
		if (event.target === this.getHtml()) {
			this.input.focus();
		}
	}

	protected createHtml() {
		this.input = this.element({
			name: 'input',
			classes: ['emails-input__control'].concat(
				inputScrollWidthSupported ? ['emails-input__control-scroll'] : []
			),
			listeners: {
				blur: () => this.handleInputBlurEvent(),
				paste: event => this.handleInputPasteEvent(event),
				keydown: event => this.handleInputKeyDownEvent(event),
				keyup: event => this.handleInputKeyUpEvent(event),
				input: () => this.handleInputTextInputEvent()
			}
		});

		if (!inputScrollWidthSupported) {
			this.input.size = 1;
		}

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
