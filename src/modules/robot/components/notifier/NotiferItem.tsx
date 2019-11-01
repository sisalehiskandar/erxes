import debounce from 'lodash/debounce';
import Icon from 'modules/common/components/Icon';
import { FEATURES } from 'modules/robot/constants';
import Channel from 'modules/robot/containers/Channel';
import * as React from 'react';
import { Link } from 'react-router-dom';
import RTG from 'react-transition-group';
import { IEntry } from '../../types';
import { Close, Item } from './styles';

type Props = {
  children?: React.ReactNode;
  closable?: boolean;
  background?: string;
  delay?: number;
  entry: IEntry;
  action?: string;
};

type State = {
  show: boolean;
};

class NotifierItem extends React.Component<Props, State> {
  static defaultProps = {
    delay: 1000
  };

  constructor(props) {
    super(props);

    this.state = { show: false };
  }

  componentDidMount = () => {
    debounce(() => this.setState({ show: true }), this.props.delay)();
  };

  close = () => {
    this.setState({ show: false });
  };

  generateSuggestContent = (message: string) => {
    return (
      <>
        You didn't use {FEATURES[message].title} feature yet. If you want to
        start using <Link to={FEATURES[message].url}>click here.</Link>
      </>
    );
  };

  renderNotifierContent = (content: React.ReactNode) => {
    const { closable = true, background } = this.props;

    return (
      <RTG.CSSTransition
        in={this.state.show}
        appear={true}
        timeout={500}
        classNames="slide-in-small"
        unmountOnExit={true}
      >
        <Item background={background}>
          {closable && (
            <Close onClick={this.close}>
              <Icon icon="times" />
            </Close>
          )}
          <span role="img" aria-label="Wave">
            👋
          </span>
          <div>
            <h3>Oops!</h3>
            <p>{content}</p>
          </div>
        </Item>
      </RTG.CSSTransition>
    );
  };

  render() {
    const { entry, action } = this.props;
    const data = entry.data;

    switch (action) {
      case 'featureSuggestion':
        return this.renderNotifierContent(
          this.generateSuggestContent(data.message)
        );

      case 'channelsWithoutIntegration':
        if (data.channelIds.length === 0) {
          return null;
        }

        return this.renderNotifierContent(
          <>
            {data.channelIds.map(id => (
              <Channel key={id} id={id} modalKey="showManageIntegrationModal" />
            ))}
            These channels have no integrations. You can start adding.
          </>
        );

      case 'channelsWithoutMembers':
        if (data.channelIds.length === 0) {
          return null;
        }

        return this.renderNotifierContent(
          <>
            {data.channelIds.map(id => (
              <Channel key={id} id={id} modalKey="showChannelAddModal" />
            ))}
            these channels have no members. You can start adding.
          </>
        );

      case 'brandsWithoutIntegration':
        if (data.brandIds.length === 0) {
          return null;
        }

        return this.renderNotifierContent(<>{data.brandIds}</>);

      default:
        return null;
    }
  }
}

export default NotifierItem;