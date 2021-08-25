package by.belotskiy.keepintouch.model.embeddable;

import lombok.Data;

import javax.persistence.Embeddable;
import java.io.Serializable;

@Embeddable
@Data
public class LikeId implements Serializable {
    private int userId;
    private int newsId;
}
