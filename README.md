# Game

Esta pasta contém lógicas modulares e reutilizáveis para o funcionamento do jogo. O objetivo é facilitar a manutenção e reaproveitamento de código em diferentes partes do projeto.

## Estrutura

- **ai/** → Contém a lógica de inteligência artificial para os inimigos e NPCs.
- **physics/** → Implementações relacionadas à física do jogo, como gravidade e colisões.
- **entities/** → Classes e sistemas que gerenciam personagens, inimigos e objetos interativos.
- **utils/** → Funções auxiliares para facilitar a manipulação de dados e operações comuns.

## Como Usar

Os módulos dentro desta pasta podem ser importados e utilizados em diferentes partes do jogo. Por exemplo, para utilizar a IA de inimigos:

```javascript
import EnemyAI from "./ai/enemyAI.js";

const enemy = new EnemyAI(inimigo, jogador);
enemy.update();
```

Mantenha a lógica do jogo modular e bem organizada para facilitar escalabilidade e reutilização!

