import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({ namespace: '/socketio' })
export class AppGateway {
    @WebSocketServer()
    server: Server;

    @SubscribeMessage('message')
    handleMessage(@MessageBody() data: object): void {
        this.server.emit('message', JSON.stringify({ data }));
    }

    // Example: broadcast every second
    broadcastInterval: NodeJS.Timeout;

    afterInit() {
        this.broadcastInterval = setInterval(() => {
            this.server.emit('message_interval', `WebSocket broadcast: ${new Date().toISOString()}`);
        }, 1000);
    }

    // Clean up interval on shutdown
    onModuleDestroy() {
        clearInterval(this.broadcastInterval);
    }
}
