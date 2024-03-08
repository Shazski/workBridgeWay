import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsObject,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { ObjectId, isValidObjectId } from 'mongoose';

export class EmployeeDto {
  @IsNotEmpty()
  @IsString()
  readonly employeeName: string;

  @IsEmail()
  readonly email: string;

  @IsString()
  password: string;

  @IsNotEmpty()
  readonly companyId: ObjectId;

  @IsNotEmpty()
  @IsString()
  readonly role: string;

  @IsString()
  readonly department: string;
}
