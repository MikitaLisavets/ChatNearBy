import { default as React, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Chats } from '/imports/api/Chats';

const CChat = React.createClass({

  contextTypes: {
    router: PropTypes.object.isRequired
  },

  submitHandler(event) {
    event.preventDefault();
    let history = this.props.chat.history || [];

    history.push({
      user: Meteor.user(),
      message: this.refs.textarea.value,
      date: new Date()
    });

    Meteor.call('chats.update', {
      chatId: this.props.chatId,
      history: history
    });
  },

  renderChat() {
    if (!this.props.chat) {
      return (<span />);
    }
    return (
      this.props.chat.history.map((historyItem, index) => (
        <div className="chat-area__item" key={index}>
          {historyItem.user.username} | {historyItem.message} | {historyItem.date.getTime()}
        </div>
      ))
    );
  },

  componentDidMount() {
    console.log(this.props.chat);
    if (!this.props.chat) {
      // this.context.router.push('/');
    }
  },

  render() {
    return (
      <div className="chat">
        <div className="chat-area">
          {this.renderChat()}
        </div>
        {(Meteor.userId() ?
          <form className="chat-form" onSubmit={this.submitHandler}>
            <textarea className="chat-form__textarea" ref="textarea"></textarea>
            <button className="chat-form__submit" type="submit"></button>
          </form>
          : ''
        )}
      </div>
    );
  }
});

export default createContainer((params) => {
  Meteor.subscribe('chats');
  return {
    chat: Chats.findOne({_id: params.chatId})
  };
}, CChat);