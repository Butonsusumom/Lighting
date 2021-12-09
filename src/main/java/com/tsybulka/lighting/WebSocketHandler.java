package com.tsybulka.lighting;

import org.springframework.web.socket.BinaryMessage;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.AbstractWebSocketHandler;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

public class WebSocketHandler extends AbstractWebSocketHandler {

    public static WebSocketSession clientSession;

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        super.afterConnectionEstablished(session);
        clientSession = session;
        System.out.println("New connection");
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        new Thread(() -> {
            System.out.println("New text message: " + message);
            /*
            try {
                session.sendMessage(new TextMessage("Hello #" + System.currentTimeMillis()));
            } catch (IOException e) {
                e.printStackTrace();
            }
             */
            /*
            while (true) {
                for (int i = 0; i < 299; i++) {
                    try {
                        String frameName = "000000";
                        String frameNumber = String.valueOf(i);
                        frameName = frameName.substring(0, 6 - frameNumber.length()) + frameNumber;
                        session.sendMessage(new BinaryMessage(Files.readAllBytes(Paths.get("TestFrames" + File.separator + "Frame_" + frameName + ".jpeg"))));
                        Thread.sleep(1000 / 25);
                        //System.out.println("Send #" + i);
                    } catch (IOException | InterruptedException e) {
                        try {
                            session.close();
                        } catch (IOException ioException) {
                            ioException.printStackTrace();
                        }
                        e.printStackTrace();
                        break;
                    }
                }
            }

             */
        }).start();
    }
}
