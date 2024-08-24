const usersData = require("./users.js");
const express = require("express");
const app = express();

const getUsers = (specialty) => {
  const filteredUsers = usersData.filter(
    (user) => user.specialty === specialty
  );

  const totalUsers = filteredUsers.length;

  return `
    <h1>Welcome to the ${specialty} page!</h1>
    <p>Total ${specialty} employees: ${totalUsers}</p>
    <h3>Please, click the links below to change the employees categories</h3>
    <nav>
      <a href="/">Back home</a>
      <a href="/marketing">Marketing category</a>
      <a href="/developers">Developers category</a>
      <a href="/qas">QAs category</a>
      <a href="/sales">Sales category</a>
    </nav>

    <ul>
    ${filteredUsers
      .map((user) => {
        return `
          <li>
            Employee ID: ${user.id}
            Name: ${user.name}
            Age: ${user.age}
            Specialty: ${user.specialty}
          </li>
          `;
      })
      .join("")}
  
    </ul>
      `;
};

app.get("/", (req, res) => {
  res.send(
    `<h1>Welcome to the home page!</h1>
    <h3>Please, click the links below to enter the employees categories</h3>
    <nav>
    <a href="/marketing">Marketing category</a>
    <a href="/developers">Developers category</a>
    <a href="/qas">QAs category</a>
    <a href="/sales">Sales category</a>
    </nav>
    `
  );
});

app.get("/marketing", (req, res) => {
  res.send(getUsers("marketing"));
});

app.get("/developers", (req, res) => {
  res.send(getUsers("developers"));
});

app.get("/qas", (req, res) => {
  res.send(getUsers("QAs"));
});

app.get("/sales", (req, res) => {
  res.send(getUsers("sales"));
});

app.use((req, res) => {
  res.status(404).send(
    `<h1>Sorry, the page you're looking for is not found :(</h1>
        <nav>
        <a href="/">Back home</a>
        </nav>
        `
  );
});

app.listen(3000, () => {
  console.log("server listening at http://localhost:3000");
});
