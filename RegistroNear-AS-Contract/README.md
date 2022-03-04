# RegistroNear
==================
> Proyecto realizado para el NCD de NEAR Hispano.
## RegistroNear es un servicio que, a través de la blockchain de NEAR, buscar generar un fondo para que estudiantes puedan acceder a cursos.

# Diagrama de la Solucion:

![Alt text](/Documentos/doc_v3.jpg?raw=true "Title")

# RegistroNear permite:
    1. 
    2. 
    3. 
    4. 
    5. 
    6. 

## Pre-requisitos

1. node.js >=12 instalado (https://nodejs.org)  
2. near-cli instalado
    ```bash
    npm install -g near-cli
    ```
3. Crear una cuenta de NEAR en [testnet](https://docs.near.org/docs/develop/basics/create-account#creating-a-testnet-account)   
4. Autorizar app para dar acceso a la cuenta de NEAR
    ```bash
    near login
    ```

### Instalar y compilar el contrato
```bash
    npm install
    npm run build
```

### Ejecutar tests del contrato
```bash
    npm run build
```

### Create una Sub-Cuenta (reemplazar `YOUR_ACCOUNT_ID` con tu actual nombre de cuenta en minusculas):
```bash
    near create-account registronear-as-contract.YOUR_ACCOUNT_ID.testnet --masterAccount YOUR_ACCOUNT_ID.testnet
```

### Deployar el contrato
```bash
    near deploy --accountId CONTRACT_ACCOUNT_ID
```
Donde CONTRACT_ACCOUNT_ID es igual al valor de  registronear-as-contract.YOUR_ACCOUNT_ID.testnet del paso anterior.


## Correr comandos
Una vez deployado el contrato, usaremos el Account Id devuelto por la operacion para ejecutar los comandos, que será el account 
Id del contrato [será utilizado como CONTRACT_ACCOUNT_ID en los ejemplos de comandos]

Utilizaremos YOUR_ACCOUNT_ID para identificar el account Id que utilizamos para hacer las llamadas a los métodos.

Utilizaremos DONATE_ACCOUNT_ID para identificar el account Id de la cuenta de la Fundacion.

### Obtener información del Mensaje
```bash
    near call CONTRACT_ACCOUNT_ID getGreeting '{"accountId":"YOUR_ACCOUNT_ID"}' --accountId YOUR_ACCOUNT_ID
```
### Grabar un Mensaje
```bash
    near call CONTRACT_ACCOUNT_ID setGreeting '{"message": "Write Message Here"}' --accountId YOUR_ACCOUNT_ID
```

### Estructura de la Solucion 
```
  .
  |-- package.json      -- 
  |-- README.md         -- 
  |-- asconfig.json     -- 
  |-- as-pect.config.js --
  `-- assembly           
      |-- as_types.d.ts -- 
      |-- index.ts      -- 
      |-- tsconfig.json -- 
      `-- __tests__     
          |-- as-pect.d.ts  -- 
          `-- index.spec.ts -- 

  2 directories, 9 files
```
