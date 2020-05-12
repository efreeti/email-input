import {EmailString} from '../../src/model/EmailString';

describe('EmailString', () => {
	describe('EmailString::parseEmailStringsFromString', () => {
		it('should return empty list when blank string', () => {
			expect(EmailString.parseEmailStringsFromString(' \n\t		')).toEqual([]);
		});

		it('should return correct list when single email string', () => {
			expect(EmailString.parseEmailStringsFromString('bohdan@tsymbala.com')).toEqual([
				new EmailString('bohdan@tsymbala.com')
			]);
		});

		it('should return correct list when multiple emails string', () => {
			expect(EmailString.parseEmailStringsFromString('bohdan@tsymbala.com,john@doe.com,jane@doe.com')).toEqual([
				new EmailString('bohdan@tsymbala.com'),
				new EmailString('john@doe.com'),
				new EmailString('jane@doe.com')
			]);
		});

		it('should return correct list when multiple emails string with trailing coma', () => {
			expect(EmailString.parseEmailStringsFromString('bohdan@tsymbala.com,john@doe.com,jane@doe.com,')).toEqual([
				new EmailString('bohdan@tsymbala.com'),
				new EmailString('john@doe.com'),
				new EmailString('jane@doe.com')
			]);
		});

		it('should handle trailing spaces and spaces around coma correctly', () => {
			expect(EmailString.parseEmailStringsFromString('\t\n bohdan@tsymbala.com ,john@doe.com , \njane@doe.com\t, \t\n')).toEqual([
				new EmailString('bohdan@tsymbala.com'),
				new EmailString('john@doe.com'),
				new EmailString('jane@doe.com')
			]);
		});
	});

	describe('EmailString::isValid', () => {
		it('should return true when valid', () => {
			expect(new EmailString('bohdan@tsymbala.com').isValid()).toBeTruthy();
		});

		it('should return false when invalid', () => {
			expect(new EmailString('tsymbala.com').isValid()).toBeFalsy();
		});
	});
});
