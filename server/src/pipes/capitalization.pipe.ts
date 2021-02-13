import { PipeTransform, Injectable } from '@nestjs/common';

@Injectable()
class CapitalizationPipe implements PipeTransform<unknown, unknown> {
  transform(value: unknown) {
    switch (typeof value) {
      case 'string':
        const lowerCaseValue = value.toLowerCase();

        return lowerCaseValue.slice(0, 1).toUpperCase() + value.slice(1);
      case 'object':
        const capitalizedValues = Object.keys(value).reduce((acc, key) => {
          if (typeof value[key] === 'string') {
            const lowerCaseValue = value[key].toLowerCase();
            acc[key] =
              lowerCaseValue.slice(0, 1).toUpperCase() +
              lowerCaseValue.slice(1);
          } else {
            acc[key] = value[key];
          }

          return acc;
        }, {});

        return capitalizedValues;
      default:
        return value;
    }
  }
}

export default CapitalizationPipe;
