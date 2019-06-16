import React from 'react';

import NowyItem from './NowyItem';

const NowyList = ({
  authUser,
  messages,
  onEditMessage,
  onRemoveMessage,
}) => (
    <ul>
      {messages.map(message => (
        <NowyItem
          authUser={authUser}
          key={message.uid}
          message={message}
          onEditMessage={onEditMessage}
          onRemoveMessage={onRemoveMessage}
        />
      ))}
    </ul>
  );

export default NowyList;
