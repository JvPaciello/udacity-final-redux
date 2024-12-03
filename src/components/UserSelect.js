import React from 'react';

function UserSelect({ users, onSelect }) {
  return (
    <select onChange={(e) => onSelect(e.target.value)}>
      <option value="">Select an user</option>
      {Object.values(users).map((user) => (
        <option key={user.id} value={user.id}>
          {user.name}
        </option>
      ))}
    </select>
  );
}

export default UserSelect;
