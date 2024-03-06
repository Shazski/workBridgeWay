import { IUser } from "../../domain/entities/user.entity"

export interface IUserRepo {
    save(User: IUser): Promise<boolean>;
}