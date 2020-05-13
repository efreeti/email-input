import {View} from '@/view/View';
import {ViewDocument} from "@/view/ViewDocument";
import {EmailString} from '@/model/EmailString';
import {EmailStringList} from '@/model/EmailStringList';
import '@/view/EmailStringListView.scss';

export class EmailStringListView extends View<EmailStringList> {
	constructor(ownerDocument: ViewDocument, emails: EmailStringList) {
		super(ownerDocument, emails);
	}

	private createEmailHtml(email: EmailString) {
		return this.createElement({
			name: 'span',
			classes: [
				'email-string-list__email-block',
				`email-string-list__email-block-${email.isValid() ? 'valid' : 'invalid'}`
			],
			children: [
				this.createElement({
					name: 'span',
					classes: ['email-string-list__email-label'],
					text: email.value
				}),
				this.createElement({
					name: 'span',
					classes: ['email-string-list__email-remove-button'],
					text: '×',
					listeners: {
						'click': () => this.getModel().removeEmail(email)
					}
				})
			]
		});
	}

	protected createHtml() {
		return this.createElement({
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
