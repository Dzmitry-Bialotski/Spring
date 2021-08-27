package by.belotskiy.keepintouch.model;

import by.belotskiy.keepintouch.model.embeddable.LikeId;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name="likes")
@Data
@NoArgsConstructor
public class Like {

    @EmbeddedId
    private LikeId likeId;

    @MapsId("userId")
    @ManyToOne(fetch = FetchType.LAZY)
    private User user;

    @MapsId("newsId")
    @ManyToOne(fetch = FetchType.LAZY)
    private News news;

    public Like(LikeId likeId){
        this.likeId = likeId;
    }
}
