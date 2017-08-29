package go3.rest.service;

import go3.rest.model.Envelope;
import go3.rest.model.Message;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

/**
 * Created by gouthamvidyapradhan on 27/08/2017.
 * Controller to send message to broker
 */
@Controller
public class GameController {

    @Autowired
    private SimpMessagingTemplate simpTemplate;

    @MessageMapping("/go3")
    public void greeting(Envelope envelope) throws Exception {
        Thread.sleep(500);
        Message message = new Message(envelope.getNumber());
        //send message to unique user
        simpTemplate.convertAndSendToUser(envelope.getSendTo(), "/queue/message", message);
    }

}
