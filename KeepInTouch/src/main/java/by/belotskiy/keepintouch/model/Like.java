package by.belotskiy.keepintouch.model;

import by.belotskiy.keepintouch.model.embeddable.LikeId;
import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name="likes")
@Data
public class Like {

    @EmbeddedId
    private LikeId likeId;

    @MapsId("userId")
    @ManyToOne
    private User user;

    @MapsId("newsId")
    @ManyToOne
    private News news;

}
