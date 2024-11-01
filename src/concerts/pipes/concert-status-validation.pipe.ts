import { ArgumentMetadata, PipeTransform } from '@nestjs/common';

export class ConcertStatusValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {


    return value;
  }
}
