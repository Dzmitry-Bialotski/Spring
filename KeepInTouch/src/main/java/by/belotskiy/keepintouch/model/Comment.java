package by.belotskiy.keepintouch.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.Instant;

@Entity
@Table(name="comments")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private Instant publishedAt;

    private String content;

    @ManyToOne
    @JoinColumn(name = "id_news", nullable = false)
    private News news;

    @ManyToOne
    @JoinColumn(name="user_id", nullable = false)
    private User author;
}
