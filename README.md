Este conteúdo é parte do curso Clean Code e Clean Architecture da Branas.io

Para mais informações acesse:

https://branas.io


## Inicializando o ambiente de desenvolvimento

Para funcionar corretamente, esta aplicação depende de outras aplicações em funcionamento, como uma instância de banco de dados devidamente configurada. Isto é feito instânciando containeres Docker através do script `start_containers.sh`.

```sh
./start_containers.sh
```

## Desligando o ambiente de desenvolvimento

Para remover os containeres, basta executar:

```sh
./stop_containers.sh
```