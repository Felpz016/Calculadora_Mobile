import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';

import { Botao } from './src/components/Botao';
import { Visor } from './src/components/Visor';

const COR_OPERADOR = '#F59E0B';
const COR_LIMPAR = '#EF4444';

// Passo 10 do roteiro: o teclado completo. Os botões ainda só avisam no
// terminal; o estado entra no passo 11.
export default function App() {
  function avisar(tecla: string) {
    console.log('tocou em', tecla);
  }

  return (
    <View style={styles.tela}>
      <Visor conta="" valor="0" />

      <View style={styles.teclado}>
        <View style={styles.linha}>
          <Botao rotulo="C" cor={COR_LIMPAR} colunas={3} aoTocar={() => avisar('C')} />
          <Botao rotulo="/" cor={COR_OPERADOR} aoTocar={() => avisar('/')} />
        </View>
        <View style={styles.linha}>
          <Botao rotulo="7" aoTocar={() => avisar('7')} />
          <Botao rotulo="8" aoTocar={() => avisar('8')} />
          <Botao rotulo="9" aoTocar={() => avisar('9')} />
          <Botao rotulo="*" cor={COR_OPERADOR} aoTocar={() => avisar('*')} />
        </View>
        <View style={styles.linha}>
          <Botao rotulo="4" aoTocar={() => avisar('4')} />
          <Botao rotulo="5" aoTocar={() => avisar('5')} />
          <Botao rotulo="6" aoTocar={() => avisar('6')} />
          <Botao rotulo="-" cor={COR_OPERADOR} aoTocar={() => avisar('-')} />
        </View>
        <View style={styles.linha}>
          <Botao rotulo="1" aoTocar={() => avisar('1')} />
          <Botao rotulo="2" aoTocar={() => avisar('2')} />
          <Botao rotulo="3" aoTocar={() => avisar('3')} />
          <Botao rotulo="+" cor={COR_OPERADOR} aoTocar={() => avisar('+')} />
        </View>
        <View style={styles.linha}>
          <Botao rotulo="0" colunas={2} aoTocar={() => avisar('0')} />
          <Botao rotulo="." aoTocar={() => avisar('.')} />
          <Botao rotulo="=" cor={COR_OPERADOR} aoTocar={() => avisar('=')} />
        </View>
      </View>

      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: '#0F172A',
    padding: 16,
    paddingTop: 56,
  },
  teclado: {
    gap: 12,
  },
  linha: {
    flexDirection: 'row',
    gap: 12,
  },
});
