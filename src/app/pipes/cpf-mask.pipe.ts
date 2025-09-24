import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cpfMask',
})
export class CpfMaskPipe implements PipeTransform {
  transform(value: string | undefined): string {
    if (!value) return '';
    const digits = value.replace(/\D/g, '');
    if (digits.length !== 11) return value;
    return digits.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }
}
