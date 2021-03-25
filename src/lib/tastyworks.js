import TastyWorks from 'tasty-works-api';

const credentials = {
  username: 'skeoleia@iu.edu',
  password: 'envisioncapital',
};

const getTastyWorksClient = async () => {
  TastyWorks.setUser(credentials);
  console.log(TastyWorks.getUser());

  const token = await TastyWorks.authorization();
  TastyWorks.setAuthorizationToken(token);

  TastyWorks.setUser({
    authorization_token: token,
  });

  return TastyWorks;
};

getTastyWorksClient();

export default TastyWorks;
