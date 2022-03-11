export class CPF {
  FACTOR_FIRST_VERIFIER_DIGIT = 10;
  CPF_VALID_LENGTH = 11;
  FACTOR_SECOND_VERIFIER_DIGIT = 11;
  value: string;

  constructor(cpf: string) {
    this.value = cpf;

    if (!this.validate()) {
      throw new Error('Invalid cpf');
    }
  }

  cleanCpf(cpf: string) {
    return cpf.replace(/\D/g, '');
  }

  areAllDigitsEqual(cpf: string) {
    const [firstDigit] = cpf;
    return [...cpf].every((c) => c === firstDigit);
  }

  calculateDigit(cpf: string, factor: number) {
    let total = 0;
    for (const digit of cpf) {
      if (factor > 1) total += parseInt(digit) * factor--;
    }
    const rest = total % 11;
    return rest < 2 ? 0 : 11 - rest;
  }

  extractVerifierDigit(cpf: string) {
    return cpf.slice(9);
  }

  validate() {
    const rawCpf = this.value;
    if (!rawCpf) return false;
    const cpf = this.cleanCpf(rawCpf);
    if (cpf.length !== this.CPF_VALID_LENGTH) return false;
    if (this.areAllDigitsEqual(cpf)) return false;
    const firstVerifierDigit = this.calculateDigit(
      cpf,
      this.FACTOR_FIRST_VERIFIER_DIGIT
    );
    const secondVerifierDigit = this.calculateDigit(
      cpf,
      this.FACTOR_SECOND_VERIFIER_DIGIT
    );
    const verifierDigit = this.extractVerifierDigit(cpf);
    const calculatedVerifiedDigit = `${firstVerifierDigit}${secondVerifierDigit}`;
    return verifierDigit === calculatedVerifiedDigit;
  }
}
