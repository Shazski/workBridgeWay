export const FRONTEND_BASE_URL: string = "https://workbridgeway.webhobecoshop.shop"

export const corsOptions: object = {
    origin: FRONTEND_BASE_URL,
    methods:['GET','PUT','PATCH','POST','DELETE'],
    credentials:true
}