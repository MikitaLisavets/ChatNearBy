import { default as React, PropTypes } from 'react';
import { default as classnames } from 'classnames';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Dispatcher } from '/imports/services/Dispatcher';
import { Chats } from '/imports/api/Chats';
import { Utils } from '/imports/services/Utils';

const CChat = React.createClass({

  contextTypes: {
    router: PropTypes.object.isRequired
  },

  getInitialState() {
    return {};
  },

  submitHandler(event) {
    event.preventDefault();
    let history = this.props.chat.history || [],
      now = new Date();

    history.push({
      user: Meteor.user(),
      message: this.refs.textarea.value,
      date: now
    });

    Meteor.call('chats.update', {
      chatId: this.props.chat._id,
      history: history,
      updatedAt: now
    }, () => {
      this.cleanTextarea();
      this.updateScrollArea();
    });
  },

  cleanTextarea() {
    this.refs.textarea ? this.refs.textarea.value = '' : '';
  },

  updateScrollArea() {
    this.refs.area ? this.refs.area.scrollTop = this.refs.area.scrollHeight : '';
  },

  renderChat() {
    if (!this.props.chat) {
      return (<span />);
    }
    return (
      this.props.chat.history.map((historyItem, index) => {
        let userId = Meteor.user() ? Meteor.user()._id : '',
          classes = classnames({
          'chat-area__item': true,
          'chat-area__item_self': historyItem.user._id == userId
        });
        return ( <div className="chat-area__row" key={index}>
            <div className={classes}>
              <div className="chat-area__top">
                <span className="chat-area__author">{historyItem.user.username}</span>
              </div>
              <div className="chat-area__message">{historyItem.message}</div>
            </div>
          </div>
        )
      })
    );
  },

  renderForm() {
    if (!this.state.currentLat || !this.state.currentLng || !this.props.chat || !Meteor.user()) {
      return (<span />);
    }
    if(Utils.isMoreThanPositionLimit(this.props.chat.lat, this.props.chat.lng, this.state.currentLat, this.state.currentLng)) {
      return (<span />);
    }
    return (
      <form className="chat-form" onSubmit={this.submitHandler}>
        <textarea className="chat-form__textarea" ref="textarea"></textarea>
        <button className="chat-form__submit" type="submit">Send</button>
      </form>
    );
  },

  updateState() {
    this.setState({update: true});
  },

  componentWillUnmount() {
    Dispatcher.unsubscribe('login', this.updateState);
    Dispatcher.unsubscribe('logout', this.updateState);
  },

  componentDidMount() {
    Dispatcher.publish('loader.show');
    Dispatcher.subscribe('login', this.updateState);
    Dispatcher.subscribe('logout', this.updateState);
    Meteor.call('chats.find', this.props.chatId, (error, result) => {
      if(!result) {
        this.context.router.push('/');
        Dispatcher.publish('notification.add', {
          message: 'deteted',
          level: 'error',
          autoDismiss: 3
        });
      } else {
        Utils.getCurrentPosition((data) => {
          if (data.coords) {
            this.setState({
              currentLat: data.coords.latitude,
              currentLng: data.coords.longitude
            })
          }
          this.updateScrollArea();
          Dispatcher.publish('loader.hide');
        });
      }
    });
  },

  render() {
    return (
      <div className="chat">
        <div className="chat-area" ref="area">
          {this.renderChat()}
        </div>
        {this.renderForm()}
      </div>
    );
  }
});

export default createContainer((params) => {
  Meteor.subscribe('chats');
  return {
    chat: Chats.findOne({_id: params.chatId}),
    chatId: params.chatId
  };
}, CChat);