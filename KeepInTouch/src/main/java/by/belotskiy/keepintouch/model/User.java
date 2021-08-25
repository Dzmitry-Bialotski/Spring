package by.belotskiy.keepintouch.model;


import by.belotskiy.keepintouch.model.enums.Role;
import lombok.Data;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name="users")
@Data
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column
    private String login;

    @Column
    private String password;

    @Enumerated(EnumType.STRING)
    private Role role;

    @OneToMany(mappedBy = "author", fetch = FetchType.LAZY)
    private Set<News> news;

    @OneToMany(mappedBy = "author", fetch = FetchType.LAZY)
    private Set<Comment> comments;

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    private Set<Like> Likes;
}
