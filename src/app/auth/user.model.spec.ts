import { User } from './user.model';

describe('User', () => {
  it('exposes the token while it is still valid', () => {
    const expires = new Date(new Date().getTime() + 60 * 60 * 1000);
    const user = new User('a@b.com', 'uid-1', 'tok-1', expires);

    expect(user.token).toBe('tok-1');
  });

  it('withholds the token once it has expired', () => {
    const expired = new Date(new Date().getTime() - 1000);
    const user = new User('a@b.com', 'uid-1', 'tok-1', expired);

    expect(user.token).toBeNull();
  });

  it('withholds the token when no expiry is known', () => {
    const user = new User('a@b.com', 'uid-1', 'tok-1', null);

    expect(user.token).toBeNull();
  });
});
