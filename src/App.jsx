import React, { useState } from "react";
import "./App.css";
import { userData } from "./userData";

const Header = ({
  handleSearchUsers,
  handleSortUsers,
  setUsersForRender,
  keyVal,
  setKey,
}) => {
  return (
    <header key={keyVal}>
      <div className="search_panel">
        <input
          type="text"
          placeholder="Name search..."
          onChange={handleSearchUsers}
        />
        <select
          className="sort_selector"
          onChange={(e) => handleSortUsers(e.target.value)}
          defaultValue="def"
        >
          <option disabled value="def" hidden>
            Sort by
          </option>
          <option value="def">Default</option>
          <option value="age_desc">Age descending</option>
          <option value="age_asc">Age ascending</option>
        </select>
        <button
          className="reset_button"
          onClick={() => {
            setUsersForRender(userData);
            setKey(keyVal + 1);
          }}
        >
          Reset
        </button>
      </div>
    </header>
  );
};

const UserCard = ({ user, setModaleUser }) => {
  return (
    <li
      className={"user_card_" + user.index}
      onClick={() => {
        setModaleUser(user);
      }}
    >
      <img src={user.picture} alt="user_photo" />
      <p>
        Name:
        <strong> {user.name}</strong>
        <br />
        Age: {user.age}
        <br />
        Gender: {user.gender}
        <br />
        Balance: {user.balance}
      </p>
    </li>
  );
};

const ModalUser = ({ user, setModaleUser }) => {
  return (
    <div
      className="modal_wrapper"
      key="modal_wrapper"
      onClick={() => {
        setModaleUser(false);
      }}
    >
      <div
        className="modal_window"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <p>
          <img src={user.picture} alt="user_photo" />
          <strong>Name: </strong>
          {user.name}
          <br />
          <strong>Age: </strong>
          {user.age}
          <br />
          <strong>Gender: </strong>
          {user.gender}
          <br />
          <strong>Eye color: </strong>
          {user.eyeColor}
          <br />
          <strong>email: </strong>
          {user.email}
          <br />
          <strong>Phone: </strong>
          {user.phone}
          <br />
          <strong>Address: </strong>
          {user.address}
          <br />
          <strong>Balance: </strong>
          {user.balance}
          <br />
          <strong>Tags: </strong>
          {user.tags.join(", ")}
          <br />
          <strong>Favorite fruit: </strong>
          {user.favoriteFruit}
          <br />
          <strong>Friends: </strong>
          {user.friends.map((friend) => (friend = friend.name)).join(", ")}
          <br />
          <strong>About: </strong>
          {user.about}
        </p>
      </div>
    </div>
  );
};

const UsersList = ({ usersForRender }) => {
  const [modalUser, setModaleUser] = useState(false);
  return (
    <>
      <h2>Users list</h2>
      <ul className="users_list">
        {usersForRender.map((userInfo) => {
          return (
            <UserCard
              key={"user_" + userInfo.index}
              user={userInfo}
              modalUser={modalUser}
              setModaleUser={setModaleUser}
            />
          );
        })}
      </ul>
      {!!modalUser && (
        <ModalUser user={modalUser} setModaleUser={setModaleUser} />
      )}
    </>
  );
};

const Main = ({ usersForRender }) => {
  return (
    <main>
      <UsersList usersForRender={usersForRender} />
    </main>
  );
};

const App = () => {
  const [usersForRender, setUsersForRender] = useState(userData);
  const [sortValue, setSortValue] = useState("def");
  const [keyVal, setKey] = useState(0);

  const handleSortUsers = (value = sortValue, arr = [...usersForRender]) => {
    setSortValue(value);
    setUsersForRender(
      arr.sort((prev, next) => {
        if (value === "age_asc") {
          return prev.age - next.age;
        } else if (value === "age_desc") {
          return next.age - prev.age;
        } else if (value === "def") {
          return prev.index - next.index;
        }
        return 0;
      })
    );
  };

  const handleSearchUsers = (e) => {
    const arrOfUsers = [...userData].filter(({ name }) =>
      name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setUsersForRender(arrOfUsers);
    handleSortUsers(sortValue, arrOfUsers);
  };

  return (
    <div className="wrapper">
      <Header
        handleSearchUsers={handleSearchUsers}
        handleSortUsers={handleSortUsers}
        setUsersForRender={setUsersForRender}
        keyVal={keyVal}
        setKey={setKey}
      />
      <Main usersForRender={usersForRender} />
    </div>
  );
};

export default App;
