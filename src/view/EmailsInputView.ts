import {View} from '@/view/View';
import {ViewDocument} from "@/view/ViewDocument";
import {EmailString} from '@/model/EmailString';
import {EmailStringList} from '@/model/EmailStringList';
import {EmailStringListView} from '@/view/EmailStringListView';
import '@/view/EmailsInputView.scss';

export class EmailsInputView extends View<EmailStringList> {
	private emailStringListView: EmailStringListView;
	private input: HTMLInputElement;
	private inputSizer: HTMLElement;

	constructor(ownerDocument: ViewDocument, model: EmailStringList) {
		super(ownerDocument, model);

		this.emailStringListView = new EmailStringListView(ownerDocument, model);
	}

	scrollToBottom() {
		this.html.scrollTop = this.html.scrollHeight;
	}

	private updateInputWidth() {
		this.input.style.width = '';

		if (this.input.value) {
			if (this.getOwnerDocument().isInputScrollWidthSupported()) {
				// A magic number is used as a last resort to solve some tiny rounding error in scrollWidth in Chrome
				this.input.style.width = (this.input.scrollWidth + 1) + 'px';
			} else {
				this.inputSizer.textContent = this.input.value;
				// Another magic number is used to solve same issue with IE
				this.input.style.width = (this.inputSizer.scrollWidth + 1) + 'px';
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
		this.addEmailsFromString(this.extractClipboardText(event), false);
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
		this.addEmailsFromString(this.extractDroppedText(event), false);
		this.scrollToBottom();

		event.preventDefault();
	}

	private handleClickEvent(event: MouseEvent) {
		if (event.target === this.getHtml()) {
			this.input.focus();
		}
	}

	protected createHtml() {
		this.input = this.createElement({
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
		this.inputSizer = this.createElement({
			name: 'span',
			classes: ['emails-input__control-sizer']
		});

		return this.createElement({
			name: 'div',
			classes: ['emails-input'],
			children: [
				this.emailStringListView.create().getHtml(),
				this.inputSizer,
				this.input
			],
			listeners: {
				dragenter: event => this.handleDragEvent(event),
				dragover: event => this.handleDragEvent(event),
				drop: event => this.handleDropEvent(event),
				click: event => this.handleClickEvent(event)
			}
		});
	}
}
