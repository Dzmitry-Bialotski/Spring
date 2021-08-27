package by.belotskiy.keepintouch.repostiory;

import by.belotskiy.keepintouch.model.Like;
import by.belotskiy.keepintouch.model.embeddable.LikeId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LikeRepository extends JpaRepository<Like, LikeId> {

    int countByNews_Id(int newsId);
}
