function random(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

interface PlayerAttributes {
  health: number;
  armor: number;
  crit: number;
  attack: number;
}

declare global {
  interface Window {
    gameSession: number;
  }
}

export class Game {
  players: Array<Player>;
  running: boolean;
  constructor(p1: Player, p2: Player) {
    this.players = [p1, p2];
    this.running = false;
  }
  start(updateLogs: Function, updatePlayers: Function) {
    const that = this;
    let counter = 0;
    if (!this.running) {
      this.running = true;
      window.gameSession = window.setInterval(() => {
        if (this.players.some((p) => p.dead)) {
          const alivePlayer: Player = this.players.find(
            (p) => !p.dead
          ) as Player;
          updateLogs(
            `🏆 Game over, <span class='text-lg font-medium'>${alivePlayer.name}</span> won!`
          );
          that.end(updateLogs);
        } else {
          const first = this.players[counter % 2];
          const second = this.players[(counter + 1) % 2];
          first.attack(second, counter, updateLogs);
          updatePlayers(second, counter);
          counter++;
        }
      }, 1000);
    }
  }
  end(updateLogs: Function) {
    this.running = false;
    window.clearInterval(window.gameSession);
    updateLogs(`- Game ended, thanks for playing! -`);
  }
  update(text: string) {
    console.log(text);
  }
}

export class Player {
  name: string;
  attributes: PlayerAttributes;
  //   health: number;
  dead: boolean;
  constructor(hero: string, attributes: PlayerAttributes) {
    this.name = hero;
    this.attributes = attributes;
    // this.health = attributes.health + (attributes.armor || 0);
    this.dead = false;
  }
  attack(opponent: Player, round: number, updateLogs: Function) {
    const critMultiplier = this.attributes.crit ? this.attributes.crit * 10 : 0;
    const critDamage = random(0, critMultiplier);
    const damage = this.attributes.attack + critDamage;

    if (opponent.attributes.armor > 0) {
      opponent.attributes.armor -= damage;
      if (opponent.attributes.armor < 0) {
        opponent.attributes.armor = 0;
      }
    } else {
      opponent.attributes.health -= damage;
      if (opponent.attributes.health < 0) {
        opponent.attributes.health = 0;
      }
    }

    // opponent.health -= damage;

    updateLogs(
      `🔥 ${this.name} hit <span class='text-lg font-medium'>${damage} (${critDamage} crit!)</span> damage to ${opponent.name}!`
    );
    if (opponent.attributes.health <= 0) {
      opponent.dead = true;
    }
  }
  summary() {
    console.table(this.attributes);
  }
}

//   const p1 = new Player("p1", { health: 2000, attack: 1, crit: 0.1 });
//   const p2 = new Player("p2", { health: 1000, attack: 10 });
//   const game = new Game(p1, p2);
//   game.start();
