import {Observable} from "./Observable";
import {EmailString} from "./EmailString";

export class EmailStringList extends Observable {
	constructor(private emails: Array<EmailString>) {
		super();
	}

	getEmails() {
		return this.emails;
	}

	setEmails(emails: Array<EmailString>) {
		this.emails = emails;
		this.notifyObservers('emails');
	}

	removeEmail(email: EmailString) {
		this.setEmails(this.emails.filter(item => item !== email));
	}

	addEmails(emails: Array<EmailString>) {
		this.setEmails(this.emails.concat(emails));
	}
}
