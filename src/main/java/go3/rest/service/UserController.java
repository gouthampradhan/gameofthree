package go3.rest.service;

import go3.rest.model.UserProfile;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by gouthamvidyapradhan on 27/08/2017.
 * REST end-point configuration
 */
@RestController
@RequestMapping("/app/")
public class UserController {

    @RequestMapping(value = "/user", method = RequestMethod.GET)
    public UserProfile getUser(Authentication authentication) {
        UserDetails userDetails = (UserDetails)authentication.getPrincipal();
        System.out.println("printing authority");
        UserProfile userProfile = new UserProfile();
        userProfile.setUserName(authentication.getName());
        userDetails.getAuthorities().stream().forEach(x -> {
            System.out.println(x.getAuthority());
            if(x.getAuthority().equals("ROLE_ADMIN")) {
                userProfile.setAdmin(true);
            }
        });
        System.out.println(userProfile.getUserName());
        System.out.println(userProfile.isAdmin());
        return userProfile;
    }
}
