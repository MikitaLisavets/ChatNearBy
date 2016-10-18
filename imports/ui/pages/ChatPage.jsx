import { default as React } from 'react';
import { default as CChat } from '/imports/ui/components/CChat';

export const ChatPage = React.createClass({
  render() {
    return (
      <div className="chat-page" style={{height: '100%'}}>
        <CChat chatId={this.props.routeParams.id}></CChat>
      </div>
    )
  }
});