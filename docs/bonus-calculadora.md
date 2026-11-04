# Aula bônus: calculadora de quatro operações

Laboratório de 120 minutos, roteiro "React Native sem mistério: uma calculadora do zero". Projeto separado da Vitrine, criado com `npx create-expo-app@latest calculadora --template blank-typescript@sdk-57`.

## O que a etapa cobre

| Conceito | Onde aparece | Passos do roteiro |
| --- | --- | --- |
| Componente e JSX | `App.tsx`, `src/components/*` | 4 |
| Flexbox | `styles.tela`, `styles.linha` no `App.tsx` | 5 |
| Props | `Visor` recebe `conta` e `valor` | 6, 7 |
| Evento | `Botao` recebe `aoTocar` e repassa ao `onPress` do `Pressable` | 8, 9, 10 |
| Estado | `useState` no `App.tsx` | 11, 12, 14, 15 |
| Função pura e tipo união | `src/calcular.ts` (`Operador = '+' \| '-' \| '*' \| '/'`) | 13 |

## Histórico de commits

Um commit por bloco do roteiro, para o professor ver a evolução:

| Commit | Passos |
| --- | --- |
| `Initial commit` | 1: projeto criado pelo `create-expo-app` |
| `bonus: suporte a web e script check` | 2 e 3: `react-dom`, `react-native-web`, `@expo/metro-runtime` |
| `bonus: componentes Visor e Botao e teclado completo` | 4 a 10 |
| `bonus: estado, decimais e conta com calcular.ts e testes` | 11 a 15 |
| `bonus: README, docs e CI` | documentação e verificação automática |
| `bonus: simulador de celular no navegador` | `iniciar.cmd` e `public/simulador.html` |

## Como funciona

### O caminho de um toque

```
você toca no 7
  → Pressable chama onPress, que é o aoTocar do Botao   (evento)
  → () => digitar('7'), a função que o App entregou
  → setVisor('7') pede ao React para trocar o estado
  → o React chama App() de novo; useState agora devolve '7'
  → <Visor valor="7" /> e a tela mostra 7               (props descem)
```

Em uma frase: props descem do pai para o filho, eventos sobem do filho para o pai, e só o estado, trocado pela função `set`, faz a tela mudar.

### Os quatro estados do `App.tsx`

| Estado | Tipo | Para que serve |
| --- | --- | --- |
| `visor` | `string` | O número grande. É texto para `'12' + '3'` virar `'123'` |
| `primeiro` | `number \| null` | O número antes do operador |
| `operador` | `Operador \| null` | A operação escolhida |
| `novoNumero` | `boolean` | Se o próximo dígito começa um número novo |

A linha pequena (`conta`, ex.: `12 +`) **não** é estado: é calculada de `primeiro` e `operador` a cada desenho.

### `src/calcular.ts`

- `calcular(a, b, operador)` usa um `switch` sem `default`: os quatro `case` cobrem o tipo `Operador` inteiro, e o TypeScript sabe disso.
- `formatar(valor)` resolve dois problemas: divisão por zero dá `Infinity` em JavaScript (vira `Erro` com `Number.isFinite`), e `0.1 + 0.2` dá `0.30000000000000004` (vira `0.3` com `toFixed(10)` e `Number`).

### Entregar ou executar a função

```tsx
<Botao rotulo="C" aoTocar={limpar} />              // certo: entrega a função
<Botao rotulo="7" aoTocar={() => digitar('7')} />  // certo: a flecha adia a chamada
<Botao rotulo="7" aoTocar={digitar('7')} />        // errado: executa agora, no desenho
```

## Testes

| Teste do passo 15 | Como foi verificado | Resultado |
| --- | --- | --- |
| `2 + 3 =` mostra 5 | `npm test` e navegador | ok |
| `10 / 4 =` mostra 2.5 | `npm test` e navegador | ok |
| `9 - 12 =` mostra -3 | `npm test` e navegador | ok |
| `0.1 + 0.2 =` mostra 0.3 | `npm test` e navegador | ok |
| `7 / 0 =` mostra Erro, e um número depois começa conta nova | `npm test` e navegador | ok |
| `2 + 3 =` e `* 4 =` mostra 20 | `npm test` e navegador | ok |
| C no meio da conta apaga tudo, inclusive a linha pequena | navegador | ok |

Também conferido no navegador: `3 . 1 . 4` mostra `3.14` (o segundo ponto é ignorado). `npm run check` termina sem mensagens.

Os testes de `npm test` usam o `node:test`, que já vem no Node 22, então não foi preciso instalar Jest. Eles cobrem só a função pura; os toques foram conferidos no navegador. **Falta conferir no celular pelo Expo Go**, porque alguns erros (como texto solto fora de `<Text>`) só aparecem no aparelho.

## O que difere do PDF

- `npm run check` (`tsc --noEmit`) e `npm test` foram acrescentados, no mesmo padrão da Vitrine.
- `@types/node` (só para os testes) e `allowImportingTsExtensions` no `tsconfig.json`, porque o Node exige o `.ts` no import do teste.
- Comentários em português no código, explicando cada trecho.
- O repositório se chama `Calculadora_Mobile` (o PDF sugere `calculadora`).
- Simulador no navegador (`public/simulador.html` e `iniciar.cmd`), trazido do TCC: o app web numa moldura de celular, em http://localhost:8081/simulador.html.
- Os desafios opcionais (DEL, contas encadeadas, ±, %, tema claro) **não** foram feitos.

## Para explicar ao professor

A calculadora usa os mesmos cinco conceitos da Vitrine. O `Visor` e o `Botao` são componentes com props tipadas por `interface`, como o `CardProduto`. O `Botao` avisa o `App` pelo evento `aoTocar`, como o `CardProduto` faz com `aoAbrir`. O `App` guarda o que muda em `useState`, como o catálogo guarda a categoria e os favoritos. E a conta fica em `src/calcular.ts`, sem JSX, do mesmo jeito que a chamada à API vai ficar em `src/services/api.ts` na aula 08.
