package go3.rest.model;

/**
 * Created by gouthamvidyapradhan on 28/08/2017.
 */
public class UserProfile {
    private String userName;
    private boolean admin;

    public boolean isAdmin() {
        return admin;
    }

    public void setAdmin(boolean admin) {
            this.admin = admin;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }
}
