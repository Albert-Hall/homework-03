import React, { useState } from "react";
import api from "../API";

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll());
  console.log(users);

  const getBageClass = () => {
    if (users.length === 0) return "danger";
    else if (1 <= users.length && users.length <= 4) return "secondary";
    else return "primary";
  };

  console.log(getBageClass());

  const handleDelete = (userId) => {
    setUsers(users.filter((item) => item._id != userId));
  };

  const renderPhrase = () => {
    if (users.length === 0) return "С вами никто не тусанёт сегодня";
    else if (1 === users.length) return `С вами тусанёт только один человек`;
    else if (2 <= users.length && users.length <= 4)
      return `С вами тусанёт ${users.length} человека`;
    return `С вами тусанут ${users.length} человек`;
  };

  // setUsers(users.pop()); //хотел проверить как setUsers удаляет элемент массива. Но так не работает

  return (
    <>
      <span className={getBageClass()}>{renderPhrase()}</span>

      <table className="table">
        <thead>
          <tr>
            <th scope="col">Имя</th>
            <th scope="col">Качества</th>
            <th scope="col">Профессия</th>
            <th scope="col">Встретился, раз</th>
            <th scope="col">Оценка</th>
          </tr>
        </thead>
        <tbody>
          {users.map((item) => (
            <tr key={item._id}>
              <td>{item.name}</td>
              <td>
                {item.qualities.map((element) => (
                  <span
                    className={"m-2 badge bg-" + element.color}
                    key={element._id}
                  >
                    {element.name}
                  </span>
                ))}
              </td>

              <td>{item.profession.name}</td>
              <td>{item.completedMeetings}</td>
              <td>{item.rate}</td>
              <td>
                <button
                  className="btn btn-danger btn-bg"
                  onClick={() => handleDelete(item._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Users;
