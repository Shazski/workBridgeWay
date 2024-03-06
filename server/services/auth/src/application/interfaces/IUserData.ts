export interface user  {
    _id:string
    email:string
    name:string
    role:string
    profilePic:string
    phone:number
    status:true
}

export interface company {
    _id:string
    name:string
    email:string
    compnayLogo:string
    role:string
    approved:boolean
    stage:string
}