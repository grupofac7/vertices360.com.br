import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";

@WebSocketGateway({ cors: { origin: "*" }, namespace: "whatsapp" })
export class WhatsappGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage("join")
  handleJoin(client: Socket, companyId: string) {
    client.join(`company:${companyId}`);
  }

  emitNewMessage(companyId: string, message: any) {
    this.server.to(`company:${companyId}`).emit("new_message", message);
  }

  emitConversationUpdate(companyId: string, conversation: any) {
    this.server.to(`company:${companyId}`).emit("conversation_update", conversation);
  }
}
