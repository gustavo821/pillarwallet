// @flow
/*
    Pillar Wallet: the personal data locker
    Copyright (C) 2019 Stiftung Pillar Project

    This program is free software; you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation; either version 2 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License along
    with this program; if not, write to the Free Software Foundation, Inc.,
    51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.
*/

import type { Account, Accounts } from 'models/Account';
import { ACCOUNT_TYPES } from 'constants/accountsConstants';

export function getActiveAccountId(accounts: Accounts = []): string {
  const activeAccount = accounts.find(({ isActive }) => isActive) || {};
  return activeAccount.id || '';
}

export function getActiveAccountAddress(accounts: Accounts = []): string {
  return getActiveAccountId(accounts);
}

export function findKeyBasedAccount(accounts: Accounts): ?Account {
  return accounts.find(({ type }) => type === ACCOUNT_TYPES.KEY_BASED);
}
