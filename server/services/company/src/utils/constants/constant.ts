export const FRONT_END_BASE_URL = "https://workbridgewayclient.onrender.com"

export const corsOptions = {
    origin:`${FRONT_END_BASE_URL}`,
    method:['GET','PUT','PATCH','POST','DELETE'],
    credentials: true,
    optionSuccessStatus: 200
}

export const cookieConfig = {
    secure: true,
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24,
    sameSite: false,
  };