package by.belotskiy.keepintouch.controller.auth;

import lombok.Data;

@Data
public class AuthRequest {
    private String login;
    private String password;
}
