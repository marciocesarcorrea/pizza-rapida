# REQUISITOS

## REQ.001 - Montar pizza

### Estória

*Sendo um cliente do sistema da pizzaria UDS, eu quero montar uma pizza ideal de acordo com o meu gosto, com objetivo de saciar a minha fome em um bom tempo de preparo e que caiba no meu bolso.*

### Comportamento

#### Entrada de dados

*1. Para conseguir montar a pizza ideal, o cliente deve primeiramente fazer a escolha do*

*tamanho da pizza e em seguida do seu sabor.*

<table>
  <tr>
    <td>Descrição </td>
    <td>Tipo </td>
    <td>Obrigatoriedade </td>
    <td>Objetivo</td>
  </tr>
  <tr>
    <td>Tamanho</td>
    <td>Seleção (pequena, média ou grande)
</td>
    <td>Sim</td>
    <td>Definir o tempo de preparo e preço da pizza.
</td>
  </tr>
  <tr>
    <td>Sabor
</td>
    <td>Seleção (calabresa, marguerita ou portuguesa)
</td>
    <td>Sim</td>
    <td>Escolher o sabor e saber o tempo adicional de preparo.</td>
  </tr>
</table>


#### Processamento de dados

*1. O cliente deve ser capaz de escolher uma das opções dadas de tamanho. Cada uma*

*destas opções possui um preço único e um tempo de preparo específico.*

*a. pequena: a pizza pequena tem o valor de R$ 20,00 e um tempo de preparo de** **15 minutos. *

*b. média: a pizza média tem o valor de R$ 30,00 e um tempo de preparo de 20** **minutos.*

*c. grande: a pizza grande tem o valor de R$ 40,00 e um tempo de preparo de 25** **minutos. *

*2. O cliente, após escolha do tamanho, deve selecionar o sabor de sua pizza.*

*a. calabresa ou marguerita: as pizzas não possuem comportamento específico.*

*b. portuguesa: a pizza de portuguesa tem um adicional de 5 minutos no seu** **tempo de preparo. *

*3. Ao selecionar os dois valores, o cliente está apto a avançar de passo, conseguindo*

*escolher os adicionais de sua pizza.*

#### Saída de dados

*1. Após a escolha do tamanho e do sabor, o sistema deve armazenar o tempo de*

*preparo, o valor final do pedido e os detalhes do produto.*

### Critérios de aceitação

*1. Só deve ser possível a escolha de uma pizza para o pedido.*

*2. Não deve ser possível a escolha de meia pizza.*

## REQ.002 - Personalizar pizza

### Estória

*Sendo um cliente do sistema da pizzaria UDS, eu quero personalizar a minha pizza. O objetivo da personalização é tornar a minha pizza única.*

### Comportamento

#### Entrada de dados

*1. Para conseguir personalizar a pizza, o cliente deve escolher os adicionais que serão*

*usados como observações no preparo da pizza.*

<table>
  <tr>
    <td>Descrição </td>
    <td>Tipo </td>
    <td>Obrigatoriedade </td>
    <td>Objetivo</td>
  </tr>
  <tr>
    <td>Personalização</td>
    <td>Seleção (Extra bacon, sem cebola ou borda recheada)
</td>
    <td>Não</td>
    <td>Personalizar a pizza, alterando o modo de preparo.</td>
  </tr>
</table>


#### Processamento de dados

*1. O cliente deve ser capaz de escolher uma das opções de personalização. Cada uma destas** **opções pode possuir um preço único e um tempo de preparo específico.*

*a. extra bacon: a personalização de extra bacon deve ter um valor adicional de R$** **3,00.*

*b. sem cebola: a pizza sem cebola não possui comportamento específico. *

*c. borda recheada: a borda recheada deve ter um valor adicional de R$ 5,00 e um** **tempo adicional de preparo de 5 minutos. *

*2. Sendo uma personalização não obrigatória, o cliente pode avançar para a finalização do pedido.*

#### Saída de dados

*1. O sistema deve salvar todas as personalizações escolhidas ao pedido, bem como*

*qualquer adicional de preço ou tempo de preparo.*

### Critérios de aceitação

*1. É possível criar uma pizza sem personalização.*

*2. É possível criar uma pizza com mais de uma personalização.*

*3. Os valores e tempos adicionais devem ser somados no total do pedido.*

## REQ.003 - Montar pedido

### Estória

*Sendo um cliente do sistema da pizzaria UDS, eu quero visualizar os detalhes do meu pedido e saber o preço final e o tempo de preparo. O objetivo é saber o quanto irei gastar e em quanto tempo a pizza ficará pronta.*

### Comportamento

#### Entrada de dados

*1. Para visualização dos detalhes do pedido, devem ser exibidas as seguintes*

*informações:*

<table>
  <tr>
    <td>Descrição </td>
    <td>Tipo </td>
    <td>Obrigatoriedade </td>
    <td>Objetivo</td>
  </tr>
  <tr>
    <td>Tamanho </td>
    <td>Texto </td>
    <td>Sim</td>
    <td>Saber o tamanho selecionado.
</td>
  </tr>
  <tr>
    <td>Sabor </td>
    <td>Texto </td>
    <td>Sim</td>
    <td>Saber o sabor selecionado.</td>
  </tr>
  <tr>
    <td>Personalizações </td>
    <td>Texto </td>
    <td>Não</td>
    <td>Saber as personalizações escolhidas.
</td>
  </tr>
  <tr>
    <td>Valor total </td>
    <td>Valor financeiro</td>
    <td>Sim </td>
    <td> Saber o total a ser pago.</td>
  </tr>
  <tr>
    <td>Tempo de preparo </td>
    <td>Tempo em minutos</td>
    <td>Sim</td>
    <td>Saber o tempo total de preparo.</td>
  </tr>
</table>


#### Processamento de dados

*1. Devem ser somados os valores referentes ao tamanho da pizza escolhida e dos** **adicionais, caso selecionados ao campo de "valor total".*

*2. Devem ser somados os valores referentes ao tamanho da pizza, sabor e** **personalizações, caso haja, no campo "tempo de preparo".*

#### Saída de dados

*1. Apresentar ao cliente o resumo do pedido, listando o tamanho e sabor da pizza escolhida, juntamente com o preço deste item.*

*2. Apresentar ao cliente a lista de personalização, exibindo o que foi selecionado e seu** **valor, individualmente.*

*3. Apresentar o valor total do pedido e seu tempo de preparo.*

### Critérios de aceitação

*1. Todos os valores devem ser discriminados no resumo do pedido.*

*2. Somente exibir o tempo total de preparo no resumo do pedido.*

