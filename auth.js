import jwt from 'jsonwebtoken';
import _ from 'lodash';
import bcrypt from 'bcrypt';

export const createTokens = async (musician, secret, secret2) => {
  const createToken = jwt.sign(
    {
      musician: _.pick(musician, ['id']),
    },
    secret,
    {
      expiresIn: '1h',
    },
  );

  const createRefreshToken = jwt.sign(
    {
      musician: _.pick(musician, 'id'),
    },
    secret2,
    {
      expiresIn: '7d',
    },
  );

  return [createToken, createRefreshToken];
};

export const refreshTokens = async (token, refreshToken, models, SECRET) => {
  let musicianId = -1;
  try {
    const { musician: { id } } = jwt.decode(refreshToken);
    musicianId = id;
  } catch (err) {
    return {};
  }

  if (!musicianId) {
    return {};
  }

  const musician = await models.Musician.findOne({ where: { id: musicianId }, raw: true });

  if (!musician) {
    return {};
  }

  try {
    jwt.verify(refreshToken, musician.refreshSecret);
  } catch (err) {
    return {};
  }

  const [newToken, newRefreshToken] = await createTokens(musician, SECRET, musician.refreshSecret);
  return {
    token: newToken,
    refreshToken: newRefreshToken,
    musician,
  };
};

export const tryLogin = async (email, password, models, SECRET, SECRET2) => {
  const musician = await models.Musician.findOne({ where: { email }, raw: true });
  if (!musician) {
    return {
      ok: false,
      errors: [{ path: 'email', message: 'Wrong email' }],
    };
  }

  const valid = await bcrypt.compare(password, musician.password);
  if (!valid) {
    return {
      ok: false,
      errors: [{ path: 'password', message: 'Wrong password' }],
    };
  }

  const refreshTokenSecret = musician.password + SECRET2;

  const [token, refreshToken] = await createTokens(musician, SECRET, refreshTokenSecret);

  return {
    ok: true,
    token,
    refreshToken,
  };
};
