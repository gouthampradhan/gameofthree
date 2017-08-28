package go3.rest.model;

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
