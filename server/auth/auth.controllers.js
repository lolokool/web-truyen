const authMethod = require('./auth.methods');
const jwtVariable = require('../utils/jwt');
const { getAccounts, updateRefreshToken, registerAccount } = require('../models/account');
const randToken = require('rand-token');
const bcrypt = require('bcrypt');

exports.register = async (req, res) => {
  const username = req.body.username.toLowerCase();
  const password = req.body.password.toLowerCase();
  const user = await getAccounts({ username });
  if (user && user.length) res.status(409).send('Tên tài khoản đã tồn tại.');
  else {
    // const createUser = await userModel.createUser(newUser);
    const createUser = await registerAccount({
      username,
      password
    })
    if (!createUser) {
      return res
        .status(400)
        .send('Có lỗi trong quá trình tạo tài khoản, vui lòng thử lại.');
    }
    return res.send({
      status: 'success',
      username,
      password,
    });
  }
};

exports.login = async (req, res, next) => {
  const username = req.body.username.toLowerCase() || 'test';
  const password = req.body.password || '12345';
  const getUser = await getAccounts({ username });
  if (getUser && !getUser.length) {
    return res.status(401).send('Tên đăng nhập không tồn tại.');
  }
  const user = getUser && getUser[0];

  const isPasswordValid = bcrypt.compareSync(password, user.Password);
  if (!isPasswordValid) {
    return res.status(401).send('Mật khẩu không chính xác.');
  }

  const dataForAccessToken = {
    username: user.Username,
  };
  const accessTokenSecret =
    process.env.ACCESS_TOKEN_SECRET || jwtVariable.accessTokenSecret;
  const accessTokenLife =
    process.env.ACCESS_TOKEN_LIFE || jwtVariable.accessTokenLife;

  const accessToken = await authMethod.generateToken(
    dataForAccessToken,
    accessTokenSecret,
    accessTokenLife,
  );
  if (!accessToken) {
    return res
      .status(401)
      .send('Đăng nhập không thành công, vui lòng thử lại.');
  }
  let refreshToken = randToken.generate(jwtVariable.refreshTokenSize); // tạo 1 refresh token ngẫu nhiên
  if (!user.refreshToken) {
    // Nếu user này chưa có refresh token thì lưu refresh token đó vào database
    await updateRefreshToken({ refreshToken, accountId: user.AccountID });
  } else {
    // Nếu user này đã có refresh token thì lấy refresh token đó từ database
    refreshToken = user.refreshToken;
  }
  return res.send({
    msg: 'Đăng nhập thành công.',
    accessToken,
    refreshToken,
    user,
  });
}

exports.refreshToken = async (req, res) => {
  const accessTokenFromHeader = req.headers.authorization;
  if (!accessTokenFromHeader) {
    return res.status(400).send('Không tìm thấy access token.');
  }

  // Lấy refresh token từ body
  const refreshTokenFromBody = req.body.refreshToken;
  if (!refreshTokenFromBody) {
    return res.status(400).send('Không tìm thấy refresh token.');
  }

  const accessTokenSecret =
    process.env.ACCESS_TOKEN_SECRET || jwtVariable.accessTokenSecret;
  const accessTokenLife =
    process.env.ACCESS_TOKEN_LIFE || jwtVariable.accessTokenLife;
  // Decode access token đó
  const decoded = await authMethod.decodeToken(
    accessTokenFromHeader,
    accessTokenSecret,
  );

  if (!decoded) {
    return res.status(400).send('Access token không hợp lệ.');
  }
  const username = decoded.payload.username; // Lấy username từ payload

  const getUser = await getAccounts({ username });
  if (getUser && !getUser.length) {
    return res.status(401).send('User không tồn tại.');
  }

  const user = getUser && getUser[0];

  if (refreshTokenFromBody !== user.RefreshToken) {
    return res.status(400).send('Refresh token không hợp lệ.');
  }

  // Tạo access token mới
  const dataForAccessToken = {
    username,
  };

  const accessToken = await authMethod.generateToken(
    dataForAccessToken,
    accessTokenSecret,
    accessTokenLife,
  );
  if (!accessToken) {
    return res
      .status(400)
      .send('Tạo access token không thành công, vui lòng thử lại.');
  }
  return res.json({
    accessToken,
  });
}