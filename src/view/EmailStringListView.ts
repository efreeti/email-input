import {View} from "./View";
import {EmailString} from "../model/EmailString";
import {EmailStringList} from "../model/EmailStringList";
import './EmailStringListView.scss';

export class EmailStringListView extends View<EmailStringList> {
	constructor(ownerDocument: Document, emails: EmailStringList) {
		super(ownerDocument, emails);
	}

	private createEmailHtml(email: EmailString) {
		return this.element({
			name: 'span',
			classes: [
				'email-string-list__email-block',
				`email-string-list__email-block-${email.isValid() ? 'valid' : 'invalid'}`
			],
			children: [
				this.element({
					name: 'span',
					classes: ['email-string-list__email-label'],
					text: email.value
				}),
				this.element({
					name: 'span',
					classes: ['email-string-list__email-remove-button'],
					text: '×',
					listeners: {
						'click': event => this.getModel().removeEmail(email)
					}
				})
			]
		});
	}

	protected createHtml() {
		return this.element({
			name: 'span',
			classes: ['email-string-list']
		});
	}

	update(property: string) {
		if (property === 'emails' || property === '*') {
			while (this.getHtml().firstChild) {
				this.getHtml().removeChild(this.getHtml().firstChild);
			}

			this.getModel().getEmails().forEach(
				email => this.getHtml().appendChild(this.createEmailHtml(email))
			);
		}

		super.update(property);
	}
}
