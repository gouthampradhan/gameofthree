package go3.rest.service;

import go3.rest.model.Envelope;
import go3.rest.model.Message;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
public class GameController {

    @Autowired
    private SimpMessagingTemplate simpTemplate;

    @MessageMapping("/go3")
    public void greeting(Envelope envelope) throws Exception {
        Thread.sleep(1000); // simulated delay
        Message message = new Message(envelope.getNumber());
        System.out.println("Content is: " + message.getContent());
        System.out.println("Send to: " + envelope.getSendTo());
        simpTemplate.convertAndSendToUser(envelope.getSendTo(), "/queue/greetings", message);
    }

}
