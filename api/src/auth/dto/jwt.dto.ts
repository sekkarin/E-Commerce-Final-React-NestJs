import { ApiProperty } from "@nestjs/swagger";

class JwtDto {
  @ApiProperty()
  email: string;
}
export default JwtDto