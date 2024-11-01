import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreatePointHistoryDto {
    @IsInt()
    @IsNotEmpty()
    points: number;

    @IsString()
    @IsNotEmpty()
    description: string;
}








