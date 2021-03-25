const TastyWorks = require('tasty-works-api');

const credentials = {
  username: 'skeoleia@iu.edu',
  password: 'envisioncapital',
};

const main = async () => {
  TastyWorks.setUser(credentials);
  console.log(TastyWorks.getUser());

  const token = await TastyWorks.authorization();
  TastyWorks.setAuthorizationToken(token);

  TastyWorks.setUser({
    authorization_token: token,
  });

  const balance = await TastyWorks.balances('5WV99548');
  console.log(balance);
};

main();
