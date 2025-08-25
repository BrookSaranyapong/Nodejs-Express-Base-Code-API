const { HttpStatus } = require("../statusCode.js");

exports.ERROR = {
  [500]: {
    INTERNAL_SERVER_ERROR: {
      HTTP: HttpStatus.INTERNAL_SERVER_ERROR,
      CODE: 5000,
      MESSAGE_TH: "เกิดข้อผิดพลาดในระบบ",
      MESSAGE_EN: "INTERNAL SERVER ERROR",
    },
    DATABASE_ERROR: {
      HTTP: HttpStatus.INTERNAL_SERVER_ERROR,
      CODE: 5001,
      MESSAGE_TH: "เกิดข้อผิดพลาดในฐานข้อมูล",
      MESSAGE_EN: "DATABASE ERROR",
    },
  },

  [400]: {
    CLIENT_ERROR: {
      HTTP: HttpStatus.BAD_REQUEST,
      CODE: 4000,
      MESSAGE_TH: "ข้อมูลไม่ถูกต้อง",
      MESSAGE_EN: "BAD REQUEST",
    },
    DUPLICATE_ERROR_400: {
      HTTP: HttpStatus.BAD_REQUEST,
      CODE: 4001,
      MESSAGE_TH: "พบข้อมูลในระบบ",
      MESSAGE_EN: "Duplicate Data",
    },
    EMAIL_TAKEN: {
      HTTP: HttpStatus.BAD_REQUEST,
      CODE: 4002,
      MESSAGE_TH: "อีเมลนี้ถูกใช้งานแล้ว",
      MESSAGE_EN: "EMAIL ALREADY TAKEN",
    },
  },

  [401]: {
    UNAUTHORIZATION_ERROR: {
      HTTP: HttpStatus.UNAUTHORIZED,
      CODE: 4010,
      MESSAGE_TH: "ไม่สามารถเข้าถึงได้",
      MESSAGE_EN: "UNAUTHORIZED",
    },
  },

  [403]: {
    FORBIDDEN_ERROR: {
      HTTP: HttpStatus.FORBIDDEN,
      CODE: 4030,
      MESSAGE_TH: "ไม่ได้รับอนุญาตให้เข้าถึง",
      MESSAGE_EN: "FORBIDDEN",
    },
  },

  [404]: {
    NOT_FOUND: {
      HTTP: HttpStatus.NOT_FOUND,
      CODE: 4040,
      MESSAGE_TH: "ไม่พบข้อมูล",
      MESSAGE_EN: "NOT FOUND",
    },
  },
};
