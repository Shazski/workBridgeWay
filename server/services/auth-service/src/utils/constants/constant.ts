const FRONTEND_BASE_URL = "http://localhost:5173";

const corsOptions: object = {
  origin: `http://localhost:5173`,
  methods: ["GET", "PUT", "PATCH", "POST", "DELETE"],
  credentials: true,
  optionSuccessStatus: 200,
};

const cookieConfig = {
  secure: true,
  httpOnly: true,
  maxAge: 1000 * 60 * 60 * 24,
  sameSite: false,
};


export { corsOptions, FRONTEND_BASE_URL, cookieConfig };
