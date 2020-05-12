import {EmailString} from '@/model/EmailString';
import {EmailStringList} from '@/model/EmailStringList';

const bohdan = new EmailString('bohdan@tsymbala.com');
const bob = new EmailString('bob@bol.com');
const john = new EmailString('john@doe.com');
const jane = new EmailString('jane@doe.com');
const bohdan2 = new EmailString('bohdan@tsymbala.com');

describe('EmailStringList', () => {
	describe('EmailStringList::getEmails', () => {
		it('should return initialised value', () => {
			expect(new EmailStringList([bohdan, bob]).getEmails()).toEqual([bohdan, bob]);
		});

		it('should return correct value after items were replaced', () => {
			const list = new EmailStringList([bohdan, bob]);
			list.setEmails([john, jane]);

			expect(list.getEmails()).toEqual([john, jane]);
		});

		it('should return correct value after items were added', () => {
			const list = new EmailStringList([bohdan, bob]);
			list.addEmails([john, jane]);

			expect(list.getEmails()).toEqual([bohdan, bob, john, jane]);
		});

		it('should return correct value after items were removed', () => {
			const list = new EmailStringList([bohdan, bohdan2, bob]);
			list.removeEmail(bohdan);
			list.removeEmail(jane);

			expect(list.getEmails()).toEqual([bohdan2, bob]);
		});
	});

	describe('EmailStringList::setEmails', () => {
		it('should set items successfully', () => {
			new EmailStringList([bohdan, bob]).setEmails([john, jane]);
		});

		it('should notify after items were set', () => {
			let notificationsCount = 0;
			const list = new EmailStringList([bohdan, bob]);

			list.addObserver({update: propertyName => {
				expect(propertyName).toBe('emails');
				expect(list.getEmails()).toEqual([john, jane]);
				++notificationsCount;
			}});
			list.setEmails([john, jane]);

			expect(notificationsCount).toBe(1);
		});
	});

	describe('EmailStringList::addEmails', () => {
		it('should add items successfully', () => {
			new EmailStringList([bohdan, bob]).addEmails([john, jane]);
		});

		it('should notify after items were added', () => {
			let notificationsCount = 0;
			const list = new EmailStringList([bohdan, bob]);

			list.addObserver({update: propertyName => {
				expect(propertyName).toBe('emails');
				expect(list.getEmails()).toEqual([bohdan, bob, john, jane]);
				++notificationsCount;
			}});
			list.addEmails([john, jane]);

			expect(notificationsCount).toBe(1);
		});
	});

	describe('EmailStringList::removeEmail', () => {
		it('should remove existing item successfully', () => {
			new EmailStringList([bohdan, bob]).removeEmail(john);
		});

		it('should process non existing item silently', () => {
			new EmailStringList([bohdan, bob]).removeEmail(jane);
		});

		it('should notify after item was removed', () => {
			let notificationsCount = 0;
			const list = new EmailStringList([bohdan, bob]);

			list.addObserver({update: propertyName => {
				expect(propertyName).toBe('emails');
				expect(list.getEmails()).toEqual([bohdan]);
				++notificationsCount;
			}});
			list.removeEmail(bob);

			expect(notificationsCount).toBe(1);
		});
	});
});
