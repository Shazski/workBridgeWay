export const FRONTEND_BASE_URL: string = "http://localhost:5173"

export const corsOptions: object = {
    origin: FRONTEND_BASE_URL,
    methods:['GET','PUT','PATCH','POST','DELETE'],
    credentials:true
}