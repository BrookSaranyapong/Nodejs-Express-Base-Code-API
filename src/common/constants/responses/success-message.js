const { HttpStatus } = require("../statusCode");

exports.SUCCESS = {
  [200]: {
    SUCCESS_RESPONSE: {
      HTTP: HttpStatus.OK,
      CODE: 2000,
      MESSAGE_TH: "สำเร็จ",
      MESSAGE_EN: "Success",
    },
    LOGIN_SUCCESS: {
      HTTP: HttpStatus.OK,
      CODE: 2001,
      MESSAGE_TH: "เข้าสู่ระบบสำเร็จ",
      MESSAGE_EN: "Login successful",
    },
    REFRESH_SUCCESS: {
      HTTP: HttpStatus.OK,
      CODE: 2002,
      MESSAGE_TH: "ต่ออายุโทเคนสำเร็จ",
      MESSAGE_EN: "Token refreshed successfully",
    },
    LOGOUT_SUCCESS: {
      HTTP: HttpStatus.OK,
      CODE: 2003,
      MESSAGE_TH: "ออกจากระบบสำเร็จ",
      MESSAGE_EN: "Logout successful",
    },
  },
  [201]: {
    SUCCESS_RESPONSE: {
      HTTP: HttpStatus.CREATED,
      CODE: 2010,
      MESSAGE_TH: "สร้างข้อมูลสำเร็จ",
      MESSAGE_EN: "Created successfully",
    },
    REGISTER_SUCCESS: {
      HTTP: HttpStatus.CREATED,
      CODE: 2011,
      MESSAGE_TH: "สมัครสมาชิกสำเร็จ",
      MESSAGE_EN: "Registration successful",
    },
  },
};
