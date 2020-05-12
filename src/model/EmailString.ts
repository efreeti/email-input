const EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export class EmailString {
	static parseEmailStringsFromString(string: string) {
		return string
			.replace(/^\s+|\s+$/g, '')
			.split(/\s*,\s*/g)
			.filter(string => string.length > 0)
			.map(string => new EmailString(string));
	}

	constructor(public value: string) {
	}

	isValid() {
		return EMAIL_REGEXP.test(this.value);
	}
}
