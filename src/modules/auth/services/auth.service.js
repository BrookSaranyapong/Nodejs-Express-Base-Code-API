const ApplicationError = require('../../../common/errors/application-error');
const { ERROR_MESSAGE } = require('../../../common/constants/responses/error-message');

class AuthService {
  constructor() {
    this.users = [
      {
        id: 1,
        email: 'user@example.com',
        password: 'password123', // ในความเป็นจริงต้อง hash
        name: 'John Doe',
        role: 'user',
      },
      {
        id: 2,
        email: 'admin@example.com',
        password: 'admin123',
        name: 'Admin User',
        role: 'admin',
      },
    ];

    // Mock refresh tokens storage
    this.refreshTokens = new Map();
  }

  async register(data) {
    const { email, password, name } = data;

    // ตรวจสอบว่า email ซ้ำไหม
    const existingUser = this.users.find((u) => u.email === email);
    if (existingUser) {
      throw new ApplicationError(ERROR_MESSAGE.BAD_REQUEST_400, {
        errors: { email: ERROR_MESSAGE.EMAIL_TAKEN_400.MESSAGE_EN },
      });
    }

    // สร้าง user ใหม่
    const newUser = {
      id: this.users.length + 1,
      email,
      password, // ในความเป็นจริงต้อง hash ด้วย bcrypt
      name,
      role: 'user',
      createdAt: new Date(),
    };

    this.users.push(newUser);

    // ส่งกลับโดยไม่มี password
    const { password: _, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
  }

  async login(data) {
    const { email, password } = data;

    // หา user จาก email
    const user = this.users.find((u) => u.email === email);
    if (!user) {
      throw new ApplicationError(ERROR_MESSAGE.UNAUTHORIZED_401, {
        errors: { email: 'Invalid email or password' },
      });
    }

    // ตรวจสอบ password (ในความเป็นจริงต้องใช้ bcrypt.compare)
    if (user.password !== password) {
      throw new ApplicationError(ERROR_MESSAGE.UNAUTHORIZED_401, {
        errors: { password: 'Invalid email or password' },
      });
    }

    // Mock tokens
    const accessToken = `mock_access_token_${user.id}_${Date.now()}`;
    const refreshToken = `mock_refresh_token_${user.id}_${Date.now()}`;

    // เก็บ refresh token
    this.refreshTokens.set(refreshToken, {
      userId: user.id,
      createdAt: new Date(),
    });

    // ส่งกลับ user และ tokens
    const { password: _, ...userWithoutPassword } = user;
    return {
      user: userWithoutPassword,
      accessToken,
      refreshToken,
    };
  }

  async refresh(data) {
    const { refreshToken } = data;

    // ตรวจสอบว่า refresh token มีอยู่ไหม
    const tokenData = this.refreshTokens.get(refreshToken);
    if (!tokenData) {
      throw new ApplicationError(ERROR_MESSAGE.UNAUTHORIZED_401, {
        errors: { token: 'Invalid refresh token' },
      });
    }

    // หา user
    const user = this.users.find((u) => u.id === tokenData.userId);
    if (!user) {
      throw new ApplicationError(ERROR_MESSAGE.NOT_FOUND_404, {
        errors: { user: 'User not found' },
      });
    }

    // สร้าง tokens ใหม่
    const newAccessToken = `mock_access_token_${user.id}_${Date.now()}`;
    const newRefreshToken = `mock_refresh_token_${user.id}_${Date.now()}`;

    // ลบ refresh token เก่า และเพิ่มใหม่
    this.refreshTokens.delete(refreshToken);
    this.refreshTokens.set(newRefreshToken, {
      userId: user.id,
      createdAt: new Date(),
    });

    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    };
  }

  async logout(data) {
    const { refreshToken } = data;

    // ลบ refresh token
    const deleted = this.refreshTokens.delete(refreshToken);
    if (!deleted) {
      throw new ApplicationError(ERROR_MESSAGE.BAD_REQUEST_400, {
        errors: { token: 'Invalid refresh token' },
      });
    }

    return { success: true };
  }

  async getUserById(userId) {
    const user = this.users.find((u) => u.id === userId);
    if (!user) {
      throw new ApplicationError(ERROR_MESSAGE.NOT_FOUND_404, {
        errors: { user: 'User not found' },
      });
    }

    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}

module.exports = new AuthService();
