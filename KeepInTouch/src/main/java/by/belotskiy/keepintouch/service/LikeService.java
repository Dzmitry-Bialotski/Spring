package by.belotskiy.keepintouch.service;

import by.belotskiy.keepintouch.model.Like;
import by.belotskiy.keepintouch.model.embeddable.LikeId;
import by.belotskiy.keepintouch.repostiory.LikeRepository;
import by.belotskiy.keepintouch.repostiory.NewsRepository;
import by.belotskiy.keepintouch.repostiory.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class LikeService {

    private final LikeRepository likeRepository;
    private final UserRepository userRepository;
    private final NewsRepository newsRepository;

    public LikeService(LikeRepository likeRepository, UserRepository userRepository, NewsRepository newsRepository) {
        this.likeRepository = likeRepository;
        this.userRepository = userRepository;
        this.newsRepository = newsRepository;
    }

    public boolean isLikeExists(int userId, int newsId){
        return likeRepository.findById(new LikeId(userId, newsId)).isPresent();
    }

    public int count(int newsId){
        return likeRepository.countByNews_Id(newsId);
    }

    /**
     *
     * @return true if like exists after operation
     */
    @Transactional
    public boolean placeOrRemove(int userId, int newsId){
        LikeId likeId = new LikeId(userId, newsId);
        if(isLikeExists(userId, newsId)){
            likeRepository.deleteById(likeId);
            return false;
        }else{
            Like like = new Like(likeId);
            like.setUser(userRepository.getById(userId));
            like.setNews(newsRepository.getById(newsId));
            likeRepository.save(like);
            return true;
        }
    }
}
