import {EmailString} from "../../src/model/EmailString";

describe('EmailString', () => {
	describe('EmailString::isValid', () => {
		it('should return true when valid', () => {
			expect(new EmailString('bohdan@tsymbala.com').isValid()).toBeTruthy();
		});

		it('should return false when invalid', () => {
			expect(new EmailString('tsymbala.com').isValid()).toBeFalsy();
		});
	});
});
