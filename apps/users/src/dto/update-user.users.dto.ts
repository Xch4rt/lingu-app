import { PartialType } from "@nestjs/swagger";
import { RegisterUserDto } from "./register-user.users.dto";

export class UpdateUserDto extends PartialType(RegisterUserDto) {
}