const createErrorPayload = reason => ({
  success: false,
  data: {
    msg: reason,
  },
});

module.exports = { createErrorPayload };
