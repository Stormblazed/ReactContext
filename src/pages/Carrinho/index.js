import { Button, Snackbar, InputLabel, Select , MenuItem } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import {  useState } from 'react';
import { Container, Voltar, TotalContainer, PagamentoContainer} from './styles';
import { useCarrinhoContext } from 'common/context/Carrinho';
import Produto from 'components/Produto';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import {  usePagamentoContext } from 'common/context/Pagamento';

function Carrinho() {
  const history =  useHistory()
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const {carrinho} =  useCarrinhoContext();
  const { tiposPagamento ,formaPagamento , mudarFormaPagamento} = usePagamentoContext()
  return (
    <Container>
      <Voltar onClick={() => history.goBack()} />
      <h2>
        Carrinho
      </h2>
      {carrinho.map(produto => (<Produto {...produto} key={produto.key} />))}
      <PagamentoContainer>
        <InputLabel> Forma de Pagamento </InputLabel>
        <Select
         value={formaPagamento.id}
         onChange={(evento) => mudarFormaPagamento(evento.target.value)}
        >
          {tiposPagamento.map(tipoPagamento => <MenuItem key={tipoPagamento.id} value={tipoPagamento.id}>{tipoPagamento.nome}</MenuItem> )}
        </Select>
      </PagamentoContainer>
      <TotalContainer>
          <div>
            <h2>Total no Carrinho: </h2>
            <span>R$ </span>
          </div>
          <div>
            <h2> Saldo: </h2>
            <span> R$ </span>
          </div>
          <div>
            <h2> Saldo Total: </h2>
            <span> R$ </span>
          </div>
        </TotalContainer>
      <Button
        onClick={() => {
          setOpenSnackbar(true);
        }}
        color="primary"
        variant="contained"
      >
         Comprar
       </Button>
        <Snackbar
          anchorOrigin={
            { 
              vertical: 'top',
              horizontal: 'right'
            }
          }
          open={openSnackbar}
          onClose={() => setOpenSnackbar(false)}
        >
           <MuiAlert
            onClose={() => setOpenSnackbar(false)}
            severity="success"
          >
            Compra feita com sucesso!
          </MuiAlert>
        </Snackbar>
    </Container>
  )
}

export default Carrinho;