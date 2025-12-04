import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class AppGateway {
    @WebSocketServer()
    server: Server;

    @SubscribeMessage('message')
    handleMessage(@MessageBody() data: any): void {
        console.log('Received message:', data);
        // this.server.emit('message', JSON.stringify({  }));
        // this.server.emit('message', "okokk");
        if (data && (data.text === "ping")) {
            this.server.emit('message', `pong`);
        } else if (data && (data.text === "pong")) {
            this.server.emit('message', `ping`);
        } else {
            this.server.emit('message', `Echo: ${data.text}`);
        }
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
