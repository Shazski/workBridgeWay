export const FRONTEND_BASE_URL: string = "https://workbridgewayclient.onrender.com"

export const corsOptions: object = {
    origin: FRONTEND_BASE_URL,
    methods:['GET','PUT','PATCH','POST','DELETE'],
    credentials:true
}