import React from 'react';
import Search from './Containers/Search';
import Loading from './Containers/Loading';
import Visual from './Containers/Visual';
import PubSub from 'pubsub-js';
class App extends React.Component {
  state = {
    step: 'home',
    query: '',
    data: {},
  };

  // pub sub functions
  favorite_count_edit = (msg, input) => {
    console.log(msg);
    const data = this.state.data;
    data.favorite_count = input.favorite_count;
    this.setState({ data });
  }
  retweet_count_edit = (msg, input) => {
    console.log(msg);
    const data = this.state.data;
    data.retweet_count = input.retweet_count;
    this.setState({ data });
  }
  tweet_count_edit = (msg, input) => {
    console.log(msg);
    const data = this.state.data;
    data.tweet_count = input.tweet_count;
    this.setState({ data });
  }

  search = (query) => {
    this.setState({
      step: 'searching',
      query,
    }, () => {

    });
  }
  search_failed = () => {
    this.setState({
      step: 'home',
    });
  }

  loading_finished = (data) => {
    this.setState({
      data, step: 'visual',
    });
  }

  componentDidMount() {
    PubSub.subscribe('FAVORITE COUNT EDIT', this.favorite_count_edit);
    PubSub.subscribe('RETWEET COUNT EDIT', this.retweet_count_edit);
    PubSub.subscribe('TWEET COUNT EDIT', this.tweet_count_edit);
    // run the publish
    PubSub.publish('TWEET COUNT EDIT', { likes: 45 });
  }
  render() {
    switch (this.state.step) {
      case 'home':
        return <Search search={this.search} />;
      case 'searching':
        return <Loading query={this.state.query} failed={this.search_failed} finished={this.loading_finished} />;
      case 'visual':
        return <Visual data={this.state.data} />
      default:
        return '...';
    }
  }
}

export default App;
