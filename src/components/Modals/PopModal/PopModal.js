// @flow
import * as React from 'react';
import { Dimensions } from 'react-native';
import Modal from 'react-native-modal';
import styled from 'styled-components/native';
import Title from 'components/Title';
import Button from 'components/Button';

type Props = {
  title?: string,
  headerImage?: string,
  children?: React.Node,
  fullScreenComponent?: ?React.Node,
  onModalHide?: Function,
  isVisible: boolean,
  animationOutTiming: number,
  animationInTiming: number,
  backdropTransitionInTiming: number,
  backdropTransitionOutTiming: number,
};

type State = {
  isVisible: boolean,
};

const window = Dimensions.get('window');

const ModalWrapper = styled.View`
  position: absolute;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const ModalHeaderImage = styled.Image`
  width: 300;
  height: 150;
`;

const ModalBackground = styled.View`
  background-color: white;
  padding: 20px;
  border-radius: 20;
  box-shadow: 10px 5px 5px rgba(0,0,0,.5);
  width: ${window.width - 40};
  overflow: hidden;
`;

const ModalContent = styled.View`
  flex: 1;
  align-items: center;
  justify-content: space-around;
`;


export default class PopModal extends React.Component<Props, State> {
  static defaultProps = {
    fullScreenComponent: null,
    animationInTiming: 300,
    animationOutTiming: 400,
    backdropTransitionInTiming: 300,
    backdropTransitionOutTiming: 300,
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      isVisible: props.isVisible,
    };
  }

  static getDerivedStateFromProps(nextProps: Props, prevState: State) {
    if (nextProps.isVisible !== prevState.isVisible) {
      return {
        isVisible: nextProps.isVisible,
      };
    }
    return null;
  }

  hideModal = () => {
    this.setState({
      isVisible: false,
    });
  }

  render() {
    const {
      isVisible,
    } = this.state;
    const {
      children,
      title,
      fullScreenComponent,
      onModalHide,
      headerImage,
      animationInTiming,
      animationOutTiming,
      backdropTransitionInTiming,
      backdropTransitionOutTiming,
    } = this.props;
    return (
      <Modal
        isVisible={isVisible}
        onSwipe={this.hideModal}
        onModalHide={onModalHide}
        onBackdropPress={this.hideModal}
        animationInTiming={animationInTiming}
        animationOutTiming={animationOutTiming}
        backdropTransitionInTiming={backdropTransitionInTiming}
        backdropTransitionOutTiming={backdropTransitionOutTiming}
        animationIn="zoomIn"
        animationOut="zoomOut"
        swipeDirection="down"
        style={{
          margin: 0,
        }}
      >
        <ModalWrapper>
          <ModalBackground>
            <ModalContent>
              {!!headerImage && <ModalHeaderImage source={headerImage} />}
              {!!title && <Title title={title} />}
              {isVisible && children}
              <Button block title="Dismiss" onPress={this.hideModal} />
            </ModalContent>
          </ModalBackground>
        </ModalWrapper>
        {fullScreenComponent}
      </Modal>
    );
  }
}
