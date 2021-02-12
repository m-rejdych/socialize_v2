import { PipeTransform, Injectable } from '@nestjs/common';

@Injectable()
class CapitalizationPipe implements PipeTransform<string, string> {
  transform(value: string) {
    const lowerCaseValue = value.toLowerCase();

    return lowerCaseValue.slice(0, 1).toUpperCase() + value.slice(1);
  }
}

export default CapitalizationPipe;
