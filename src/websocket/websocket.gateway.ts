import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';

@WebSocketGateway()
export class WebsocketGateway {

  @WebSocketServer() server;

  notifyOnLike(userAcitivityId: string, userId: string) {
    this.server.emit('events', { mediaId: userAcitivityId, userId });
  }

}
