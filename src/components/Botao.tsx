import { Pressable, StyleSheet, Text } from 'react-native';

// Passo 8 do roteiro. Uma prop pode ser uma função: é assim que o filho
// (Botao) avisa o pai (App) de que foi tocado. Isso é um evento.
interface BotaoProps {
  rotulo: string;
  aoTocar: () => void; // função que não recebe nada e não devolve nada
  cor?: string; // opcional (?): se ninguém passar, vale o padrão abaixo
  colunas?: number; // quantas "colunas" o botão ocupa na linha
}

export function Botao({ rotulo, aoTocar, cor = '#334155', colunas = 1 }: BotaoProps) {
  return (
    <Pressable
      // Sem parênteses: entrega a função para o Pressable chamar no toque.
      onPress={aoTocar}
      // O Pressable chama esta função e informa se o dedo está apertando.
      style={({ pressed }) => [
        styles.botao,
        { flex: colunas, backgroundColor: cor, opacity: pressed ? 0.6 : 1 },
      ]}
    >
      <Text style={styles.rotulo}>{rotulo}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  botao: {
    height: 72,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rotulo: {
    color: '#F8FAFC',
    fontSize: 28,
  },
});
