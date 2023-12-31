const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const sign = promisify(jwt.sign).bind(jwt);
const verify = promisify(jwt.verify).bind(jwt);

exports.generateToken = async (payload, secretSignature, tokenLife) => {
  try {
    return await sign(
      {
        payload,
      },
      secretSignature,
      {
        algorithm: 'HS256',
        expiresIn: tokenLife,
      },
    );
  } catch (error) {
    console.log(`Error in generate access token:  + ${error}`);
    return null;
  }
};

exports.verifyToken = async (token, secretKey) => {
  const tokenArray = token.split(" ");
  try {
    return await verify(tokenArray[1], secretKey);
  } catch (error) {
    console.log(`Error in verify access token:  + ${error}`);
    return null;
  }
};

exports.decodeToken = async (token, secretKey) => {
  const tokenArray = token.split(" ");
  try {
    return await verify(tokenArray[1], secretKey, {
      ignoreExpiration: true,
    });
  } catch (error) {
    console.log(`Error in decode access token: ${error}`);
    return null;
  }
};