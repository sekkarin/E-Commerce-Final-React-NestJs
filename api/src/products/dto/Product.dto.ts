import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ description: 'Product name' })
  name: string;

  @ApiProperty({ description: 'Product description' })
  description: string;

  @ApiProperty({ description: 'Product price' })
  price: number;

  @ApiProperty({ description: 'Product quantity' })
  quantity: number;

  @ApiProperty({ description: 'Product category' })
  category: string;

  @ApiProperty({ description: 'URL to product image' })
  image: string;
}
