package com.tsybulka.lighting.controller;
import com.tsybulka.lighting.WebSocketHandler;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.socket.TextMessage;
//import org.springframework.web.socket.TextMessage;

import java.io.IOException;

@Controller
public class SimpleController {

    @Value("${spring.application.value}")
    String value;

    public static int lightningIntensity = 0;

    @PostMapping("/update/{newValue}")
    public String updateLightning(@PathVariable Integer newValue) {
        lightningIntensity = newValue;
        try {
            if (WebSocketHandler.clientSession != null) {
                System.out.println("Sending " + newValue + " to the client");
                WebSocketHandler.clientSession.sendMessage(new TextMessage(String.valueOf(lightningIntensity)));
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return "home";
    }

    @GetMapping("/")
    public String homePage(Model model) {
        //lightningIntensity = RestController1.lightningIntensity;
        model.addAttribute("value", lightningIntensity);
        //System.out.println(lightningIntensity);
        return "home";
    }
}