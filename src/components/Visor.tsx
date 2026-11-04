import { StyleSheet, Text, View } from 'react-native';

// Passo 6 do roteiro. O Visor só MOSTRA o que recebe: as props descem do App
// e ele não muda nada sozinho.
interface VisorProps {
  conta: string; // linha pequena de cima, ex.: "12 +"
  valor: string; // número grande, ex.: "345"
}

export function Visor({ conta, valor }: VisorProps) {
  return (
    <View style={styles.visor}>
      <Text style={styles.conta}>{conta}</Text>
      {/* numberOfLines + adjustsFontSizeToFit: número comprido encolhe para caber */}
      <Text style={styles.valor} numberOfLines={1} adjustsFontSizeToFit>
        {valor}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  visor: {
    flex: 1, // ocupa todo o espaço que o teclado deixa livre
    justifyContent: 'flex-end', // encosta embaixo
    alignItems: 'flex-end', // encosta à direita
    paddingBottom: 24,
  },
  conta: {
    color: '#94A3B8',
    fontSize: 24,
    minHeight: 32, // a linha não "pula" quando a conta está vazia
  },
  valor: {
    color: '#F8FAFC',
    fontSize: 64,
    fontWeight: '300',
  },
});
