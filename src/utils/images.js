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
/* eslint-disable i18next/no-literal-string */

import { useTheme } from 'styled-components/native';
import MD5 from 'crypto-js/md5';
import { getEnv } from 'configs/envConfig';
import type { Theme } from 'models/Theme';
import { getThemeType } from './themes';

const patternPlaceholderLight = require('assets/images/no_logo.png');
const patternPlaceholderDark = require('assets/images/no_logo_dark.png');
const genericTokenLight = require('assets/images/tokens/genericTokenLight.png');
const genericTokenDark = require('assets/images/tokens/genericTokenDark.png');
const pillarLogo = require('assets/images/pillar-logo-pixel.png');
const pillarLogoSmallLight = require('assets/images/logo-small-on-light.png');
const pillarLogoSmallDark = require('assets/images/logo-small-on-dark.png');
const keyWalletIcon = require('assets/icons/icon_key_wallet.png');
const keyWalletIconDark = require('assets/icons/key_wallet_dark.png');
const smartWalletIcon = require('assets/icons/icon_smart_wallet.png');
const smartWalletIconDark = require('assets/icons/icon_smart_wallet_dark.png');
const PPNIcon = require('assets/icons/icon_PPN.png');
const swActivatedLight = require('assets/images/swActivatedLight.png');
const swActivatedDark = require('assets/images/swActivatedDark.png');
const emailIconLight = require('assets/icons/icon_email_light.png');
const emailIconDark = require('assets/icons/icon_circle_mail_dark.png');
const phoneIconLight = require('assets/icons/icon_phone_light.png');
const phoneIconDark = require('assets/icons/icon_circle_phone_device.png');
const exchangeIconLight = require('assets/icons/exchange.png');
const exchangeIconDark = require('assets/icons/exchange_dark.png');
const walletIconLight = require('assets/icons/iconRoundedWalletLight.png');
const walletIconDark = require('assets/icons/icon_rounded_wallet_dark.png');
const personIconLight = require('assets/icons/iconRoundedPersonLight.png');
const personIconDark = require('assets/icons/icon_rounded_person_dark.png');
const highFeesLight = require('assets/icons/high_fees.png');
const highFeesDark = require('assets/icons/high_fees_dark.png');
const infoIconLight = require('assets/icons/icon_info_light.png');
const infoIconDark = require('assets/icons/icon_info_dark.png');
const copyIconLight = require('assets/icons/icon_copy.png');
const copyIconDark = require('assets/icons/icon_copy_dark.png');


// exchange providers
const uniswapLightVertical = require('assets/images/exchangeProviders/uniswapLightVertical.png');
const uniswapLightHorizontal = require('assets/images/exchangeProviders/uniswapLightHorizontal.png');
const uniswapLightMonochrome = require('assets/images/exchangeProviders/uniswapLightMonochrome.png');
const oneinchLightVertical = require('assets/images/exchangeProviders/oneinchLightVertical.png');
const oneinchLightHorizontal = require('assets/images/exchangeProviders/oneinchLightHorizontal.png');
const oneinchLightMonochrome = require('assets/images/exchangeProviders/oneinchLightMonochrome.png');
const uniswapDarkVertical = require('assets/images/exchangeProviders/uniswapDarkVertical.png');
const uniswapDarkHorizontal = require('assets/images/exchangeProviders/uniswapDarkHorizontal.png');
const uniswapDarkMonochrome = require('assets/images/exchangeProviders/uniswapDarkMonochrome.png');
const oneinchDarkVertical = require('assets/images/exchangeProviders/oneinchDarkVertical.png');
const oneinchDarkHorizontal = require('assets/images/exchangeProviders/oneinchDarkHorizontal.png');
const oneinchDarkMonochrome = require('assets/images/exchangeProviders/oneinchDarkMonochrome.png');
const synthetixLightVertical = require('assets/images/exchangeProviders/synthetixLightVertical.png');
const synthetixLightHorizontal = require('assets/images/exchangeProviders/synthetixLightHorizontal.png');
const synthetixLightMonochrome = require('assets/images/exchangeProviders/synthetixLightMonochrome.png');
const synthetixDarkVertical = require('assets/images/exchangeProviders/synthetixDarkVertical.png');
const synthetixDarkHorizontal = require('assets/images/exchangeProviders/synthetixDarkHorizontal.png');
const synthetixDarkMonochrome = require('assets/images/exchangeProviders/synthetixDarkMonochrome.png');
const exchangeDefaultLogoDark = require('assets/icons/exchange_default_dark.png');
const exchangeDefaultLogoLight = require('assets/icons/exchange_default_light.png');

