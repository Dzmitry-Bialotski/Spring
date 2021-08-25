package by.belotskiy.keepintouch.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.Instant;
import java.util.List;

@Entity
@Table(name="news")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class News {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private Instant date;

    private String sourceName;

    private String title;

    private String description;

    private String url;

    private String urlToImage;

    private String content;

    @OneToMany(cascade = CascadeType.ALL,
            mappedBy = "news",
            fetch = FetchType.LAZY)
    private List<Comment> comments;

    @ManyToOne
    @JoinColumn(name="user_id")
    private User author;
}
