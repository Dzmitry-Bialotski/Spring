package by.belotskiy.keepintouch.controller;

import by.belotskiy.keepintouch.config.jwt.JwtProvider;
import by.belotskiy.keepintouch.controller.request.AuthRequest;
import by.belotskiy.keepintouch.controller.request.RegistrationRequest;
import by.belotskiy.keepintouch.controller.response.AuthResponse;
import by.belotskiy.keepintouch.model.User;
import by.belotskiy.keepintouch.service.UserService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
public class AuthController {

    private final UserService userService;

    private final JwtProvider jwtProvider;

    public AuthController(UserService userService, JwtProvider jwtProvider) {
        this.userService = userService;
        this.jwtProvider = jwtProvider;
    }
    @PostMapping("/register")
    public String registerUser(@RequestBody @Valid RegistrationRequest registrationRequest) {
        if(userService.findUserByLogin(registrationRequest.getLogin()) != null){
            return "user exists";
        }
        User user = new User();
        user.setPassword(registrationRequest.getPassword());
        user.setLogin(registrationRequest.getLogin());
        userService.saveUser(user);
        return "OK";
    }

    @PostMapping("/auth")
    public AuthResponse auth(@RequestBody AuthRequest request) {
        User user = userService.findByLoginAndPassword(request.getLogin(), request.getPassword());
        if(user == null){
            return new AuthResponse(null, "invalid login or password");
        }
        String token = jwtProvider.generateToken(user.getLogin());
        return new AuthResponse(token, "");
    }
}
