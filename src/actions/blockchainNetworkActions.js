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

import { SET_ACTIVE_NETWORK } from 'constants/blockchainNetworkConstants';
import { UPDATE_APP_SETTINGS } from 'constants/appSettingsConstants';
import { saveDbAction } from './dbActions';

export const setActiveBlockchainNetworkAction = (id: string) => {
  return async (dispatch: Function) => {
    dispatch({
      type: SET_ACTIVE_NETWORK,
      payload: id,
    });
    dispatch(saveDbAction('app_settings', { appSettings: { blockchainNetwork: id } }));
    dispatch({
      type: UPDATE_APP_SETTINGS,
      payload: { blockchainNetwork: id },
    });
  };
};