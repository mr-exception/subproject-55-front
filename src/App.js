import React from 'react';
import Search from './Containers/Search';
import Loading from './Containers/Loading';
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
  render() {
    switch (this.state.step) {
      case 'home':
        return <Search search={this.search} />;
      case 'searching':
        return <Loading query={this.state.query}/>;
    }
  }
}

export default App;
