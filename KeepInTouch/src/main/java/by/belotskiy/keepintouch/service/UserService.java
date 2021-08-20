package by.belotskiy.keepintouch.service;

import by.belotskiy.keepintouch.model.Role;
import by.belotskiy.keepintouch.model.User;
import by.belotskiy.keepintouch.repostiory.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User saveUser(User user){
        user.setRole(Role.USER);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    public User findUserByLogin(String login) {
        return userRepository.findUserByLogin(login);
    }

    public User findByLoginAndPassword(String login, String password) {
        User user = userRepository.findUserByLogin(login);
        if(user != null){
            if(passwordEncoder.matches(password, user.getPassword())) {
                return user;
            }
        }
        return null;
    }
}
