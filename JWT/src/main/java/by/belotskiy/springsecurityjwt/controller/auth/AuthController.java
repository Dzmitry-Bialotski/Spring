package by.belotskiy.springsecurityjwt.controller.auth;

import by.belotskiy.springsecurityjwt.config.jwt.JwtProvider;
import by.belotskiy.springsecurityjwt.entity.UserEntity;
import by.belotskiy.springsecurityjwt.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
public class AuthController {
    @Autowired
    private UserService userService;
    @Autowired
    private JwtProvider jwtProvider;

    @PostMapping("/register")
    public String registerUser(@RequestBody @Valid RegistrationRequest registrationRequest) {
        if(userService.findByLogin(registrationRequest.getLogin()) != null){
            return "user exists";
        }
        UserEntity u = new UserEntity();
        u.setPassword(registrationRequest.getPassword());
        u.setLogin(registrationRequest.getLogin());
        userService.saveUser(u);
        return "OK";
    }

    @PostMapping("/auth")
    public AuthResponse auth(@RequestBody AuthRequest request) {
        UserEntity userEntity = userService.findByLoginAndPassword(request.getLogin(), request.getPassword());
        if(userEntity == null){
            return new AuthResponse(null, "invalid login or password");
        }
        String token = jwtProvider.generateToken(userEntity.getLogin());
        return new AuthResponse(token, "");
    }
}
