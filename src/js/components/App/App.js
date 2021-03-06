import React, { Component, PropTypes } from 'react';
import { Helmet } from 'react-helmet';
import styles from './App.sass';
import { push } from 'react-router-redux';

import {
  AUTH_ERROR
} from '../../constants/ActionTypes';

import { createAnonymousUserIfNeeded } from '../../actions/UserActions';
import { connect } from 'react-redux';

// this seems real dumb;
require('react-select/less/select.less');
require('../../../css/app.less');
require('../../../css/griddle.less');

export class App extends Component {
  constructor(props) {
    super(props);

    const { user, createAnonymousUserIfNeeded } = this.props;

    if (!user.id || user.anonymous) {
      createAnonymousUserIfNeeded();
    }
  }

  componentWillReceiveProps(nextProps) {
    const { user, error, createAnonymousUserIfNeeded } = this.props;
    if (user.id && !nextProps.user.id) {
      createAnonymousUserIfNeeded();
    }
  }

  render() {
    return (
      <div className={ styles.fillContainer + ' ' + styles.appContainer }>
        <Helmet>
          <title>DIVE: Turn Data into Stories Without Writing Code</title>
          <meta name="description" content="Explore your data with recommendation-driven data visualization, statistical analysis, and story creation, integrated into a single system." />
        </Helmet>
        { this.props.children }
      </div>
    );
  }
}

App.propTypes = {
  user: PropTypes.object,
  children: PropTypes.node
};

function mapStateToProps(state) {
  const { user, error } = state;
  return {
    user: user,
    error: error
  };
}

export default connect(mapStateToProps, { createAnonymousUserIfNeeded, push })(App);
