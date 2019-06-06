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
import * as React from 'react';
import { Animated, Easing, TouchableNativeFeedback, Platform } from 'react-native';
import styled from 'styled-components/native';
import Collapsible from 'react-native-collapsible';

import { baseColors, fontSizes, spacing } from 'utils/variables';
import { BaseText } from 'components/Typography';

import Icon from 'components/Icon';

const StyledItemTouchable = styled.TouchableHighlight`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 14px ${spacing.mediumLarge}px;
`;

const StyledItemView = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 14px ${spacing.mediumLarge}px;
`;

const ItemLabelHolder = styled.View`
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const ListItem = styled.View`
  flex-direction: column; 
  justify-content: space-between;
`;

const ListItemMainPart = styled.View`
  flex: 1;
  flex-direction: row; 
`;

const ItemLabel = styled(BaseText)`
  font-size: ${fontSizes.small};
`;

const ListAddon = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const CollapseWrapper = styled.View`
  padding: 4px 16px 10px 36px;
`;

const ButtonWrapper = ({ onPress, children, collapseContent }) => {
  if (Platform.OS === 'android') {
    return (
      <TouchableNativeFeedback
        onPress={onPress}
        background={TouchableNativeFeedback.Ripple()}
        disabled={!onPress || !collapseContent}
      >
        <StyledItemView>
          {children}
        </StyledItemView>
      </TouchableNativeFeedback>
    );
  }
  return (
    <StyledItemTouchable
      onPress={onPress}
      underlayColor={baseColors.lightGray}
      disabled={!onPress || !collapseContent}
    >
      {children}
    </StyledItemTouchable>
  );
};

type Props = {
  label: string,
  onPress?: ?Function,
  open?: boolean,
  collapseContent?: React.Node,
}

export default class CollapsibleListItem extends React.Component<Props> {
  spinValue = new Animated.Value(0);

  componentDidMount() {
    this.animateChevron();
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.open !== this.props.open) this.animateChevron();
  }

  animateChevron = () => {
    const { open } = this.props;
    const rotateAngle = open ? 1 : 0;

    Animated.timing(
      this.spinValue,
      {
        toValue: rotateAngle,
        duration: 300,
        easing: Easing.linear,
        useNativeDriver: true,
      },
    ).start();
  };

  render() {
    const {
      onPress,
      label,
      open,
      collapseContent,
    } = this.props;

    const spinAngle = this.spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['90deg', '-90deg'],
    });

    return (
      <ListItem>
        <ButtonWrapper onPress={onPress} collapseContent={collapseContent}>
          <ListItemMainPart>
            <ItemLabelHolder>
              <ItemLabel>{label}</ItemLabel>
            </ItemLabelHolder>
            {!!collapseContent &&
            <ListAddon>
              <Animated.View
                style={{ transform: [{ rotate: spinAngle }] }}
              >
                <Icon
                  name="chevron-right"
                  style={{
                    fontSize: fontSizes.tiny,
                    color: baseColors.coolGrey,
                  }}
                />
              </Animated.View>
            </ListAddon>}
          </ListItemMainPart>
        </ButtonWrapper>
        <Collapsible collapsed={!open}>
          <CollapseWrapper>
            {collapseContent}
          </CollapseWrapper>
        </Collapsible>
      </ListItem>
    );
  }
}