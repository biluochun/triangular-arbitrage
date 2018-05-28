import { EventEmitter } from 'events';
import { Trading } from './trading';
import * as types from './type';
import { logger, Helper } from './common';

/**
 * 通用事件处理器
 */
export class Event extends EventEmitter {
  trading: Trading;

  constructor() {
    super();
    this.trading = new Trading();
    this.on('placeOrder', this.onPlaceOrder);
    this.on('sell', this.onSell);
    this.on('updateArbitage', this.onUpdateArbitage);
  }

  async onPlaceOrder(exchange: types.IExchange, triangle: types.ITriangle) {
    const timer = Helper.getTimer();
    logger.debug('执行订单事件[开始]');
    await this.trading.placeOrder(exchange, triangle);
  }

  async onUpdateArbitage(ranks: types.IRank[]) {
    if (ranks.length > 0) {
      await this.trading.storage.rank.putRanks(ranks);
    }
  }

  onSell(exchange: types.IExchange, name: string, free: string, all: any[]) {
    this.trading.order.sellSome(exchange, name, free, all);
  }
}
