import React from 'react';
import axios from 'axios';

type State = {
  data: {
    greeting: string;
  };
};

type Props = {
  url: string;
};

export default class Fetch extends React.Component<Props, State> {
  unmount = false;

  constructor(props: Props) {
    super(props);
    this.state = {
      data: {
        greeting: '',
      },
    };
  }

  componentDidUpdate(prevProps: Props) {
    const { url } = this.props;
    if (url !== prevProps.url) {
      this.fetch();
    }
  }

  componentWillUnmount() {
    this.unmount = true;
  }

  fetch = async () => {
    const { url } = this.props;
    const response = await axios.get(url);
    if (!this.unmount) {
      this.setState({ data: response.data });
    }
  };

  render() {
    const { data } = this.state;
    return (
      <div>
        <button type="button" onClick={this.fetch}>
          Fetch
        </button>
        {data ? <span data-testid="greeting">{data.greeting}</span> : null}
      </div>
    );
  }
}
