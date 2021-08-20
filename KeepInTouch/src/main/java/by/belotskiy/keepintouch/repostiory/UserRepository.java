package by.belotskiy.keepintouch.repostiory;

import by.belotskiy.keepintouch.model.User;
import org.springframework.data.jpa.repository.JpaRepository;


public interface UserRepository extends JpaRepository<User, Integer> {

    User findUserByLogin(String login);
}
