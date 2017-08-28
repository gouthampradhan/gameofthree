package go3.rest.model;

/**
 * Created by gouthamvidyapradhan on 27/08/2017.
 * Message Envelope Java POJO
 */
public class Envelope {
    private String number;
    private String sendTo;

    public Envelope() {
    }

    public Envelope(String number, String sendTo) {
        this.number = number;
        this.sendTo = sendTo;
    }

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public String getSendTo() {
        return sendTo;
    }

    public void setSendTo(String sendTo) {
        this.sendTo = sendTo;
    }
}
