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
import styled from 'styled-components/native';
import { themedColors } from 'utils/themes';

type Props = {
  spaceOnLeft?: number,
};

const SeparatorWrapper = styled.View`
  padding-left: ${props => props.spaceOnLeft ? props.spaceOnLeft : 44}px;
`;

const SeparatorLine = styled.View`
  width: 100%;
  height: 1px;
  background-color: ${themedColors.border};
`;

const Separator = (props: Props) => {
  return (
    <SeparatorWrapper spaceOnLeft={props.spaceOnLeft}>
      <SeparatorLine />
    </SeparatorWrapper>
  );
};

export default Separator;
