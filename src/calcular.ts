// Passo 13 do roteiro. A regra da conta não tem nada a ver com tela, então
// fica aqui, sem React: funções puras (mesma entrada, mesmo resultado).

// Tipo união: só aceita um destes quatro textos.
export type Operador = '+' | '-' | '*' | '/';

export function calcular(a: number, b: number, operador: Operador): number {
  // Sem default: os quatro cases cobrem todos os valores de Operador,
  // e o TypeScript sabe disso.
  switch (operador) {
    case '+':
      return a + b;
    case '-':
      return a - b;
    case '*':
      return a * b;
    case '/':
      return a / b; // 7 / 0 dá Infinity em JavaScript, não erro
  }
}

export function formatar(valor: number): string {
  // Infinity (divisão por zero) e NaN viram a palavra Erro.
  if (!Number.isFinite(valor)) {
    return 'Erro';
  }
  // toFixed(10) arredonda (0.30000000000000004 -> '0.3000000000') e o Number
  // tira os zeros que sobraram (-> 0.3). O String volta para texto.
  return String(Number(valor.toFixed(10)));
}
