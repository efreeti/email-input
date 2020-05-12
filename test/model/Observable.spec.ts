import {Observable} from '../../src/model/Observable';

describe('Observable', () => {
	describe('Observable::hasObserver', () => {
		it('should return false when observer was not added', () => {
			expect(new Observable().hasObserver({update: () => {}})).toBeFalsy();
		});

		it('should return true when observer was added', () => {
			const observable = new Observable();
			const observer = {update: () => {}};

			observable.addObserver(observer);

			expect(observable.hasObserver(observer)).toBeTruthy();
		});

		it('should return false when observer was removed after adding', () => {
			const observable = new Observable();
			const observer = {update: () => {}};

			observable.addObserver(observer);
			observable.removeObserver(observer);

			expect(observable.hasObserver(observer)).toBeFalsy();
		});
	});

	describe('Observable::addObserver', () => {
		it('should add observer successfully', () => {
			new Observable().addObserver({update: () => {}});
		});
	});

	describe('Observable::removeObserver', () => {
		it('should execute silently when observer was not added', () => {
			new Observable().removeObserver({update: () => {}});
		});

		it('should remove observer successfully after it was added', () => {
			const observable = new Observable();
			const observer = {update: () => {}};

			observable.addObserver(observer);
			observable.removeObserver(observer);
		});
	});

	describe('Observable::notifyObservers', () => {
		it('should notify observer successfully after it was added', () => {
			const observable = new Observable();
			const observer = {update: propertyName => {
				expect(propertyName).toBe('property 1');
			}};

			observable.addObserver(observer);
			observable.notifyObservers('property 1');
		});

		it('should notify multiple observers successfully after it was added', () => {
			let notificationsCount = 0;
			const observable = new Observable();
			const observer1 = {update: propertyName => {
				expect(propertyName).toBe('property 1');
				++notificationsCount;
			}};
			const observer2 = {update: propertyName => {
				expect(propertyName).toBe('property 1');
				++notificationsCount;
			}};

			observable.addObserver(observer1);
			observable.addObserver(observer2);
			observable.notifyObservers('property 1');

			expect(notificationsCount).toBe(2);
		});

		it('should notify multiple observers properly even when observers remove themselves during notification', () => {
			let notificationsCount = 0;
			const observable = new Observable();
			const observer1 = {update: propertyName => {
				observable.removeObserver(observer1);
				++notificationsCount;
			}};
			const observer2 = {update: propertyName => {
				observable.removeObserver(observer2);
				++notificationsCount;
			}};

			observable.addObserver(observer1);
			observable.addObserver(observer2);
			observable.notifyObservers('property 1');

			expect(notificationsCount).toBe(2);
		});

		it('should not notify observer after it was removed', () => {
			let notificationsCount = 0;
			const observable = new Observable();
			const observer = {update: () => {
					++notificationsCount;
			}};

			observable.addObserver(observer);
			observable.removeObserver(observer);
			observable.notifyObservers('property 1');

			expect(notificationsCount).toBe(0);
		});
	});
});
