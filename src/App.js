import React from 'react';
import Search from './Containers/Search';
import Loading from './Containers/Loading';
import Visual from './Containers/Visual';
import Thinker from './Libs/thinker.js';
class App extends React.Component {
  state = {
    step: 'home',
    query: '',
  };
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
    Thinker.process(data);
    this.setState({ step: 'visual' });
  }
  render() {
    switch (this.state.step) {
      case 'home':
        return <Search search={this.search} />;
      case 'searching':
        return <Loading query={this.state.query} failed={this.search_failed} finished={this.loading_finished} />;
      case 'visual':
        return <Visual />
      default:
        return '...';
    }
  }
}

export default App;
