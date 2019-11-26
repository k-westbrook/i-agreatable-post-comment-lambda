var { Client } = require('pg')
exports.handler = async function (event) {
  try {


    const client = new Client({
      host: process.env.HOST_REFERENCE,
      user: process.env.USER_NAME,
      password: process.env.PASSWORD_REFERENCE,
      database: process.env.DATABASE_NAME
    });
    await client.connect();
    let results = await client.query(`INSERT INTO public."Comments"(
      restaurant_id, comment, name)
      VALUES (${event.restaurant_id},'${event.comment}','${event.name}' )
      RETURNING id;`);

    let response =
    {
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      status: 200,
    };
    return response;

  } catch (err) {
    return err;
  }
}
