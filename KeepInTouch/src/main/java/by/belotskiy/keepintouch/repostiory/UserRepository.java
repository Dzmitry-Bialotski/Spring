package by.belotskiy.keepintouch.repostiory;

import by.belotskiy.keepintouch.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

    User findUserByLogin(String login);
}
