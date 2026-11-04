import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { calcular, formatar, Operador } from './src/calcular';
import { Botao } from './src/components/Botao';
import { Visor } from './src/components/Visor';

const COR_OPERADOR = '#F59E0B';
const COR_LIMPAR = '#EF4444';

// Versão final do roteiro (passo 15).
export default function App() {
  // O visor é TEXTO, não número: assim '12' + '3' junta e vira '123'.
  const [visor, setVisor] = useState('0');
  // Primeiro número e operação começam vazios (null) até tocar num operador.
  const [primeiro, setPrimeiro] = useState<number | null>(null);
  const [operador, setOperador] = useState<Operador | null>(null);
  // true = o próximo dígito começa um número novo (depois de +, =, C...).
  const [novoNumero, setNovoNumero] = useState(true);

  function digitar(digito: string) {
    if (novoNumero || visor === '0') {
      setVisor(digito);
      setNovoNumero(false);
    } else {
      setVisor(visor + digito);
    }
  }

  // Passo 12: impede dois pontos no mesmo número (3.1.4).
  function digitarPonto() {
    if (novoNumero) {
      setVisor('0.');
      setNovoNumero(false);
    } else if (!visor.includes('.')) {
      setVisor(visor + '.');
    }
  }

  function escolherOperador(op: Operador) {
    if (visor === 'Erro') {
      return; // não dá para operar sobre a palavra Erro
    }
    setPrimeiro(Number(visor));
    setOperador(op);
    setNovoNumero(true);
  }

  function igual() {
    if (primeiro === null || operador === null) {
      return; // sem conta pendente, o = não faz nada
    }
    const resultado = calcular(primeiro, Number(visor), operador);
    setVisor(formatar(resultado));
    setPrimeiro(null);
    setOperador(null);
    setNovoNumero(true);
  }

  function limpar() {
    setVisor('0');
    setPrimeiro(null);
    setOperador(null);
    setNovoNumero(true);
  }

  // Não é estado: é calculado a partir de primeiro e operador a cada desenho.
  const conta =
    primeiro !== null && operador !== null ? `${formatar(primeiro)} ${operador}` : '';

  return (
    <View style={styles.tela}>
      <Visor conta={conta} valor={visor} />

      <View style={styles.teclado}>
        <View style={styles.linha}>
          {/* limpar sem flecha: não precisa de argumento */}
          <Botao rotulo="C" cor={COR_LIMPAR} colunas={3} aoTocar={limpar} />
          <Botao rotulo="/" cor={COR_OPERADOR} aoTocar={() => escolherOperador('/')} />
        </View>
        <View style={styles.linha}>
          {/* digitar COM flecha: precisa do dígito, e a flecha adia a chamada para o toque */}
          <Botao rotulo="7" aoTocar={() => digitar('7')} />
          <Botao rotulo="8" aoTocar={() => digitar('8')} />
          <Botao rotulo="9" aoTocar={() => digitar('9')} />
          <Botao rotulo="*" cor={COR_OPERADOR} aoTocar={() => escolherOperador('*')} />
        </View>
        <View style={styles.linha}>
          <Botao rotulo="4" aoTocar={() => digitar('4')} />
          <Botao rotulo="5" aoTocar={() => digitar('5')} />
          <Botao rotulo="6" aoTocar={() => digitar('6')} />
          <Botao rotulo="-" cor={COR_OPERADOR} aoTocar={() => escolherOperador('-')} />
        </View>
        <View style={styles.linha}>
          <Botao rotulo="1" aoTocar={() => digitar('1')} />
          <Botao rotulo="2" aoTocar={() => digitar('2')} />
          <Botao rotulo="3" aoTocar={() => digitar('3')} />
          <Botao rotulo="+" cor={COR_OPERADOR} aoTocar={() => escolherOperador('+')} />
        </View>
        <View style={styles.linha}>
          <Botao rotulo="0" colunas={2} aoTocar={() => digitar('0')} />
          <Botao rotulo="." aoTocar={digitarPonto} />
          <Botao rotulo="=" cor={COR_OPERADOR} aoTocar={igual} />
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
    paddingTop: 56, // espaço para não ficar embaixo do relógio e da bateria
  },
  teclado: {
    gap: 12, // espaço entre as linhas
  },
  linha: {
    flexDirection: 'row', // botões lado a lado
    gap: 12,
  },
});
