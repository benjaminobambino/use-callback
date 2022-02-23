import React, { useState, memo, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';

const App = () => {
  console.log('Render: App');

  const [users, setUsers] = useState([
    { id: 'a', name: 'Robin' },
    { id: 'b', name: 'Dennis' }
  ]);

  const [text, setText] = useState('');

  const handleText = (event) => {
    setText(event.target.value);
  };

  const handleAddUser = () => {
    setUsers(users.concat({ id: uuidv4(), name: text }));
    setText('');
  };

  const handleRemove = useCallback(
    (id) => setUsers(users.filter((user) => user.id !== id)),
    [users]
  );

  return (
    <div>
      <input type="text" value={text} onChange={handleText} />
      <button type="button" onClick={handleAddUser}>
        Add User
      </button>

      <List list={users} onRemove={handleRemove} />
    </div>
  );
};

const List = memo(({ list, onRemove }) => {
  console.log('Render: List');

  return (
    <ul>
      {list.map((item) => (
        <ListItem key={item.id} item={item} onRemove={onRemove} />
      ))}
    </ul>
  );
});

const ListItem = memo(({ item, onRemove }) => {
  console.log('Render: ListItem');

  return (
    <li>
      {item.name}
      <button type="button" onClick={() => onRemove(item.id)}>
        Remove
      </button>
    </li>
  );
});

export default App;
