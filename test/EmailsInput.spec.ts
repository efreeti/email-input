import {EmailsInput} from "../src";

function createContainer() {
	const div = document.createElement('div');

	document.body.appendChild(div);

	return div;
}

describe('EmailsInput', () => {
	describe('EmailsInput::create', () => {
		it('should create proper markup for empty list', () => {
			const container = createContainer();

			new EmailsInput(container).create();

			const root = container.querySelector('.emails-input');
			const input = root.querySelector('input');
			const items = root.querySelectorAll('.email-string-list__email-block');

			expect(input).not.toBeNull();
			expect(items.length).toBe(0);
		});

		it('should create proper markup for initial values', () => {
			const container = createContainer();

			new EmailsInput(container, {emails: ['bohdan@tsymbala.com', 'invalid.com']}).create();

			const root = container.querySelector('.emails-input');
			const input = root.querySelector('input');
			const items = root.querySelectorAll('.email-string-list__email-block');

			expect(input).not.toBeNull();
			expect(items.length).toBe(2);
		});
	});

	describe('EmailsInput::getEmails', () => {
		it('should get empty value when not initialised', () => {
			const emailsInput = new EmailsInput(createContainer()).create();

			expect(emailsInput.getEmails().length).toBe(0);
		});

		it('should get initial value when initialised', () => {
			const emailsInput = new EmailsInput(createContainer(), {emails: ['bohdan@tsymbala.com', 'invalid.com']}).create();

			expect(emailsInput.getEmails().length).toBe(2);
			expect(emailsInput.getEmails()[0]).toBe('bohdan@tsymbala.com');
			expect(emailsInput.getEmails()[1]).toBe('invalid.com');
		});

		it('should get correct value after setEmails', () => {
			const emailsInput = new EmailsInput(createContainer()).create();
			emailsInput.setEmails(['bohdan@tsymbala.com', 'invalid.com']);

			expect(emailsInput.getEmails().length).toBe(2);
			expect(emailsInput.getEmails()[0]).toBe('bohdan@tsymbala.com');
			expect(emailsInput.getEmails()[1]).toBe('invalid.com');
		});

		it('should get correct value after addEmail', () => {
			const emailsInput = new EmailsInput(createContainer(), {emails: ['bohdan@tsymbala.com']}).create();
			emailsInput.addEmail('invalid.com');

			expect(emailsInput.getEmails().length).toBe(2);
			expect(emailsInput.getEmails()[0]).toBe('bohdan@tsymbala.com');
			expect(emailsInput.getEmails()[1]).toBe('invalid.com');
		});
	});

	describe('EmailsInput::setEmails', () => {
		it('should update markup after setting new value', () => {
			const container = createContainer();

			new EmailsInput(container, {emails: ['bohdan@tsymbala.com', 'invalid.com']}).create()
				.setEmails(['john@doe.com', 'jane@doe.com']);

			const root = container.querySelector('.emails-input');
			const items = root.querySelectorAll('.email-string-list__email-block');

			expect(items.length).toBe(2);
			expect(items[0].textContent).toContain('john@doe.com');
			expect(items[1].textContent).toContain('jane@doe.com');
		});

		it('should invoke callback after setting new value', () => {
			const mockedOnChange = jest.fn();

			new EmailsInput(createContainer(), {emails: ['bohdan@tsymbala.com', 'invalid.com'], onChange: mockedOnChange}).create()
				.setEmails(['john@doe.com', 'jane@doe.com']);

			expect(mockedOnChange).toHaveBeenCalled();
		});
	});

	describe('EmailsInput::addEmail', () => {
		it('should update markup after adding value', () => {
			const container = createContainer();

			new EmailsInput(container, {emails: ['bohdan@tsymbala.com', 'invalid.com']}).create()
				.addEmail('john@doe.com');

			const root = container.querySelector('.emails-input');
			const items = root.querySelectorAll('.email-string-list__email-block');

			expect(items.length).toBe(3);
			expect(items[0].textContent).toContain('bohdan@tsymbala.com');
			expect(items[1].textContent).toContain('invalid.com');
			expect(items[2].textContent).toContain('john@doe.com');
		});

		it('should invoke callback after setting new value', () => {
			const mockedOnChange = jest.fn();

			new EmailsInput(createContainer(), {emails: ['bohdan@tsymbala.com'], onChange: mockedOnChange}).create()
				.addEmail('john@doe.com');

			expect(mockedOnChange).toHaveBeenCalled();
		});
	});
});