// patterns
const landingPattern = require('assets/images/patterns/onboarding_pattern_top.png');

function getImageByTheme(currentTheme, values) {
  return values[currentTheme];
}

export const images = (theme: Theme) => {
  const currentTheme = getThemeType(theme);
  return {
    towellie: getImageByTheme(currentTheme, {
      lightTheme: patternPlaceholderLight,
      darkTheme: patternPlaceholderDark,
    }),
    genericToken: getImageByTheme(currentTheme, {
      lightTheme: genericTokenLight,
      darkTheme: genericTokenDark,
    }),
    pillarLogo: getImageByTheme(currentTheme, {
      lightTheme: pillarLogo,
      darkTheme: pillarLogo,
    }),
    pillarLogoSmall: getImageByTheme(currentTheme, {
      lightTheme: pillarLogoSmallLight,
      darkTheme: pillarLogoSmallDark,
    }),
    keyWalletIcon: getImageByTheme(currentTheme, {
      lightTheme: keyWalletIcon,
      darkTheme: keyWalletIconDark,
    }),
    smartWalletIcon: getImageByTheme(currentTheme, {
      lightTheme: smartWalletIcon,
      darkTheme: smartWalletIconDark,
    }),
    PPNIcon: getImageByTheme(currentTheme, {
      lightTheme: PPNIcon,
      darkTheme: PPNIcon,
    }),
    swActivated: getImageByTheme(currentTheme, {
      lightTheme: swActivatedLight,
      darkTheme: swActivatedDark,
    }),
    roundedEmailIcon: getImageByTheme(currentTheme, {
      lightTheme: emailIconLight,
      darkTheme: emailIconDark,
    }),
    roundedPhoneIcon: getImageByTheme(currentTheme, {
      lightTheme: phoneIconLight,
      darkTheme: phoneIconDark,
    }),
    landingPattern: getImageByTheme(currentTheme, {
      lightTheme: landingPattern,
      darkTheme: landingPattern,
    }),
    exchangeIcon: getImageByTheme(currentTheme, {
      lightTheme: exchangeIconLight,
      darkTheme: exchangeIconDark,
    }),
    walletIcon: getImageByTheme(currentTheme, {
      lightTheme: walletIconLight,
      darkTheme: walletIconDark,
    }),
    personIcon: getImageByTheme(currentTheme, {
      lightTheme: personIconLight,
      darkTheme: personIconDark,
    }),
    highFeesIcon: getImageByTheme(currentTheme, {
      lightTheme: highFeesLight,
      darkTheme: highFeesDark,
    }),
    infoIcon: getImageByTheme(currentTheme, {
      lightTheme: infoIconLight,
      darkTheme: infoIconDark,
    }),
    copy: getImageByTheme(currentTheme, {
      lightTheme: copyIconLight,
      darkTheme: copyIconDark,
    }),
  };
};

export const useThemedImages = () => images(useTheme());

export const staticImages = {
  uniswapLightVertical,
  uniswapLightHorizontal,
  uniswapLightMonochrome,
  oneinchLightVertical,
  oneinchLightHorizontal,
  oneinchLightMonochrome,
  uniswapDarkVertical,
  uniswapDarkHorizontal,
  uniswapDarkMonochrome,
  oneinchDarkVertical,
  oneinchDarkHorizontal,
  oneinchDarkMonochrome,
  synthetixLightVertical,
  synthetixLightHorizontal,
  synthetixLightMonochrome,
  synthetixDarkVertical,
  synthetixDarkHorizontal,
  synthetixDarkMonochrome,
  exchangeDefaultLogoDark,
  exchangeDefaultLogoLight,
};

export const getImageUrl = (url: ?string, size: number) => {
  if (!url) return undefined;
  return `${getEnv().SDK_PROVIDER}/${url}?size=${size}`;
};

export const isSvgImage = (uri: ?string) => {
  return uri && uri.endsWith('.svg');
};

export const getIdenticonImageUrl = (input: ?string, size: number): ?string => {
  if (!input) return undefined;

  const hash = MD5(input);

  // Params explained: https://en.gravatar.com/site/implement/images/
  // Note: using `f` to always force default identicon image
  return `https://www.gravatar.com/avatar/${hash}?default=identicon&s=${size}&f=y`;
};
