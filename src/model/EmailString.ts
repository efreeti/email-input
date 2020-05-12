const EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export class EmailString {
	static parseEmailStringsFromString(emailsString: string) {
		return emailsString
			.replace(/^\s+|\s+$/g, '')
			.split(/\s*,\s*/g)
			.filter(item => item.length > 0)
			.map(item => new EmailString(item));
	}

	constructor(public value: string) {
	}

	isValid() {
		return EMAIL_REGEXP.test(this.value);
	}
}
