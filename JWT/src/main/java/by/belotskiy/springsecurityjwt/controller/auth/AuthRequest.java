package by.belotskiy.springsecurityjwt.controller.auth;

import lombok.Data;

@Data
public class AuthRequest {
    private String login;
    private String password;
}
