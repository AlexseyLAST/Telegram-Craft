exports.getHTMLTemplate = (content) => {
  return `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Users</title>
      <style>
      body {
        margin: 0;
        background: #F4F1F8;
      }
      table {
        border-collapse: collapse; 
        line-height: 1.1;
        font-family: "Lucida Sans Unicode", "Lucida Grande", sans-serif;
        background:  radial-gradient(farthest-corner at 50% 50%, white, #DCECF8);
        color: #0C213B;
      }
      th {
        padding: 10px; 
        border: 1px solid #A9E2CC;
      }
      td {
        font-size: 0.8em;
        padding: 5px 7px;
        border: 1px solid #A9E2CC;
      }
      .first {
        font-size: 1em;
        font-weight: bold;
        text-align: center;
      }
      </style>
    </head>
    <body>
      <table>
        <tr><th>№</th><th>Логин</th><th>Имя пользователя</th><th>Время регистрации</th></tr>
        ${content}
      </table>
    </body>
    </html>`;
};
