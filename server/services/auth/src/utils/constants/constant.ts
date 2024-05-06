const FRONTEND_BASE_URL = "https://workbridgewayclient.onrender.com";

const corsOptions: object = {
  origin: `https://workbridgewayclient.onrender.com`,
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
