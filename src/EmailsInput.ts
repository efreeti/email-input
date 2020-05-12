import {Observer} from '@/model/Observer';
import {EmailString} from '@/model/EmailString';
import {EmailStringList} from '@/model/EmailStringList';
import {EmailsInputView} from '@/view/EmailsInputView';

interface EmailsInputOptions {
	emails?: string[];
	onChange?: (emails: string[]) => void
}

export class EmailsInput implements Observer {
	private emailsList: EmailStringList;
	private emailInputView: EmailsInputView;
	private onEmailsListChange?: (emails: string[]) => void;

	constructor(private root: HTMLElement, options?: EmailsInputOptions) {
		this.emailsList = new EmailStringList((options && options.emails || []).map(
			email => new EmailString(email)
		));
		this.emailInputView = new EmailsInputView(
			root.ownerDocument, this.emailsList
		);
		this.onEmailsListChange = options && options.onChange;
	}

	getEmails() {
		return this.emailsList.getEmails().map(email => email.value);
	}

	setEmails(emails: string[]) {
		this.emailsList.setEmails(emails.map(email => new EmailString(email)));
	}

	addEmail(email: string) {
		this.emailsList.addEmails([new EmailString(email)]);
	}

	scrollToBottom() {
		this.emailInputView.scrollToBottom();
	}

	create() {
		this.emailsList.addObserver(this);
		this.root.appendChild(this.emailInputView.create().getHtml());

		return this;
	}

	update(property: string) {
		if (property === 'emails' && this.onEmailsListChange) {
			this.onEmailsListChange(this.getEmails());
		}
	}
}
