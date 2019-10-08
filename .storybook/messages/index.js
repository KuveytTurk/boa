import MessagesEN from './en.json';
import MessagesTR from './tr.json';

function getMessage() {
  const messages = {};

  for (var messageGroup in MessagesEN) {
    messages[messageGroup] = MessagesEN[messageGroup];
    messages[messageGroup] = messages[messageGroup].concat(MessagesTR[messageGroup]);
  }

  return messages;
}

export default getMessage();
