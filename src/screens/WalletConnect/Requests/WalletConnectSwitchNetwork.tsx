// @flow
/*
    Pillar Wallet: the personal data locker
    Copyright (C) 2021 Stiftung Pillar Project

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

import React, { FC, ReactElement, useRef, useEffect } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View, Modal as RNModal } from 'react-native';
import { useTranslationWithPrefix } from 'translations/translate';
import { useDispatch } from 'react-redux';

// Components
import Text from 'components/core/Text';
import { Spacing } from 'components/legacy/Layout';
import Icon from 'components/core/Icon';

// Utils
import { useThemeColors } from 'utils/themes';
import { useChainsConfig } from 'utils/uiConfig';
import { getDeviceHeight, getDeviceWidth } from 'utils/common';
import { getActiveAccount, isEtherspotAccount, isArchanovaAccount, findFirstEtherspotAccount } from 'utils/accounts';
import { objectFontStyles } from 'utils/variables';

// Selectors
import { useSupportedChains } from 'selectors/chains';

// Actions
import { switchAccountAction } from 'actions/accountsActions';

// Hooks
import { useWalletConnectAccounts } from 'hooks/useWalletConnect';
import { useDeploymentStatus } from 'hooks/deploymentStatus';

// Modals
import type { Chain } from 'models/Chain';
import type { Account } from 'models/Account';

interface Props {
  chain: Chain;
  onChangeChain: (chain: Chain) => void;
}

const useChains = (): any[] => {
  const chains = useSupportedChains();
  const config = useChainsConfig();
  const accounts = useWalletConnectAccounts();
  const activeAccount: Account | any = getActiveAccount(accounts);
  const isActiveEtherspotAccount = isEtherspotAccount(activeAccount);
  const etherspotAccount = findFirstEtherspotAccount(accounts);

  const chainTabs = chains.map((chain) => {
    const { state } = etherspotAccount.extra[chain];
    return {
      key: chain,
      chain,
      value: config[chain].title,
      label: config[chain].titleShort,
      icon: config[chain].iconName,
      isDeployed: isActiveEtherspotAccount ? (state === 'Deployed' ? true : false) : true,
    };
  });
  return chainTabs;
};

const WalletConnectSwitchNetwork: FC<Props> = ({ chain, onChangeChain }) => {
  const colors = useThemeColors();
  const chains = useChains();
  const accounts = useWalletConnectAccounts();
  const btnRef: any = useRef();
  const dispatch = useDispatch();
  const { t, tRoot } = useTranslationWithPrefix('walletConnectContent');
  const { showDeploymentInterjection } = useDeploymentStatus();

  const activeAccount: Account | any = getActiveAccount(accounts);
  const isActiveEtherspotAccount = isEtherspotAccount(activeAccount);
  const isActiveArchanovaAccount = isArchanovaAccount(activeAccount);

  const requestedChainInfo = chains?.find((chainInfo) => chainInfo.chain === chain);

  const [showList, setShowList] = React.useState(false);
  const [contentHeight, setContentHeight] = React.useState(0);
  const [dropDownFromTop, setDropDownFromTop] = React.useState(getDeviceHeight());
  const [selectedNetwork, setSelectedNetwork] = React.useState(requestedChainInfo);

  useEffect(() => {
    setSelectedNetwork(requestedChainInfo);
    onChangeChain(requestedChainInfo.chain);
  }, [activeAccount]);

  useEffect(() => {
    if (!btnRef && contentHeight === 0) return;
    btnRef.current?.measure((_fx, _fy, _w, h, _px, py) => {
      setDropDownFromTop(py + contentHeight);
    });
  }, [showList, btnRef, contentHeight]);

  const renderItem = ({ item, type }): ReactElement<any, any> => (
    <TouchableOpacity
      disabled={!isActiveEtherspotAccount}
      style={type === 'selectedChain' ? styles.selectedChainContainer : styles.btnContainer}
      onPress={() => {
        setShowList(!showList);
        setSelectedNetwork(item);
        onChangeChain(item.chain);
      }}
    >
      <Icon name={item.icon} />
      <Spacing w={8} />
      <Text variant="big" style={{ flex: 1 }}>
        {item.label}
      </Text>

      {type === 'selectedChain' && !item.isDeployed && (
        <TouchableOpacity
          onPress={() => showDeploymentInterjection(selectedNetwork.chain)}
          style={[styles.deployBtn, { backgroundColor: colors.buttonPrimaryBackground }]}
        >
          <Text variant="regular" style={{}}>
            {tRoot('button.deploy')}
          </Text>
        </TouchableOpacity>
      )}

      {(type !== 'selectedChain' || item.isDeployed) && (
        <>
          <Icon name={item.isDeployed ? 'checkmark-green' : 'cross-red'} />
          <Spacing w={4} />
          <Text variant="regular" color={item.isDeployed ? colors.positive : colors.negative}>
            {item.isDeployed ? tRoot('label.deployed') : tRoot('label.notDeployed')}
          </Text>
        </>
      )}
      {type === 'selectedChain' && isActiveEtherspotAccount && (
        <Icon
          style={[styles.upDnIcon, { backgroundColor: colors.basic050 }]}
          name={!showList ? 'chevron-down' : 'chevron-up'}
        />
      )}
    </TouchableOpacity>
  );

  const ListModal = () => (
    <RNModal animationType="none" visible={showList} transparent>
      <TouchableOpacity
        activeOpacity={1}
        style={{ flex: 1 }}
        onPress={() => {
          setShowList(false);
        }}
      />
      <View
        style={[styles.mainContent, { backgroundColor: colors.basic60, top: dropDownFromTop }, styles.bottomRadius]}
      >
        <FlatList
          contentContainerStyle={styles.listContainer}
          data={chains}
          renderItem={({ item }) => renderItem({ item, type: 'list' })}
          keyExtractor={(item) => item.value}
          indicatorStyle="white"
        />
      </View>
    </RNModal>
  );

  return (
    <>
      {isActiveEtherspotAccount && !selectedNetwork.isDeployed && (
        <Text style={[styles.warning, { color: colors.helpIcon }]}>
          {t('paragraph.undeploy_warning_1')}
          <Text style={{ color: colors.tertiaryText }}>{t('paragraph.deploy_manager')}</Text>
          {t('paragraph.undeploy_warning_2')}
        </Text>
      )}

      {isActiveArchanovaAccount && (
        <Text style={[styles.warning, { color: colors.helpIcon }]}>{t('paragraph.archanova_warning')}</Text>
      )}

      <FlatList
        key="walletconnect_accounts"
        data={accounts}
        horizontal
        bounces={false}
        ItemSeparatorComponent={() => <Spacing w={8} />}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.walletBtn, activeAccount?.id === item.id && { backgroundColor: colors.modalHandleBar }]}
            onPress={() => dispatch(switchAccountAction(item.id))}
            key={item.id}
          >
            <Text style={styles.walletTxt}>{item.label}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
      />

      <View
        ref={btnRef}
        onLayout={(event) => {
          const { height } = event.nativeEvent.layout;
          if (contentHeight !== height) setContentHeight(height);
        }}
        style={[styles.container, { backgroundColor: colors.basic60 }, !showList && styles.bottomRadius]}
      >
        {renderItem({ item: selectedNetwork, type: 'selectedChain' })}

        {showList && <View style={[styles.line, { backgroundColor: colors.basic050 }]} />}
      </View>

      <ListModal />
    </>
  );
};

export default WalletConnectSwitchNetwork;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    marginBottom: 32,
    height: 54,
  },
  mainContent: {
    maxHeight: 180,
    position: 'absolute',
    width: getDeviceWidth() - 40,
    alignSelf: 'center',
    zIndex: 10,
  },
  bottomRadius: {
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  line: {
    width: '92%',
    alignSelf: 'center',
    height: 1,
  },
  btnContainer: { paddingTop: 20, flexDirection: 'row', alignItems: 'center' },
  selectedChainContainer: {
    width: '100%',
    height: 53,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
  },
  deployBtn: {
    borderRadius: 8,
    height: 32,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  upDnIcon: { width: 24, height: 24, borderRadius: 12, marginLeft: 16 },
  listContainer: { paddingBottom: 22, paddingHorizontal: 14, paddingTop: 0 },
  warning: {
    textAlign: 'center',
    ...objectFontStyles.medium,
  },
  walletBtn: {
    height: 52,
    borderRadius: 26,
    backgroundColor: '#1e1e1e',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 24,
    paddingHorizontal: 16,
  },
  walletTxt: {
    ...objectFontStyles.big,
  },
});
